import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,dirname,sep} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=fileURLToPath(new URL('../',import.meta.url));
const html=await readFile(resolve(root,'index.html'),'utf8');
const script=await readFile(resolve(root,'script.js'),'utf8');
const css=await readFile(resolve(root,'styles.css'),'utf8');
let assets=0;
async function checkReference(file,reference){
 if(reference.startsWith('#')||/^(https?:|data:|mailto:|tel:)/i.test(reference))return;
 assert.ok(!reference.startsWith('/'),'Asset must use a repository-relative path: '+reference);
 const target=resolve(dirname(file),reference.split(/[?#]/)[0]);
 assert.ok(target.startsWith(root),'Asset escapes the project: '+reference);
 assert.ok((await stat(target)).isFile(),'Missing asset: '+reference);assets++;
}
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g))await checkReference(resolve(root,'index.html'),match[1]);
const fonts=await readFile(resolve(root,'assets/fonts.css'),'utf8');
for(const [name,content] of [['styles.css',css],['assets/fonts.css',fonts]])for(const match of content.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g))await checkReference(resolve(root,name),match[1]);
for(const file of ['config.js','script.js','sync-meta.mjs','scripts/build.mjs','scripts/check.mjs','scripts/serve.mjs']){
 const parsed=spawnSync(process.execPath,['--check',resolve(root,file)],{encoding:'utf8',windowsHide:true});assert.equal(parsed.status,0,parsed.stderr);
}
const context={window:{}};vm.runInNewContext(await readFile(resolve(root,'config.js'),'utf8'),context);const config=context.window.INVITATION_CONFIG;
assert.ok(Number.isFinite(new Date(config.date).getTime()),'Invalid event date');
assert.equal(config.siteUrl,'https://iefeewfwm.github.io/nikah-invitation-demo/');
assert.ok(html.includes(config.siteUrl+'assets/table.webp'),'Open Graph must use the public Pages image');
for(const section of ['invitation','details','schedule','location','rsvp'])assert.ok(html.includes(`id="${section}"`),'Missing section '+section);
for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(html.includes(`id="${match[1]}"`),'Broken anchor '+match[1]);
assert.ok(css.includes('prefers-reduced-motion'),'Reduced motion support missing');
assert.ok(!/chatgpt\.site|git\.chatgpt|hichunghihi|openai\/hosting/.test(html+script+css+fonts+JSON.stringify(config)),'Runtime still depends on previous hosting');
assert.ok(!/\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon/.test(script),'Unexpected transmission or browser storage in demo');
const forbidden=/(?:gh[pousr]_[A-Za-z0-9_]{30,}|github_pat_[A-Za-z0-9_]{40,}|art_v2_[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/;
async function scan(dir){for(const item of await readdir(dir,{withFileTypes:true})){if(item.name==='.git'||item.name==='node_modules')continue;const file=resolve(dir,item.name);if(item.isDirectory())await scan(file);else if(/\.(?:js|mjs|json|md|html|css|yml|yaml|txt)$/.test(item.name))assert.ok(!forbidden.test(await readFile(file,'utf8')),'Potential secret in '+file);}}
await scan(root);await stat(resolve(root,'.nojekyll'));
console.log(`PASS: ${assets} local asset references, JavaScript syntax, configuration, anchors, reduced motion, hosting independence and secret-pattern scan.`);
