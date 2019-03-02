var counter = 0

class Game {
  constructor() {
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    const game = this;

    /* CAMERA */

    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, .1, 100);
    this.camera.position.set(-30, 12, 40);

    /* LIGHTS */

    var light2 = new THREE.DirectionalLight(0xffffbb, 1);
    light2.position.set(10, 0, -10);
    this.scene.add(light2);

    var light3 = new THREE.DirectionalLight(0xffffbb, 1);
    light3.position.set(-10, 0, 10);
    this.scene.add(light3);
    this.controls = new THREE.OrbitControls(this.camera);
    this.scene.add(light2);

    /* SUN */

    const loader = new THREE.FBXLoader();
    loader.load("sun.fbx", function (object) {
      game.planet = object;
      game.scene.add(object);
      game.controls.target = object.position.clone();
      game.controls.update();
      game.animate();

    }, null, function (error) {
      console.error(error);
    })

    /* PLANET EARTH */

    const loader2 = new THREE.FBXLoader();
    loader2.load("earth.fbx", function (object) {
      game.planet2 = object;
      game.planet2.position.x = 16
      game.planet2.position.z = 16
      game.scene.add(object);

      game.animate();
    }, null, function (error) {
      console.error(error);
    })

    /* SPACE SKYBOX */

    const tloader = new THREE.CubeTextureLoader();
    tloader.setPath('./images/');
    var textureCube = tloader.load([
      'purplenebula_ft.jpg', 'purplenebula_bk.jpg',
      'purplenebula_up.jpg', 'purplenebula_dn.jpg',
      'purplenebula_rt.jpg', 'purplenebula_lf.jpg'
    ]);
    this.scene.background = textureCube;

  }

  animate() {
    const game = this;

    /* EARTH ORBIT */

    var radius = 32
    var x = (Math.sin(counter) * radius)
    var z = (Math.cos(counter) * radius)

    counter = counter + 0.001

    this.planet2.position.x = x
    this.planet2.position.z = z
    this.planet2.rotation.y += 0.01

    requestAnimationFrame(function () { game.animate(); });
    this.renderer.render(this.scene, this.camera);
  }
}
