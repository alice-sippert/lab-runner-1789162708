const ip = await fetch('https://api.ipify.org').then(r => r.text()).catch(e => 'ERR:'+e);
console.log('LAB_IP', ip);
const u = 'https://signup.riseup.co.il/flow/start/?ghprobe=' + (process.env.GITHUB_RUN_ID || Date.now());
try {
  const r = await fetch(u, {redirect:'manual', headers:{'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140 Safari/537.36'}});
  const b = Buffer.from(await r.arrayBuffer());
  console.log('TARGET_STATUS',r.status);
  console.log('TARGET_HEADERS',JSON.stringify(Object.fromEntries(r.headers)));
  console.log('TARGET_BODY_BASE64',b.toString('base64'));
} catch (e) { console.log('TARGET_ERROR', String(e), e?.cause); }
