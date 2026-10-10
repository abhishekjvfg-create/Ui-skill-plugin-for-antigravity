#!/usr/bin/env node
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {createServer} from 'node:http';
import {pathToFileURL} from 'node:url';
import {parse,allowed,catalog,categories,root,json,verify,files,noSymlinks,within,freshDirectory,writeNew} from './lib/io.mjs';
import {emit,scaffold,makePlan,find} from './lib/generate.mjs';
const help=`Atlas Studio 1.0 — Node.js 22+; no npm install required

node <skill-dir>/scripts/atlas.mjs COMMAND [options]
  stats                              Honest counts and construction methodology
  search <category> <words...>        --limit 1..100 (default 12) --json
  show <category> <id>                Print the complete recipe
  plan --prompt "brief"              --out new-plan.json (optional)
  scaffold --out new-directory       --prompt "brief" [--scene scene-or-background-id]
  emit <category> <id> --out new-dir  Runnable ui/structures/motions/scenes/backgrounds
  tokens <palette-id>                Print CSS custom properties
  gallery --out new-directory        Build searchable offline metadata browser
  serve --dir generated-directory    Loopback-only preview; --port 3000
  audit --dir project-directory      Heuristic source checks, not full QA
  graphic --kind orbit --out art.svg --seed 1 (orbit, grid, waves, petals)
  stitch --prompt "brief"            Print a native Stitch MCP handoff brief
  doctor                             Verify skill file hashes and catalog counts

Categories: structures, motions, scenes, backgrounds, ui, palettes, fonts
Output paths must not exist. No overwrite flag, no telemetry, no paid calls.
serve is a local developer utility, not a production web server.
`;
function print(x){console.log(typeof x==='string'?x:JSON.stringify(x,null,2))}
async function gallery(out){const dir=await freshDirectory(out);await fs.mkdir(path.join(dir,'lib'));await fs.cp(path.join(root,'resources/catalogs'),path.join(dir,'catalogs'),{recursive:true});for(const n of ['gallery.html','gallery.css','gallery.js','scene.js','interactions.js'])await fs.copyFile(path.join(root,'templates',n),path.join(dir,n==='gallery.html'?'index.html':n));for(const n of ['ui.mjs','definitions.mjs'])await fs.copyFile(path.join(root,'scripts/lib',n),path.join(dir,'lib',n));return dir}
export async function serve(dir,port=3000){
 const base=path.resolve(dir);await noSymlinks(base);if(!(await fs.stat(base)).isDirectory())throw Error('Preview directory required');
 const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.glb':'model/gltf-binary'};
 const server=createServer(async(req,res)=>{try{if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end()}const host=req.headers.host||'';if(!new RegExp(`^(127\\.0\\.0\\.1|localhost):${server.address().port}$`).test(host)){res.writeHead(403);return res.end('Invalid host')}let relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '')||'index.html';if(relative.includes('\0')||relative.split('/').some(x=>x.startsWith('.'))){res.writeHead(403);return res.end('Forbidden')}let target=within(base,relative);await noSymlinks(target);if((await fs.stat(target)).isDirectory())target=path.join(target,'index.html');await noSymlinks(target);const ext=path.extname(target);if(!mime[ext]){res.writeHead(403);return res.end('File type not served')}const bytes=await fs.readFile(target);res.writeHead(200,{'Content-Type':mime[ext],'X-Content-Type-Options':'nosniff','Cache-Control':'no-store','Access-Control-Allow-Origin':'*','Referrer-Policy':'no-referrer'});res.end(req.method==='HEAD'?undefined:bytes)}catch{res.writeHead(404);res.end('Not found')}});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve)});return server;
}
async function audit(dir){const base=path.resolve(dir);await noSymlinks(base);const findings=[];let checked=0;async function walk(d,depth=0){if(depth>12)return;for(const e of await fs.readdir(d,{withFileTypes:true})){if(e.name.startsWith('.')||['node_modules','vendor','dist','coverage'].includes(e.name)||e.isSymbolicLink())continue;const p=path.join(d,e.name);if(e.isDirectory()){await walk(p,depth+1);continue}if(!/\.(html|css|m?js|tsx?|jsx)$/.test(e.name))continue;if((await fs.stat(p)).size>1_000_000)continue;const text=await fs.readFile(p,'utf8');checked++;const add=(rule,message)=>findings.push({file:path.relative(base,p),rule,message});if(/\.html$/.test(p)){if(!/<html[^>]+lang=/i.test(text))add('language','Missing HTML language attribute');if(!/name=["']viewport["']/i.test(text))add('viewport','Missing viewport meta');if(!/<title>[\s\S]+?<\/title>/i.test(text))add('title','Missing document title');for(const m of text.matchAll(/<img\b[^>]*>/gi))if(!/\balt\s*=/i.test(m[0]))add('alt','Image without an alt attribute');if(/href=["']#["']/i.test(text))add('dead-anchor','Placeholder hash link found')}if(/\beval\s*\(|new Function\s*\(/.test(text))add('dynamic-eval','Review dynamic code execution');if(/\.innerHTML\s*=/.test(text))add('html-injection','Review innerHTML inputs and escaping; heuristic, not a proven vulnerability');if(/(?:api[_-]?key|secret)\s*[:=]\s*["'][A-Za-z0-9_-]{24,}/i.test(text))add('possible-secret','Possible embedded credential; inspect privately, never print the value')}}await walk(base);return {checked,findings,scope:'Heuristic static advisory only. Does not prove security, accessibility, correctness or visual quality.',next:['Run the project test suite','Exercise flows with keyboard and assistive technology','Inspect browser console and network','Capture responsive/reduced-motion/fallback screenshots']}}
function graphic(kind,seed){if(!['orbit','grid','waves','petals'].includes(kind))throw Error('Graphic kind must be orbit, grid, waves or petals');let state=seed>>>0;const rand=()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296};const hue=Math.floor(rand()*360),a=`hsl(${hue} 70% 72%)`,b=`hsl(${(hue+90)%360} 60% 70%)`;let shapes='';for(let i=0;i<24;i++){if(kind==='orbit')shapes+=`<ellipse cx="600" cy="400" rx="${80+i*12}" ry="${45+i*7}" transform="rotate(${i*7} 600 400)" fill="none" stroke="${i%2?a:b}" stroke-opacity=".65"/>`;if(kind==='grid')shapes+=`<rect x="${120+(i%6)*164}" y="${80+Math.floor(i/6)*164}" width="140" height="140" rx="${Math.round(rand()*55)}" fill="${i%2?a:b}" opacity="${.3+rand()*.6}"/>`;if(kind==='waves')shapes+=`<path d="M 0 ${100+i*22} C 300 ${-100+i*22}, 700 ${900-i*12}, 1200 ${100+i*22}" stroke="${i%2?a:b}" stroke-width="3" fill="none"/>`;if(kind==='petals')shapes+=`<ellipse cx="600" cy="285" rx="${35+rand()*25}" ry="155" transform="rotate(${i*15} 600 400)" fill="none" stroke="${i%2?a:b}" stroke-width="2"/>`}return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-labelledby="title"><title id="title">Original ${kind} composition, seed ${seed}</title><rect width="1200" height="800" fill="#101114"/>${shapes}</svg>\n`}
export async function main(args=process.argv.slice(2)){
 const {flags:f,pos}=parse(args),[cmd,...rest]=pos;
 if(f.help||!cmd||cmd==='help'){print(help);return}
 if(cmd==='stats'){allowed(f,[]);print(await json(path.join(root,'resources/counts.json')))}
 else if(cmd==='doctor'){allowed(f,[]);const result=await verify(),stats=await json(path.join(root,'resources/counts.json'));for(const c of categories)if((await catalog(c)).length!==stats.counts[c])result.errors.push('Count mismatch: '+c);result.ok=!result.errors.length;print({...result,node:process.versions.node,nativeAntigravity:'Not automatically verified; open agy and use /skills',stitch:'Optional native MCP setup required; not connected by this command'});if(!result.ok)process.exitCode=1}
 else if(cmd==='search'){allowed(f,['limit','json']);const [cat,...words]=rest,limit=Number(f.limit||12);if(!Number.isInteger(limit)||limit<1||limit>100)throw Error('limit must be 1..100');const terms=words.join(' ').toLowerCase().split(/\s+/).filter(Boolean);const result=(await catalog(cat)).filter(r=>terms.every(t=>JSON.stringify(r).toLowerCase().includes(t))).map(r=>({r,score:terms.reduce((s,t)=>s+(r.id.toLowerCase().includes(t)?5:1),0)})).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.r);print(f.json?result:result.map(r=>`${r.id} | ${r.purpose||r.family||r.layout||r.kind||r.mode}`).join('\n')||'No matching recipes.')}
 else if(cmd==='show'){allowed(f,[]);print(await find(rest[0],rest[1]))}
 else if(cmd==='plan'){allowed(f,['prompt','out']);if(!f.prompt)throw Error('--prompt required');const plan=await makePlan(f.prompt);if(f.out)await writeNew(f.out,JSON.stringify(plan,null,2)+'\n');print(plan)}
 else if(cmd==='scaffold'){allowed(f,['out','prompt','scene']);if(!f.out||!f.prompt)throw Error('--out and --prompt required');print(await scaffold(f.out,f.prompt,f.scene))}
 else if(cmd==='emit'){allowed(f,['out','title']);if(!f.out)throw Error('--out required');print(await emit(rest[0],rest[1],f.out,f.title))}
 else if(cmd==='tokens'){allowed(f,[]);const row=await find('palettes',rest[0]);print(':root {\n'+Object.entries(row.tokens).map(([k,v])=>`  --${k.replace(/[A-Z]/g,x=>'-'+x.toLowerCase())}: ${v};`).join('\n')+'\n}')}
 else if(cmd==='gallery'){allowed(f,['out']);if(!f.out)throw Error('--out required');print(await gallery(f.out))}
 else if(cmd==='serve'){allowed(f,['dir','port']);if(!f.dir)throw Error('--dir required');const port=Number(f.port||3000);if(!Number.isInteger(port)||port<1024||port>65535)throw Error('Port must be 1024..65535');await serve(f.dir,port);print(`Preview: http://127.0.0.1:${port} (Ctrl+C to stop)`)}
 else if(cmd==='audit'){allowed(f,['dir']);if(!f.dir)throw Error('--dir required');print(await audit(f.dir))}
 else if(cmd==='graphic'){allowed(f,['kind','out','seed']);if(!f.out)throw Error('--out required');const seed=Number(f.seed||1);if(!Number.isSafeInteger(seed)||seed<0)throw Error('seed must be a non-negative integer');await writeNew(f.out,graphic(f.kind||'orbit',seed));print(path.resolve(f.out))}
 else if(cmd==='stitch'){allowed(f,['prompt']);if(!f.prompt)throw Error('--prompt required');print({brief:f.prompt,provider:'Google Stitch via native authenticated MCP tools',action:'Discover available tools; inspect their current schemas; ask permission before generation. Do not invent tool names.',deliverables:['Desktop and mobile screen designs','Color, type, spacing and radius tokens','Exportable code/assets when the connected tool supports export'],constraints:['No paid generation without approval','Never expose keys in frontend code or Git','Treat generated HTML as untrusted input','Do not claim premium image generation is available unless the actual tool schema supports it','Fallback to local original assets when unavailable'],setup:'See resources/workflows/stitch.md and https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch'})}
 else throw Error('Unknown command: '+cmd+'; use --help');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(e=>{console.error('Atlas: '+e.message);process.exitCode=1});
