/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(["../scenes/KeyboardDescriptor"], function (KeyboardDescriptor) {
    "use strict";
    function Keyboard(phaserGame, gestureObserver) //noinspection JSLint
    {
            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.gestureObserver = gestureObserver;
            this.keyboardGroup = this.game.add.group();

            this.keyboardGroup.x = this.phaserGame.coordX(KeyboardDescriptor.xinit);
            this.keyboardGroup.y = this.phaserGame.coordY(KeyboardDescriptor.yinit);
            this.createAndSetBackgroundSize();
            this.addCharacters();
            this.hideAndDisable();
    }

    Keyboard.prototype.createAndSetBackgroundSize = function createAndSetBackgroundSize() {
        var background = this.keyboardGroup.create(0, 0, "keyboardBackground"),
            cellPhoneScale = this.phaserGame.scale,
            scaleX,
            scaleY;
        scaleX = cellPhoneScale * (KeyboardDescriptor.width / background.width );
        scaleY = cellPhoneScale * (KeyboardDescriptor.height / background.height );
        background.scale.setTo(scaleX, scaleY);
    };

    Keyboard.prototype.hideAndDisable = function () {
        this.keyboardGroup.alpha = 0;
        this.keyboardGroup.setAll("visible", false);
        this.keyboardGroup.setAll("exists", false);
        this.keyboardGroup.setAll("inputEnabled", false);
        this.keyboardGroup.setAll("useHandCursor", false);
    }

    Keyboard.prototype.showAndEnable = function () {
        this.keyboardGroup.setAll("visible", true);
        this.keyboardGroup.setAll("exists", true);
        this.keyboardGroup.forEachAlive(function (sprite) {sprite.inputEnabled=true});
        this.keyboardGroup.forEachAlive(function (sprite) {sprite.useHandCursor=true});
    }

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
        position = this.calculatePosition(row - 1, charPos);
        this.createBackwards(position);
        position = this.calculatePosition(row, 0);
        this.createSpace(position);
        position = this.calculatePosition(row, KeyboardDescriptor.keysOccupiedBySpace);
        this.createEnter(position);
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
            var sprite = this.addKeyBackground(position, char, "keyBackground");
            this.addKeyChar(char, sprite);
    };

    Keyboard.prototype.addKeyBackground = function (position, char, background) {
        var sprite = this.keyboardGroup.create(position.x, position.y, background),
            context;
        context = {
            observer : this.gestureObserver,
            sprite : sprite,
            game : this.game,
            char : char
        };
        sprite.events.onInputDown.add(function () {
            if ("vibrate" in navigator) {
                navigator.vibrate(100);
            }
            var tween = this.game.add.tween(this.sprite).to({alpha: 0}, 200, 'Linear', true, 0, 0);
            tween.yoyo(true,0);
            this.observer.clickedOnKey(this.char);
        }, context);
        sprite.alive = true;
        return sprite;
    };
    Keyboard.prototype.addKeyChar = function (char, sprite) {
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: sprite.width, align: "center" };
        var text = this.game.add.text(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2, char, style, this.keyboardGroup);
        text.anchor.set(0.5);
        text.alive = false;
    };
    Keyboard.prototype.createBackwards = function (charPos) {
        this.addKeyBackground(charPos," ","keyBackwards");
    };
    Keyboard.prototype.createSpace = function (charPos) {
        this.addKeyBackground(charPos,"backward","keySpace");
    };
    Keyboard.prototype.createEnter = function (charPos) {
        var background = this.addKeyBackground(charPos,"enter","keyEnter");
        this.addKeyChar("enter",background);
    };
    Keyboard.prototype.showOnScene = function () {
        this.showAndEnable();
        this.keyboardGroup.parent.bringToTop(this.keyboardGroup);
        this.keyboardGroup.alpha = 0;
        this.game.add.tween(this.keyboardGroup).to({alpha: 1}, 400, 'Linear', true, 0, 0);
    };
    Keyboard.prototype.hideOnScene = function () {
        var tween = this.game.add.tween(this.keyboardGroup).to({alpha: 0}, 400, 'Linear', true, 0, 0);
        tween.onComplete(function(){
            this.hideAndDisable();
        },this)
    };


    return Keyboard;
});