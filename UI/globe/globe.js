
window.onload = function init() 
{
	const canvas = document.getElementById( "gl-canvas" );
	const renderer = new THREE.WebGLRenderer({canvas});
	
	// Earth params
	var radius   = 0.5,
		segments = 32,
		rotation = 6;  

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.01, 1000);
	camera.position.z = 1.5;

	scene.add(new THREE.AmbientLight(0xCCCCCC));

	// var light = new THREE.DirectionalLight(0xffffff, 1);
	// light.position.set(5,3,5);
	// scene.add(light); 

    var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation; 
	scene.add(sphere)

    var clouds = createClouds(radius, segments);
	clouds.rotation.y = rotation;
	scene.add(clouds)

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	const loader = new THREE.GLTFLoader();
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	// var pin_Eiffel = createPins('EiffelTower', (-0.4, -0.3, -0.2), (0.2,-0.8, 0.5));

	// EiffelTower pin //
	loader.load('./model/pin.gltf', function(gltf){
	
		pin_Eiffel = gltf.scene.children[0];
		pin_Eiffel.name = 'EiffelTower';
		console.log(pin_Eiffel.name);
		pin_Eiffel.scale.set(0.3,0.3,0.3);
		pin_Eiffel.position.set(0.4,-0.4,-0.3);
		pin_Eiffel.rotation.set(0.2,-0.8,0.5);
		scene.add(gltf.scene);
		}, undefined, function (error) {
			console.error(error);
		});
	
		

	renderer.domElement.addEventListener('click', onClick, false);

	function onClick() {
		event.preventDefault();

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );

		var intersects = raycaster.intersectObjects( scene.children, true );

		if (intersects.length > 0) {
			console.log('Intersection:', intersects[0])	;
			if (intersects[0].object.name === 'EiffelTower') {
				console.log("click on EiffelTower");
			}
		}
	}

	render();

	function render() {
		controls.update();
		// sphere.rotation.y += 0.0005;
		// clouds.rotation.y += 0.0005;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				specular:    new THREE.Color('grey')								
			})
		);
	}

	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);		
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}

	// function createPins(name, position, rotation) {
		
	// 	return loader.load('./model/pin.gltf', function(gltf) {
	// 		pin = gltf.scene.children[0];
	// 		pin.name = name;
	// 		print(pin.name);
	// 		pin.scale.set(0.3, 0.3, 0.3);
	// 		pin.position.set(position);
	// 		pin.rotation.set(rotation);
	// 		scene.add(gltf.scene);
	// 	}, undefined, function (error) {
	// 		console.error(error);
	// 	}
			
	// 	)
	// }
}




