var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;

var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshBasicMaterial({ color:0x4444ff })
	)
};
var loadingManager = null;
var RESOURCES_LOADED = false;

// Models index
var models = {
	tent: {
		obj:"models/Tent_Poles_01.obj",
		mtl:"models/Tent_Poles_01.mtl",
		mesh: null
	},
	campfire: {
		obj:"models/Campfire_01.obj",
		mtl:"models/Campfire_01.mtl",
		mesh: null
	},
	pirateship: {
		obj:"models/Pirateship.obj",
		mtl:"models/Pirateship.mtl",
		mesh: null
        
	},
    Bowobj: {
		obj:"models/Bowobj.obj",
		mtl:"models/Bowobj.mtl",
		mesh: null
	},
    Tree: {
		obj:"models/Tree3.obj",
		mtl:"models/Tree3.mtl",
		mesh: null
	},
    Star: {
		obj:"models/Star.obj",
		mtl:"models/Star.mtl",
		mesh: null
	},
    giraff: {
		obj:"models/giraff.obj",
		mtl:"models/giraff.mtl",
		mesh: null
	}
};

// Meshes index
var meshes = {};


function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	
	
	loadingScreen.box.position.set(0,0,5);
	loadingScreen.camera.lookAt(loadingScreen.box.position);
	loadingScreen.scene.add(loadingScreen.box);
	
	loadingManager = new THREE.LoadingManager();
	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};
	loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
		onResourcesLoaded();
	};
	
	/*
	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	mesh.position.y += 1;
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);
    
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(20,20, 10,10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	*/
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	light2 = new THREE.PointLight(0xffffff, 0.8, 18);
	light2.position.set(3,6,3);
	light2.castShadow = true;
	light2.shadow.camera.near = 0.1;
	light2.shadow.camera.far = 25;
	scene.add(light2);
    
    light3 = new THREE.PointLight(0xffffff, 0.8, 18);
	light3.position.set(01,1,01);
	light3.castShadow = true;
	light3.shadow.camera.near = 0.1;
	light3.shadow.camera.far = 25;
	scene.add(light3);
	
	
	var textureLoader = new THREE.TextureLoader(loadingManager);
	crateTexture = textureLoader.load("crate0/crate0_diffuse.jpg");
	//crateBumpMap = textureLoader.load("crate0/crate0_bump.jpg");
	crateNormalMap = textureLoader.load("crate0/crate0_normal.jpg");
    
    crateTexture2 = textureLoader.load("crate0/candy.jpg");
	
    textureSky = THREE.ImageUtils.loadTexture( "crate0/star_sky_texture.jpg" );
    textureSky.wrapS = THREE.RepeatWrapping; 
    textureSky.wrapT = THREE.RepeatWrapping;

    // how many times to repeat in each direction; the default is (1,1),
    //   which is probably why your example wasn't working
    textureSky.repeat.set( 1, 1 ); 
    
     var width =50 ;
    var height = 50 ;
    var Distance =0 ;
    
    materialsky = new THREE.MeshLambertMaterial({ map : textureSky });
    plane3 = new THREE.Mesh(new THREE.PlaneGeometry(width, height), materialsky);
    plane3.material.side = THREE.DoubleSide;
    
   // plane3.position.x = Distance;
    //plane3.position.y = 0;
    //plane3.position.z = 0;
    plane3.position.set(0, 0, 10);
        // rotation.z is rotation around the z-axis, measured in radians (rather than degrees)
    // Math.PI = 180 degrees, Math.PI / 2 = 90 degrees, etc.
    
    //plane3.rotation.y = Math.PI / 2;

    scene.add(plane3);
    
    
	crate = new THREE.Mesh(
		new THREE.BoxGeometry(1.7,1.7,1.7),
		new THREE.MeshPhongMaterial({
			color:0xffffff,
			map:crateTexture,
			//bumpMap:crateBumpMap,
			normalMap:crateNormalMap
		})
	);
	scene.add(crate);
	crate.position.set(2.5, 0.8, -4.5);
	crate.receiveShadow = true;
	crate.castShadow = true;
    
	//----
    
    crate2 = new THREE.Mesh(
		new THREE.BoxGeometry(1.7,1.7,1.7),
		new THREE.MeshPhongMaterial({
			color:0xffffff,
			map:crateTexture2,
			//bumpMap:crateBumpMap,
			//normalMap:crateNormalMap
		})
	);
	scene.add(crate2);
	crate2.position.set(-2.5, 0.8, -4.5);
	crate2.receiveShadow = true;
	crate2.castShadow = true;
    
    
    
	// Load models
	// REMEMBER: Loading in Javascript is asynchronous, so you need
	// to wrap the code in a function and pass it the index. If you
	// don't, then the index '_key' can change while the model is being
	// downloaded, and so the wrong model will be matched with the wrong
	// index key.
	for( var _key in models ){
		(function(key){
			
			var mtlLoader = new THREE.MTLLoader(loadingManager);
			mtlLoader.load(models[key].mtl, function(materials){
				materials.preload();
				
				var objLoader = new THREE.OBJLoader(loadingManager);
				
				objLoader.setMaterials(materials);
				objLoader.load(models[key].obj, function(mesh){
					
					mesh.traverse(function(node){
						if( node instanceof THREE.Mesh ){
							node.castShadow = true;
							node.receiveShadow = true;
						}
					});
					models[key].mesh = mesh;
					
				});
			});
			
		})(_key);
	}
	
	
	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);
	
	animate();
}

