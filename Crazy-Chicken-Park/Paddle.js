var paddleObject;
//var speed = 0.02;
class Paddle{
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


}