/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(["../scenes/KeyboardDescriptor"], function (KeyboardDescriptor) {
    "use strict";
    function Keyboard(phaserGame, gestureObserver) //noinspection JSLint
    {
            var background;
            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.gestureObserver = gestureObserver;
            this.keyboardGroup = this.game.add.group();

            this.keyboardGroup.x = this.phaserGame.coordX(KeyboardDescriptor.xinit);
            this.keyboardGroup.y = this.phaserGame.coordY(KeyboardDescriptor.yinit);
            this.createAndSetBackgroundSizeAndTween();
    }
    Keyboard.prototype.createAndSetBackgroundSizeAndTween = function createAndSetBackgroundSizeAndTween() {
        var background = this.keyboardGroup.create(0, 0, "keyboardBackground"),
            cellPhoneScale = this.phaserGame.scale,
            scaleX,
            scaleY;
        scaleX = cellPhoneScale * (KeyboardDescriptor.width / background.width );
        scaleY = cellPhoneScale * (KeyboardDescriptor.height / background.height );
        background.scale.setTo(scaleX, scaleY);
        this.keyboardGroup.alpha = 0;
        this.keyboardGroup.setAll("visible", false);
        this.keyboardGroup.setAll("exists", false);
    };
    /*
     SingleTreeGroupFactory.prototype.setPropertiesToNewGroup = function setPropertiesToNewGroup(tree) {
     var prespectiveScale = tree.h / this.sprite.height,
     cellPhoneScale = this.phaserGame.scale,
     finalScale = prespectiveScale * cellPhoneScale;
     this.group.scale.setTo(finalScale, finalScale);
     */
    Keyboard.prototype.showOnScene = function () {
        this.keyboardGroup.setAll("visible", true);
        this.keyboardGroup.setAll("exists", true);
        this.keyboardGroup.parent.bringToTop(this.keyboardGroup);
        this.keyboardGroup.alpha = 0;
        this.game.add.tween(this.keyboardGroup).to({alpha: 1}, 400, 'Linear', true, 0, 0);

    }
        return Keyboard;
});