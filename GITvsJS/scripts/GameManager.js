
//create the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
var raycaster = new THREE.Raycaster();
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//create the ground
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({
	//change color of material: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html
	color: 0x0d1117
});
ground = new THREE.Mesh(geometry, material);

//how to scale an object: https://threejs.org/docs/#api/en/core/Object3D.scale
ground.scale.x = 5;
ground.scale.y = 5;
ground.scale.z = 0.01;
ground.position.z = -0.2;

//ball and paddle instances
var allBalls = new Array();
var paddle = new Paddle();

//adding the ground and paddle to the scene
scene.add(ground);
scene.add(paddleObject);

//adjust the camera pos
camera.position.z = 5;

window.addEventListener("keydown", this.doKeyDown, true);
window.addEventListener("keyup", this.doKeyUp, true);


function doKeyDown(e) {

	//right
	if (e.keyCode == 68) {
		paddleIsMovingRight = true;
	}

	//left
	if (e.keyCode == 65) {
		paddleIsMovingLeft = true;

	}

	if (e.keyCode == 32 && gameOver == true) {
		onGameRestarted();
    }
}
function doKeyUp(e) {

	//right
	if (e.keyCode == 68) {
		paddleIsMovingRight = false;

	}

	//left
	if (e.keyCode == 65) {
		paddleIsMovingLeft = false;

	}
}

//main animate function 
const animate = function () {
	requestAnimationFrame(animate);
	if (gameOver == false) {
		
		//make the ball move by calling the movement function that was created in the ball class
		for (var i = 0; i < allBalls.length; i++) {
			allBalls[i].movement();
		}
		paddle.movement();

		//move all powerups
		for (var i = 0; i < allActivePowerUps.length; i++) {
			allActivePowerUps[i].movement();
		}
		//how to check if something is undefined https://stackoverflow.com/questions/3390396/how-can-i-check-for-undefined-in-javascript
		if (typeof allBricks !== 'undefined') {
			for (var i = 0; i < allBricks.length; i++) {
				allBricks[i].animate();
			}
		}
	}
	renderer.render(scene, camera);
};

animate();


