var powerUpDropChance = 50;

class Brick {
    constructor(positionX,positionY, lives) {
		this.lives = lives;
		this.positionX = positionX;
		this.positionY = positionY;

		this.scoreGainedOnDestroyed = 50 * lives;
		this.alreadyDestroyed = false;

		this.animating = false;
		this.animationSpeed = 0.01;

		//create geometry and material
		var brickGeometry = new THREE.BoxGeometry();
		var brickMaterial = new THREE.MeshBasicMaterial;
		this.brickMaterial = brickMaterial;
		this.setColor();
	
		//create a mesh and giving it the geometry and material that was just created
		var brickObj = new THREE.Mesh(brickGeometry, brickMaterial);
		this.brickObj = brickObj;

		//how to scale an object: https://threejs.org/docs/#api/en/core/Object3D.scale
		brickObj.scale.x = 0.4;
		brickObj.scale.y = 0.2;
		brickObj.scale.z = 0.1;

		brickObj.position.x = positionX;
		brickObj.position.y = positionY;

		scene.add(brickObj);

	}

	onHit() {
		if (this.lives <= 1) {
			this.animating = true;
			addScore(this.scoreGainedOnDestroyed);

			//setting alreadydestroyed true so that the ball doesn't hit the bricks multiple times while animating
			this.alreadyDestroyed = true;
		}
		else {

			this.lives--;
			this.setColor();
		}

	}

	setColor() {
		if (this.lives == 1)
			this.brickMaterial.color.set(0x1f2733);
		else if (this.lives == 2)
			this.brickMaterial.color.set(0x076b36);
		else if (this.lives == 3)
			this.brickMaterial.color.set(0x1ae13c);
	}

	animate() {
		if (this.animating) {

			this.brickObj.scale.x += this.animationSpeed;
			this.brickObj.scale.y += this.animationSpeed;

			if (this.brickObj.scale.x > 0.6 && this.brickObj.scale.y > 0.3) {
				this.animationSpeed = -0.01;
			}
			else if (this.brickObj.scale.x <= 0 && this.brickObj.scale.y <= 0) {
				//remove this brick from scene
				scene.remove(this.brickObj);


				//remove this brick from allbricks array
				const index = allBricks.indexOf(this);
				allBricks.splice(index, 1);
				if (allBricks.length == 0) {
					onGameWon();
				}
				if (Math.random() < powerUpDropChance / 100) {
					spawnRandomPowerUp(this.positionX, this.positionY);
				}
				this.animating = false;
			}
        }
    }
}