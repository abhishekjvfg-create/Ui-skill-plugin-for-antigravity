#!/usr/bin/env node
// Cross-platform, project-scoped installer. Never edits global client settings.
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {root,parse,allowed,verify,files,digest,noSymlinks,within,json} from '../skills/atlas-studio/scripts/lib/io.mjs';
const marker='.atlas-install.json';
export async function install(workspace,{yes=false,dryRun=false}={}){
 const base=path.resolve(workspace);await noSymlinks(base);
 if(!(await fs.stat(base)).isDirectory())throw Error('Workspace must be an existing directory');
 const dest=path.join(base,'.agents','skills','atlas-studio');await noSymlinks(dest);
 const integrity=await verify();if(!integrity.ok)throw Error('Source integrity failed: '+integrity.errors.join('; '));
 const sourceFiles=await files(root);const hashes={};for(const f of sourceFiles){if(f===marker)continue;hashes[f]=digest(await fs.readFile(within(root,f)))}
 let existing=false;try{await fs.stat(dest);existing=true}catch(e){if(e.code!=='ENOENT')throw e}
 if(existing){
  const current=await files(dest);let same=current.length===Object.keys(hashes).length+1;
  if(!current.includes(marker))same=false;
  for(const f of Object.keys(hashes)){try{if(digest(await fs.readFile(within(dest,f)))!==hashes[f])same=false}catch{same=false}}
  if(same)return {status:'already-installed',destination:dest};
  throw Error('Destination exists or has changes. Back up your edits, then use safe uninstall or a different workspace. Nothing overwritten.');
 }
 if(dryRun||!yes)return {status:'dry-run',destination:dest,files:Object.keys(hashes).length,next:'Review source, then repeat with --yes. No files changed.'};
 await fs.mkdir(path.dirname(dest),{recursive:true});await fs.mkdir(dest);
 // On failure keep the partial directory for inspection; never erase user data.
 for(const f of Object.keys(hashes)){const target=within(dest,f);await fs.mkdir(path.dirname(target),{recursive:true});await fs.copyFile(within(root,f),target,fs.constants.COPYFILE_EXCL)}
 await fs.writeFile(path.join(dest,marker),JSON.stringify({package:'atlas-studio',version:'1.0.0',files:hashes},null,2)+'\n',{flag:'wx'});
 return {status:'installed',destination:dest,next:'Open this workspace in Antigravity CLI (agy), run /skills, and verify atlas-studio is listed.'};
}
export async function uninstall(workspace,{yes=false,dryRun=false}={}){
 const dest=path.join(path.resolve(workspace),'.agents','skills','atlas-studio');await noSymlinks(dest);
 const receipt=await json(path.join(dest,marker));if(receipt.package!=='atlas-studio'||!receipt.files||typeof receipt.files!=='object')throw Error('Not a recognized Atlas installation');
 const actual=await files(dest),expected=new Set([...Object.keys(receipt.files),marker]);
 if(actual.some(f=>!expected.has(f)))throw Error('Untracked files in installation. Refusing removal; back them up first.');
 for(const [f,hash] of Object.entries(receipt.files)){const target=within(dest,f);await noSymlinks(target);if(digest(await fs.readFile(target))!==hash)throw Error('Modified file; refusing removal: '+f)}
 if(dryRun||!yes)return {status:'dry-run',destination:dest,next:'Repeat uninstall with --yes to remove unchanged owned files only.'};
 // Validate the complete tree before deleting anything. Remove only listed files,
 // then empty directories. No recursive force deletion and no other skill touched.
 for(const f of Object.keys(receipt.files))await fs.unlink(within(dest,f));await fs.unlink(path.join(dest,marker));
 async function empty(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){if(!e.isDirectory())throw Error('Unexpected file appeared during removal');await empty(path.join(dir,e.name))}await fs.rmdir(dir)}await empty(dest);
 return {status:'uninstalled',destination:dest};
}
export async function main(args=process.argv.slice(2)){
 const {flags:f,pos}=parse(args);allowed(f,['workspace','yes','dry-run','help']);
 if(f.help){console.log('node scripts/install.mjs [install|uninstall] --workspace "/absolute/project" [--dry-run | --yes]\nDefault is dry-run. Workspace must exist. No overwrite or global installation.');return}
 if(!f.workspace)throw Error('--workspace is required');if(f.yes&&f['dry-run'])throw Error('Choose --yes OR --dry-run');
 const action=pos[0]||'install';if(!['install','uninstall'].includes(action)||pos.length>1)throw Error('Expected install or uninstall');
 console.log(JSON.stringify(await (action==='install'?install:uninstall)(f.workspace,{yes:!!f.yes,dryRun:!!f['dry-run']}),null,2));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(e=>{console.error('Atlas installer: '+e.message);process.exitCode=1});
