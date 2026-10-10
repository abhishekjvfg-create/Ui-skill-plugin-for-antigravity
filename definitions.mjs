// Original design primitives. Large catalogs are explicit parameter combinations,
// not a claim of thousands of independently authored skills.
export const uiFamilies = [
  ['hero','A single clear promise with two meaningful next actions','One h1; preserve reading order and keep CTA visible at 360px'],
  ['navigation','Responsive site navigation using a native disclosure','Keyboard open/close; no hover-only links'],
  ['features','Benefit-led three-column feature grid','One column on narrow screens; descriptive headings'],
  ['pricing','Transparent pricing with a monthly/yearly toggle','Announce price changes; label example pricing as demo'],
  ['testimonials','Attributed customer quote cards','Use fictional demo names; never fabricate real endorsements'],
  ['faq','Native details/summary accordion','Keyboard and screen-reader operation without JavaScript'],
  ['contact','Validated contact form with honest demo feedback','Do not claim messages were sent without a backend'],
  ['newsletter','Email subscription form with local demo status','Explain that data is not transmitted or retained'],
  ['product','Accessible product card with quantity selection','Show live subtotal; minimum quantity one'],
  ['gallery','Responsive visual gallery with native dialog zoom','Accessible dialog name; restore trigger focus'],
  ['tabs','Tabbed product information','Roving tabindex; arrows, Home and End; one selected tab'],
  ['modal','Confirmable native dialog example','Escape closes; cancel and confirm paths exist'],
  ['toast','Polite status feedback without blocking UI','Use role=status; do not announce repeatedly'],
  ['search','Client-side filtering of a labeled item list','Announce result count and expose empty state'],
  ['table','Sortable accessible data table','Buttons in headers; maintain aria-sort'],
  ['stats','Readable KPI cards and measurement disclaimers','No fake business claims; explain units'],
  ['timeline','Ordered milestone narrative','Use ordered list; maintain chronological reading order'],
  ['steps','Three-step process explanation','Represent steps as an ordered list'],
  ['team','Fictional team profile cards','No invented real identities; decorative avatars'],
  ['footer','Useful footer with real section anchors','Every link resolves; include visible ownership copy'],
  ['breadcrumbs','Navigational hierarchy','aria-current=page on the current crumb'],
  ['pagination','Paginated local sample records','Disabled bounds; announce current page'],
  ['empty','Actionable empty state','Explain absence and offer a working reset/add action'],
  ['error','Recoverable error state','Retry has a deterministic demonstration outcome'],
  ['loading','Controllable loading-state demonstration','No indefinite animation; user can stop loading'],
  ['progress','Accessible range-driven progress','Native progress element with text percentage'],
  ['stepper','Multi-step form with validation','Validate before next; back preserves entered data'],
  ['upload','Local file metadata preview, no upload','Do not read or send contents; allow clearing selection'],
  ['command','Filterable command palette in a dialog','Keyboard focus, close control and meaningful actions'],
  ['comparison','Plan comparison table','Use row/column headers rather than color alone'],
  ['article','Editorial article with useful hierarchy','Readable line length; balanced headings'],
  ['bento','Asymmetric editorial feature mosaic','Logical DOM order independent of visual placement']
].map(([id,purpose,acceptance])=>({id,purpose,acceptance}));

