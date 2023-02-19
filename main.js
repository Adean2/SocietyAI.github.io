import * as  THREE from "three";
import "./style.css"
import gsap from "gsap";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

//Scene
const scene = new THREE.Scene();

//Create object
const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color : "#00ff83",

})
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0,10,10); // x , y, z
scene.add(light);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene,camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.enablePan = false;
// controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//Resize
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update()
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}
loop()

//Animate
const t1 = gsap.timeline({ duration: 1});
t1.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1});
t1.fromTo("nav", {y:"-100%"}, {y:"0%"});
t1.fromTo(".title", {opacity: 0}, {opacity: 1});





