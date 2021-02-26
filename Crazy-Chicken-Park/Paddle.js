var paddleObject;
var paddleIsMovingRight = false;
var paddleIsMovingLeft = false;
window.addEventListener("keydown", this.doKeyDown, true);
window.addEventListener("keyup", this.doKeyUp, true);

//var speed = 0.02;
class Paddle {
    constructor() {
        //create geometry and material
        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({
            //change color of material: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html
            color: 0xffffff
        });
        //create a mesh and giving it the geometry and material that was just created
        paddleObject = new THREE.Mesh(geometry, material);

        //how to scale an object: https://threejs.org/docs/#api/en/core/Object3D.scale
        paddleObject.scale.x = 1;
        paddleObject.scale.y = 0.2;
        paddleObject.scale.z = 0.2;

        paddleObject.position.y = -2.5;
    }
    movement() {
        if (paddleIsMovingRight && paddleObject.position.x < 2.5) {
            paddleObject.translateX(0.03);

        }
        if (paddleIsMovingLeft && paddleObject.position.x > - 2.5 ) {
            paddleObject.translateX(-0.03);
        }
    }
}

function doKeyDown(e) {

    //right
    if (e.keyCode == 68) {
        paddleIsMovingRight = true;
    }

    //left
    if (e.keyCode == 65) {
        paddleIsMovingLeft = true;

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