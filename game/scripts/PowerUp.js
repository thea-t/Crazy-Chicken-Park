//array storing all powerups that are active in order to be able to move them at the same time
var allActivePowerUps = new Array();

//variables
var totalPowerUpCount = 6;
var powerUpDuration = 5000;

class PowerUp{
    constructor(){
		//create geometry and material
		var geometry = new THREE.BoxGeometry();
		this.material = new THREE.MeshBasicMaterial;

		//creating a mesh and giving it the geometry and material that was just created
		this.powerUpObject = new THREE.Mesh(geometry, this.material);

		//how to scale an object: https://threejs.org/docs/#api/en/core/Object3D.scale
		this.powerUpObject.scale.x = 0.1;
		this.powerUpObject.scale.y = 0.1;
		this.powerUpObject.scale.z = 0.1;

		this.onDropped();
	}

	//this empty function is called when the powerup is dropped. other powerups can override this
	onDropped() {

    }

	//this function is called when the powerup is collected. other powerups can also override this
	onCollected() {

		//removing items from arrays: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
			//https://www.w3schools.com/jsref/jsref_splice.asp
		const index = allActivePowerUps.indexOf(this);
		if (index > -1) {
			allActivePowerUps.splice(index, 1);
		}
		scene.remove(this.powerUpObject);

	}

	//this function is called in update. it moves the powerUp down
	movement() {
		//if the powerUp goes out of the screen
		if (this.powerUpObject.position.y < -3) {
			//removeing the powerup from allActivePowerUps array
			//removing items from arrays: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
			//https://www.w3schools.com/jsref/jsref_splice.asp
			const index = allActivePowerUps.indexOf(this);
				allActivePowerUps.splice(index, 1);

			//removes the powerup from the scene
			scene.remove(this.powerUpObject);
		}
		//moves the powerup downwards
		this.powerUpObject.translateY(-0.01);


		//raycasting and checking if the powerup intersects with the paddle
		//raycast: https://threejs.org/docs/#api/en/core/Raycaster
		raycaster.set(this.powerUpObject.position, new THREE.Vector3(0, -1, 0));

		var intersections = raycaster.intersectObjects(scene.children);

		if (intersections.length > 0) {

			var intersection = intersections[0];

			if (intersection.distance < 0.1) {

				//calls the onCollected function when power up intersects with the paddle
				if (intersection.object == paddleObject) {
					this.onCollected();
				}
			}

		}
    }
}


function spawnRandomPowerUp(posX, posY) {
	//get a random number between 0 and the total powerup count.
	var randomPowerUpIndex = Math.floor(Math.random() * totalPowerUpCount) + 0;

	//create an empty variable
	var newPowerUp;

	//check powerup index and spawn it
	if (randomPowerUpIndex == 0) {
		newPowerUp = new FireballPowerUp();
		console.log("Fireball dropped!");
	}
	else if (randomPowerUpIndex == 1) {
		newPowerUp = new SplitballPowerUp();
		console.log("Splitball dropped!");
	}
	else if (randomPowerUpIndex == 2) {
		newPowerUp = new SlowballPowerUp();
		console.log("Slowball dropped!");
	}
	else if (randomPowerUpIndex == 3) {
		newPowerUp = new FastballPowerUp();
		console.log("Fastball dropped!");
	}
	else if (randomPowerUpIndex == 4) {
		newPowerUp = new SmallPaddlePowerUp();
		console.log("Small paddle dropped!");
	}
	else if (randomPowerUpIndex == 5) {
		newPowerUp = new BigPaddlePowerUp();
		console.log("Big paddle dropped!");
	}

	//add the new powerup to the scene
	scene.add(newPowerUp.powerUpObject);

	//set the powerups position to the bricks position
	newPowerUp.powerUpObject.position.x = posX;
	newPowerUp.powerUpObject.position.y = posY;


	// how to add something to array: https://alligator.io/js/push-pop-shift-unshift-array-methods/
	allActivePowerUps.push(newPowerUp);
}