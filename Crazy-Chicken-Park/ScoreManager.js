var score = 0;
var startingLivesCount = 3;
var lives;
var gameOver = true;

lives = startingLivesCount;

document.getElementById("livesText").innerHTML = "Press 'Space' to start.";
document.getElementById("scoreText").innerHTML = "Score: " + score;

function onLifeLost() {
    console.log(lives);
    lives--;
    if (lives == 0) {
        //lose the game
        gameOver = true;
        document.getElementById("livesText").innerHTML = "You are out of lives! Press 'Space' to restart.";
    }
    else {
        //reset the ball
        allBalls[0].resetPosition();
        document.getElementById("livesText").innerHTML = "Lives: " + lives;
    }
}

function onGameRestarted() {
    // delete all other balls so that they won't be there when the game is restarted
    for (var i = 0; i < allBalls.length; i++) {
        scene.remove(allBalls[i].ballObject);
    }
    allBalls = new Array();
    allBalls[0] = new Ball();

    gameOver = false;
    destroyAllBricks();
    spawnAllBricks();
    lives = startingLivesCount;
    score = 0;
    document.getElementById("scoreText").innerHTML = "Score: " + score;
    document.getElementById("livesText").innerHTML = "Lives: " + lives;
}

function addScore(amount) {
    score += amount;
    document.getElementById("scoreText").innerHTML = "Score: " + score;
}

function onGameWon() {
    gameOver = true;
    document.getElementById("livesText").innerHTML = "You have cleared the level! Press 'Space' to restart.";
}