// Procedural starter renderer. No model, font or image assets are downloaded.
// Three.js is fetched only when this module runs in a browser with WebGL enabled.
export async function mountScene(host, config) {
 const fallback=host.querySelector('[data-scene-fallback]');
 const status=document.querySelector('[data-scene-status]');
 const setStatus=t=>{if(status)status.textContent=t};
 let THREE,RoomEnvironment;
 try{THREE=await import('three');({RoomEnvironment}=await import('three/addons/environments/RoomEnvironment.js'))}catch{setStatus('3D library unavailable. Showing the static composition.');return ()=>{}}
 let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{setStatus('WebGL is unavailable. Showing the static composition.');return ()=>{}}
 const {treatment:t,layout}=config;
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(35,1,.1,60);camera.position.set(0,.25,9.5);
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
 renderer.domElement.setAttribute('aria-hidden','true');renderer.domElement.className='scene-canvas';host.append(renderer.domElement);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment(),environment=pmrem.fromScene(room,.04);
 scene.environment=environment.texture;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xffffff,0x37334b,2));
 const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(3,5,6);scene.add(key);
 const rim=new THREE.DirectionalLight(t.secondary,4);rim.position.set(-4,2,-3);scene.add(rim);
 const group=new THREE.Group();scene.add(group);
 const material=new THREE.MeshStandardMaterial({color:t.accent,metalness:t.metalness,roughness:t.roughness});
 const second=new THREE.MeshStandardMaterial({color:t.secondary,metalness:.28,roughness:.38});
 const silver=new THREE.MeshStandardMaterial({color:0xd3d8dd,metalness:.95,roughness:.23});
 const meshes=[];let texture;
 // Deterministic geometry: no per-load randomness or network asset dependency.
 let seed=173;const rand=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296};
 function points(count,position){const values=new Float32Array(count*3);for(let i=0;i<count;i++)values.set(position(i),i*3);const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(values,3));const dots=new THREE.Points(geo,new THREE.PointsMaterial({color:t.accent,size:.035,sizeAttenuation:true}));group.add(dots);return dots}
 function instances(geo,count,place,mat=material){const m=new THREE.InstancedMesh(geo,mat,count),dummy=new THREE.Object3D();for(let i=0;i<count;i++){dummy.position.set(0,0,0);dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1);place(dummy,i);dummy.updateMatrix();m.setMatrixAt(i,dummy.matrix)}m.instanceMatrix.needsUpdate=true;group.add(m);return m}
 const add=(geo,mat=material,parent=group)=>{const m=new THREE.Mesh(geo,mat);parent.add(m);return m};
 function can(){
  const g=new THREE.Group();
  if(!texture){const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d');x.fillStyle=t.accent;x.fillRect(0,0,512,512);x.fillStyle='#17121d';x.textAlign='center';x.font='900 88px sans-serif';x.fillText('ATLAS',256,238);x.font='24px sans-serif';x.fillText('STUDIO / 01',256,285);x.font='16px sans-serif';x.fillText('ORIGINAL PROCEDURAL DEMO',256,355);texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace}
  const label=new THREE.MeshStandardMaterial({map:texture,metalness:.55,roughness:.31});
  add(new THREE.CylinderGeometry(.5,.5,1.9,48,1,true),label,g);
  for(const y of [-.99,.99]){const cap=add(new THREE.CylinderGeometry(.47,.47,.08,48),silver,g);cap.position.y=y;const rim=add(new THREE.TorusGeometry(.475,.026,8,48),silver,g);rim.rotation.x=Math.PI/2;rim.position.y=y+.04}
  const tab=add(new THREE.TorusGeometry(.10,.027,8,24),silver,g);tab.scale.set(.7,1,1);tab.rotation.x=Math.PI/2;tab.position.set(0,1.045,.05);
  return g;
 }
 function ingredient(i){const g=new THREE.Group();if(i%3===0){const m=add(new THREE.SphereGeometry(.24,16,12),second,g);m.scale.y=.8;const leaf=add(new THREE.SphereGeometry(.1,10,6),material,g);leaf.scale.set(1.5,.2,.8);leaf.position.y=.21}else if(i%3===1){const m=add(new THREE.SphereGeometry(.27,16,12),material,g);m.scale.set(.6,.15,1.4);m.rotation.z=.4}else{const m=add(new THREE.TorusGeometry(.18,.065,8,24),silver,g);m.rotation.x=.6}return g}
 const own=(m,x,y,z,s=1)=>{m.position.set(x,y,z);m.scale.setScalar(s);m.userData.home=m.position.clone();group.add(m);meshes.push(m);return m};
 switch(layout){
 case 'can-hero':own(can(),0,0,0,1.35).rotation.z=-.17;break;
 case 'can-carousel':for(let i=0;i<5;i++){const a=(i-2)*.55;const m=own(can(),Math.sin(a)*3.4,-.1,Math.cos(a)*1.3-1.3,.76);m.rotation.z=-a*.18}break;
 case 'can-helix':for(let i=0;i<6;i++){const a=i*Math.PI/3;const m=own(can(),Math.cos(a)*1.55,(i-2.5)*.58,Math.sin(a)*.9,.5);m.rotation.z=a*.12}break;
 case 'bottle-studio':{const pts=[new THREE.Vector2(0,-1.3),new THREE.Vector2(.48,-1.3),new THREE.Vector2(.52,-1.15),new THREE.Vector2(.52,.55),new THREE.Vector2(.22,.95),new THREE.Vector2(.22,1.3),new THREE.Vector2(0,1.3)];own(new THREE.Mesh(new THREE.LatheGeometry(pts,48),material),0,0,0);const lid=add(new THREE.CylinderGeometry(.24,.24,.18,32),silver);lid.position.y=1.35;break}
 case 'orb-orbit':own(new THREE.Mesh(new THREE.SphereGeometry(.9,40,32),material),0,0,0);for(let i=0;i<12;i++){const a=i/12*Math.PI*2;own(new THREE.Mesh(new THREE.SphereGeometry(.16,16,12),second),Math.cos(a)*2,Math.sin(a)*1.2,Math.sin(a*2)*.7)}break;
 case 'torus-knot':own(new THREE.Mesh(new THREE.TorusKnotGeometry(1,.28,128,16,2,3),material),0,0,0);break;
 case 'ingredient-burst':for(let i=0;i<21;i++){const a=i*2.39996,r=.45+Math.sqrt(i)*.45;own(ingredient(i),Math.cos(a)*r,Math.sin(a)*r*.8,Math.sin(i)*.7)}break;
 case 'pasta-spiral':for(let j=0;j<4;j++){const points=[];for(let i=0;i<=80;i++){const a=i/80*Math.PI*5+j*Math.PI/2;points.push(new THREE.Vector3(Math.cos(a)*.7,(i/80-.5)*3,Math.sin(a)*.7))}own(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),100,.07,8,false),j%2?second:material),0,0,0)}break;
 case 'plated-garden':{const plate=add(new THREE.CylinderGeometry(1.9,1.7,.1,48),silver);plate.position.y=-1;for(let i=0;i<18;i++){const a=i*2.39996,r=Math.sqrt(i/18)*1.5;own(ingredient(i),Math.cos(a)*r,-.65+Math.sin(i)*.3,Math.sin(a)*r)}camera.position.set(0,4,8);camera.lookAt(0,0,0);break}
 case 'floating-cubes':for(let i=0;i<18;i++){const a=i*2.39996,r=.5+Math.sqrt(i)*.38;const m=own(new THREE.Mesh(new THREE.BoxGeometry(.45,.45,.45),i%2?material:second),Math.cos(a)*r,Math.sin(a)*r,Math.sin(i)*.9);m.rotation.set(i*.3,i*.4,0)}break;
 case 'radial-rings':for(let i=0;i<8;i++){const m=own(new THREE.Mesh(new THREE.TorusGeometry(.4+i*.19,.045,12,64),i%2?material:second),0,0,(i-4)*.12);m.rotation.x=i*.13}break;
 case 'sculpture-stack':for(let i=0;i<7;i++){const m=own(new THREE.Mesh(new THREE.TorusGeometry(.65,.17,16,48),i%2?material:second),Math.sin(i)*.2,(i-3)*.4,0);m.rotation.x=Math.PI/2;m.rotation.z=i*.15}break;
 case 'starfield':points(1800,()=>[(rand()-.5)*14,(rand()-.5)*8,-rand()*14]);break;
 case 'particle-wave':points(2500,i=>{const x=(i%50-25)*.16,z=(Math.floor(i/50)-25)*.16;return [x,Math.sin(x*1.7)*.45+Math.cos(z*1.3)*.3-.6,z-1.8]});camera.position.y=2;camera.lookAt(0,-.5,0);break;
 case 'orbital-dust':points(2400,i=>{const a=i*.13,r=1+rand()*2.6;return [Math.cos(a)*r,Math.sin(a)*r*.48+(rand()-.5)*.15,Math.sin(a)*1.7+(rand()-.5)*.5]});break;
 case 'terrain-grid':case 'low-poly-dunes':{const geo=new THREE.PlaneGeometry(12,10,40,32),p=geo.attributes.position;for(let i=0;i<p.count;i++)p.setZ(i,Math.sin(p.getX(i)*.9)*.4+Math.cos(p.getY(i)*1.2)*.3);geo.computeVertexNormals();const mat=new THREE.MeshStandardMaterial({color:t.accent,wireframe:layout==='terrain-grid',roughness:.55,metalness:.3,flatShading:true,side:THREE.DoubleSide});const m=add(geo,mat);m.rotation.x=-Math.PI/2;m.position.set(0,-1.3,-2);camera.position.y=1.6;camera.lookAt(0,0,-2);break}
 case 'glass-towers':{const mat=new THREE.MeshPhysicalMaterial({color:t.accent,metalness:.15,roughness:.18,clearcoat:1});instances(new THREE.BoxGeometry(.38,1,.38),100,(o,i)=>{const h=.3+rand()*2.1;o.scale.y=h;o.position.set((i%10-4.5)*.62,h/2-1.5,(Math.floor(i/10)-5)*.65-1);o.rotation.y=.15},mat);camera.position.set(4,3,8);camera.lookAt(0,0,-1);break}
 case 'crystal-field':instances(new THREE.OctahedronGeometry(.28),130,o=>{o.position.set((rand()-.5)*8,(rand()-.5)*4,(rand()-.5)*5-2);o.rotation.set(rand()*3,rand()*3,0);o.scale.set(1,.7+rand()*2,1)});break;
 case 'ribbon-tunnel':for(let j=0;j<12;j++){const pts=[];for(let i=0;i<=100;i++){const a=i/100*Math.PI*3+j*Math.PI/6;pts.push(new THREE.Vector3(Math.cos(a)*2,Math.sin(a)*2,2-i/100*12))}add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),100,.035,6,false),j%2?material:second)}break;
 case 'neon-lattice':instances(new THREE.TorusGeometry(.42,.023,6,24),144,(o,i)=>{o.position.set((i%12-5.5)*.9,(Math.floor(i/12)-5.5)*.65,-2-Math.sin(i*.3)*.5);o.rotation.x=i*.03});break;
 case 'floating-islands':instances(new THREE.DodecahedronGeometry(.4,0),45,o=>{o.position.set((rand()-.5)*8,(rand()-.5)*3.5,(rand()-.5)*5-2);o.scale.set(1+rand(),.3+rand()*.4,1+rand());o.rotation.y=rand()*6});break;
 case 'helix-stream':instances(new THREE.SphereGeometry(.09,10,8),240,(o,i)=>{const a=i*.17;o.position.set(Math.cos(a)*1.2,(i/240-.5)*6,Math.sin(a)*1.2);o.rotation.y=a});group.rotation.z=.65;break;
 case 'sphere-garden':instances(new THREE.SphereGeometry(.25,16,12),100,o=>{o.position.set((rand()-.5)*8,(rand()-.5)*4,(rand()-.5)*4-1);o.scale.setScalar(.3+rand()*1.3)},second);break;
 default:throw new Error('Unknown scene layout: '+layout);
 }
 const motion=matchMedia('(prefers-reduced-motion: reduce)');let paused=motion.matches,visible=true,destroyed=false,raf=0,time=0,previous=0,frames=0,elapsed=0;let px=0,py=0,progress=0;
 const render=()=>renderer.render(scene,camera);
 const resize=()=>{const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();render()};
 const ro=new ResizeObserver(resize);ro.observe(host);resize();
 function frame(now){raf=0;if(destroyed||paused||!visible||document.hidden)return;const dt=previous?Math.min((now-previous)/1000,.05):0;previous=now;time+=dt;group.rotation.y+=(px*.28+progress*.6+Math.sin(time*.22)*.15-group.rotation.y)*Math.min(1,dt*5);group.rotation.x+=(py*.12-group.rotation.x)*Math.min(1,dt*5);meshes.forEach((m,i)=>{m.position.y=m.userData.home.y+Math.sin(time*.8+i)*.07});frames++;elapsed+=dt;if(frames===120){if(elapsed/frames>.025)renderer.setPixelRatio(1);frames=0;elapsed=0}render();raf=requestAnimationFrame(frame)}
 const start=()=>{previous=0;if(!raf&&!paused&&visible&&!document.hidden&&!destroyed)raf=requestAnimationFrame(frame)};
 const stop=()=>{cancelAnimationFrame(raf);raf=0;previous=0};
 const visibility=()=>document.hidden?stop():start();document.addEventListener('visibilitychange',visibility);
 const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;visible?start():stop()},{threshold:.01});io.observe(host);
 const pointer=e=>{if(motion.matches||paused)return;const b=host.getBoundingClientRect();px=((e.clientX-b.left)/b.width-.5)*2;py=((e.clientY-b.top)/b.height-.5)*2};host.addEventListener('pointermove',pointer);
 const scroll=()=>{progress=motion.matches?0:Math.max(0,Math.min(1,window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight)))};window.addEventListener('scroll',scroll,{passive:true});
 const button=document.querySelector('[data-motion-toggle]');
 const updateButton=()=>{if(button){button.textContent=paused?'Resume motion':'Pause motion';button.disabled=motion.matches;button.setAttribute('aria-pressed',String(paused))}};
 const toggle=()=>{if(motion.matches)return;paused=!paused;paused?stop():start();updateButton()};button?.addEventListener('click',toggle);
 const reduced=()=>{paused=motion.matches;stop();group.rotation.set(0,0,0);meshes.forEach(m=>m.position.copy(m.userData.home));render();updateButton();start()};motion.addEventListener('change',reduced);
 const lost=e=>{e.preventDefault();stop();if(fallback)fallback.hidden=false;renderer.domElement.hidden=true;setStatus('Graphics context lost. Static composition remains available. Reload to restore 3D.')};renderer.domElement.addEventListener('webglcontextlost',lost);
 if(fallback)fallback.hidden=true;setStatus(motion.matches?'Static 3D composition. Reduced motion is enabled.':'Interactive procedural composition.');updateButton();render();start();
 // Diagnostics expose measurements, never a claimed performance guarantee.
 host.atlasMetrics=()=>({drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,dpr:renderer.getPixelRatio()});
 return function dispose(){destroyed=true;stop();ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',visibility);host.removeEventListener('pointermove',pointer);window.removeEventListener('scroll',scroll);motion.removeEventListener('change',reduced);button?.removeEventListener('click',toggle);renderer.domElement.removeEventListener('webglcontextlost',lost);const geometries=new Set(),materials=new Set([material,second,silver]);scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m))});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());texture?.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove();delete host.atlasMetrics;if(fallback)fallback.hidden=false};
}
