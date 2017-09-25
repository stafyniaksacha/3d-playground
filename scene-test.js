class App {
  constructor () {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.controls = new THREE.PointerLockControls(this.camera);
    this.stats = [
      new Stats(),
      new Stats(),
      new Stats()
    ];
    this.stats[0].showPanel(0)
    this.stats[0].domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
    this.stats[1].showPanel(1)
    this.stats[1].domElement.style.cssText = 'position:absolute;top:0px;left:80px;';
    this.stats[2].showPanel(2)
    this.stats[2].domElement.style.cssText = 'position:absolute;top:0px;left:160px;';

    this.controlsEnabled = false;
    this.performance = {
      anisotropy: 16,
      antialias: true,
      shadow: true,
    }
    this.ressources = {
      textures: {},
      models: {}
    };
    this.actions = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      canJump: true,
      jump: false,
      runing: false
    }

    this.renderer.antialias = this.performance.antialias;
    this.renderer.shadowMap.enabled = this.performance.shadow;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize( window.innerWidth, window.innerHeight);
    this.renderer.autoClear = false;
    this.renderer.sortObjects = false;



    this.loadRessources(() => {
      this.initControls();
      this.initLights();
      this.initScene();
      document.body.appendChild( this.renderer.domElement );
      document.body.appendChild( this.stats[0].dom );
      document.body.appendChild( this.stats[1].dom );
      document.body.appendChild( this.stats[2].dom );


      requestAnimationFrame(() => this.animateScene());
    });
  }

  loadRessources (onLoad) {
    let loaderManager = new THREE.LoadingManager();
    let colladaLoader = new THREE.ColladaLoader(loaderManager );
    let textureLoader = new THREE.TextureLoader( loaderManager );

    loaderManager.onProgress = ( item, loaded, total ) => {
        console.log(`[${loaded}/${total}] loaded "${item}"`)
    };
    loaderManager.onLoad = onLoad;

    this.ressources.textures.grass = textureLoader.load('textures/2_green grass texture-seamless.jpg');
    this.ressources.textures.grass.wrapS = THREE.RepeatWrapping;
    this.ressources.textures.grass.wrapT = THREE.RepeatWrapping;
    this.ressources.textures.grass.repeat.set( 256, 256 );
    this.ressources.textures.grass.anisotropy = this.performance.anisotropy;

    this.ressources.textures.wood = textureLoader.load('textures/hardwood2_diffuse.jpg');
    this.ressources.textures.wood.wrapS = THREE.ClampToEdgeWrapping;
    this.ressources.textures.wood.wrapT = THREE.ClampToEdgeWrapping;
    this.ressources.textures.wood.repeat.set( 1, 1 );
    this.ressources.textures.wood.anisotropy = this.performance.anisotropy;

    this.ressources.textures.brick = textureLoader.load('textures/brick_diffuse.jpg');
    this.ressources.textures.brick.wrapS = THREE.RepeatWrapping;
    this.ressources.textures.brick.wrapT = THREE.RepeatWrapping;
    this.ressources.textures.brick.repeat.set( 1, 1 );
    this.ressources.textures.brick.anisotropy = this.performance.anisotropy;

    this.ressources.models.tree_19 = new THREE.Object3D();
    colladaLoader.load('models/tree_19.dae', (collada) =>   {
      this.ressources.models.tree_19.copy(collada.scene);
    });
    this.ressources.models.tree_20 = new THREE.Object3D();
    colladaLoader.load('models/tree_20.dae', (collada) =>   {
      this.ressources.models.tree_20.copy(collada.scene);
    });
    this.ressources.models.tree_27 = new THREE.Object3D();
    colladaLoader.load('models/tree_27.dae', (collada) =>   {
      this.ressources.models.tree_27.copy(collada.scene);
    });
    this.ressources.models.goku = new THREE.Object3D();
    colladaLoader.load('models/goku-dae/goku.dae', (collada) =>   {
      this.ressources.models.goku.copy(collada.scene);
    });
  }

  initControls () {
      // enable controls when user focus
      let pointerlockchange = (event) =>  {
        if(document.pointerLockElement === document.body) {
            this.controls.enabled = true;
        } else {
            this.controls.enabled = false;
        }
      }
      let pointerlockerror = (event) => {
        this.controls.enabled = false;
      }

      document.addEventListener( 'pointerlockchange', pointerlockchange, false );
      document.addEventListener( 'pointerlockerror', pointerlockerror, false );

      document.body.addEventListener('click', (event) => {
        if (!this.controls.enabled) {
          document.body.requestPointerLock();
        }
      });

      // register ZSQD (actions) events
      document.addEventListener( 'keydown', (event) => {
        switch ( event.keyCode ) {

          case 38: // up
          case 90: // z
            this.actions.forward = true;
            break;

          case 37: // left
          case 81: // q
            this.actions.left = true;
            break;

          case 40: // down
          case 83: // s
            this.actions.backward = true;
            break;

          case 39: // right
          case 68: // d
            this.actions.right = true;
            break;

          case 32: // space
            if ( this.actions.canJump === true ) this.actions.jump = true;
            this.actions.canJump = false;
            break;

          case 16: // shift
            this.actions.runing = true;
            break;

        }
      }, false)

      document.addEventListener( 'keyup', (event) => {
        switch( event.keyCode ) {

          case 38: // up
          case 90: // z
            this.actions.forward = false;
            break;

          case 37: // left
          case 81: // q
            this.actions.left = false;
            break;

          case 40: // down
          case 83: // s
            this.actions.backward = false;
            break;

          case 39: // right
          case 68: // d
            this.actions.right = false;
            break;
          case 16: // shift
            this.actions.runing = false;
            break;
        }
      }, false)


      this.controls.getObject().position.x = 10;
      this.controls.getObject().position.y = 11;
      this.controls.getObject().position.z = 30;
      this.scene.add(this.controls.getObject());
  }

  initLights () {
    let light = new THREE.SpotLight( 0xffffff );
    light.castShadow = true;
    light.penumbra = 0.8;
    light.angle = 1.1;
    light.intensity = 1;
    // light.decay = 0;
    light.position.set( -100, 50, 50 );
    light.target = this.controls.getObject()
    this.scene.add( light );

    let ambient = new THREE.AmbientLight( 0xffffff, 0.0);
    this.scene.add( ambient );
  }

  initScene () {
    this.scene.background = new THREE.Color().setHex( 0x030f23 )
    this.scene.fog = new THREE.Fog(0x030f23, 10, 1000)

    let grassMaterial = new THREE.MeshStandardMaterial({
    	bumpScale: 1,
    	roughness: 64,
    	metalness: 0.5,
      map: this.ressources.textures.grass
    });
    let woodMaterial = new THREE.MeshStandardMaterial({
    	bumpScale: 0,
    	roughness: 2,
    	metalness: 0,
      map: this.ressources.textures.wood
    });
    let brickMaterial = new THREE.MeshStandardMaterial({
    	bumpScale: 0,
    	roughness: 32,
    	metalness: 0.5,
      map: this.ressources.textures.brick
    });

    let groundGeometry = new THREE.PlaneGeometry( 2000, 2000 );
    let ground = new THREE.Mesh( groundGeometry, grassMaterial );
    ground.position.x = 0;
    ground.position.y = 0;
    ground.position.z = 0;
    ground.rotateX(-Math.PI /2)
    // ground.receiveShadow = true;
    // ground.castShadow = true;

    // ground.matrixAutoUpdate = false;
    // ground.updateMatrix();

    this.scene.add(ground)


    let cubeGeometry = new THREE.BoxGeometry( 10, 10, 10 );
    for ( let face in cubeGeometry.faces ) {
      cubeGeometry.faces[ face ].materialIndex = 0;
    }

    let cubes = [];
    for (let i = 0; i < 100; i++) {
      let cube = new THREE.Mesh( cubeGeometry, Math.round(Math.random()) ? woodMaterial : brickMaterial);
      cube.position.x = Math.trunc(Math.random() * 2000) - 1000;
      cube.position.y = 5;
      cube.position.z = Math.trunc(Math.random() * 2000) - 1000;
      // cube.receiveShadow = true;
      // cube.castShadow = true;
      // cube.matrixAutoUpdate = false;
      // cube.updateMatrix();

      this.scene.add(cube)
      // cubes.push(cube);
    }


    // let worldGeometry = new THREE.Geometry();
    // worldGeometry.merge( ground.geometry, ground.matrix, 0 );
    // for (let l = cubes.length, i=0; i<l; i++) {
    //   worldGeometry.merge( cubes[i].geometry, cubes[i].matrix, Math.round(Math.random()) + 1 );
    // }
    //
    // let world = new THREE.Mesh( worldGeometry, [ grassMaterial, woodMaterial, brickMaterial ] );
    // world.receiveShadow = true;
    // world.castShadow = true;
    // this.scene.add( world );
    //
    // let tree = this.ressources.models.tree_19.clone();
    // tree.position.x = -5
    // tree.position.y = 0
    // tree.position.z = -5
    // tree.scale.x = tree.scale.y = tree.scale.z = 0.1;
    // // tree.matrixAutoUpdate = false;
    // // tree.updateMatrix();
    // this.scene.add(tree)


    let goku = this.ressources.models.goku;
    goku.position.x = -5
    goku.position.y = 0
    goku.position.z = -5
    goku.scale.x = goku.scale.y = goku.scale.z = 1;
    // tree.matrixAutoUpdate = false;
    // tree.updateMatrix();
    this.scene.add(goku)
  }

  updateCamera (delta, velocity, direction) {
    let obj = this.controls.getObject()


    obj.translateX( -(Number( this.actions.left ) - Number( this.actions.right )) * 1 *(Number(this.actions.runing+1)) )
    obj.translateZ( -(Number( this.actions.forward ) - Number( this.actions.backward )) * 1 *(Number(this.actions.runing+1)) )
    //
    // velocity.x -= velocity.x * 100.0 * delta;
    // velocity.z  -= velocity.z * 100.0 * delta;
    //
    // velocity.y -= 9.8/2 * 100.0 * delta; // 100.0 = mass
    //
    // direction.z = Number( this.actions.forward ) - Number( this.actions.backward );
    // direction.x = Number( this.actions.left ) - Number( this.actions.right );
    // direction.normalize(); // this ensures consistent movements in all directions
    //
    //   if (this.actions.jump) {
    //     velocity.y  += 200.0;
    //     this.actions.jump = false;
    //   }
    // if ( this.actions.forward || this.actions.backward ) velocity.z -= direction.z * 4000.0 * delta;
    // if ( this.actions.left || this.actions.right ) velocity.x -= direction.x * 4000.0 * delta;
    //
    // this.controls.getObject().translateY( velocity.y/4 * delta );
    // if (this.actions.runing) {
    //   this.controls.getObject().translateX( velocity.x * delta * 1.2);
    //   this.controls.getObject().translateZ( velocity.z * delta * 1.8);
    // }
    // else {
    //   this.controls.getObject().translateX( velocity.x * delta );
    //   this.controls.getObject().translateZ( velocity.z * delta );
    // }
    //
    // if ( this.controls.getObject().position.y < 11 ) {
    //
    //   velocity.y = 0;
    //   this.controls.getObject().position.y = 11;
    //
    //   this.actions.canJump = true;
    // }
  }

  animateScene () {
    let time, delta = 0;
    let prevTime = performance.now();
    let velocity = new THREE.Vector3();
    let direction = new THREE.Vector3();

    let render = (t) => {
      requestAnimationFrame(render);

      time = performance.now();
      delta = ( time - prevTime ) / 1000;

      if ( this.controls.enabled === true ) {
        this.updateCamera(delta, velocity, direction);
      }

      this.stats[0].update();
      this.stats[1].update();
      this.stats[2].update();

    	this.renderer.render(this.scene, this.camera);

      console.log(this.renderer.info.render)

      prevTime = time;
    }

    render();
  }
}


let app = new App();
