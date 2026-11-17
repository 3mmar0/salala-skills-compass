#!/usr/bin/env python3
"""Deploy Solala frontend + Laravel API changes to Hostinger over SFTP/SSH.

Required env:
  HOSTINGER_HOST, HOSTINGER_PORT, HOSTINGER_USER, HOSTINGER_PASSWORD

Optional env:
  HOSTINGER_PUBLIC_ROOT   (default: .../domains/solalaa.com/public_html)
  HOSTINGER_BACKEND_ROOT  (default: .../domains/solalaa.com/backend-app)
  HOSTINGER_PHP_BIN       (default: /opt/alt/php84/usr/bin/php)
  DEPLOY_TARGET           full | frontend | backend  (default: full)
  LOCAL_PUBLIC            path to Vite build output (default: .output/public)
  LOCAL_BACKEND           path to Laravel app (default: backend)
  LOCAL_HTACCESS          path to root .htaccess (default: deploy/static-root/.htaccess)
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

import paramiko

ROOT = Path(__file__).resolve().parents[1]

HOST = os.environ["HOSTINGER_HOST"]
PORT = int(os.environ.get("HOSTINGER_PORT", "65002"))
USER = os.environ["HOSTINGER_USER"]
PASSWORD = os.environ["HOSTINGER_PASSWORD"]

def env_or(name: str, default: str) -> str:
    value = os.environ.get(name, "").strip()
    return value or default


REMOTE_PUBLIC = env_or("HOSTINGER_PUBLIC_ROOT", f"/home/{USER}/domains/solalaa.com/public_html")
REMOTE_BACKEND = env_or("HOSTINGER_BACKEND_ROOT", f"/home/{USER}/domains/solalaa.com/backend-app")
PHP_BIN = env_or("HOSTINGER_PHP_BIN", "/opt/alt/php84/usr/bin/php")
TARGET = env_or("DEPLOY_TARGET", "full").lower()

LOCAL_PUBLIC = Path(env_or("LOCAL_PUBLIC", str(ROOT / ".output" / "public")))
LOCAL_BACKEND = Path(env_or("LOCAL_BACKEND", str(ROOT / "backend")))
LOCAL_HTACCESS = Path(env_or("LOCAL_HTACCESS", str(ROOT / "deploy" / "static-root" / ".htaccess")))

# Keep the Laravel public mount under public_html/backend intact.
SKIP_TOP = {"backend"}

# Sync these Laravel paths on every backend deploy (never touch .env / vendor / storage).
BACKEND_SYNC = [
    "app",
    "routes",
    "database/migrations",
    "bootstrap/app.php",
    "composer.json",
    "composer.lock",
    "deploy/hostinger-public/index.php",
    "deploy/hostinger-public/.htaccess",
]


def ensure_remote_dir(sftp: paramiko.SFTPClient, path: str) -> None:
    parts = [p for p in path.strip("/").split("/") if p]
    cur = ""
    for part in parts:
        cur += "/" + part
        try:
            sftp.stat(cur)
        except FileNotFoundError:
            sftp.mkdir(cur)


def upload_file(sftp: paramiko.SFTPClient, local: Path, remote: str) -> int:
    ensure_remote_dir(sftp, str(Path(remote).as_posix().rsplit("/", 1)[0]))
    sftp.put(str(local), remote)
    return local.stat().st_size


def upload_tree(sftp: paramiko.SFTPClient, local: Path, remote: str) -> tuple[int, int]:
    files = 0
    bytes_ = 0
    for root, dirs, filenames in os.walk(local):
        rel = Path(root).relative_to(local)
        if rel.parts and rel.parts[0] in SKIP_TOP:
            dirs[:] = []
            continue
        remote_dir = remote if str(rel) == "." else f"{remote}/{rel.as_posix()}"
        ensure_remote_dir(sftp, remote_dir)
        for name in filenames:
            local_file = Path(root) / name
            remote_file = f"{remote_dir}/{name}"
            size = upload_file(sftp, local_file, remote_file)
            files += 1
            bytes_ += size
    return files, bytes_


def upload_backend(sftp: paramiko.SFTPClient) -> tuple[int, int]:
    files = 0
    bytes_ = 0
    for rel in BACKEND_SYNC:
        local = LOCAL_BACKEND / rel
        if not local.exists():
            print(f"skip missing {rel}")
            continue
        if local.is_dir():
            for root, _dirs, filenames in os.walk(local):
                root_path = Path(root)
                for name in filenames:
                    local_file = root_path / name
                    rel_file = local_file.relative_to(LOCAL_BACKEND).as_posix()
                    remote_file = f"{REMOTE_BACKEND}/{rel_file}"
                    size = upload_file(sftp, local_file, remote_file)
                    files += 1
                    bytes_ += size
        else:
            if rel.startswith("deploy/hostinger-public/"):
                # Document root for backend.solalaa.com / public_html/backend
                name = Path(rel).name
                remote_file = f"{REMOTE_PUBLIC}/backend/{name}"
            else:
                remote_file = f"{REMOTE_BACKEND}/{rel}"
            size = upload_file(sftp, local, remote_file)
            files += 1
            bytes_ += size
            print(f"  + {rel} -> {remote_file}")
    return files, bytes_


def run_migrate(client: paramiko.SSHClient) -> None:
    cmd = f"cd {REMOTE_BACKEND} && {PHP_BIN} artisan migrate --force --no-interaction"
    print("Running:", cmd)
    _stdin, stdout, stderr = client.exec_command(cmd, timeout=180)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    code = stdout.channel.recv_exit_status()
    if out.strip():
        print(out)
    if err.strip():
        print("STDERR:", err)
    if code != 0:
        raise SystemExit(f"migrate failed with exit {code}")
    print("Migration OK")


def connect() -> paramiko.SSHClient:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        HOST,
        port=PORT,
        username=USER,
        password=PASSWORD,
        timeout=45,
        banner_timeout=60,
        allow_agent=False,
        look_for_keys=False,
    )
    return client


def main() -> None:
    if TARGET not in {"full", "frontend", "backend"}:
        raise SystemExit(f"Invalid DEPLOY_TARGET={TARGET!r}")

    if TARGET in {"full", "frontend"} and not LOCAL_PUBLIC.exists():
        raise SystemExit(f"Missing build output: {LOCAL_PUBLIC}. Run npm run build first.")

    client = connect()
    sftp = client.open_sftp()

    try:
        if TARGET in {"full", "frontend"}:
            print(f"Uploading frontend -> {REMOTE_PUBLIC}")
            files, bytes_ = upload_tree(sftp, LOCAL_PUBLIC, REMOTE_PUBLIC)
            if LOCAL_HTACCESS.exists():
                size = upload_file(sftp, LOCAL_HTACCESS, f"{REMOTE_PUBLIC}/.htaccess")
                files += 1
                bytes_ += size
            print(f"Frontend uploaded: {files} files, {bytes_:,} bytes")

        if TARGET in {"full", "backend"}:
            print(f"Uploading backend -> {REMOTE_BACKEND}")
            files, bytes_ = upload_backend(sftp)
            print(f"Backend uploaded: {files} files, {bytes_:,} bytes")
    finally:
        sftp.close()

    if TARGET in {"full", "backend"}:
        run_migrate(client)

    client.close()
    print(f"Deploy complete ({TARGET}).")


if __name__ == "__main__":
    main()
