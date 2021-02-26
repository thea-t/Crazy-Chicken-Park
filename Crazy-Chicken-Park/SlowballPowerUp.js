var isAlreadySlow = false;

class SlowballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    onCollected() {
        super.onCollected();

        if (isAlreadySlow == false) {
            ballSpeed = ballSpeed / 2;
            isAlreadySlow = true;
            setTimeout(function () { ballSpeed = ballSpeed * 2; isAlreadySlow = false; }, powerUpDuration);
        }
    }
}