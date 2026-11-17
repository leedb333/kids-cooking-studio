import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import assert from 'node:assert/strict';
const base='/kids-cooking-studio/',sw=fs.readFileSync('dist/sw.js','utf8');let files;
vm.runInNewContext(sw,{self:{registration:{scope:'https://leedb333.github.io'+base},addEventListener(){}},capture:f=>files=f});
files=JSON.parse(sw.match(/const FILES=(\[[^;]+\]);/)[1]);
for(const f of files){const p=path.join('dist',decodeURI(f));assert(fs.existsSync(p),'missing cached '+f)}
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
for(const f of walk('dist')){assert(files.includes('./'+path.relative('dist',f).replaceAll('\\','/'))||f.endsWith('sw.js'),'not precached '+f);if(f.endsWith('.html')){const html=fs.readFileSync(f,'utf8');assert(!html.includes('/kids-game-playground/'));for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const url=m[1];if(url.startsWith(base))assert(fs.existsSync('dist/'+url.slice(base.length)),'missing HTML asset '+url)}}}
const m=JSON.parse(fs.readFileSync('dist/manifest.webmanifest'));for(const k of ['id','start_url','scope'])assert.equal(m[k],base);assert(sw.includes("PREFIX='kids-cooking-studio:'"));assert(!sw.includes('localStorage'));assert(!sw.includes('kids-playground-'));
console.log(JSON.stringify({base,cacheFiles:files.length,manifest:m.name,scope:m.scope,checked:'all emitted files, HTML paths and app-isolated cache'},null,2));
