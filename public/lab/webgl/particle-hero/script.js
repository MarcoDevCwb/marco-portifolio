import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('scene');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmallScreen = window.innerWidth < 640;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
} catch (err) {
  document.body.classList.add('no-webgl');
  throw err;
}

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 16;

// Distribuição das partículas num volume "achatado" (mais largo que fundo)
const COUNT = isSmallScreen ? 900 : 2200;
const SPREAD = { x: 9, y: 5.4, z: 6 };

const positions = new Float32Array(COUNT * 3);
const homePositions = new Float32Array(COUNT * 3);
const velocities = new Float32Array(COUNT * 3);
const colors = new Float32Array(COUNT * 3);

const colorA = new THREE.Color('#7c5cff');
const colorB = new THREE.Color('#ff5ca8');

for (let i = 0; i < COUNT; i++) {
  const x = (Math.random() * 2 - 1) * SPREAD.x;
  const y = (Math.random() * 2 - 1) * SPREAD.y;
  const z = (Math.random() * 2 - 1) * SPREAD.z;

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;

  homePositions[i * 3] = x;
  homePositions[i * 3 + 1] = y;
  homePositions[i * 3 + 2] = z;

  const mixed = colorA.clone().lerp(colorB, Math.random());
  colors[i * 3] = mixed.r;
  colors[i * 3 + 1] = mixed.g;
  colors[i * 3 + 2] = mixed.b;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: isSmallScreen ? 0.11 : 0.09,
  vertexColors: true,
  transparent: true,
  opacity: 0.85,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});

const points = new THREE.Points(geometry, material);
scene.add(points);

// Projeta a posição do ponteiro (mouse ou toque) num plano z=0 do mundo 3D
const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2(-10, -10);
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const mouseWorld = new THREE.Vector3();
let hasPointer = false;

function updatePointer(clientX, clientY) {
  pointerNDC.x = (clientX / window.innerWidth) * 2 - 1;
  pointerNDC.y = -(clientY / window.innerHeight) * 2 + 1;
  hasPointer = true;
}

window.addEventListener('pointermove', (e) => updatePointer(e.clientX, e.clientY));
window.addEventListener('pointerleave', () => { hasPointer = false; });
window.addEventListener('pointercancel', () => { hasPointer = false; });

const REPEL_RADIUS = 3.2;
const REPEL_STRENGTH = 0.9;
const SPRING = 0.02;
const DAMPING = 0.9;

function step() {
  if (hasPointer) {
    raycaster.setFromCamera(pointerNDC, camera);
    raycaster.ray.intersectPlane(groundPlane, mouseWorld);
  }

  const posArray = geometry.attributes.position.array;

  for (let i = 0; i < COUNT; i++) {
    const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;

    let vx = velocities[ix];
    let vy = velocities[iy];
    let vz = velocities[iz];

    if (hasPointer) {
      const dx = posArray[ix] - mouseWorld.x;
      const dy = posArray[iy] - mouseWorld.y;
      const dz = posArray[iz] - mouseWorld.z;
      const distSq = dx * dx + dy * dy + dz * dz;

      if (distSq < REPEL_RADIUS * REPEL_RADIUS) {
        const dist = Math.sqrt(distSq) || 0.001;
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
        vx += (dx / dist) * force;
        vy += (dy / dist) * force;
        vz += (dz / dist) * force;
      }
    }

    // mola puxando de volta para a posição original
    vx += (homePositions[ix] - posArray[ix]) * SPRING;
    vy += (homePositions[iy] - posArray[iy]) * SPRING;
    vz += (homePositions[iz] - posArray[iz]) * SPRING;

    vx *= DAMPING;
    vy *= DAMPING;
    vz *= DAMPING;

    posArray[ix] += vx;
    posArray[iy] += vy;
    posArray[iz] += vz;

    velocities[ix] = vx;
    velocities[iy] = vy;
    velocities[iz] = vz;
  }

  geometry.attributes.position.needsUpdate = true;

  // A rotação ambiente é decorativa e contínua, então respeita reduced-motion.
  // A resposta ao ponteiro é interação direta do usuário — continua sempre ativa.
  if (!prefersReducedMotion) {
    points.rotation.y += 0.0009;
  }

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(step);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
