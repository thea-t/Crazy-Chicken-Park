//allows the ball to pass through all bricks without being reflected
class FireballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance

    onDropped() {
        //change the color of positive powerups to green
        this.material.color.set(0x58a6ff);
    }
    onCollected() {
        //calls the onCollected function from PowerUp class
        super.onCollected();

        //enables the fireball powerup for 5 seconds
        fireballEnabled = true;
        setTimeout(function () { fireballEnabled = false; }, powerUpDuration);
    }
}