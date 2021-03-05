//storing the paddle object
var paddleObject;

// true while left or right buttons are pressed
var paddleIsMovingRight = false;
var paddleIsMovingLeft = false;


class Paddle {
    constructor() {
        //creating geometry and material
        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({
            //changing color of material: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html
            color: 0xf8e54e
        });
        //creating a mesh and giving it the geometry and material that was just created
        paddleObject = new THREE.Mesh(geometry, material);

        //scaling the paddle
        //how to scale an object: https://threejs.org/docs/#api/en/core/Object3D.scale
        paddleObject.scale.x = 1;
        paddleObject.scale.y = 0.2;
        paddleObject.scale.z = 0.2;

        paddleObject.position.y = -2.5;
    }

    movement() {
        //moves the paddle right 
        if (paddleIsMovingRight && paddleObject.position.x < 2.5) {
            paddleObject.translateX(0.03);

        }
        //moves the paddle left
        if (paddleIsMovingLeft && paddleObject.position.x > - 2.5) {
            paddleObject.translateX(-0.03);
        }
    }
}