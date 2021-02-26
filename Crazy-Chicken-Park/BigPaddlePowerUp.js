var isAlreadyBig = false;

class BigPaddlePowerUp extends PowerUp {
    //how to override functions: https://javascript.info/class-inheritance
    onCollected() {
        super.onCollected();

        if (isAlreadyBig == false) {
            paddleObject.scale.x = paddleObject.scale.x * 2;
            isAlreadyBig = true;
            setTimeout(function () { paddleObject.scale.x = paddleObject.scale.x / 2; isAlreadyBig = false; }, powerUpDuration);
        }
    }
}