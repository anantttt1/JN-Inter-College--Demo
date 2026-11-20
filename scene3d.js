const zones = [
  { id: 'learning', en: 'A place to learn', hi: 'सीखने की जगह', descEn: 'An illustrative learning space — replace this concept with the school’s confirmed campus information.', descHi: 'अध्ययन क्षेत्र की एक कल्पना — इसे विद्यालय परिसर की पक्की जानकारी से बदलें।' },
  { id: 'library', en: 'A corner for curiosity', hi: 'जिज्ञासा का कोना', descEn: 'A quiet reading zone shown as a design concept. Confirm the actual facilities before publishing.', descHi: 'पठन क्षेत्र की डिज़ाइन परिकल्पना। प्रकाशित करने से पहले वास्तविक सुविधाओं की पुष्टि करें।' },
  { id: 'science', en: 'Ideas in discovery', hi: 'खोज में नए विचार', descEn: 'An imagined discovery space for experiments and questions — this is not a verified school facility.', descHi: 'प्रयोग और सवालों के लिए कल्पित खोज क्षेत्र — यह विद्यालय की पुष्ट सुविधा नहीं है।' },
  { id: 'play', en: 'Room to play', hi: 'खेलने की खुली जगह', descEn: 'An illustrative outdoor zone. Replace it with the school’s confirmed grounds and activities.', descHi: 'खुले परिसर की उदाहरणात्मक कल्पना। इसे विद्यालय के वास्तविक मैदान और गतिविधियों से बदलें।' }
];

const mapMarkup = `
<section class="interactive-campus section-pad" id="campus-map">
  <div class="section-kicker"><span>04 / <span data-en="A CLOSER LOOK" data-hi="एक नज़दीकी नज़र">एक नज़दीकी नज़र</span></span><span class="kicker-rule"></span><span data-en="INTERACTIVE CAMPUS PREVIEW" data-hi="इंटरैक्टिव परिसर प्रीव्यू">इंटरैक्टिव परिसर प्रीव्यू</span></div>
  <div class="campus-map-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span><span data-en="EXPLORE THE IDEA" data-hi="परिकल्पना को जानें">परिकल्पना को जानें</span></div><h2 data-en="A campus with<br><em>room to grow.</em>" data-hi="एक परिसर,<br><em>बढ़ने की जगह।</em>">एक परिसर,<br><em>बढ़ने की जगह।</em></h2></div><p data-en="Move your pointer or drag to explore. Choose a marker to see an illustrative campus zone. The 3D layout is a design concept, not a verified site plan." data-hi="परिसर को घुमाने के लिए माउस चलाएँ या ड्रैग करें। उदाहरणात्मक क्षेत्र देखने के लिए marker चुनें। यह 3D रूपांकन केवल डिज़ाइन परिकल्पना है, वास्तविक नक्शा नहीं।">परिसर को घुमाने के लिए माउस चलाएँ या ड्रैग करें। उदाहरणात्मक क्षेत्र देखने के लिए marker चुनें। यह 3D रूपांकन केवल डिज़ाइन परिकल्पना है, वास्तविक नक्शा नहीं।</p></div>
  <div class="campus-map-layout"><div class="campus-3d-frame"><img class="campus-3d-fallback" src="assets/campus-isometric.svg" alt="Illustrated isometric campus concept" data-alt-en="Illustrated isometric campus concept" data-alt-hi="परिसर की उदाहरणात्मक आइसोमेट्रिक परिकल्पना"><canvas class="campus-3d-canvas" data-3d-scene="campus" aria-label="Interactive isometric campus concept; use the campus markers to explore" data-aria-en="Interactive isometric campus concept; use the campus markers to explore" data-aria-hi="परिसर के मार्कर चुनकर इंटरैक्टिव 3D परिसर परिकल्पना देखें"></canvas><span class="map-demo-tag" data-en="ILLUSTRATIVE 3D CAMPUS CONCEPT" data-hi="परिकल्पित 3D परिसर">परिकल्पित 3D परिसर</span>
    <button class="hotspot hotspot-one" data-zone="learning" data-en="Learning" data-hi="अध्ययन" aria-label="Explore the learning zone" data-aria-en="Explore the learning zone" data-aria-hi="अध्ययन क्षेत्र देखें">01</button><button class="hotspot hotspot-two" data-zone="library" data-en="Reading" data-hi="पठन" aria-label="Explore the reading zone" data-aria-en="Explore the reading zone" data-aria-hi="पठन क्षेत्र देखें">02</button><button class="hotspot hotspot-three" data-zone="science" data-en="Discovery" data-hi="खोज" aria-label="Explore the discovery zone" data-aria-en="Explore the discovery zone" data-aria-hi="खोज क्षेत्र देखें">03</button><button class="hotspot hotspot-four" data-zone="play" data-en="Play" data-hi="खेल" aria-label="Explore the play zone" data-aria-en="Explore the play zone" data-aria-hi="खेल क्षेत्र देखें">04</button>
  </div><aside class="zone-panel"><span class="zone-index">01 / 04</span><span class="zone-icon">✳</span><h3 class="zone-title" data-en="A place to learn" data-hi="सीखने की जगह">सीखने की जगह</h3><p class="zone-description" data-en="An illustrative learning space — replace this concept with the school’s confirmed campus information." data-hi="अध्ययन क्षेत्र की एक कल्पना — इसे विद्यालय परिसर की पक्की जानकारी से बदलें।">अध्ययन क्षेत्र की एक कल्पना — इसे विद्यालय परिसर की पक्की जानकारी से बदलें।</p><div class="zone-controls"><button class="zone-prev" aria-label="Previous campus zone" data-aria-en="Previous campus zone" data-aria-hi="पिछला परिसर क्षेत्र">←</button><span data-en="SELECT A MARKER" data-hi="एक मार्कर चुनें">एक मार्कर चुनें</span><button class="zone-next" aria-label="Next campus zone" data-aria-en="Next campus zone" data-aria-hi="अगला परिसर क्षेत्र">→</button></div><span class="zone-disclaimer" data-en="DEMO VISUAL · NOT AN ACTUAL CAMPUS MAP" data-hi="डेमो दृश्य · वास्तविक परिसर नक्शा नहीं">डेमो दृश्य · वास्तविक परिसर नक्शा नहीं</span></aside></div>
</section>`;

