class FireballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    onCollected() {
        //gets access to the parent's properties and methods
        super.onCollected();
        //enable the fireball powerup
        fireballEnabled = true;
        //disable it 5 seconds later
        setTimeout(function () { fireballEnabled = false; }, powerUpDuration);
    }
}