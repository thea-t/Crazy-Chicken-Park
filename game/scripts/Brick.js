//percentage of a brick dropping a powerup
var powerUpDropChance = 50;

class Brick {
    constructor(positionX, positionY, lives) {

        //each brick have lives that are randomly picked between 1 and 3 when they are spawned
        this.lives = Math.floor((Math.random() * 3) + 1);

        this.positionX = positionX;
        this.positionY = positionY;

        //storing how much score it gives when the brick is destroyed
        this.scoreGainedOnDestroyed = 50 * this.lives;

        //checking if the brick is already destroyed so that the ball doesnt hit it again while it is animating.
        this.alreadyDestroyed = false;
        this.animating = false;

        //how fast the brick animation plays
        this.animationSpeed = 0.01;

        //creating geometry and material, then assign them to the brick
        var brickGeometry = new THREE.BoxGeometry();
        var brickMaterial = new THREE.MeshBasicMaterial;
        this.brickMaterial = brickMaterial;
        this.setColor();

        //giving the geometry and material to the brick object
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
        //checks if there is 1 or less lives in order to destroy the brick and add the score
        if (this.lives <= 1) {
            this.animating = true;
            addScore(this.scoreGainedOnDestroyed);

            //setting alreadyDestroyed true so that the ball doesn't hit the bricks multiple times while animating
            this.alreadyDestroyed = true;
        }
        //checks if there are more than 1 life in order to remove 1 life and change the bricks color
        else {
            this.lives--;
            this.setColor();
        }

    }

    //setting the color of the brick based on how many lives it has
    setColor() {
        if (this.lives == 1)
            this.brickMaterial.color.set(0x1f2733);
        else if (this.lives == 2)
            this.brickMaterial.color.set(0x076b36);
        else if (this.lives == 3)
            this.brickMaterial.color.set(0x1ae13c);
    }

    //called on update
    animate() {
        if (this.animating) {

            //while it is animating, scale the brick x and y positions up by some speed
            this.brickObj.scale.x += this.animationSpeed;
            this.brickObj.scale.y += this.animationSpeed;

            //if the scale reaches to a specific value, set the animation speed to negative
            if (this.brickObj.scale.x > 0.6 && this.brickObj.scale.y > 0.3) {
                this.animationSpeed = -0.01;
            }
            //removing the brick from scene and the array when scale reaches to zero
            else if (this.brickObj.scale.x <= 0 && this.brickObj.scale.y <= 0) {
                scene.remove(this.brickObj);
                const index = allBricks.indexOf(this);
                allBricks.splice(index, 1);

                //if there are no more bricks left, win the game
                if (allBricks.length == 0) {
                    onGameWon();
                }
                //if the random percentage is smaller than poweup drop chance, spawn a random powerup in this bricks position
                if (Math.random() < powerUpDropChance / 100) {
                    spawnRandomPowerUp(this.positionX, this.positionY);
                }
                //stop animating
                this.animating = false;
            }
        }
    }
}