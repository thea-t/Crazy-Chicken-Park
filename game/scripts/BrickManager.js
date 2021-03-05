//number of bricks that are spawned horizontally and vertically
var gridWidth = 9;
var gridHeight = 6;
//x and y spawn offsets
var xOffset = -2;
var yOffset = 0.5;

//creating an array and store all bricks
var allBricks = new Array();

function spawnAllBricks() {
    allBricks = new Array();
    var i = 0;
    //how to spawn objects in a grid: https://answers.unity.com/questions/1502338/how-to-make-different-objects-spawn-on-in-grid-pat.html
    for (var x = 0; x < gridWidth; x++) {
        for (var y = 0; y < gridHeight; y++) {
            allBricks[allBricks.length] = new Brick(x * 0.5 + xOffset, y * 0.3 + yOffset);
            i++;
        }
    }
}

//called on restart. Removes all bricks from the scene
function destroyAllBricks() {
    for (var i = 0; i < allBricks.length; i++) {
        scene.remove(allBricks[i].brickObj);
    }
}