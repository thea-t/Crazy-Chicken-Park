//creating the scene, camera, raycaster and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
var raycaster = new THREE.Raycaster();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//creating the ground that everything is placed on
function createGround() {
	var geometry = new THREE.BoxGeometry();
	var material = new THREE.MeshBasicMaterial({
		//change color of material: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html
		color: 0x0d1117
	});
	ground = new THREE.Mesh(geometry, material);

	//scale the ground
	//how to scale an object: https://threejs.org/docs/#api/en/core/Object3D.scale
	ground.scale.x = 5;
	ground.scale.y = 5;
	ground.scale.z = 0.01;

	//moving the ground behind other objects
	ground.position.z = -0.2;

	//adding ground to the scene
	scene.add(ground);
}

createGround();

//create all balls array and a paddle instance
var allBalls = new Array();
var paddle = new Paddle();

//adding paddle to the scene
scene.add(paddleObject);

//adjusting the camera pos
camera.position.z = 5;

//adding event listener in order to be able to control the paddle movement with keyboard keys
window.addEventListener("keydown", this.doKeyDown, true);
window.addEventListener("keyup", this.doKeyUp, true);


function doKeyDown(e) {

	//while pressing "D" move the paddle right
	if (e.keyCode == 68) {
		paddleIsMovingRight = true;
	}

	//while pressing "A" move the paddle left 
	if (e.keyCode == 65) {
		paddleIsMovingLeft = true;

	}
	//restart the game when "space" is pressed and if the game is over 
	if (e.keyCode == 32 && gameOver == true) {
		onGameRestarted();
    }
}
function doKeyUp(e) {

	//stop moving right when the "D" key is released
	if (e.keyCode == 68) {
		paddleIsMovingRight = false;

	}

	//stop moving left when the "A" key is released
	if (e.keyCode == 65) {
		paddleIsMovingLeft = false;

	}
}

//main animate function. In order to move the objects in the scene, the movement function of every object that needs to move is called here
const animate = function () {
	//https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
	//create a loop that causes the renderer to draw the scene every time the screen is refreshed
	requestAnimationFrame(animate);

	//check if the game is over
	if (gameOver == false) {
		
		//make all the balls in the scene move by calling the movement function that was created in the ball class
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

//calling the animate function in order to run and move the objects 
animate();


