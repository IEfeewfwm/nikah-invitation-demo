import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url)), prefix='/nikah-invitation-demo/';
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf'};
createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://localhost');let pathname=decodeURIComponent(url.pathname);
 if(pathname==='/'){res.writeHead(302,{Location:prefix});res.end();return;}
 if(pathname.startsWith(prefix))pathname='/'+pathname.slice(prefix.length);
 let file=resolve(root,'.'+pathname);
 if(file!==resolve(root)&&!file.startsWith(root)){res.writeHead(403);res.end();return;}
 if((await stat(file)).isDirectory())file=resolve(file,'index.html');
 res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(await readFile(file));
}catch{res.writeHead(404);res.end('Not found');}}).listen(4174,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4174'+prefix));
