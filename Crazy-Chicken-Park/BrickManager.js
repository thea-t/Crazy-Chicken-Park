var gridWidth = 9;
var gridHeight = 6;
var xOffset = -2;
var yOffset = 0.5;

var allBricks = new Array();

function spawnBricks() {

    var i = 0;
	//how to spawn objects in a grid: https://answers.unity.com/questions/1502338/how-to-make-different-objects-spawn-on-in-grid-pat.html
    for (var x = 0; x < gridWidth; x++) {
        for (var y = 0; y < gridHeight; y++) {
			allBricks[i] = new Brick(x * 0.5 + xOffset, y * 0.3 + yOffset, Math.floor((Math.random() * 3) + 1));
            i++;
        }
    }
}
//called on restart
function destroyAllBricks() {
    for (var i = 0; i < allBricks.length; i++) {
        scene.remove(allBricks[i].brickObj);
    }
}


spawnBricks();