const lifeSection = document.querySelector('#life');
if (lifeSection) lifeSection.insertAdjacentHTML('beforebegin', mapMarkup);

function syncLanguage() {
  const language = document.documentElement.lang === 'en' ? 'en' : 'hi';
  document.querySelectorAll('#campus-map [data-en][data-hi]').forEach(el => { el.innerHTML = el.dataset[language]; });
  document.querySelectorAll('#campus-map [data-aria-en][data-aria-hi]').forEach(el => el.setAttribute('aria-label', el.dataset[language === 'en' ? 'ariaEn' : 'ariaHi']));
  document.querySelectorAll('#campus-map [data-alt-en][data-alt-hi]').forEach(el => el.alt = el.dataset[language === 'en' ? 'altEn' : 'altHi']);
  return language;
}
syncLanguage();

const panelTitle = document.querySelector('.zone-title');
const panelDescription = document.querySelector('.zone-description');
const panelIndex = document.querySelector('.zone-index');
let activeZone = 'learning';
function selectZone(zoneId) {
  const item = zones.find(zone => zone.id === zoneId) || zones[0];
  activeZone = item.id;
  const language = syncLanguage();
  panelTitle.textContent = item[language];
  panelDescription.textContent = language === 'en' ? item.descEn : item.descHi;
  panelIndex.textContent = `${String(zones.indexOf(item) + 1).padStart(2, '0')} / ${String(zones.length).padStart(2, '0')}`;
  document.querySelectorAll('.hotspot').forEach(button => {
    const selected = button.dataset.zone === activeZone;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  window.dispatchEvent(new CustomEvent('jn-campus-zone', { detail: { zone: activeZone } }));
}
document.querySelectorAll('.hotspot').forEach(button => button.addEventListener('click', () => selectZone(button.dataset.zone)));
document.querySelector('.zone-prev')?.addEventListener('click', () => selectZone(zones[(zones.findIndex(zone => zone.id === activeZone) + zones.length - 1) % zones.length].id));
document.querySelector('.zone-next')?.addEventListener('click', () => selectZone(zones[(zones.findIndex(zone => zone.id === activeZone) + 1) % zones.length].id));
selectZone(activeZone);
new MutationObserver(() => selectZone(activeZone)).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

let threePromise;
function loadThree() {
  if (!threePromise) threePromise = import('https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js');
  return threePromise;
}
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const observeScenes = (callback, options) => 'IntersectionObserver' in window
    ? new IntersectionObserver(callback, options)
    : { observe: target => setTimeout(() => callback([{ target, isIntersecting: true }]), 0) };
  const canvasObserver = observeScenes(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.started === 'true') return;
    entry.target.dataset.started = 'true';
    loadThree().then(THREE => mountScene(THREE, entry.target)).catch(() => entry.target.classList.add('scene-fallback'));
  });
}, { rootMargin: '180px 0px', threshold: 0.01 });
document.querySelectorAll('canvas[data-3d-scene]').forEach(canvas => canvasObserver.observe(canvas));

