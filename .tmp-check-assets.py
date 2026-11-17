import re
import urllib.request

html = urllib.request.urlopen("https://solalaa.com/", timeout=30).read().decode("utf-8", "replace")
print("HTML length:", len(html))
assets = re.findall(r'(?:href|src)="([^"]+\.(?:css|js)[^"]*)"', html)
print("Asset refs:", len(assets))
for a in assets[:30]:
    url = a if a.startswith("http") else "https://solalaa.com/" + a.lstrip("/")
    try:
        req = urllib.request.Request(url, method="HEAD")
        with urllib.request.urlopen(req, timeout=20) as resp:
            print(resp.status, resp.headers.get("Content-Type"), url)
    except Exception as e:
        print("FAIL", url, e)

# also show stylesheet/link tags
for m in re.findall(r"<link[^>]+>", html)[:20]:
    print("LINK", m)
print("--- head snippet ---")
print(html[:2500])
