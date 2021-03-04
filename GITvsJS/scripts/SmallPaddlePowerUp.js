var isAlreadySmall = false;

class SmallPaddlePowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance

    onDropped() {
        this.material.color.set(0xcccfd3);
    }
    onCollected() {
        super.onCollected();

        if (isAlreadySmall == false) {
            paddleObject.scale.x = paddleObject.scale.x / 2;
            isAlreadySmall = true;
            setTimeout(function () { paddleObject.scale.x = paddleObject.scale.x * 2; isAlreadySmall = false; }, powerUpDuration);
        }
    }
}