function mountScene(THREE, canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch (_) {
    canvas.classList.add('scene-fallback');
    return;
  }
  const isCampus = canvas.dataset['3dScene'] === 'campus';
  const frame = canvas.parentElement;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(isCampus ? 36 : 32, 1, 0.1, 80);
  if (isCampus) camera.position.set(10, 10, 11); else camera.position.set(0, 5.8, 13.5);
  const target = new THREE.Vector3(0, isCampus ? 0.4 : 1.3, 0);
  camera.lookAt(target);
  scene.add(new THREE.HemisphereLight(0xf7f1df, 0x293a31, 2.0));
  const keyLight = new THREE.DirectionalLight(0xffe8b5, 3.2);
  keyLight.position.set(-5, 10, 8); scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xa9c8b4, 1.2);
  fillLight.position.set(7, 5, -5); scene.add(fillLight);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(512,512);
  const finePointer = matchMedia('(pointer: fine)').matches;
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(devicePixelRatio || 1, finePointer ? 1.35 : 1.05);
    renderer.setPixelRatio(dpr);
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    if (reduceMotion.matches) requestAnimationFrame(() => renderer.render(scene,camera));
  };
  const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : { observe: () => window.addEventListener('resize', resize), disconnect: () => window.removeEventListener('resize', resize) };
  resizeObserver.observe(canvas);
  resize();

  const mat = (color, roughness = .64, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness: .04, ...extra });
  const mats = {
    ground: mat(0x71846b), grass: mat(0x839477), ivory: mat(0xe7dcc2), wall: mat(0xd8ccb0), roof: mat(0x21483b), dark: mat(0x19392f),
    gold: mat(0xc7a75f, .35, { metalness: .25 }), glass: mat(0x8db8b0, .3, { metalness: .1 }), book: mat(0x9a6c3f), red: mat(0x9e5f4b), sky: mat(0x6e9a91),
    leaf: mat(0x52765c), leafLight: mat(0x78926d), court: mat(0x9f916f), path: mat(0xc8b78c), white: mat(0xf5f0e4), science: mat(0xadcfc2, .28)
  };
  const box = (parent, dims, position, material, zone = null, rotation = null) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...dims), material);
    mesh.position.set(...position); if (rotation) mesh.rotation.set(...rotation);
    if (zone) { mesh.userData.zone = zone; mesh.material = material.clone(); }
    mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const sphere = (parent, radius, position, material, zone = null, detail = 18) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, detail, Math.max(8, detail >> 1)), material);
    mesh.position.set(...position); if (zone) { mesh.userData.zone = zone; mesh.material = material.clone(); } mesh.castShadow=true; mesh.receiveShadow=true; parent.add(mesh); return mesh;
  };
  const cylinder = (parent, rt, rb, height, position, material, zone = null, sides = 12) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, height, sides), material);
    mesh.position.set(...position); if (zone) { mesh.userData.zone = zone; mesh.material = material.clone(); } mesh.castShadow=true; mesh.receiveShadow=true; parent.add(mesh); return mesh;
  };

  function addTree(parent, x, z, scale = 1) {
    const tree = new THREE.Group(); tree.position.set(x, 0, z); tree.scale.setScalar(scale); parent.add(tree);
    cylinder(tree, .11, .16, 1, [0, .5, 0], mats.book);
    sphere(tree, .58, [0, 1.2, 0], mats.leaf, null, 14);
    sphere(tree, .42, [.34, 1.45, .13], mats.leafLight, null, 12);
  }

  function addBuilding(parent, x, z, width, depth, height, zone, variant = 0) {
    const building = new THREE.Group(); building.position.set(x, 0, z); parent.add(building);
    box(building, [width, height, depth], [0, height / 2 + .08, 0], variant ? mats.ivory : mats.wall, zone);
    box(building, [width + .24, .18, depth + .26], [0, height + .17, 0], mats.roof, zone);
    if (variant === 0) {
      const triangle = new THREE.Shape();
      triangle.moveTo(-.72,0); triangle.lineTo(0,.48); triangle.lineTo(.72,0); triangle.closePath();
      const pediment = new THREE.Mesh(new THREE.ExtrudeGeometry(triangle,{depth:.14,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.035,bevelThickness:.035}), mats.roof);
      pediment.position.set(0,height+.2,depth/2-.06); building.add(pediment); pediment.userData.zone=zone;
      box(building,[1.6,.1,.2],[0,height+.22,depth/2+.015],mats.gold,zone);
      for(const x of [-.62,.62]) cylinder(building,.065,.08,1.12,[x,.67,depth/2+.12],mats.ivory,zone,12);
    }
    const floors = Math.max(1, Math.floor(height / 1.05));
    for (let floor = 0; floor < floors; floor++) {
      for (let col = 0; col < Math.max(2, Math.floor(width / .62)); col++) {
        const wx = -width / 2 + .42 + col * ((width - .84) / Math.max(1, Math.floor(width / .62) - 1));
        box(building, [.28, .38, .045], [wx, .57 + floor * .92, depth / 2 + .03], (col + floor) % 4 === 0 ? mats.gold : mats.glass, zone);
      }
    }
    box(building, [.72, 1.25, .08], [0, .7, depth / 2 + .055], mats.dark, zone);
    return building;
  }

  const world = new THREE.Group(); scene.add(world);
  world.scale.setScalar(isCampus ? .9 : .79);
  if (!isCampus) world.position.x = 1.38;
  if (isCampus) {
    box(world, [14, .22, 11], [0, -.12, 0], mats.ground);
    box(world, [13.2, .08, 10.2], [0, .02, 0], mats.grass);
    box(world, [1.25, .04, 7.5], [0, .08, .15], mats.path);
    box(world, [8, .045, 1.1], [0, .09, 2.3], mats.path);
    addBuilding(world, -2.65, -1.9, 4.1, 2.25, 2.4, 'learning', 0);
    addBuilding(world, 2.35, -2.35, 2.3, 1.9, 1.8, 'library', 1);
    addBuilding(world, 2.15, .65, 2.55, 1.85, 2.1, 'science', 1);
    const court = box(world, [4.35, .07, 2.35], [3.5, .12, 3.55], mats.court, 'play');
    box(world, [4.2, .035, .055], [3.5, .17, 3.55], mats.white, 'play');
    box(world, [.05, .035, 2.2], [3.5, .17, 3.55], mats.white, 'play');
    box(world, [.15, .45, .15], [1.25, .32, 3.45], mats.white, 'play');
    box(world, [.15, .45, .15], [5.75, .32, 3.45], mats.white, 'play');
    for (const [x, z, scale] of [[-5,-3.8,.85],[-5.1,0,.8],[-4.7,3.8,.92],[.1,-4.2,.75],[5.9,-3.8,.8],[6,0,.75],[6,4,.95],[-2,4.2,.7]]) addTree(world, x, z, scale);
  } else {
    const platform = new THREE.Group(); platform.rotation.y = -.12; world.add(platform);
    box(platform, [9.2, .28, 6], [0, -.13, 0], mats.ground);
    box(platform, [8.8, .08, 5.6], [0, .04, 0], mats.grass);
    box(platform, [1.1, .04, 4.5], [0, .1, .05], mats.path);
    box(platform, [6, .04, .72], [0, .12, 1.75], mats.path);
    addBuilding(platform, -.85, -1, 3.9, 2.35, 2.15, 'learning', 0);
    addBuilding(platform, 3.1, -.85, 1.75, 2.2, 1.75, 'library', 1);
    addBuilding(platform, 2.8, 1.5, 1.9, 1.65, 1.9, 'science', 1);
    box(platform, [2.5, .06, 1.1], [3.1, .13, 2.75], mats.court, 'play');
    for (const [x,z,s] of [[-3.75,-2,.65],[-3.65,1.4,.6],[4.1,-2,.6],[4.1,2,.7],[-2.4,2.2,.56]]) addTree(platform,x,z,s);
    const objects = new THREE.Group(); world.add(objects);
    const globe = new THREE.Group(); globe.position.set(-4.2, 2.55, .3); objects.add(globe);
    sphere(globe, .58, [0,0,0], mats.sky, null, 24);
    const goldLine = new THREE.Mesh(new THREE.TorusGeometry(.61, .018, 5, 42), mats.gold); goldLine.rotation.x = Math.PI / 2.8; globe.add(goldLine);
    for (let i = -1; i <= 1; i++) { const meridian = new THREE.Mesh(new THREE.TorusGeometry(.58, .012, 4, 36), mats.white); meridian.rotation.y = i * .55; globe.add(meridian); }
    sphere(globe, .09, [.5,.1,.12], mats.leafLight, null, 10);
    const book = new THREE.Group(); book.position.set(4.25, 2.0, .3); book.rotation.set(.15,.35,-.2); objects.add(book);
    box(book, [1.25,.16,.9], [0,0,0], mats.book); box(book, [1.1,.06,.78], [0,.105,0], mats.white);
    box(book, [1.25,.16,.9], [0,.2,0], mats.red); box(book, [.08,.38,.92], [-.58,.1,0], mats.gold);
    const cap = new THREE.Group(); cap.position.set(0,3.55,-.1); cap.rotation.y = -.25; objects.add(cap);
    box(cap,[1.25,.1,1.25],[0,0,0],mats.dark,null,[0,Math.PI/4,0]);
    box(cap,[.5,.35,.5],[0,-.2,0],mats.roof);
    const tassel = new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.64,6),mats.gold); tassel.position.set(.42,-.13,.38); tassel.rotation.z=-.22; cap.add(tassel);
    sphere(cap,.055,[.42,-.46,.38],mats.gold,null,8);
    const emblemCanvas = document.createElement('canvas'); emblemCanvas.width = 256; emblemCanvas.height = 256;
    const emblemContext = emblemCanvas.getContext('2d');
    emblemContext.fillStyle = '#f3eddf'; emblemContext.fillRect(0,0,256,256);
    emblemContext.strokeStyle = '#c5a45e'; emblemContext.lineWidth = 8; emblemContext.beginPath(); emblemContext.arc(128,128,113,0,Math.PI*2); emblemContext.stroke();
    emblemContext.strokeStyle = '#173b32'; emblemContext.lineWidth = 3; emblemContext.beginPath(); emblemContext.arc(128,128,101,0,Math.PI*2); emblemContext.stroke();
    emblemContext.fillStyle = '#173b32'; emblemContext.font = 'bold 88px Georgia'; emblemContext.textAlign = 'center'; emblemContext.textBaseline = 'middle'; emblemContext.fillText('JN',128,117);
    emblemContext.fillStyle = '#a1844b'; emblemContext.font = 'bold 16px Arial'; emblemContext.fillText('INTER COLLEGE',128,188);
    const emblemTexture = new THREE.CanvasTexture(emblemCanvas); emblemTexture.colorSpace = THREE.SRGBColorSpace;
    const emblem = new THREE.Group(); emblem.position.set(3.5,3.0,-1.1); emblem.rotation.y = -.15; objects.add(emblem);
    const emblemFace = new THREE.MeshBasicMaterial({map:emblemTexture});
    const medallion = new THREE.Mesh(new THREE.CylinderGeometry(.58,.58,.12,48),[mats.gold,emblemFace,mats.gold]);
    medallion.rotation.x = Math.PI/2; emblem.add(medallion);
    const flask = new THREE.Group(); flask.position.set(-3.3,1.15,2.05); flask.scale.setScalar(.72); objects.add(flask);
    const glass = new THREE.Mesh(new THREE.ConeGeometry(.42,.6,6),mats.science); glass.position.y=.15; flask.add(glass);
    cylinder(flask,.13,.13,.45,[0,.56,0],mats.science,null,12); cylinder(flask,.2,.2,.08,[0,.82,0],mats.gold,null,12);
    cylinder(flask,.27,.27,.16,[0,-.15,0],mats.sky,null,12);
    objects.userData.floaties = [globe,book,cap,flask,emblem].map(object => {
      object.userData.baseY = object.position.y;
      return object;
    });
    world.userData.objects = objects;
  }

  const pickTargets = [];
  world.traverse(object => { if (object.isMesh && object.userData.zone) pickTargets.push(object); });
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(0,0);
  let targetX = 0, targetY = 0, targetYaw = 0, targetPitch = 0, selectedMesh = null;
  let dragging = false, dragDistance = 0, lastPointerX = 0, lastPointerY = 0;
  const setPointer = event => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    targetX = pointer.x; targetY = pointer.y;
    if (dragging) {
      const dx = event.clientX - lastPointerX, dy = event.clientY - lastPointerY;
      dragDistance += Math.abs(dx) + Math.abs(dy);
      targetYaw = THREE.MathUtils.clamp(targetYaw + dx * .009, -.72, .72);
      targetPitch = THREE.MathUtils.clamp(targetPitch + dy * .006, -.28, .28);
      lastPointerX = event.clientX; lastPointerY = event.clientY;
    } else {
      targetYaw = pointer.x * (isCampus ? .2 : .46);
      targetPitch = pointer.y * (isCampus ? .09 : .18);
    }
  };
  canvas.addEventListener('pointermove', setPointer, { passive: true });
  canvas.addEventListener('pointerdown', event => {
    dragging = true; dragDistance = 0; lastPointerX = event.clientX; lastPointerY = event.clientY;
    canvas.classList.add('is-dragging');
    try { canvas.setPointerCapture(event.pointerId); } catch (_) {}
  });
  const endDrag = () => { dragging = false; canvas.classList.remove('is-dragging'); };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', () => { if (!dragging) { targetX = 0; targetY = 0; targetYaw = 0; targetPitch = 0; } });
  canvas.addEventListener('click', event => {
    if (dragDistance > 7) { dragDistance = 0; return; }
    setPointer(event); raycaster.setFromCamera(pointer,camera);
    const hit = raycaster.intersectObjects(pickTargets,false)[0];
    if (hit?.object.userData.zone) selectZone(hit.object.userData.zone);
  });
  function highlightZone(zone) {
    selectedMesh = zone;
    world.traverse(object => {
      if (!object.isMesh || !object.userData.zone || !object.material?.emissive) return;
      object.material.emissive.set(object.userData.zone === selectedMesh ? 0x4a3711 : 0x000000);
      object.material.emissiveIntensity = object.userData.zone === selectedMesh ? .34 : 0;
    });
  }
  window.addEventListener('jn-campus-zone', event => highlightZone(event.detail.zone));
  highlightZone(activeZone);
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); canvas.classList.add('scene-fallback'); }, false);

  const clock = new THREE.Clock();
  let lastFrame = 0;
  const reduced = reduceMotion.matches;
  let isVisible = false;
  function stopLoop() { renderer.setAnimationLoop(null); }
  function startLoop() { if (!document.hidden && isVisible) renderer.setAnimationLoop(renderFrame); }
  function renderFrame() {
    if (!canvas.isConnected) { renderer.setAnimationLoop(null); resizeObserver.disconnect(); renderer.dispose(); return; }
    const now = performance.now();
    if (!reduced && now - lastFrame < 30) return;
    lastFrame = now;
    const time = clock.getElapsedTime();
    if (!reduced) {
      world.rotation.y += (targetYaw - world.rotation.y) * .065;
      world.rotation.x += (targetPitch - world.rotation.x) * .065;
      camera.position.y += ((isCampus ? 10 : 5.8) + targetY * (isCampus ? .18 : .12) - camera.position.y) * .035;
      world.userData.objects?.userData.floaties.forEach((object,index) => { object.position.y = object.userData.baseY + Math.sin(time * .75 + index * 1.7) * .1; object.rotation.y += .0018 * (index % 2 ? 1 : -1); });
    }
    camera.lookAt(target); renderer.render(scene,camera);
    if (reduced) stopLoop();
  }
  const visibilityObserver = observeScenes(entries => {
    isVisible = entries[0]?.isIntersecting || false;
    if (isVisible) startLoop(); else stopLoop();
  }, { threshold: 0.01 });
  visibilityObserver.observe(canvas);
  document.addEventListener('visibilitychange', () => document.hidden ? stopLoop() : startLoop());
  canvas.classList.add('scene-ready');
  if (isCampus) frame.classList.add('has-3d');
}
