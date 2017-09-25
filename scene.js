


var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );







////////// CUBE
var wood = new THREE.MeshStandardMaterial({
  // color: new THREE.Color().setHSL( 0.1, 1, 0.8 ),
  // color: new THREE.Color().setHex( 0x95c4fb ),
  // flatShading: true,
  // reflectivity: 10,
  // shininess: 32,
  // roughness: 64,
  // metalness: 0,
  // wireframe: true,
  // side: THREE.DoubleSide
  // emissive: 0x777777,
  // emissiveIntensity: 0.1,
	roughness: 2,
	color: 0xffffff,
	metalness: 0,
	bumpScale: 0.000
});

var brick = new THREE.MeshStandardMaterial({
  // color: new THREE.Color().setHSL( 0.1, 1, 0.8 ),
  // color: new THREE.Color().setHex( 0x95c4fb ),
  // flatShading: true,
  // reflectivity: 10,
  // shininess: 32,
  // roughness: 64,
  // metalness: 0,
  // wireframe: true,
  // side: THREE.DoubleSide
  // emissive: 0x777777,
  // emissiveIntensity: 0.1,
	roughness: 32,
	color: 0xffffff,
	metalness: 0.5,
	bumpScale: 0.000
});

var grass = new THREE.MeshStandardMaterial({
  // color: new THREE.Color().setHSL( 0.1, 1, 0.8 ),
  // color: new THREE.Color().setHex( 0x95c4fb ),
  // flatShading: true,
  // reflectivity: 10,
  // shininess: 32,
  // roughness: 64,
  // metalness: 0,
  // wireframe: true,
  // side: THREE.DoubleSide
  // emissive: 0x777777,
  // emissiveIntensity: 0.1,
	roughness: 64,
	color: 0xffffff,
	metalness: 0.5,
	bumpScale: 1
});
var textureLoader = new THREE.TextureLoader();
textureLoader.load( "textures/2_green grass texture-seamless.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 0;
  map.repeat.set( 256, 256 );
  grass.map = map;
  grass.needsUpdate = true;
} );
// // textureLoader.load( "textures/2_green grass texture-seamless_bump.jpg", function( map ) {
// //   map.wrapS = THREE.RepeatWrapping;
// //   map.wrapT = THREE.RepeatWrapping;
// //   map.anisotropy = renderer.capabilities.getMaxAnisotropy();
// //   map.repeat.set( 256, 256 );
// //   grass.bumpMap = map;
// //   grass.needsUpdate = true;
// // } );
// textureLoader.load( "textures/2_green grass texture-seamless_displacement.jpg", function( map ) {
//   map.wrapS = THREE.RepeatWrapping;
//   map.wrapT = THREE.RepeatWrapping;
//   map.anisotropy = renderer.capabilities.getMaxAnisotropy();
//   map.repeat.set( 256, 256 );
//   grass.roughnessMap = map;
//   grass.needsUpdate = true;
// } );
// textureLoader.load( "textures/2_green grass texture-seamless_specular.jpg", function( map ) {
//   map.wrapS = THREE.RepeatWrapping;
//   map.wrapT = THREE.RepeatWrapping;
//   map.anisotropy = renderer.capabilities.getMaxAnisotropy();
//   map.repeat.set( 256, 256 );
//   grass.aoMap = map;
//   grass.needsUpdate = true;
// } );
textureLoader.load( "textures/hardwood2_diffuse.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 0;
  map.repeat.set( 1, 1 );
  wood.map = map;
  wood.needsUpdate = true;
} );
// textureLoader.load( "textures/hardwood2_bump.jpg", function( map ) {
//   map.wrapS = THREE.RepeatWrapping;
//   map.wrapT = THREE.RepeatWrapping;
//   map.anisotropy = renderer.capabilities.getMaxAnisotropy();
//   map.repeat.set( 1, 1 );
//   wood.bumpMap = map;
//   wood.needsUpdate = true;
// } );
// textureLoader.load( "textures/hardwood2_roughness.jpg", function( map ) {
//   map.wrapS = THREE.RepeatWrapping;
//   map.wrapT = THREE.RepeatWrapping;
//   map.anisotropy = renderer.capabilities.getMaxAnisotropy();
//   map.repeat.set( 1, 1 );
//   wood.roughnessMap = map;
//   wood.needsUpdate = true;
// } );
textureLoader.load( "textures/brick_diffuse.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 0;
  map.repeat.set( 1, 1 );
  brick.map = map;
  brick.needsUpdate = true;
} );
// textureLoader.load( "textures/brick_bump.jpg", function( map ) {
//   map.wrapS = THREE.RepeatWrapping;
//   map.wrapT = THREE.RepeatWrapping;
//   map.anisotropy = renderer.capabilities.getMaxAnisotropy();
//   map.repeat.set( 1, 1 );
//   brick.bumpMap = map;
//   brick.needsUpdate = true;
// } );
// textureLoader.load( "textures/brick_roughness.jpg", function( map ) {
//   map.wrapS = THREE.RepeatWrapping;
//   map.wrapT = THREE.RepeatWrapping;
//   map.anisotropy = renderer.capabilities.getMaxAnisotropy();
//   map.repeat.set( 1, 1 );
//   brick.roughnessMap = map;
//   brick.needsUpdate = true;
// } );




