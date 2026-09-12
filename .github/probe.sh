set -euxo pipefail
for h in https://www.riseup.co.il/ https://signup.riseup.co.il/ https://external.riseup.co.il/external/fair https://jenkins.riseup.co.il/ https://global.riseup.co.il/ https://bastion.riseup.co.il/; do
 echo "===== $h ====="
 curl -ksS -L --connect-timeout 5 --max-time 20 -D - "$h" -o /tmp/b || true
 wc -c /tmp/b 2>/dev/null || true
 head -c 500 /tmp/b 2>/dev/null || true; echo
 done
