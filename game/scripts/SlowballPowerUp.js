//creating a bool so that to know when the slowball powerup is enabled
var isAlreadySlow = false;

class SlowballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance

    onDropped() {
        //change the color of positive powerups to green
        this.material.color.set(0x58a6ff);
    }
    onCollected() {
        //calls the onCollected function from PowerUp class
        super.onCollected();

        //checks if the ball is already slow, if not - its decreasing its speed twice less for 5 seconds
        if (isAlreadySlow == false) {
            ballSpeed = ballSpeed / 2;
            isAlreadySlow = true;
            setTimeout(function () { ballSpeed = ballSpeed * 2; isAlreadySlow = false; }, powerUpDuration);
        }
    }
}