/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    "use strict";
    var TEXTLENGTH = 13;
    function SingleTreeGroupFactory(phaserGame, mainGroup, gestureObserver) //noinspection JSLint
    {
            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.mainGroup = mainGroup;
            this.gestureObserver = gestureObserver;
    }

    SingleTreeGroupFactory.prototype.createImgFromTreeTypeAndText = function createImgFromTreeTypeAndText(type, text) {
        var dataTree = this.game.cache.getFrame(type), bmd;
        bmd = this.game.make.bitmapData(dataTree.width, dataTree.height);
        bmd.load(type);
        if (text === undefined) {
            return bmd;
        }
        return bmd;
    };
    SingleTreeGroupFactory.prototype.createTreeSpriteGroup = function createTreeSpriteGroup(tree, id) {
        var imgId = this.createImgFromTreeTypeAndText(tree.type, tree.text);
        this.group = this.phaserGame.game.add.group();
        this.sprite = this.group.create(0, 0, imgId);
        this.sprite.anchor.x = 104 / 400;
        this.sprite.anchor.y = 114 / 611;
        this.group.x = this.phaserGame.coordX(tree.x);
        this.group.y = this.phaserGame.coordY(tree.y);
        this.ifEmptyTreeSetWriteTextButtonToGroup(tree);
        this.setScalePropertiesToNewGroup(tree);
        this.sprite.name = "treeSprite";
        this.setTreeGroupIntoAllSpritesGroup(id);
        this.setText(tree.text);
    };

    SingleTreeGroupFactory.prototype.setText = function setText(text) {
        var keymap = ",!?ABCDEFGHIJKLMNOPQRSTUVWXYZ./\\()_-[]{}ç|'`=\"+^*#0123456789",
            font =  this.game.add.retroFont('carved', 60, 60, keymap, 5, 0, 0, 0, 0),
            i = this.game.add.image(10, 10, font),
            formatedText;
        if (text === undefined) {
            return;
        }
        formatedText =  this.formatText(text);
        i.scale.x = 0.24;
        i.scale.y = 0.24;
        font.setText(formatedText, true, 0, 8, keymap, 10);
        this.group.add(i);
    };
    SingleTreeGroupFactory.prototype.formatText = function (text) {
        var textreturned = "",
            length =  TEXTLENGTH,
            j;
        text = text.toUpperCase();
        for (j = 0; j < text.length; j = j + length) {
            textreturned += text.substring(j, j + length) + "\n";
        }
        textreturned += text.substring(j) + "\n";
        return textreturned;
    };

    SingleTreeGroupFactory.prototype.setScalePropertiesToNewGroup = function setPropertiesToNewGroup(tree) {
        var prespectiveScale = tree.w / this.sprite.width,
            cellPhoneScale = this.phaserGame.scale,
            finalScale = prespectiveScale * cellPhoneScale;
        this.group.scale.setTo(finalScale, finalScale);
    };

    SingleTreeGroupFactory.prototype.ifEmptyTreeSetWriteTextButtonToGroup = function ifEmptyTreeSetWriteTextButtonToGroup(tree) {
        var button, context, tween;
        if (tree.text !== undefined || tree.button === undefined) {
            return;
        }
        button = this.group.create(tree.button.x, tree.button.y, 'punzon');
        button.name = 'button';
        button.height = tree.button.hw;
        button.width = tree.button.hw;
        button.inputEnabled = true;
        button.input.priorityID = 1;
        button.useHandCursor = true;
        tween = this.game.add.tween(button).to({y: tree.button.y - 100}, 500, 'Linear', true, 0, -1);
        tween.yoyo(true, 500);
        context = {
            observer : this.gestureObserver,
            button : button,
            game : this.game,
            previousTween : tween
        };
        button.events.onInputDown.add(function () {
            this.game.add.tween(this.button).to({alpha: 0}, 300, 'Linear', true, 0, 0);
            this.game.tweens.remove(this.previousTween);
            this.button.inputEnabled = false;
            this.button.useHandCursor = false;
            this.observer.clickedOnWriteButton();
        }, context);
    };

    SingleTreeGroupFactory.prototype.setTreeGroupIntoAllSpritesGroup = function setTreeGroupIntoAllSpritesGroup(id) {
        this.group.name = id;
        this.mainGroup.add(this.group);
    };
    return SingleTreeGroupFactory;
});