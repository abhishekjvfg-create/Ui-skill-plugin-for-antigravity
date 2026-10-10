// Reproducible dependency-free ZIP writer (deflate, UTF-8 names, CRC32).
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {deflateRawSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {verify} from '../skills/atlas-studio/scripts/lib/io.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const target=path.resolve(root,'../atlas-studio-v1.0.0.zip');
if(!(await verify()).ok)throw Error('Run npm run seal and npm run verify before packaging');
const table=Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0});
const crc=bytes=>{let c=0xffffffff;for(const b of bytes)c=table[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0};
const entries=[];async function walk(dir,prefix=''){for(const e of (await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name<b.name?-1:1)){if(['node_modules','.git','.test-tmp','generated-demo','generated-gallery'].includes(e.name)||e.name.startsWith('.tmp-')||/\.(zip|log)$/.test(e.name)||/^\.env|^\.dev\.vars/.test(e.name))continue;if(e.isSymbolicLink())throw Error('No symlinks in release');const rel=prefix+e.name;if(e.isDirectory())await walk(path.join(dir,e.name),rel+'/');else if(e.isFile())entries.push({name:rel,body:await fs.readFile(path.join(dir,e.name))})}}
await walk(root);if(entries.length>65535)throw Error('ZIP64 not supported');
let offset=0;const local=[],central=[];const dosDate=((2026-1980)<<9)|(10<<5)|9;
for(const e of entries){const name=Buffer.from(e.name),body=deflateRawSync(e.body,{level:9}),sum=crc(e.body);const h=Buffer.alloc(30);h.writeUInt32LE(0x04034b50);h.writeUInt16LE(20,4);h.writeUInt16LE(0x800,6);h.writeUInt16LE(8,8);h.writeUInt16LE(dosDate,12);h.writeUInt32LE(sum,14);h.writeUInt32LE(body.length,18);h.writeUInt32LE(e.body.length,22);h.writeUInt16LE(name.length,26);local.push(h,name,body);const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(0x800,8);c.writeUInt16LE(8,10);c.writeUInt16LE(dosDate,14);c.writeUInt32LE(sum,16);c.writeUInt32LE(body.length,20);c.writeUInt32LE(e.body.length,24);c.writeUInt16LE(name.length,28);c.writeUInt32LE(offset,42);central.push(c,name);offset+=h.length+name.length+body.length}
const center=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(entries.length,8);end.writeUInt16LE(entries.length,10);end.writeUInt32LE(center.length,12);end.writeUInt32LE(offset,16);const zip=Buffer.concat([...local,center,end]);await fs.writeFile(target,zip);const hash=createHash('sha256').update(zip).digest('hex');await fs.writeFile(target+'.sha256',hash+'  '+path.basename(target)+'\n');console.log(JSON.stringify({file:target,files:entries.length,bytes:zip.length,sha256:hash},null,2));
