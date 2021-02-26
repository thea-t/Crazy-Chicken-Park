class SplitballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    onCollected() {
        super.onCollected();


        var newBall = new Ball();
	    // how to add something to array: https://alligator.io/js/push-pop-shift-unshift-array-methods/
        allBalls.push(newBall);
    }
}