scene.background = new THREE.Color().setHex( 0x030f23 )
////////// GROUND
var groundGeometry = new THREE.PlaneGeometry( 2000, 2000 );
var ground = new THREE.Mesh( groundGeometry, grass );
ground.position.x = 0;
ground.position.y = 0;
ground.position.z = 0;
ground.rotateX(-Math.PI /2)
ground.receiveShadow = true;
// plane.castShadow = true;
scene.add( ground );



////////// CUBES
var geometry = new THREE.BoxGeometry( 10, 10, 10 );
var cube = new THREE.Mesh( geometry, wood );
cube.castShadow = true;
cube.position.x = 0;
cube.position.y = 5;
cube.position.z = 0;
cube.receiveShadow = true;
// scene.add( cube );
var cube2 = new THREE.Mesh( geometry, brick );
cube2.castShadow = true;
cube2.position.x = 20;
cube2.position.y = 5;
cube2.position.z = 0;
cube2.receiveShadow = true;
scene.add( cube2 );
var cube3 = new THREE.Mesh( geometry, wood );
cube3.castShadow = true;
cube3.position.x = 10;
cube3.position.y = 5;
cube3.position.z = 0;
cube3.receiveShadow = true;
scene.add( cube3 );
var cube4 = new THREE.Mesh( geometry, wood );
cube4.castShadow = true;
cube4.position.x = 0;
cube4.position.y = 5;
cube4.position.z = 10;
cube4.receiveShadow = true;
scene.add( cube4 );

groundGeometry.merge(cube.geometry, cube.matrix)



////////// LIGHTS
var light = new THREE.SpotLight( 0xffffff );
light.castShadow = true;
light.penumbra = 0.8;
light.angle = 1.1;
light.intensity = 1;
// light.decay = 0;
light.position.set( -100, 50, 50 );
light.target = cube;
scene.add( light );

var ambient = new THREE.AmbientLight( 0xffffff, 0.2 );
scene.add( ambient );




// var singleGeometry = new THREE.Geometry();

// var loader = new THREE.ColladaLoader();
// loader.load('models/tree_19.dae', function (collada) {
//   console.log('loaded collada', collada)
//   let tree19 = collada.scene;
//
//   let r = (o) => {
//     if (o.children) {
//       for(let c of o.children) {
//         r(c);
//       }
//     }
//
//     o.castShadow = true
//     o.receiveShadow = true
//     console.log(o.children, o.uuid)
//   }
//
//   tree19.position.x = -25
// 	tree19.scale.x = tree19.scale.y = tree19.scale.z = 0.3;
//
//   // r(tree19)
//
//   singleGeometry.merge(tree19.geometry, tree19.matrix);
//
//
//   // for (let i = 0; i < 25; i++) {
//   //   let x = Math.trunc(Math.random() * 45) - 25
//   //   let z = Math.trunc(Math.random() * 45) - 25
//   //   let s = Math.trunc(2+ Math.random() * 6) / 100
//   //   let obj = tree19.clone()
//   //   console.log(x, z, s)
//   //   obj.position.x = x
//   //   obj.position.z = z
//   // 	obj.scale.x = obj.scale.y = obj.scale.z = s;
//   //   scene.add(obj);
//   // }
//
//   // scene.add(tree19);
// });