export const styles = [
  {id:'noir',bg:'#101114',surface:'#1c1d23',fg:'#f4f5f7',accent:'#bdff72',radius:18,font:'sans-serif'},
  {id:'editorial',bg:'#f5f1e8',surface:'#ffffff',fg:'#202019',accent:'#9f341e',radius:2,font:'serif'},
  {id:'cobalt',bg:'#f0f4ff',surface:'#ffffff',fg:'#132140',accent:'#214ad8',radius:16,font:'sans-serif'},
  {id:'botanical',bg:'#edf3e9',surface:'#ffffff',fg:'#183e27',accent:'#256039',radius:24,font:'serif'},
  {id:'brutalist',bg:'#fffbe6',surface:'#ffffff',fg:'#181811',accent:'#7022bd',radius:0,font:'monospace'},
  {id:'rose',bg:'#fff0f4',surface:'#ffffff',fg:'#50162d',accent:'#a51b4c',radius:24,font:'sans-serif'},
  {id:'mono',bg:'#fafafa',surface:'#ffffff',fg:'#191919',accent:'#404040',radius:8,font:'sans-serif'},
  {id:'ocean',bg:'#eaf7f8',surface:'#ffffff',fg:'#173942',accent:'#076b7b',radius:14,font:'sans-serif'},
  {id:'violet',bg:'#181125',surface:'#292038',fg:'#f7f2ff',accent:'#d2b0ff',radius:20,font:'sans-serif'},
  {id:'terracotta',bg:'#fbf1e6',surface:'#fffaf3',fg:'#462416',accent:'#993e20',radius:12,font:'serif'},
  {id:'terminal',bg:'#101810',surface:'#1d291e',fg:'#e9f7e9',accent:'#96e998',radius:4,font:'monospace'},
  {id:'museum',bg:'#eae6de',surface:'#f8f6f0',fg:'#2b2923',accent:'#615123',radius:2,font:'serif'}
];
export const contexts = ['energy-drink','food','architecture','fashion','saas','portfolio','healthcare','education','travel','finance','beauty','music','automotive','gaming','nonprofit'];
export const densities = [{id:'compact',space:16,max:900},{id:'balanced',space:24,max:1080},{id:'airy',space:36,max:1200},{id:'cinematic',space:48,max:1400},{id:'editorial',space:32,max:760}];
export const motionNames = ['fade','rise','fall','slide-left','slide-right','scale-in','scale-out','tilt-in','flip-x','flip-y','clip-up','clip-right','blur-in','bounce','float','pulse','swing','orbit','rotate','skew-in','stretch','compress','diagonal','perspective'];
export const sceneLayouts = ['can-hero','can-carousel','can-helix','bottle-studio','orb-orbit','torus-knot','ingredient-burst','pasta-spiral','plated-garden','floating-cubes','radial-rings','sculpture-stack'];
export const backgroundLayouts = ['starfield','particle-wave','terrain-grid','orbital-dust','glass-towers','crystal-field','ribbon-tunnel','neon-lattice','low-poly-dunes','floating-islands','helix-stream','sphere-garden'];
export const treatments = [
  {id:'litchi',background:'#100b20',accent:'#bc8cff',secondary:'#ecb6df',metalness:.7,roughness:.24},
  {id:'citrus',background:'#161808',accent:'#c6ec55',secondary:'#f6b651',metalness:.4,roughness:.32},
  {id:'cherry',background:'#230b12',accent:'#fc718a',secondary:'#dcbbff',metalness:.6,roughness:.26},
  {id:'arctic',background:'#081723',accent:'#78dcff',secondary:'#bfdcff',metalness:.8,roughness:.18},
  {id:'cacao',background:'#25160f',accent:'#c79973',secondary:'#dc8f98',metalness:.15,roughness:.35},
  {id:'basil',background:'#101c12',accent:'#91bb71',secondary:'#efd878',metalness:.1,roughness:.48},
  {id:'pearl',background:'#e9e5df',accent:'#797298',secondary:'#ad607e',metalness:.35,roughness:.28},
  {id:'cobalt',background:'#060e2c',accent:'#6f9bff',secondary:'#f58df6',metalness:.8,roughness:.22},
  {id:'copper',background:'#1e1211',accent:'#e3a377',secondary:'#9cb7a0',metalness:.9,roughness:.29},
  {id:'graphite',background:'#111416',accent:'#b8c5cc',secondary:'#98a791',metalness:.95,roughness:.3}
];
export function keyframes(kind,d=24){
 const end={opacity:1,transform:'none',filter:'none',clipPath:'inset(0 0 0 0)'};
 const start={opacity:0};
 const transforms={rise:`translateY(${d}px)`,fall:`translateY(-${d}px)`,'slide-left':`translateX(${d}px)`,'slide-right':`translateX(-${d}px)`,'scale-in':`scale(${1-d/200})`,'scale-out':`scale(${1+d/200})`,'tilt-in':`rotate(-${d/3}deg) scale(.94)`,'flip-x':`perspective(800px) rotateX(${d}deg)`,'flip-y':`perspective(800px) rotateY(${d}deg)`,'skew-in':`skewX(${d/3}deg) translateX(-${d}px)`,stretch:`scaleX(${1-d/150})`,compress:`scaleY(${1+d/100})`,diagonal:`translate(${d}px, ${d}px)`,perspective:`perspective(800px) translateZ(-${d*3}px)`};
 if(transforms[kind])start.transform=transforms[kind];
 if(kind==='clip-up')start.clipPath=`inset(${50+d/2}% 0 0 0)`;
 if(kind==='clip-right')start.clipPath=`inset(0 ${50+d/2}% 0 0)`;
 if(kind==='blur-in')start.filter=`blur(${d/4}px)`;
 if(kind==='fade')start.opacity=Math.min(.4,d/200);
 const loops={float:[{transform:'translateY(0)'},{transform:`translateY(-${d}px)`},{transform:'translateY(0)'}],pulse:[{transform:'scale(1)'},{transform:`scale(${1+d/500})`},{transform:'scale(1)'}],swing:[{transform:`rotate(-${d/4}deg)`},{transform:`rotate(${d/4}deg)`},{transform:`rotate(-${d/4}deg)`}],orbit:[{transform:`rotate(0deg) translateX(${d}px) rotate(0deg)`},{transform:`rotate(360deg) translateX(${d}px) rotate(-360deg)`}],rotate:[{transform:`rotate(-${d}deg)`},{transform:`rotate(${d}deg)`},{transform:`rotate(-${d}deg)`}],bounce:[{transform:'translateY(0)'},{transform:`translateY(-${d}px)`,offset:.4},{transform:'translateY(0)',offset:.75},{transform:`translateY(-${d/4}px)`,offset:.9},{transform:'translateY(0)'}]};
 return loops[kind]||[start,end];
}
export function contrast(a,b){const L=h=>{const c=h.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722};const x=L(a),y=L(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
export const onColor=hex=>contrast(hex,'#ffffff')>=contrast(hex,'#000000')?'#ffffff':'#000000';
export function hsl(h,s,l){s/=100;l/=100;const a=s*Math.min(l,1-l);return '#'+[0,8,4].map(n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1)))).toString(16).padStart(2,'0')}).join('')}
