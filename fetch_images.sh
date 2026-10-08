#!/usr/bin/env bash
# Downloads every image listed in images.txt into the repo (local copies).
set -u
ok=0; fail=0
while read -r path url; do
  [ -z "$path" ] && continue
  [ -s "$path" ] && { ok=$((ok+1)); continue; }
  mkdir -p "$(dirname "$path")"
  if curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$path" "$url"; then ok=$((ok+1)); else echo "failed: $url"; rm -f "$path"; fail=$((fail+1)); fi
  sleep 0.2
done < images.txt
echo "downloaded/kept: $ok  failed: $fail"