// Runs when all resources are loaded
function onResourcesLoaded(){
	
	// Clone models into meshes.
	meshes["tent1"] = models.tent.mesh.clone();
	meshes["tent2"] = models.tent.mesh.clone();
	meshes["campfire1"] = models.campfire.mesh.clone();
	meshes["campfire2"] = models.campfire.mesh.clone();
    
	meshes["pirateship"] = models.pirateship.mesh.clone();
    
    meshes["Bowobj"] = models.Bowobj.mesh.clone();
    meshes["Bowobj2"] = models.Bowobj.mesh.clone();
   meshes["Tree"] = models.Tree.mesh.clone();
    
    meshes["Star"] = models.Star.mesh.clone();
    
    meshes["giraff"] = models.giraff.mesh.clone();
	
	// Reposition individual meshes, then add meshes to scene
	//meshes["tent1"].position.set(-5, 0, 4);
	//scene.add(meshes["tent1"]);
	
	//meshes["tent2"].position.set(-8, 0, 4);
	//scene.add(meshes["tent2"]);
	
	//meshes["campfire1"].position.set(-5, 0, 1);
	//meshes["campfire2"].position.set(-8, 0, 1);
	
	//scene.add(meshes["campfire1"]);
	//scene.add(meshes["campfire2"]);
	
	meshes["pirateship"].position.set(-2,0, 2);
	meshes["pirateship"].rotation.set(0, Math.PI/2, 0); // Rotate it to face the other way.
	scene.add(meshes["pirateship"]);
    
    meshes["Bowobj"].position.set(2.5, 1.8, -4.5);
	scene.add(meshes["Bowobj"]);
    
    meshes["Bowobj2"].position.set(-2.5, 1.8, -4.5);
	scene.add(meshes["Bowobj2"]);
    
   meshes["Tree"].position.set(0, -0.5, 0);
    scene.add(meshes["Tree"]);
    
    meshes["Star"].position.set(0, 5, 0);
    scene.add(meshes["Star"]);
    
    meshes["giraff"].position.set(0, 0.6, -6);
    scene.add(meshes["giraff"]);
}

function animate(){

	// Play the loading screen until resources are loaded.
	if( RESOURCES_LOADED == false ){
		requestAnimationFrame(animate);
		
		loadingScreen.box.position.x -= 0.05;
		if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
		loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
		
		renderer.render(loadingScreen.scene, loadingScreen.camera);
		return;
	}

	requestAnimationFrame(animate);
	
	//mesh.rotation.x += 0.01;
	//mesh.rotation.y += 0.02;
	crate.rotation.y += 0.01;
   // meshes["Star"]..rotation.y += 0.01;
    meshes["Tree"].scale.set(2,2,2);
    meshes["pirateship"].scale.set(0.3,0.3,0.3);
     meshes["Bowobj"].scale.set(0.8,1.3,1.3);
	 meshes["Bowobj"].rotation.y += 0.01;
    meshes["Star"].rotation.y += 0.02;
	
	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;

