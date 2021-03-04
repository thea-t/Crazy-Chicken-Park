var isAlreadySlow = false;

class SlowballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    onDropped() {
        this.material.color.set(0x58a6ff);
    }
    onCollected() {
        super.onCollected();

        if (isAlreadySlow == false) {
            ballSpeed = ballSpeed / 2;
            isAlreadySlow = true;
            setTimeout(function () { ballSpeed = ballSpeed * 2; isAlreadySlow = false; }, powerUpDuration);
        }
    }
}