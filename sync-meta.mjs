// Optional publishing step. No dependencies. Run from the project directory.
import {readFile,writeFile} from 'node:fs/promises';
import vm from 'node:vm';
import {existsSync} from 'node:fs';
const root=existsSync('dist/config.js')?'dist/':'';
const context={window:{}};vm.runInNewContext(await readFile(root+'config.js','utf8'),context);
const c=context.window.INVITATION_CONFIG;
const date=new Intl.DateTimeFormat('ru-RU',{timeZone:c.timeZone,day:'numeric',month:'long',year:'numeric'}).format(new Date(c.date)).replace(/\s*г\.$/,'');
const title=`${c.names.first} и ${c.names.second} — приглашение на никах · ${date}`;
const description=`${c.names.first} и ${c.names.second}. Приглашение на никах ${date}.`+(c.demo?' Вымышленное событие — демонстрация для портфолио.':'');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
let html=await readFile(root+'index.html','utf8');
html=html.replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`);
for(const [attribute,key,value] of [['name','description',description],['property','og:title',title],['property','og:description',description],['name','theme-color',c.palette.primary]])html=html.replace(new RegExp(`(<meta ${attribute}="${key}" content=")[^"]*(")`),(_,a,b)=>a+escape(value)+b);
if(c.siteUrl){const image=new URL(c.images.hero,c.siteUrl.replace(/\/?$/,'/')).href;html=html.replace(/(<meta property="og:image" content=")[^"]*(")/,(_,a,b)=>a+escape(image)+b);}
await writeFile(root+'index.html',html);console.log('SEO and Open Graph metadata synchronized from config.js.');
