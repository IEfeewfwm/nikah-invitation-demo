import {writeFile,mkdir} from 'node:fs/promises';
await mkdir('assets/fonts',{recursive:true});
const url='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Manrope:wght@400;500;600&display=swap';
const res=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'}});
if(!res.ok)throw new Error(res.status);
let css=await res.text();
let index=0;
for(const match of [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(x=>x[1]))]){
 const r=await fetch(match);if(!r.ok)throw new Error(r.status);
 const file=`font-${index++}.${match.includes('.woff2')?'woff2':'ttf'}`;
 await writeFile('assets/fonts/'+file,Buffer.from(await r.arrayBuffer()));
 css=css.replaceAll(match,'./fonts/'+file);
}
await writeFile('assets/fonts.css',css);
for(const [name,folder] of [['cormorant','cormorantgaramond'],['manrope','manrope']]){
 const r=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${folder}/OFL.txt`);
 if(!r.ok)throw new Error(r.status);await writeFile(`assets/fonts/${name}-OFL.txt`,await r.text());
}
console.log(`Saved ${index} local font files and OFL licences`);

