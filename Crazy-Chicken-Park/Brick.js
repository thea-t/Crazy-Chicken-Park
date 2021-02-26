var powerUpDropChance = 50;
class Brick {
    constructor(positionX,positionY, lives) {
		this.lives = lives;
		this.positionX = positionX;
		this.positionY = positionY;

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
			scene.remove(this.brickObj);
			//if less than 50% chance
			if (Math.random() < powerUpDropChance / 100) {
				spawnRandomPowerUp(this.positionX, this.positionY); 
            }
		}
		else {

			this.lives--;
			this.setColor();
        }
	}

	setColor() {
		if (this.lives == 1)
			this.brickMaterial.color.set(0xdc143c);
		else if (this.lives == 2)
			this.brickMaterial.color.set(0x800080);
		else if (this.lives == 3)
			this.brickMaterial.color.set(0x0000ff);
    }
}