// var camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.rotationAutoUpdate = false;
// camera.position.set(1.5, -2, 1.01)
// camera.rotateX(-Math.PI /2)
// camera.rotateZ(-Math.PI )
// camera.rotateY(Math.PI)
// // camera.rotation.set(10,10,10);
// camera.updateProjectionMatrix();


var player = new THREE.Mesh( new THREE.BoxGeometry(4, 18, 5), new THREE.MeshStandardMaterial({ color: 0xffffff }) )
player.castShadow = true
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.rotationAutoUpdate = false;
// camera.rotateZ(-Math.PI )
// camera.rotateY(Math.PI)
// camera.rotation.set(10,10,10);
// camera.updateProjectionMatrix();


var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var runing = false;
var raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 3 );
// var raycasterP = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 1, 0, 1 ), 0, 0.3 );
// var raycasterM = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, -1 ), 0.1, 0.3 );

var controls = new THREE.PointerLockControls(camera)
controls.getObject().add(player)
scene.add( controls.getObject() );
controls.getObject().position.x = 10;
controls.getObject().position.y = 10.1;
controls.getObject().position.z = 30;

// ////////// CONTROLS
// var controls = new THREE.OrbitControls( camera );
// //
// // controls.movementSpeed = 500;
// // controls.lookSpeed = 0.1;
// controls.minDistance = 1;
// controls.maxDistance = 20;
// controls.enablePan = true;
// controls.enableKeys = false;




// camera.lookAt(cube.position);
// camera.position.z = 5;
let controlsEnabled = false;
// let pointerUpdate = (event) => {
//   console.log(event.movementX, event.movementY)
//   camera.rotation.x += -(event.movementY / 30);
//   camera.rotation.y += -(event.movementX / 30);
// }
let pointerlockchange = (event) =>  {
  if(document.pointerLockElement === document.body) {
      controlsEnabled = true;
      controls.enabled = true;
      // document.addEventListener("mousemove", pointerUpdate, false);
  } else {
      controlsEnabled = false;
      controls.enabled = false;
      // document.removeEventListener("mousemove", pointerUpdate, false);
  }
  // console.log('pointer', event)
}
let pointerlockerror = (event) => {
  controlsEnabled = false;
  console.log('pointer', event)
}
document.addEventListener( 'pointerlockchange', pointerlockchange, false );
document.addEventListener( 'pointerlockerror', pointerlockerror, false );
document.body.addEventListener('click', (event) => {
  if (!controlsEnabled) {
    document.body.requestPointerLock();
  }
})

// let movingAxes = {
//   x: [0, 0],
//   y: [0, 0],
//   z: [0, 0]
// }
//
document.addEventListener( 'keydown', (event) => {
  switch ( event.keyCode ) {

    case 38: // up
    case 90: // z
      moveForward = true;
      break;

    case 37: // left
    case 81: // q
      moveLeft = true;
      break;

    case 40: // down
    case 83: // s
      moveBackward = true;
      break;

    case 39: // right
    case 68: // d
      moveRight = true;
      break;

    case 32: // space
      if ( canJump === true ) velocity.y += 200;
      canJump = false;
      break;

    case 16: // shift
      runing = true;
      break;

  }
}, false)

document.addEventListener( 'keyup', (event) => {
  switch( event.keyCode ) {

    case 38: // up
    case 90: // z
      moveForward = false;
      break;

    case 37: // left
    case 81: // q
      moveLeft = false;
      break;

    case 40: // down
    case 83: // s
      moveBackward = false;
      break;

    case 39: // right
    case 68: // d
      moveRight = false;
      break;
    case 16: // shift
      runing = false;
      break;
  }
}, false)


stats = new Stats();
document.body.appendChild( stats.dom );

var helper = new THREE.SpotLightHelper( light );
scene.add( helper );

scene.add( new THREE.AxisHelper( 10 ) );

