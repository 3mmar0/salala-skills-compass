import urllib.request

url = "https://solalaa.com/assets/styles-Dcb89ZuA.css"
data = urllib.request.urlopen(url, timeout=30).read()
print("bytes", len(data))
text = data.decode("utf-8", "replace")
print("start:", text[:400])
print("has @layer:", "@layer" in text)
print("has --forest:", "--forest" in text or "forest" in text[:2000])
print("has flex:", "flex" in text)
print("has body:", "body{" in text or "body {" in text)
print("tail:", text[-300:])

# compare local if exists
from pathlib import Path
local = list(Path(r"d:\dr-safaan\solala-project\.output\public\assets").glob("styles-*.css"))
print("local css files:", [p.name for p in local])
for p in local:
    print("local", p.name, p.stat().st_size)
