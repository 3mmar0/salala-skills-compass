import paramiko
import urllib.request

# 1) Accept header experiment
for accept in ["*/*", "text/css,*/*;q=0.1", "text/html,application/xhtml+xml"]:
    req = urllib.request.Request(
        "https://solalaa.com/assets/styles-Dcb89ZuA.css",
        headers={"User-Agent": "Mozilla/5.0", "Accept": accept, "Accept-Encoding": "gzip, deflate, br"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
        ctype = resp.headers.get("Content-Type")
        cache = resp.headers.get("x-hcdn-cache-status")
        print(f"Accept={accept!r} -> {ctype} len={len(data)} cache={cache} start={data[:40]!r}")

# 2) SSH: list assets and confirm css on disk
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(
    "82.198.227.107",
    port=65002,
    username="u979488166",
    password="Tabeeb---123",
    timeout=45,
    banner_timeout=60,
    allow_agent=False,
    look_for_keys=False,
)
cmd = r"""
ROOT=~/domains/solalaa.com/public_html
echo '---CSS FILES---'
ls -lah $ROOT/assets/styles-*.css 2>/dev/null | head
echo '---INDEX REF---'
grep -oE 'assets/styles-[^\" ]+\.css' $ROOT/index.html | head
echo '---HTACCESS---'
cat $ROOT/.htaccess
echo '---FILE EXISTS?---'
CSS=$(grep -oE 'assets/styles-[^\" ]+\.css' $ROOT/index.html | head -1)
echo ref=$CSS
ls -lah $ROOT/$CSS
file $ROOT/$CSS
head -c 80 $ROOT/$CSS; echo
"""
stdin, stdout, stderr = client.exec_command(cmd, timeout=60)
print(stdout.read().decode("utf-8", "replace"))
print(stderr.read().decode("utf-8", "replace"))
client.close()
