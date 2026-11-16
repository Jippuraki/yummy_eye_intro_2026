#!/bin/bash
# 서체 서브셋 만들기: 페이지에 쓰인 글자만 남겨 fonts/*.woff로 저장 (원본 약 1.1MB → 수십 KB)
# 사용: bash tools/subset-fonts.sh <Taste Test 저장소 경로>/assets/fonts
# 필요: pip install fonttools  · 글을 고친 뒤 다시 실행한다.
set -e
SRC="${1:?원본 폰트 폴더 경로를 주세요}"
cd "$(dirname "$0")/.."
python3 - > /tmp/ye-chars.txt <<'PY'
import re
s=set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,!?·'\"-–:()/&|+%#")
for f in ["index.html","js/site.js","data/models.js"]:
    t=open(f,encoding="utf8").read()
    t=re.sub(r"<[^>]+>"," ",t) if f.endswith(".html") else t
    s|=set(t)
print("".join(sorted(c for c in s if not c.isspace() or c==" ")))
PY
pyftsubset "$SRC/ChaiHwaljjak-Medium.woff" --text-file=/tmp/ye-chars.txt --flavor=woff --output-file=fonts/display-500.woff
pyftsubset "$SRC/ChaiHwaljjak-Heavy.woff"  --text-file=/tmp/ye-chars.txt --flavor=woff --output-file=fonts/display-900.woff
pyftsubset "$SRC/770Balsa.woff"            --text-file=/tmp/ye-chars.txt --flavor=woff --output-file=fonts/script.woff
ls -la fonts
