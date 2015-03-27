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
            this.createAndSetBackgroundSize();
            this.addCharacters();
    }

    Keyboard.prototype.createAndSetBackgroundSize = function createAndSetBackgroundSize() {
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
    Keyboard.prototype.addCharacters = function () {
        var row = 0,
            charPos = 0,
            position,
            char;
        for (row = 0; row < KeyboardDescriptor.keys.length; row += 1) {
            for (charPos = 0; charPos < KeyboardDescriptor.keys[row].length; charPos += 1) {
                char = KeyboardDescriptor.keys[row][charPos];
                position = this.calculatePosition(row, charPos);
                this.createChar(position, char);
            }
        }
    };

    Keyboard.prototype.calculatePosition = function (row, charPos) {
        var x = KeyboardDescriptor.distanceBetweenKeys  * charPos + row * 15,
            y = KeyboardDescriptor.distanceBetweenLines * row;
        return {
            x: x,
            y: y
        };
    };

    Keyboard.prototype.createChar = function (position, char) {
            var sprite = this.addKeyBackground(position, char);
            this.addKeyChar(char, sprite);
    };

    Keyboard.prototype.addKeyBackground = function (position, char) {
        var sprite = this.keyboardGroup.create(position.x, position.y, "keyBackground"),
            context;
        sprite.inputEnabled = true;
        sprite.input.priorityID = 1;
        sprite.useHandCursor = true;
        context = {
            observer : this.gestureObserver,
            sprite : sprite,
            game : this.game,
            char : char
        };
        sprite.events.onInputDown.add(function () {
            this.game.add.tween(this.sprite).to({alpha: 0}, 300, 'Linear', true, 0, 1);
            this.observer.clickedOnKey(this.char);
        }, context);
        return sprite;
    };


    Keyboard.prototype.addKeyChar = function (char, sprite) {
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: sprite.width, align: "center" };
        var text = this.game.add.text(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2, char, style, this.keyboardGroup);
        text.anchor.set(0.5);
    };

    Keyboard.prototype.showOnScene = function () {
        this.keyboardGroup.setAll("visible", true);
        this.keyboardGroup.setAll("exists", true);
        this.keyboardGroup.parent.bringToTop(this.keyboardGroup);
        this.keyboardGroup.alpha = 0;
        this.game.add.tween(this.keyboardGroup).to({alpha: 1}, 400, 'Linear', true, 0, 0);
    }
    return Keyboard;
});