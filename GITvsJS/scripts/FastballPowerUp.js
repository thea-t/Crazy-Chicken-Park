var isAlreadyFast = false;

class FastballPowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    
    onDropped() {
        this.material.color.set(0xcccfd3);
    }
    onCollected() {
        super.onCollected();
        
        if (isAlreadyFast == false) {
            ballSpeed = ballSpeed * 2;
            isAlreadyFast = true;
            setTimeout(function () { ballSpeed = ballSpeed / 2; isAlreadyFast = false;}, powerUpDuration);
        }
    }
}