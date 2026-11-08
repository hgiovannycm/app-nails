import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export const NAIL_COLORS = [
  { name: 'Rosa pétalo', hex: '#f7a1be' },
  { name: 'Cereza',      hex: '#c8203f' },
  { name: 'Nude',        hex: '#e8b9a6' },
  { name: 'Lila',        hex: '#c8a6f2' },
  { name: 'Perla',       hex: '#fbf1f1' },
  { name: 'Durazno',     hex: '#ffb394' },
  { name: 'Cromo',       hex: '#eadbe8', chrome: true },
];

// Mano estilizada de porcelana construida con cápsulas. Dorso hacia la cámara para que se vean las uñas.
export function initHand(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  camera.position.set(0, 0.35, 10.5);
  camera.lookAt(0, 0.35, 0);

  const key = new THREE.DirectionalLight(0xfff2f6, 2.2); key.position.set(3, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffb8d4, 1.6); rim.position.set(-5, 2, -3); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xffd5e4, 0.7));

  const skin = new THREE.MeshPhysicalMaterial({
    color: 0xf6cfc8, roughness: 0.36, metalness: 0, clearcoat: 0.55, clearcoatRoughness: 0.28,
    sheen: 1, sheenColor: new THREE.Color(0xffb7cb), sheenRoughness: 0.5, iridescence: 0.18,
  });
  const nailMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(NAIL_COLORS[0].hex), roughness: 0.07, metalness: 0.05,
    clearcoat: 1, clearcoatRoughness: 0.02, reflectivity: 0.8,
  });
  const gold = new THREE.MeshPhysicalMaterial({ color: 0xd9937e, metalness: 1, roughness: 0.22, clearcoat: 0.6 });

  const hand = new THREE.Group();
  scene.add(hand);

  // Palma
  const palm = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), skin);
  palm.scale.set(1.2, 1.18, 0.46);
  palm.position.y = -0.12;
  hand.add(palm);

  // Muñeca y antebrazo
  const wrist = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.6, 3.2, 48, 1), skin);
  wrist.position.set(0, -2.0, -0.02);
  wrist.scale.z = 0.72;
  hand.add(wrist);
  const bangle = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.09, 24, 96), gold);
  bangle.rotation.x = Math.PI / 2; bangle.position.set(0, -1.7, 0); bangle.scale.set(1.0, 0.8, 1);
  bangle.scale.z = 1;
  hand.add(bangle);

  function nailMesh(r, len) {
    const g = new THREE.SphereGeometry(1, 40, 28);
    const m = new THREE.Mesh(g, nailMat);
    m.scale.set(r * 0.9, len, r * 0.22);
    return m;
  }

  function makeFinger({ x, y, lens, r, curl, spread, zrot = 0, yrot = 0 }) {
    const root = new THREE.Group();
    root.position.set(x, y, 0);
    root.rotation.z = spread + zrot;
    root.rotation.y = yrot;
    let parent = root;
    lens.forEach((L, i) => {
      const joint = new THREE.Group();
      joint.rotation.x = -curl[i];
      const rr = r * (1 - i * 0.08);
      const seg = new THREE.Mesh(new THREE.CapsuleGeometry(rr, L, 14, 28), skin);
      seg.position.y = L / 2;
      seg.scale.z = 0.88;
      joint.add(seg);
      if (i === lens.length - 1) {
        const nl = L * 0.52 + rr * 0.75;
        const n = nailMesh(rr, nl);
        n.position.set(0, L * 0.6, rr * 0.78);
        joint.add(n);
      }
      parent.add(joint);
      joint.position.y = i === 0 ? 0 : lens[i - 1];
      parent = joint;
    });
    hand.add(root);
    return root;
  }

  makeFinger({ x: -0.7,  y: 0.62, lens: [0.66, 0.44, 0.34], r: 0.225, curl: [0.04, 0.14, 0.18], spread: 0.07 });
  makeFinger({ x: -0.24, y: 0.74, lens: [0.74, 0.48, 0.36], r: 0.23,  curl: [0.02, 0.16, 0.2],  spread: 0.0 });
  makeFinger({ x: 0.23,  y: 0.7, lens: [0.66, 0.44, 0.34], r: 0.222, curl: [0.04, 0.18, 0.2],  spread: -0.06 });
  makeFinger({ x: 0.68,  y: 0.48, lens: [0.5, 0.32, 0.28],  r: 0.19,  curl: [0.06, 0.18, 0.22], spread: -0.17 });
  // Pulgar
  makeFinger({ x: -1.0, y: -0.42, lens: [0.48, 0.44, 0.32], r: 0.26, curl: [0.1, 0.12, 0.16], spread: 1.0, yrot: 0.3 });

  hand.rotation.z = -0.1;
  hand.position.set(0, -0.15, 0);
  hand.scale.setScalar(0.96);

  // Orbes de cristal flotando
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffd9e8, roughness: 0.04, metalness: 0.0, transparent: true, opacity: 0.8,
    iridescence: 1, iridescenceIOR: 1.5, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.6,
  });
  const orbs = [];
  [[-1.85, 1.3, -0.6, 0.34], [1.85, 1.7, -0.9, 0.24], [1.75, -0.6, 0.7, 0.4], [-1.7, -1.0, 0.4, 0.22], [0.1, 2.35, -1.2, 0.16]].forEach(([x, y, z, s], i) => {
    const m = glassMat.clone(); m.color.set([0xff9fc4,0xcfb0ff,0xffc1a1,0xa9e8d8,0xffb3d1][i]);
    const o = new THREE.Mesh(new THREE.SphereGeometry(s, 48, 32), m);
    o.position.set(x, y, z); o.userData = { base: new THREE.Vector3(x, y, z), ph: i * 1.7 };
    scene.add(o); orbs.push(o);
  });

  // Color de uñas
  const target = new THREE.Color(NAIL_COLORS[0].hex);
  let manualUntil = 0, idx = 0;
  function setColor(i, manual = true) {
    const c = NAIL_COLORS[i]; idx = i;
    target.set(c.hex);
    nailMat.metalness = c.chrome ? 0.95 : 0.05;
    nailMat.roughness = c.chrome ? 0.1 : 0.07;
    if (manual) manualUntil = performance.now() + 9000;
    canvas.dispatchEvent(new CustomEvent('nailcolor', { detail: i }));
  }

  // Parallax con cursor
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / innerHeight - 0.5) * 2;
  });

  function resize() {
    const r = canvas.getBoundingClientRect();
    const w = Math.max(10, r.width), h = Math.max(10, r.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas); resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);

  const clock = new THREE.Clock();
  let lastCycle = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    const t = clock.getElapsedTime();
    mouse.x += (mouse.tx - mouse.x) * 0.06; mouse.y += (mouse.ty - mouse.y) * 0.06;
    hand.rotation.y = Math.sin(t * 0.5) * 0.28 + mouse.x * 0.35;
    hand.rotation.x = -0.08 + mouse.y * 0.14 + Math.sin(t * 0.7) * 0.03;
    hand.position.y = -0.15 + Math.sin(t * 1.1) * 0.09;
    orbs.forEach((o) => {
      const b = o.userData.base, p = o.userData.ph;
      o.position.set(b.x + Math.sin(t * 0.6 + p) * 0.18 + mouse.x * 0.2, b.y + Math.cos(t * 0.8 + p) * 0.22, b.z);
    });
    if (performance.now() > manualUntil && t - lastCycle > 3.2) { lastCycle = t; setColor((idx + 1) % NAIL_COLORS.length, false); }
    nailMat.color.lerp(target, 0.1);
    renderer.render(scene, camera);
  }
  frame();

  return { setColor, count: NAIL_COLORS.length };
}
