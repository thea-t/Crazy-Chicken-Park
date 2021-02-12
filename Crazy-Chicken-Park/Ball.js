var ballObject;
var direction;
var speed = 0.02;
class Ball {
	constructor() {
		//create geometry and material
		var geometry = new THREE.BoxGeometry();
		var material = new THREE.MeshBasicMaterial({
			//change color of material: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html
			color: 0x808080
		});
		//create a mesh and giving it the geometry and material that was just created
		ballObject = new THREE.Mesh(geometry, material);

		//how to scale an object: https://threejs.org/docs/#api/en/core/Object3D.scale
		ballObject.scale.x = 0.2;
		ballObject.scale.y = 0.2;
		ballObject.scale.z = 0.2;

		//create the staarting direction : https://threejs.org/editor/
		direction = new THREE.Vector3();
		direction.x = Math.random() - 0.5;
		direction.y = - 0.5;
		direction.normalize();
	}

	//move the ball  https://threejs.org/editor/
	movement() {
		if (ballObject.position.x < - 2.3 || ballObject.position.x > 2.3) direction.x = - direction.x;
		if (ballObject.position.y < - 2.3 || ballObject.position.y > 2.3) direction.y = - direction.y;
		ballObject.translateX(direction.x * speed);
		ballObject.translateY(direction.y * speed);
	};


}