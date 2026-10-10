import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {uiFamilies,styles,contexts,densities,motionNames,sceneLayouts,backgroundLayouts,treatments,keyframes,hsl,contrast,onColor} from '../skills/atlas-studio/scripts/lib/definitions.mjs';
const root=fileURLToPath(new URL('../skills/atlas-studio/',import.meta.url));
const put=async(name,data)=>writeFile(root+'resources/catalogs/'+name+'.json',JSON.stringify(data,null,2)+'\n');
await mkdir(root+'resources/catalogs',{recursive:true});
let source;
try{source=JSON.parse(await readFile(root+'resources/font-source.json','utf8')).familyMetadataList}catch{source=null}
if(source){
 const fonts=source.filter(f=>f.isOpenSource).sort((a,b)=>a.family.localeCompare(b.family,'en')).map((f,i)=>({id:`font-${String(i+1).padStart(4,'0')}`,family:f.family,category:f.category,subsets:f.subsets,weights:Object.keys(f.fonts),axes:f.axes,designers:f.designers,source:'https://fonts.google.com/specimen/'+encodeURIComponent(f.family),cssUrl:'https://fonts.googleapis.com/css2?family='+encodeURIComponent(f.family)+'&display=swap',license:'Per-family upstream license; font binaries not bundled',tags:[f.category,...f.subsets]}));
 await put('fonts',fonts);
}
const motions=[];
for(const kind of motionNames)for(const duration of [180,300,500,800,1200])for(const distance of [8,16,24,40,64]){
 const loop=['float','pulse','swing','orbit','rotate','bounce'].includes(kind);
 motions.push({id:`motion-${kind}-${duration}-${distance}`,kind,duration,distance,keyframes:keyframes(kind,distance),options:{duration,easing:'cubic-bezier(.22,1,.36,1)',iterations:loop?3:1,fill:'both'},reducedMotion:'Do not animate; leave final readable state',cost:['blur-in'].includes(kind)?'paint-heavy; use sparingly':'compositor-friendly where supported',tags:[kind,loop?'loop':'entrance','waapi']});
}
await put('motions',motions);
const scenes=[];
for(const layout of sceneLayouts)for(const treatment of treatments)scenes.push({id:`scene-${layout}-${treatment.id}`,layout,treatment,budget:{dpr:1.5,desktopDrawCalls:100,mobileDrawCalls:60},renderer:'three@0.180.0',quality:'Original procedural starter, not a photorealistic model or fluid simulation',fallback:'CSS product sculpture and semantic HTML; no WebGL required for content',tags:[layout,treatment.id,'threejs','3d',layout.includes('can')?'product':'sculpture']});
await put('scenes',scenes);
const backgrounds=[];
for(const layout of backgroundLayouts)for(const treatment of treatments)backgrounds.push({id:`background-${layout}-${treatment.id}`,layout,treatment,budget:{dpr:1.5,drawCalls:30},renderer:'three@0.180.0',quality:'Procedural 3D background preset; 12 base geometries × 10 material/color treatments',fallback:'Static CSS gradient; readable HTML and reduced-motion mode',tags:[layout,treatment.id,'background','threejs','3d']});
await put('backgrounds',backgrounds);
const ui=[];
for(const f of uiFamilies)for(const style of styles.slice(0,10))for(const density of densities)ui.push({id:`ui-${f.id}-${style.id}-${density.id}`,family:f.id,purpose:f.purpose,acceptance:f.acceptance,style,density,implementation:'Semantic HTML + CSS + native browser JavaScript',tags:[f.id,style.id,density.id,'ui']});
await put('ui',ui);
const structures=[];
for(const f of uiFamilies.slice(0,30))for(const style of styles)for(const context of contexts)structures.push({id:`structure-${f.id}-${style.id}-${context}`,family:f.id,style:style.id,context,purpose:f.purpose,files:['index.html','styles.css','interactions.js'],dataContract:{title:'string',description:'string',items:'array of domain records',status:'idle | loading | success | error'},acceptance:[f.acceptance,'No horizontal overflow at 360px','Show loading/error/empty states for connected data','Never fabricate real testimonials or sales claims'],workflow:context==='healthcare'?'accessibility':context==='finance'?'security':'art-direction',tags:[f.id,style.id,context,'code-structure']});
await put('structures',structures);
const palettes=[];
for(let hue=0;hue<360;hue+=3)for(let v=0;v<10;v++){
 const dark=v<5;const bg=hsl(hue,10+v, dark?7+v:96-(v-5));const surface=hsl(hue,12+v,dark?12+v:100-(v-5));const fg=dark?'#f9fafb':'#111827';const accent=hsl((hue+v*7)%360,50+v*4,dark?65:35);const muted=dark?'#cbd5e1':'#374151';
 palettes.push({id:`palette-${String(hue).padStart(3,'0')}-${v}`,mode:dark?'dark':'light',hue,tokens:{background:bg,surface,text:fg,muted,accent,onAccent:onColor(accent),secondary:hsl((hue+120)%360,45,dark?72:35)},contrast:{textOnBackground:+contrast(fg,bg).toFixed(2),textOnSurface:+contrast(fg,surface).toFixed(2),mutedOnSurface:+contrast(muted,surface).toFixed(2),button:+contrast(onColor(accent),accent).toFixed(2)},tags:[dark?'dark':'light',hue<60?'warm':hue<180?'natural':hue<270?'cool':'vivid']});
}
await put('palettes',palettes);
const counts={};for(const name of ['structures','motions','scenes','backgrounds','ui','palettes','fonts'])counts[name]=JSON.parse(await readFile(root+'resources/catalogs/'+name+'.json','utf8')).length;
await writeFile(root+'resources/counts.json',JSON.stringify({schemaVersion:1,generatedAt:'2026-10-09',nativeSkills:1,workflowModules:37,counts,baseFamilies:{structures:30,motions:24,scenes:12,backgrounds:12,ui:32,palettes:'120 hue anchors × 10 treatments'},methodology:'Deterministic parameterized recipes; not independently authored skills or unique finished designs. Fonts are real upstream metadata, not font binaries.',potentialUIThemeMotionCombinations:counts.ui*counts.palettes*counts.motions},null,2)+'\n');
console.log(counts);
