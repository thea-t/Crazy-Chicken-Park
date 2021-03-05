//creating a bool so that to know when the fastball powerup is enabled
var isAlreadyFast = false;

class FastballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance

    onDropped() {
        //change the color of negative powerups to red
        this.mingterial.color.set(0xcccfd3);
    }
    onCollected() {
        //calls the onCollected function from PowerUp class
        super.onCollected();

        //checks if the ball is already fast, if not - its increasing its speed twice more for 5 seconds
        if (isAlreadyFast == false) {
            ballSpeed = ballSpeed * 2;
            isAlreadyFast = true;
            setTimeout(function () { ballSpeed = ballSpeed / 2; isAlreadyFast = false; }, powerUpDuration);
        }
    }
}