import * as fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {emit,scaffold} from '../skills/atlas-studio/scripts/lib/generate.mjs';
import {uiFamilies,sceneLayouts,backgroundLayouts} from '../skills/atlas-studio/scripts/lib/definitions.mjs';
const base=fileURLToPath(new URL('../generated-demo/',import.meta.url));
await fs.mkdir(base); // deliberately refuse an existing test output directory
for(const {id} of uiFamilies)await emit('ui',`ui-${id}-noir-balanced`,path.join(base,'ui-'+id));
for(const layout of sceneLayouts)await emit('scenes',`scene-${layout}-litchi`,path.join(base,'scene-'+layout));
for(const layout of backgroundLayouts)await emit('backgrounds',`background-${layout}-cobalt`,path.join(base,'background-'+layout));
await emit('motions','motion-rise-500-24',path.join(base,'motion'));
await scaffold(path.join(base,'site'),'Premium energy drink website');
const cli=fileURLToPath(new URL('../skills/atlas-studio/scripts/atlas.mjs',import.meta.url));const result=spawnSync(process.execPath,[cli,'gallery','--out',path.join(base,'gallery')],{encoding:'utf8'});if(result.status!==0)throw Error(result.stderr);
await fs.writeFile(path.join(base,'index.html'),'<h1>Atlas browser fixtures</h1><a href="site/">Product site</a> <a href="gallery/">Library</a>');
console.log(base);
