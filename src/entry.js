/* eslint-disable no-restricted-syntax */
import * as THREE from 'three';
import vertexShader from './shaders/vertexShader';
import fragmentShader from './shaders/domainWarp';
import VideoRecordHandler from './VideoRecord/VideoRecordHandler';

/**
 * Clock, Scene, Camera, Renderer, Mouse declaration
 * Set Camera
 * Set Renderer config
 */
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const mouse = new THREE.Vector2();

camera.position.set(6, 3, -10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);

/**
 * Create Shapes Here:
 */
const box = new THREE.BoxGeometry(2, 2, 2);

/**
 * Create Materials Here:
 */
const uniforms = {
  time: { value: 0 },
};

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
});

/**
 * Create Meshes Here:
 */

const boxMesh = new THREE.Mesh(box, material);

/**
 * Add Mesh To Scene Here:
 */
scene.add(boxMesh);

/**
 *
 * Mouse Move Behavior Here:
 */
const onMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

/**
 *
 * Animation Loop Here:
 */
const animate = () => {
  const delta = clock.getDelta();
  uniforms.time.value = clock.getElapsedTime();

  for (const child in scene.children) {
    // do something * delta
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

/**
 * ----------------------------------------------------------------------------
 * Nothing interesting below
 */

// resize
const resize = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};

// dom and window
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);
window.requestAnimationFrame(animate);
resize();
window.addEventListener('resize', resize);
window.videoRecorder = new VideoRecordHandler();
window.addEventListener('mousemove', onMouseMove, false);
