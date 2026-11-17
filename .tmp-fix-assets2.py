import paramiko

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
echo '---INDEX FILE TYPE---'
file $ROOT/index.html
ls -lah $ROOT/index.html
echo '---INDEX STRINGS---'
strings $ROOT/index.html | grep -oE 'assets/styles-[^\" ]+\.css' | head
strings $ROOT/index.html | grep -oE 'assets/index-[^\" ]+\.js' | head
echo '---LOOK FOR Dcb89---'
ls -lah $ROOT/assets/styles-Dcb89ZuA.css 2>&1
ls -lah $ROOT/assets/index-CZ6_3uzg.js 2>&1
echo '---LATEST ASSETS---'
ls -lt $ROOT/assets | head -30
echo '---COUNT ASSETS---'
ls $ROOT/assets | wc -l
"""
stdin, stdout, stderr = client.exec_command(cmd, timeout=60)
print(stdout.read().decode("utf-8", "replace"))
print(stderr.read().decode("utf-8", "replace"))
client.close()
