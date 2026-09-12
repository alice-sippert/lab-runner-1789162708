const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const tests=[
 ['GET','/wp-json/elementor-one/v1/plugins'],
 ['POST','/wp-json/elementor-one/v1/plugins',{slug:'pojo-accessibility',status:'inactive'}],
 ['GET','/wp-json/elementor/v1/onboarding/install-pro'],
 ['POST','/wp-json/elementor/v1/onboarding/install-pro',{}],
 ['GET','/wp-json/wp-abilities/v1/abilities'],
 ['POST','/wp-json/wp-abilities/v1/abilities/core/get-site-info/run',{}],
 ['GET','/wp-content/plugins/elementor/readme.txt'],
 ['GET','/wp-content/plugins/elementor-pro/readme.txt'],
 ['GET','/wp-content/plugins/elementor-one/readme.txt'],
 ['GET','/wp-content/plugins/simple-history/readme.txt'],
 ['GET','/wp-content/plugins/custom-post-type-ui/readme.txt'],
 ['GET','/wp-content/plugins/cptui/readme.txt'],
 ['GET','/wp-content/plugins/unlimited-elements-for-elementor-premium/readme.txt'],
 ['GET','/wp-content/plugins/unlimited-elements-for-elementor-premium/unlimited_elements.php'],
];
console.log('LAB_IP',await fetch('https://api.ipify.org').then(r=>r.text()));
for(const [method,path,data] of tests){try{let opts={method,redirect:'manual',headers:{'user-agent':UA,'accept':'*/*'}};if(data!==undefined){opts.headers['content-type']='application/json';opts.body=JSON.stringify(data)}const r=await fetch('https://www.riseup.co.il'+path,opts);const b=await r.text();console.log('PROBE',JSON.stringify({method,path,status:r.status,len:b.length,ct:r.headers.get('content-type'),allow:r.headers.get('allow'),body:b.slice(0,1200)}));}catch(e){console.log('ERR',method,path,String(e))}}
