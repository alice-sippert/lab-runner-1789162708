set -euo pipefail
base='https://sap.rampf-group.com:8443'
work="${RUNNER_TEMP}/rampf-sap-behavior"
mkdir -p "$work"
encoded_paths=(
  '/'
  '/%69rj/%70ortal'
  '/%6ewa'
  '/%64evelopmentserver/%6detadatauploader'
  '/%73ap/%70ublic/%70ing'
)
index=0
for path in "${encoded_paths[@]}"; do
  index=$((index + 1))
  name=$(printf '%02d' "$index")
  echo "===== ${path} ====="
  curl --http2 --path-as-is -k -sS --connect-timeout 10 --max-time 30 \
    -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36' \
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
    -H 'Accept-Language: en-US,en;q=0.8' \
    -D "$work/${name}.headers" \
    "${base}${path}?gfr=$(date +%s%N)" \
    -o "$work/${name}.body" \
    2>"$work/${name}.error" || true
  cat "$work/${name}.headers" || true
  cat "$work/${name}.error" || true
  wc -c "$work/${name}.body" 2>/dev/null || true
  head -c 4000 "$work/${name}.body" 2>/dev/null || true
  echo
  sleep 1
done
echo '===== TLS ====='
echo | openssl s_client -connect sap.rampf-group.com:8443 -servername sap.rampf-group.com -showcerts 2>/dev/null | openssl x509 -noout -subject -issuer -serial -dates -ext subjectAltName || true
