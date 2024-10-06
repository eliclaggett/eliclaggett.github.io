import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'


const scene = new THREE.Scene();

const bgColor = document.querySelector('html').classList.contains('light') ? 0xf0f0f0 : 0x0a0a0a;
scene.background = new THREE.Color( bgColor );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const material = new THREE.MeshNormalMaterial( {
    // transparent: true,
    // opacity: 0.45,
    // wireframe: true
} );

const loader = new STLLoader();
let mesh = new THREE.Mesh();

const group = new THREE.Group();
group.position.y = -20;

loader.load(
    'arms.stl',
    function (geometry) {
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(20, -100, 0);
        mesh.rotation.y = Math.PI/2 - 0.1;
        // mesh.rotation.z = 0.1;

        group.add( mesh );
        scene.add( group );
        document.querySelector('canvas').classList.add('ready')
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)


const geometry = new THREE.BoxGeometry( 1, 1, 1 );

camera.position.z = 50;
let spinDirection = 1;
// group.rotation.y = 0.25;
function animate() {
	requestAnimationFrame( animate );

    if (group.rotation.x > 1.9) { spinDirection = -1; }
    else if (group.rotation.x < -1) { spinDirection = 1; }
    
    group.rotation.x += spinDirection * 0.0005;
    if (group.rotation.y + 0.001 < 0.25 && group.rotation.y - 0.001 > 0 ) { group.rotation.y += spinDirection * 0.0001; }

    // group.rotation.x = -1.1;
    // group.rotation.y = 0.25;

	renderer.render( scene, camera );
}
animate();

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}