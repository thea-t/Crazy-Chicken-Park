//variables
var ballSpeed = 0.02;
var fireballEnabled = false;

class Ball {
    constructor() {
        //creating geometry and material
        var geometry = new THREE.SphereGeometry();
        var material = new THREE.MeshBasicMaterial({
            //change color of material: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html
            color: 0xf8e54e
        });
        //creating a mesh and giving it the geometry and material
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

        //if the ball hits to the walls, it changes its direction
        if (this.ballObject.position.x < - 2.5 || this.ballObject.position.x > 2.5) {
            this.direction.x = - this.direction.x;
        }
        if (this.ballObject.position.y > 2.5) {
            this.direction.y = - this.direction.y;
        }

        //translating an object by distance along an axis in object space https://threejs.org/docs/#api/en/core/Object3D.translateX
        this.ballObject.translateX(this.direction.x * ballSpeed);
        this.ballObject.translateY(this.direction.y * ballSpeed);

        //raycast: https://threejs.org/docs/#api/en/core/Raycaster
        //updating the ray with a new origin and direction. 
        raycaster.set(this.ballObject.position, this.direction);

        //checking all intersections between the ray and the bricks, and assigns it to an array 
        var intersections = raycaster.intersectObjects(scene.children);

        //checking if there are more than 1 elements in the array of intersections and assigns the first element of the array to a variable
        if (intersections.length > 0) {
            var intersection = intersections[0];

            //checks the distance between the brick and the ball 
            if (intersection.distance < 0.15) {

                // checks if the ball is not intersecting with the paddle in order to call the onHit function for every brick 
                // that intersects with the ball. If that brick is not already destroyed, in remove it from the scene and add points
                if (intersection.object !== paddleObject) {
                    for (var i = 0; i < allBricks.length; i++) {
                        if (intersection.object == allBricks[i].brickObj && allBricks[i].alreadyDestroyed == false) {
                            allBricks[i].onHit();

                            // if the fireball powerup is disabled, reflect by changing the direction of the ball
                            if (fireballEnabled == false) {
                                this.direction.reflect(intersection.face.normal);
                            }
                        }
                    }

                }
                //if the ball is intersecting with the paddle, reflect by changing the direction of the ball
                else {
                    this.direction.reflect(intersection.face.normal);
                }

            }

        }
        // if there is only 1 ball in the scene and it falls(doesn't touch the paddle) , reset its podition and lose a life
        if (this.ballObject.position.y < - 3) {
            if (allBalls.length == 1) {

                this.ballObject.position.x = 0;
                this.ballObject.position.y = 0;
                onLifeLost();
            }
            //if there are more than 1 balls on the scene and one of them falls (doesn't touch the paddle), remove it from the scene and the array called allBalls
            else {
                //removing items from arrays: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
                //https://www.w3schools.com/jsref/jsref_splice.asp
                const index = allBalls.indexOf(this);
                allBalls.splice(index, 1);
                scene.remove(this.ballObject);
            }
        }
    };

    //function that resets the position of the ball when called
    resetPosition() {

        this.ballObject.position.x = 0;
        this.ballObject.position.y = 0;

        //create the starting direction of the ball which is always random: https://threejs.org/editor/
        this.direction = new THREE.Vector3();
        this.direction.x = Math.random() - 0.5;
        this.direction.y = - 0.5;
        this.direction.normalize();
    }
}