import {defineConfig,type Plugin} from 'vite'
import react from '@vitejs/plugin-react'
import {readdirSync,readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {resolve,relative} from 'node:path'
const publicFiles=(dir:string):string[]=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?publicFiles(resolve(dir,e.name)):[relative('public',resolve(dir,e.name)).replaceAll('\\','/')])
const offline=():Plugin=>({name:'cooking-offline',generateBundle:{order:'post',handler(_,bundle){
 const assets=publicFiles('public'),routes=['','prototypes/cooking-v2/','prototypes/cooking-v2/kitchen/','prototypes/cooking-v2/burger/','prototypes/cooking-v2/cupcake/','prototypes/cooking-v2/icecream/']
 const files=[...new Set([...routes.flatMap(r=>['./'+r,'./'+r+'index.html']),...assets.map(f=>'./'+f),...Object.keys(bundle).map(f=>'./'+f)])]
 const digest=createHash('sha256');for(const f of assets)digest.update(readFileSync(resolve('public',f)));for(const item of Object.values(bundle))digest.update(item.type==='chunk'?item.code:item.source);const version=digest.digest('hex').slice(0,16)
 this.emitFile({type:'asset',fileName:'sw.js',source:`const PREFIX='kids-cooking-studio:'+self.registration.scope+':';const CACHE=PREFIX+'${version}';const FILES=${JSON.stringify(files)};self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(self.registration.scope))return;e.respondWith(caches.open(CACHE).then(async c=>{const cached=await c.match(e.request,{ignoreVary:true});if(cached)return cached;try{return await fetch(e.request)}catch(error){if(e.request.mode==='navigate')return c.match('./index.html');throw error}}))});`})
}}})
export default defineConfig({base:'/kids-cooking-studio/',plugins:[react(),offline()],build:{rollupOptions:{input:{main:resolve('index.html'),cookingV2:resolve('prototypes/cooking-v2/index.html'),cookingKitchen:resolve('prototypes/cooking-v2/kitchen/index.html'),cookingBurger:resolve('prototypes/cooking-v2/burger/index.html'),cookingCupcake:resolve('prototypes/cooking-v2/cupcake/index.html'),cookingIcecream:resolve('prototypes/cooking-v2/icecream/index.html')}}}})
