/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(["./TreeSpriteGroupTextSetter"], function (TreeSpriteGroupTextSetter) {
    "use strict";
    var TEXTLENGTH = 16;
    function SingleTreeGroupFactory(phaserGame, mainGroup, gestureObserver) //noinspection JSLint
    {
            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.mainGroup = mainGroup;
            this.gestureObserver = gestureObserver;
            this.textImage = undefined;
    }

    SingleTreeGroupFactory.prototype.createTreeSpriteGroup = function createTreeSpriteGroup(tree, id) {
        this.group = this.phaserGame.game.add.group();
        this.sprite = this.group.create(0, 0, 'real');
        this.sprite.anchor.x = 104 / 400;
        this.sprite.anchor.y = 172 / 611;
        this.group.x = this.phaserGame.coordX(tree.x);
        this.group.y = this.phaserGame.coordY(tree.y);
        this.ifEmptyTreeSetWriteTextButtonToGroup(tree);
        this.setScalePropertiesToNewGroup(tree);
        this.sprite.name = "treeSprite";
        this.setTreeGroupIntoAllSpritesGroup(id);
        this.group.textSetter = new TreeSpriteGroupTextSetter(this.group, this.game, this.gestureObserver);
        this.group.textSetter.tmp = this;
        this.group.textSetter.createText(tree.text);
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