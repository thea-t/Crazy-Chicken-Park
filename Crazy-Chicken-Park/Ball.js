var ballSpeed = 0.02;
var fireballEnabled = false;
class Ball {
	constructor() {
		//create geometry and material
		var geometry = new THREE.SphereGeometry();
		var material = new THREE.MeshBasicMaterial({
			//change color of material: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html
			color: 0x808080
		});
		//create a mesh and giving it the geometry and material that was just created
		this.ballObject = new THREE.Mesh(geometry, material);
		scene.add(this.ballObject);
		//how to scale an object: https://threejs.org/docs/#api/en/core/Object3D.scale
		this.ballObject.scale.x = 0.08;
		this.ballObject.scale.y = 0.08;
		this.ballObject.scale.z = 0.08;

		this.resetPosition();
	}



	//move the ball  https://threejs.org/editor/
	movement() {
		if (this.ballObject.position.x < - 2.5 || this.ballObject.position.x > 2.5) this.direction.x = - this.direction.x;
		if (this.ballObject.position.y > 2.5) this.direction.y = - this.direction.y;
		this.ballObject.translateX(this.direction.x * ballSpeed);
		this.ballObject.translateY(this.direction.y * ballSpeed);

		//raycast: https://threejs.org/docs/#api/en/core/Raycaster
		raycaster.set(this.ballObject.position, this.direction);

		var intersections = raycaster.intersectObjects(scene.children);

		if (intersections.length > 0) {

			var intersection = intersections[0];

			if (intersection.distance < 0.2) {

				if (intersection.object !== paddleObject) {
					for (var i = 0; i < allBricks.length; i++) {
						if (intersection.object == allBricks[i].brickObj) {
							allBricks[i].onHit();

							// if the fireball powerup is disabled, reflect
							if (fireballEnabled == false) {
								this.direction.reflect(intersection.face.normal);
                            }
                        }
                    }
					//scene.remove(intersection.object);

				}
				else {
					this.direction.reflect(intersection.face.normal);
                }

			}

		}
		if (this.ballObject.position.y < - 3) {

		//check how many balls are active in the scene
			if (allBalls.length == 1) {
				restartGame();
			}
			else {
				//removing items from arrays: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
				//https://www.w3schools.com/jsref/jsref_splice.asp
				const index = allBalls.indexOf(this);

				if (index > -1) {
					allBalls.splice(index, 1);
				}
				scene.remove(this.ballObject);
            }
		}
	};

	resetPosition() {

		this.ballObject.position.x = 0;
		this.ballObject.position.y = 0;

		//create the staarting direction : https://threejs.org/editor/
		this.direction = new THREE.Vector3();
		this.direction.x = Math.random() - 0.5;
		this.direction.y = - 0.5;
		this.direction.normalize();
    }
}