class SplitballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance

    onDropped() {
        this.material.color.set(0x58a6ff);
    }
    onCollected() {
        super.onCollected();


        var newBall = new Ball();
	    // how to add something to array: https://alligator.io/js/push-pop-shift-unshift-array-methods/
        allBalls.push(newBall);
    }
}