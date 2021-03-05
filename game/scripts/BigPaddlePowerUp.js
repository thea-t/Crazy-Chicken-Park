//creating a bool so that to know when the ball is already big and the power up is enabled
var isAlreadyBig = false;

class BigPaddlePowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    onDropped() {
        //change the color of positive powerups to green
        this.material.color.set(0x58a6ff);
    }
    onCollected() {
        //calls the onCollected function from PowerUp class
        super.onCollected();

        //checks if the ball is already big, if not - its increasing its size twice more for 5 seconds
        if (isAlreadyBig == false) {
            paddleObject.scale.x = paddleObject.scale.x * 2;
            isAlreadyBig = true;
            setTimeout(function () { paddleObject.scale.x = paddleObject.scale.x / 2; isAlreadyBig = false; }, powerUpDuration);
        }
    }
}