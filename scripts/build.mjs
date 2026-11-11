// The production website is already static. Synchronize metadata, then validate.
// No dependencies, compilation or platform-specific publishing tools are needed.
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
for(const script of ['sync-meta.mjs','scripts/check.mjs']){
 const result=spawnSync(process.execPath,[script],{cwd:root,stdio:'inherit',windowsHide:true});
 if(result.status!==0)process.exit(result.status||1);
}
console.log('Production ready: publish the repository root unchanged.');
