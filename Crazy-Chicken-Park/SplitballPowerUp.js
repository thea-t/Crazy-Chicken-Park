class SplitballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    onCollected() {
         //gets access to the parent's properties and methods
        super.onCollected();


        var newBall = new Ball();
	    // how to add something to array: https://alligator.io/js/push-pop-shift-unshift-array-methods/
        allBalls.push(newBall);
    }
}