//creating a bool so that to know when the ball is already big and the power up is enabled
var isAlreadySmall = false;

class SmallPaddlePowerUp extends PowerUp {

    //how to override functions: https://javascript.info/class-inheritance
    onDropped() {
        //change the color of negative powerups to red
        this.material.color.set(0xcccfd3);
    }
    onCollected() {
        //calls the onCollected function from PowerUp class
        super.onCollected();

        //checks if the ball is already small, if not - its decreasing its size twice less for 5 seconds
        if (isAlreadySmall == false) {
            paddleObject.scale.x = paddleObject.scale.x / 2;
            isAlreadySmall = true;
            setTimeout(function () { paddleObject.scale.x = paddleObject.scale.x * 2; isAlreadySmall = false; }, powerUpDuration);
        }
    }
}