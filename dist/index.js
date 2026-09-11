const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
async function get(path){
 const r=await fetch('https://www.riseup.co.il'+path,{redirect:'manual',headers:{'user-agent':UA,'accept':'text/html,*/*'}});
 const t=await r.text();
 const urls=[...new Set([...t.matchAll(/(?:href|src)=["']([^"']+)["']/gi)].map(x=>x[1]).filter(x=>/wp-content\/plugins|exclusive|unlimited-elements/i.test(x)))];
 const snippets=[];
 for(const re of [/exclusive-addons-for-elementor/gi,/exad[-_a-z0-9]*/gi,/ucaddon[-_a-z0-9]*/gi,/data-widget_type=["'][^"']+/gi,/data-element_type=["'][^"']+/gi]){
  for(const m of t.matchAll(re)){const a=Math.max(0,m.index-140),b=Math.min(t.length,m.index+360);snippets.push(t.slice(a,b).replace(/\s+/g,' ')); if(snippets.length>160)break;}
 }
 console.log('PAGE',JSON.stringify({path,status:r.status,len:t.length,urls:urls.slice(0,400),snippets:[...new Set(snippets)].slice(0,160)}));
}
console.log('LAB_IP',await fetch('https://api.ipify.org').then(r=>r.text()).catch(e=>'ERR:'+e));
for(const p of ['/vouchers/','/wp-json/wp/v2/pages/12488?_fields=id,slug,status,link,content,template']) await get(p);
