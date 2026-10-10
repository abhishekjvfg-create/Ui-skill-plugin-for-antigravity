import * as fs from 'node:fs/promises';
import path from 'node:path';
import {root,files,digest} from '../skills/atlas-studio/scripts/lib/io.mjs';
const hashes={};for(const file of await files(root)){if(['resources/integrity.json','.atlas-install.json'].includes(file))continue;hashes[file]=digest(await fs.readFile(path.join(root,file)))}
await fs.writeFile(path.join(root,'resources/integrity.json'),JSON.stringify({schemaVersion:1,algorithm:'sha256',note:'Detects accidental local modification; not a cryptographic publisher signature.',files:hashes},null,2)+'\n');
console.log('Sealed',Object.keys(hashes).length,'skill files.');
