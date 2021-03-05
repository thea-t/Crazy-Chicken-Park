//variables
var score = 0;
var lives;
var startingLivesCount = 3;

//this is set to false when the game starts and to true when the game is over
var gameOver = true;

//setting the lives the same as starting lives when the game starts
lives = startingLivesCount;

//setting the lives and score texts
document.getElementById("livesText").innerHTML = "Press 'Space' to start.";
document.getElementById("scoreText").innerHTML = "Score: " + score;

function onLifeLost() {

    //removes 1 life
    lives--;

    //if theres no life left lose the game an set the lives text
    if (lives == 0) {
        gameOver = true;
        document.getElementById("livesText").innerHTML = "You are out of lives! Press 'Space' to restart.";
    }
    //if theres more than 0 lives, reset the balls position
    else {
        allBalls[0].resetPosition();
        document.getElementById("livesText").innerHTML = "Lives: " + lives;
    }
}

//this is called when the space button is pressed and the game is restarted
function onGameRestarted() {
    //remove all other balls so that they won't be there when the game is restarted
    for (var i = 0; i < allBalls.length; i++) {
        scene.remove(allBalls[i].ballObject);
    }

    //reset allBalls array, add a new ball and start the game

    allBalls = new Array();
    allBalls[0] = new Ball();
    gameOver = false;

    //destroy and then spawn all the bricks
    destroyAllBricks();
    spawnAllBricks();

    //set the lives to starting lives count and reset the score
    lives = startingLivesCount;
    score = 0;
    document.getElementById("scoreText").innerHTML = "Score: " + score;
    document.getElementById("livesText").innerHTML = "Lives: " + lives;
}


//add the score amount to the score and update the score text
function addScore(amount) {
    score += amount;
    document.getElementById("scoreText").innerHTML = "Score: " + score;
}

//called when there are no bricks left
function onGameWon() {
    //stops the game and sets the lives text
    gameOver = true;
    document.getElementById("livesText").innerHTML = "You have cleared the level! Press 'Space' to restart.";
}