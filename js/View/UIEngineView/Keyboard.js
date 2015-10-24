/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(["../../../scenes/KeyboardDescriptor"], function (KeyboardDescriptor) {
    "use strict";
    var LETTERS = "letters",
        MAYUSQ = "mayusq",
        FEATURES = "features",
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

    Keyboard.prototype.buildKeyboardFromState = function buildKeyboardFromState() {
        if (this.keyboardGroup !== undefined) {
            this.keyboardGroup.destroy();
        }
        this.keyboardGroup = this.game.add.group();
        this.setSizeAndPositionToKeyboardAcordingToScreenResolution();
        this.addCharacters();
        //this.showAndEnable();
    };

    Keyboard.prototype.setSizeAndPositionToKeyboardAcordingToScreenResolution = function setSizeAndPositionToKeyboardAcordingToScreenResolution() {
        this.keyboardGroup.x = 0 + KeyboardDescriptor.margin;
        this.keyboardGroup.y = this.phaserGame.coordY(KeyboardDescriptor.yinit);
        this.keyboardGroup.scale.x = KeyboardDescriptor.scale;
        this.keyboardGroup.scale.y = KeyboardDescriptor.scale;
    };

    Keyboard.prototype.addCharacters = function () {
        var row = 0,
            charPos = 0,
            position,
            char,
            keys = KeyboardDescriptor.keys;
        if (this.state === FEATURES) {
            this.addFeaturesCharacters();
            position = this.calculatePosition(3, 2 + 2 + KeyboardDescriptor.keysOccupiedBySpace, false);
            this.createSwitchKeyboard(position);
            return;
        }
        if (this.state === ASCII) {
            keys = KeyboardDescriptor.specialKeys;
        }
        if (this.state === NUMBERS) {
            keys = KeyboardDescriptor.numberKeys;
        }
        if (this.state === MAYUSQ) {
            keys = KeyboardDescriptor.mayusqKeys;
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
    Keyboard.prototype.addFeaturesCharacters = function () {
        var x,
            y;
        for(y = 0; y < 4; y += 1) {
            for (x = 0; x < 2; x += 1) {
                this.findPostionAndCreateFeatureButton(x, y);
            }
        }
    };

    Keyboard.prototype.findPostionAndCreateFeatureButton = function (x, y) {
        var position = this.calculatePosition(y, 1 + x * KeyboardDescriptor.keysOccupiedByFeaturesKeys, false);
        this.createFeatureButton(position,
            KeyboardDescriptor.featuresKeys[y][x],
            KeyboardDescriptor.featuresKeysMap[y][x],
            KeyboardDescriptor.featuresKeysIcons[y][x]);
    };

    Keyboard.prototype.createFeatureButton = function (position, description, toInsertText, background) {
        var sprite = this.addKeyBackground(position, toInsertText, background);
        this.addKeyChar(description, sprite, 0.1, this.keyboardGroup);
    }

    Keyboard.prototype.createChar = function (position, char) {
        var sprite = this.addKeyBackground(position, char, "keyBackground");
        this.addKeyChar(char, sprite, 0.2, this.keyboardGroup);
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
            navigator.vibrate = navigator.vibrate ||
                                navigator.webkitVibrate ||
                                navigator.mozVibrate ||
                                navigator.msVibrate;
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
            this.keyboard.createPopupGroup(this);
            this.keyboard.createPopupBackgroundSprite(this, 75, 200, 75);
            if (this.sprite.hasCharacterWrittenOnImage !== undefined) {
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
        this.setSpriteToClickableOrNot(sprite, true);
        return sprite;
    };

    Keyboard.prototype.setSpriteToClickableOrNot = function setSpriteToClickavleOrNot(tmp, bool) {
        tmp.inputEnabled = bool;
        if (bool) {
            tmp.input.priorityID = 54;
        }
    }

    Keyboard.prototype.addKeyChar = function iaddKeyChar(char, sprite, scale, group) {

        var tmp = this.game.add.bitmapText(4, 60, 'ubuntu', char, 24),
            textImage =  group.create(0, 0, tmp.generateTexture());
        tmp.destroy();
        textImage.scale.x = 0.90;
        textImage.scale.y = 0.90;
        textImage.x = sprite.x + sprite.width / 2;
        textImage.y = sprite.y + sprite.height / 2;
        textImage.alive = false;
        textImage.anchor.set(0.5);
        sprite.hasCharacterWrittenOnImage = true;
        return textImage;
    };

    Keyboard.prototype.nextKeyboardState = function nextKeyboardState() {
        if (this.state === LETTERS) {
            this.state = MAYUSQ;
        } else if (this.state === MAYUSQ) {
            this.state = NUMBERS;
        } else if (this.state === NUMBERS) {
            this.state = FEATURES;
        } else if (this.state === FEATURES) {
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
        this.buildKeyboardFromState();
        this.keyboardGroup.setAll("visible", true);
        this.keyboardGroup.setAll("exists", true);
        this.keyboardGroup.forEachAlive(function (sprite) {sprite.inputEnabled=true});
        this.keyboardGroup.forEachAlive(function (sprite) {sprite.useHandCursor=true});
    }

    return Keyboard;
});