import crypto from 'node:crypto';
const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const paths=[
'/wp-content/plugins/exclusive-addons-for-elementor/assets/img/placeholder.png',
'/wp-content/plugins/exclusive-addons-for-elementor/assets/css/exad-styles.min.css',
'/wp-content/plugins/exclusive-addons-for-elementor/assets/js/exad-scripts.min.js',
'/wp-content/plugins/exclusive-addons-for-elementor/assets/js/template-library.min.js',
'/wp-content/plugins/exclusive-addons-for-elementor/assets/js/unlimited-nested-section.min.js',
'/wp-content/plugins/exclusive-addons-for-elementor/assets/css/template-library.min.css',
'/wp-content/plugins/exclusive-addons-for-elementor/assets/fonts/feather-icon/exclusive-icons.js',
'/wp-content/plugins/exclusive-addons-for-elementor/assets/fonts/remix-icon/remix-icon.js',
'/wp-content/plugins/exclusive-addons-for-elementor/assets/fonts/teeny-icon/teeny-icon.js',
'/wp-content/plugins/exclusive-addons-for-elementor/readme.txt',
];
console.log('LAB_IP',await fetch('https://api.ipify.org').then(r=>r.text()).catch(e=>'ERR:'+e));
for(const path of paths){try{const r=await fetch('https://www.riseup.co.il'+path,{redirect:'manual',headers:{'user-agent':UA,'accept':'*/*'}});const b=Buffer.from(await r.arrayBuffer());console.log('ASSET',JSON.stringify({path,status:r.status,len:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex'),lm:r.headers.get('last-modified'),etag:r.headers.get('etag'),ct:r.headers.get('content-type'),head:b.toString('utf8',0,Math.min(500,b.length))}));}catch(e){console.log('ERR',path,String(e))}}
