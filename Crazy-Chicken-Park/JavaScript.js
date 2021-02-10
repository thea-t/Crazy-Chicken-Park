var ball = this.getObjectByName('Ball');

var direction = new THREE.Vector3();
direction.x = Math.random() - 0.5;
direction.z = - 0.5;
direction.normalize();

var speed = new THREE.Vector3();

//

var group = new THREE.Group();
this.add(group);

var paddle = this.getObjectByName('Paddle');
paddle.material.visible = false;
group.add(paddle);

var brick = this.getObjectByName('Brick');

for (var j = 0; j < 8; j++) {

	var material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });

	for (var i = 0; i < 12; i++) {

		var object = brick.clone();
		object.position.x = i * 2.2 - 12;
		object.position.z = j * 1.4 - 12;
		group.add(object);

		var cylinder = object.getObjectByName('Cylinder');
		cylinder.material = material;

	}

}

brick.visible = false;
brick.material.visible = false;

//

var raycaster = new THREE.Raycaster();

function update(event) {

	if (ball.position.x < - 15 || ball.position.x > 15) direction.x = - direction.x;
	if (ball.position.z < - 20 || ball.position.z > 20) direction.z = - direction.z;

	ball.position.x = Math.max(- 15, Math.min(15, ball.position.x));
	ball.position.z = Math.max(- 20, Math.min(20, ball.position.z));

	raycaster.set(ball.position, direction);

	var intersections = raycaster.intersectObjects(group.children);

	if (intersections.length > 0) {

		var intersection = intersections[0];

		if (intersection.distance < 0.5) {

			if (intersection.object !== paddle) {

				group.remove(intersection.object);

			}

			direction.reflect(intersection.face.normal);

		}

	}

	ball.position.add(speed.copy(direction).multiplyScalar(event.delta / 40));

}