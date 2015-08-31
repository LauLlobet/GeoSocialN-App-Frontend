/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(["../../../scenes/KeyboardDescriptor"], function (KeyboardDescriptor) {
    "use strict";
    var LETTERS = "letters",
        ASCII = "ascii",
        NUMBERS = "numbers",
        SWITCH = "switch";

    function Keyboard(phaserGame, gestureObserver) //noinspection JSLint
    {

            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.gestureObserver = gestureObserver;
            this.state = LETTERS;
            this.buildKeyboardFromState();
            this.hideAndDisable();
    }

    Keyboard.prototype.setSizeAndPositionToKeyboardAcordingToScreenResolution = function setSizeAndPositionToKeyboardAcordingToScreenResolution() {
        var scale = screen.width /  KeyboardDescriptor.width;
        this.keyboardGroup.x = 0 + KeyboardDescriptor.margin;
        this.keyboardGroup.y = this.phaserGame.coordY(KeyboardDescriptor.yinit);
        this.keyboardGroup.scale.x = scale;
        this.keyboardGroup.scale.y = scale;
    };

    Keyboard.prototype.buildKeyboardFromState = function buildKeyboardFromState() {
        if (this.keyboardGroup !== undefined) {
            this.keyboardGroup.destroy();
        }
        this.keyboardGroup = this.game.add.group();
        this.setSizeAndPositionToKeyboardAcordingToScreenResolution();
        this.addCharacters();
        this.showAndEnable();
    };

    Keyboard.prototype.addCharacters = function () {
        var row = 0,
            charPos = 0,
            position,
            char,
            keys = KeyboardDescriptor.keys;
        if (this.state === ASCII) {
            keys = KeyboardDescriptor.specialKeys;
        }
        if (this.state === NUMBERS) {
            keys = KeyboardDescriptor.numberKeys;
        }
        for (row = 0; row < keys.length; row += 1) {
            for (charPos = 0; charPos < keys[row].length; charPos += 1) {
                char = keys[row][charPos];
                position = this.calculatePosition(row, charPos, true);
                this.createChar(position, char);
            }
        }
        position = this.calculatePosition(row - 1, charPos, true);
        this.createBackwards(position);
        position = this.calculatePosition(row, 0, false);
        this.createEnter(position);
        position = this.calculatePosition(row, 2, false);
        this.createSpace(position);
        position = this.calculatePosition(row, 2 + KeyboardDescriptor.keysOccupiedBySpace, false);
        this.createCancel(position);
        position = this.calculatePosition(row, 2 + 2 + KeyboardDescriptor.keysOccupiedBySpace, false);
        this.createSwitchKeyboard(position);

    };

    Keyboard.prototype.createChar = function (position, char) {
        var sprite = this.addKeyBackground(position, char, "keyBackground");
        this.addKeyChar(char, sprite, 0.2,this.keyboardGroup);
    };

    Keyboard.prototype.addKeyBackground = function (position, char, background) {
        var sprite = this.keyboardGroup.create(position.x, position.y, background),
            context = {
                observer : this.gestureObserver,
                sprite : sprite,
                game : this.game,
                char : char,
                popupDistance : KeyboardDescriptor.popupDistance,
                keyboardGroup : this.keyboardGroup,
                backgroundSprite : background,
                keyboard : this
        };
        sprite.events.onInputDown.add(function () {
            if (typeof navigator.vibrate  === "undefined") {
                navigator.vibrate(100);
            }
            this.keyboard.createPopupGroup(this);
            this.keyboard.createPopupBackgroundSprite(this, 75, 200, 75);
            if (this.sprite.hasCharacterWrittenOnImage !== undefined){
               this.keyboard.createPopupCharSprite(this, 75, 200, 75);
            }
            if (this.char === SWITCH) {
                this.keyboard.nextKeyboardState();
                this.keyboard.buildKeyboardFromState();
            } else {
                this.observer.clickedOnKey(this.char);
            }
        }, context);
        sprite.alive = true;
        return sprite;
    };

    Keyboard.prototype.addKeyChar = function (char, sprite, scale, group) {
        var keymap = ",!?ABCDEFGHIJKLMNOPQRSTUVWXYZ./\\()_-[]{}:|'`=\"+*$#0123456789",
            font =  this.game.add.retroFont('carved', 120, 120, keymap, 5, 0, 0, 0, 0),
            i = this.game.add.image(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2, font, undefined, group);
        font.setText(char , false, 0, 0 , 0, 0);
        i.alive = false;
        i.anchor.set(0.5)
        i.scale.x = scale;
        i.scale.y = scale;
        sprite.hasCharacterWrittenOnImage = true;
        return i;
    };

    Keyboard.prototype.nextKeyboardState = function nextKeyboardState() {
        if (this.state === LETTERS) {
            this.state = NUMBERS;
        } else if (this.state === NUMBERS) {
            this.state = ASCII;
        } else if (this.state === ASCII) {
            this.state = LETTERS;
        }
    };
    Keyboard.prototype.createPopupGroup = function createPopupGroup(context) {
        context.popupGroup = this.game.add.group();
        context.popupGroup.x = this.keyboardGroup.x;
        context.popupGroup.y = this.keyboardGroup.y;
    };

    Keyboard.prototype.createPopupBackgroundSprite = function createPopupBackgroundSprite (context, appeareT,stillT,disappeareT) {
        context.newsprite = context.popupGroup.create(context.sprite.x, context.sprite.y - context.popupDistance, context.backgroundSprite);
        context.newsprite.alpha = 1;
        context.newsprite.scale.x = context.newsprite.scale.y = 1.8;
        context.newsprite.z = 40;


        var appeare = context.game.add.tween(context.newsprite).to({alpha: 1}, appeareT, 'Linear', false, 0, 0);
        var still = context.game.add.tween(context.newsprite ).to({alpha: 1}, stillT, 'Linear', false, 0, 0);
        var disappeare = context.game.add.tween(context.newsprite ).to({alpha: 0}, disappeareT, 'Linear', false, 0, 0);
        appeare.chain(still);
        still.chain(disappeare);
        disappeare.onComplete.add(function(){
            this.destroy();
        },context.newsprite);
        appeare.start();
    };


    Keyboard.prototype.createPopupCharSprite = function createPopupCharSprite (context, appeareT,stillT,disappeareT) {
        var characterImage = context.keyboard.addKeyChar(context.char, context.newsprite, 0.3,context.popupGroup);
        characterImage.z = 50;
        var kappeare = context.game.add.tween(characterImage).to({alpha: 1}, appeareT, 'Linear', false, 0, 0);
        var kstill = context.game.add.tween(characterImage ).to({alpha: 1}, stillT, 'Linear', false, 0, 0);
        var kdisappeare = context.game.add.tween(characterImage ).to({alpha: 0}, disappeareT, 'Linear', false, 0, 0);
        kappeare.chain(kstill);
        kstill.chain(kdisappeare);
        kdisappeare.onComplete.add(function() {
            console.log("remove sprite");
            this.destroy();
        },characterImage);
        kappeare.start();

    };

    Keyboard.prototype.calculatePosition = function (row, charPos, isIncrementBegginingOfLineAsRowIncreases) {
        var incrementOfBegginingOfLine = isIncrementBegginingOfLineAsRowIncreases ?  row * 15 : 15,
            x = KeyboardDescriptor.distanceBetweenKeys  * charPos + incrementOfBegginingOfLine,
            y = KeyboardDescriptor.distanceBetweenLines * row;
        return {
            x: x,
            y: y
        };
    };

    Keyboard.prototype.createBackwards = function (charPos) {
        this.addKeyBackground(charPos, "backwards", "keyBackwards");
    };
    Keyboard.prototype.createSpace = function (charPos) {
        this.addKeyBackground(charPos, " ", "keySpace");
    };
    Keyboard.prototype.createEnter = function (charPos) {
        this.addKeyBackground(charPos, "ok", "keyOk");
    };
    Keyboard.prototype.createCancel = function (charPos) {
        this.addKeyBackground(charPos, "cancel", "keyCancel");
    };
    Keyboard.prototype.createSwitchKeyboard = function (charPos) {
        this.addKeyBackground(charPos, SWITCH, "keySwitchKeyboard");
    };

    Keyboard.prototype.showOnScene = function () {
        this.showAndEnable();
        this.keyboardGroup.parent.bringToTop(this.keyboardGroup);
        this.keyboardGroup.alpha = 0;
        this.game.add.tween(this.keyboardGroup).to({alpha: 1}, 400, 'Linear', true, 0, 0);
    };
    Keyboard.prototype.hideOnScene = function () {
        var tween = this.game.add.tween(this.keyboardGroup).to({alpha: 0}, 400, 'Linear', true, 0, 0);
        tween.onComplete.add(function () {
             this.hideAndDisable();
        },this)
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

    return Keyboard;
});