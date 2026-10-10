import * as fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
export const root=fileURLToPath(new URL('../../',import.meta.url));
export const categories=['structures','motions','scenes','backgrounds','ui','palettes','fonts'];
export const json=async p=>JSON.parse(await fs.readFile(p,'utf8'));
export const catalog=async name=>{if(!categories.includes(name))throw new Error('Category must be '+categories.join(', '));return json(path.join(root,'resources/catalogs',name+'.json'))};
export const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
export async function noSymlinks(target){let current=path.resolve(target);for(;;){try{const s=await fs.lstat(current);if(s.isSymbolicLink())throw new Error('Refusing symbolic-link path: '+current)}catch(e){if(e.code!=='ENOENT')throw e}const parent=path.dirname(current);if(parent===current)break;current=parent}}
export async function freshDirectory(out){const full=path.resolve(out);await noSymlinks(full);if(full===path.parse(full).root)throw new Error('Refusing filesystem root');await fs.mkdir(path.dirname(full),{recursive:true});await fs.mkdir(full);return full}
export async function writeNew(file,text){await noSymlinks(file);await fs.mkdir(path.dirname(path.resolve(file)),{recursive:true});await fs.writeFile(file,text,{flag:'wx'})}
export async function files(dir,prefix=''){const entries=await fs.readdir(dir,{withFileTypes:true});const result=[];for(const e of entries.sort((a,b)=>a.name<b.name?-1:1)){if(e.isSymbolicLink())throw new Error('Symlink not allowed: '+e.name);const rel=prefix+e.name;if(e.isDirectory())result.push(...await files(path.join(dir,e.name),rel+'/'));else if(e.isFile())result.push(rel)}return result}
export function within(base,relative){if(typeof relative!=='string'||!relative||relative.includes('\\')||path.isAbsolute(relative))throw new Error('Invalid relative path');const target=path.resolve(base,relative);const rel=path.relative(path.resolve(base),target);if(rel==='..'||rel.startsWith('..'+path.sep)||path.isAbsolute(rel))throw new Error('Path escapes root');return target}
export async function verify(){const manifest=await json(path.join(root,'resources/integrity.json'));let checked=0;const errors=[];for(const [file,hash] of Object.entries(manifest.files)){try{const target=within(root,file);await noSymlinks(target);if(digest(await fs.readFile(target))!==hash)errors.push('Modified: '+file);checked++}catch(e){errors.push(file+': '+e.message)}}const expected=new Set([...Object.keys(manifest.files),'resources/integrity.json','.atlas-install.json']);for(const file of await files(root))if(!expected.has(file))errors.push('Unexpected: '+file);return {ok:errors.length===0,checked,errors}}
export function parse(args){const flags={},pos=[];for(let i=0;i<args.length;i++){const a=args[i];if(a.startsWith('--')){const k=a.slice(2);if(!k||Object.hasOwn(flags,k))throw new Error('Invalid or duplicate option '+a);if(['help','json','yes','dry-run'].includes(k))flags[k]=true;else{if(!args[i+1]||args[i+1].startsWith('--'))throw new Error('Missing value for '+a);flags[k]=args[++i]}}else pos.push(a)}return {flags,pos}}
export function allowed(flags,names){for(const k of Object.keys(flags))if(!names.includes(k))throw new Error('Unknown option --'+k)}
