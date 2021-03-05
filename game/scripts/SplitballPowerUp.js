//powerup that spawns an another ball
class SplitballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    onDropped() {
        //change the color of positive powerups to green
        this.material.color.set(0x58a6ff);
    }
    onCollected() {
        //call the main onCollected function
        super.onCollected();

        //create a new instance of a ball
        var newBall = new Ball();
        // how to add something to array: https://alligator.io/js/push-pop-shift-unshift-array-methods/
        //add the recently created ball to the allBalls array
        allBalls.push(newBall);
    }
}