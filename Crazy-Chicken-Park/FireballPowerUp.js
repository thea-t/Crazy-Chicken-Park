class FireballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    onCollected() {
        super.onCollected();
        //enable the fireball powerup
        fireballEnabled = true;
        //disable it 5 seconds later
        setTimeout(function () { fireballEnabled = false; }, powerUpDuration);
    }
}