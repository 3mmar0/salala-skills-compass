import paramiko
from pathlib import Path

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
echo '---INDEX HEX---'
xxd $ROOT/index.html | head -3
echo '---ROOT JS---'
xxd $ROOT/assets/root-DLTE-HSj.js | head -5
wc -c $ROOT/assets/root-DLTE-HSj.js
cat $ROOT/assets/root-DLTE-HSj.js
echo
echo '---CSS HEAD---'
head -c 120 $ROOT/assets/styles-Dcb89ZuA.css; echo
echo '---TINY JS FILES---'
find $ROOT/assets -name '*.js' -size -100c -printf '%s %p\n' | head -40
"""
stdin, stdout, stderr = client.exec_command(cmd, timeout=60)
print(stdout.read().decode("utf-8", "replace"))

local = Path(r"d:\dr-safaan\solala-project\.output\public")
if local.exists():
    print("LOCAL index", (local/"index.html").stat().st_size if (local/"index.html").exists() else None)
    for p in (local/"assets").glob("root-*.js"):
        print("LOCAL", p.name, p.stat().st_size, p.read_text(encoding="utf-8", errors="replace")[:80])
    for p in (local/"assets").glob("styles-*.css"):
        print("LOCAL", p.name, p.stat().st_size)
client.close()