var animate = function (t) {
	requestAnimationFrame( animate );
  //
  // if (controlsEnabled) {
  //   // camera.position.x += (movingAxes.x[0]-movingAxes.x[1]) / 10
  //   // camera.position.z += (movingAxes.z[0]-movingAxes.z[1]) / 10
  //   // camera.position.y += (movingAxes.y[0]-movingAxes.y[1]) / 10
  //
  //   controls.getObject().translateX((movingAxes.x[0]-movingAxes.x[1]) / 10)
  //   controls.getObject().translateZ((movingAxes.z[0]-movingAxes.z[1]) / 10)
  //   controls.getObject().translateY((movingAxes.y[0]-movingAxes.y[1]) / 10)
  // }

  if ( controlsEnabled === true ) {

    raycaster.ray.origin.copy( controls.getObject().position );
    raycaster.ray.origin.y -= 9;
    // raycasterP.ray.origin.copy( controls.getObject().position );
    // raycasterP.ray.origin.y -= 0.9;
    // raycasterM.ray.origin.copy( controls.getObject().position );
    // raycasterM.ray.origin.y -= 0.9;

    var intersections = raycaster.intersectObjects( [cube, cube2, cube3, cube4] );
    // var iP = raycasterP.intersectObjects([cube, cube2, cube3, cube4,]);
    // var iM = raycasterM.intersectObjects([cube, cube2, cube3, cube4,]);

    var onObject = intersections.length > 0;
    // var onObjectP = iP.length > 0;
    // var onObjectM = iM.length > 0;

    var time = performance.now();
    var delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 100.0 * delta;
    velocity.z  -= velocity.z * 100.0 * delta;

    velocity.y -= 9.8/2 * 100.0 * delta; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveLeft ) - Number( moveRight );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 1800.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 1800.0 * delta;

    if (onObject ) {
      velocity.y = Math.max( 0.0, velocity.y );
      canJump = true;
    }

    // if (onObjectM ) {
      // console.log('onObjectM', iM[0].distance, iM[0].face.normal.x, raycasterM.far, raycasterM.near, iM[0].face.normal.x, iM[0].face.normal.z, iM[0]  )
      // if (iM[0].distance >= raycasterM.near - 0.1) {
        // if (iM[0].face.normal.z) {
          // if (moveForward) {
          //   let dist = new THREE.Vector3().copy( iM[0].object.position ).distanceTo(controls.getObject().position)
          //   let fdist = new THREE.Vector3().copy( iM[0].object.position )
          //   fdist.x *= velocity.x * delta
          //   fdist.z *= velocity.z * delta
          //   fdist = fdist.distanceTo(controls.getObject().position)
          //
          //   console.log('.', dist, fdist)
          // }

          // velocity.z = Math.max(0.0, velocity.z);
          // velocity.x = Math.max(0.0, velocity.x);
        // }

      // }
    // }
    //
    // if (onObjectP ) {
    //   console.log('onObjectP', iP[0].distance, iP[0].face.normal.x, raycasterP.far, raycasterP.near, iP[0].face.normal.x, iP[0].face.normal.z)
    //   if (iP[0].distance > raycasterP.near) {
    //     if (iP[0].face.normal.y) {
    //       console.log('boom', iP[0].face.normal.x, iP[0].face.normal.z)
    //       velocity.y = Math.max(0.0, velocity.y);
    //     }
    //     else {
    //       velocity.z = Math.max(0.0, velocity.z);
    //       velocity.x = Math.max(0.0, velocity.x);
    //     }
    //   }
    // }

    controls.getObject().translateY( velocity.y/4 * delta );
    if (runing) {
      controls.getObject().translateX( velocity.x * delta * 1.2);
      controls.getObject().translateZ( velocity.z * delta * 1.8);
    }
    else {
      controls.getObject().translateX( velocity.x * delta );
      controls.getObject().translateZ( velocity.z * delta );
    }

    if ( controls.getObject().position.y < 11 ) {

      velocity.y = 0;
      controls.getObject().position.y = 11;

      canJump = true;
    }

    prevTime = time;

  }

	  // if (Math.trunc(t/1000) % 2) {
	  // cube.rotation.x += 0.01;
	  // }
	  // else {
	  // cube.rotation.y += 0.01;
	  // }
	  // console.log('animation', arguments)
	// cube.rotation.x += 0.001;
	// cube.rotation.y += 0.001;

  stats.update();
	renderer.render(scene, camera);
};

animate();

// cube.rotation.x += 1;
// cube.rotation.y += 1;

requestAnimationFrame( () => renderer.render(scene, camera) );

window.addEventListener( 'resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  // helper.update();
  renderer.render( scene, camera );
}, false );
