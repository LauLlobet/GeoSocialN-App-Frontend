/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(["./TreeSpriteGroupTextSetter", "./TreeSpriteCounterKmSetter", "./TreeSpriteCompassSetter"], function (TreeSpriteGroupTextSetter, TreeSpriteCounterKmSetter, TreeSpriteCompasSetter) {
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
        this.textGroup = this.phaserGame.game.add.group();
        this.buryGroup = this.phaserGame.game.add.group();
        this.compasAndKmGroup = this.phaserGame.game.add.group();
        console.log("TREEID:" + tree.treeid);
        if (tree.treeid !== null) {
            if (tree.treeid === 3) {
                this.sprite = this.group.create(0, 0, 'fullTerritory');
                this.group.isReusable = false;
            } else {
                this.sprite = this.group.create(0, 0, 'real');
            }
        } else {
            this.sprite = this.group.create(0, 0, 'roots');
        }
        this.group.add(this.textGroup);
        this.group.add(this.buryGroup);
        this.group.add(this.compasAndKmGroup);
        this.sprite.anchor.x = 104 / 400;
        this.sprite.anchor.y = 172 / 611;
        this.group.x = this.phaserGame.coordX(tree.x);
        this.group.y = this.phaserGame.coordY(tree.y);
        this.setScalePropertiesToNewGroup(tree);
        this.sprite.name = "treeSprite";
        this.setTreeGroupIntoAllSpritesGroup(id);
        if (tree.unburiedLayers === undefined) {
            tree.unburiedLayers = {};
        }
        if (tree.treeid === 3) {
            return;
        }
        if (this.isNotAnEmptyTree(tree)) {
            this.group.textSetter = new TreeSpriteGroupTextSetter(this.textGroup, this.buryGroup, this.game, this.gestureObserver);
            this.group.textSetter.createText(tree.text, tree.unburiedLayers);
            if (this.isNotAnInstructionTree(tree)) {
                this.group.kmSetter = new TreeSpriteCounterKmSetter(this.group, this.game);
                this.group.compassSetter = new TreeSpriteCompasSetter(this.group, this.game);
                this.group.isWrittenByAServerTree = true;
            }
        }
        if (tree.treeid === null) {
            this.group.isReusable = false;
            this.setWriteTextButtonToGroup(tree);
            this.group.textSetter = new TreeSpriteGroupTextSetter(this.textGroup, this.buryGroup, this.game, this.gestureObserver);
            this.group.textSetter.createText(" ", tree.unburiedLayers);
        }
    };

    SingleTreeGroupFactory.prototype.reuseTreeSpriteGroup = function reuseTreeSpriteGroup(tree, id, group) {
        this.group = group;
        this.sprite.anchor.x = 104 / 400;
        this.sprite.anchor.y = 172 / 611;
        this.group.x = this.phaserGame.coordX(tree.x);
        this.group.y = this.phaserGame.coordY(tree.y);
        this.setScalePropertiesToNewGroup(tree);
        this.setTreeGroupIntoAllSpritesGroup(id);
        if (tree.unburiedLayers === undefined || tree.initialPosition.charAt(0) === '3') {
            tree.unburiedLayers = {};
        }
        if (tree.text !== undefined) {
            this.group.textSetter.setText(tree.text);
        }
    };

    SingleTreeGroupFactory.prototype.setScalePropertiesToNewGroup = function setPropertiesToNewGroup(tree) {
        var prespectiveScale = tree.w / this.sprite.width,
            cellPhoneScale = this.phaserGame.scale,
            finalScale = prespectiveScale * cellPhoneScale;
        this.group.scale.setTo(finalScale, finalScale);
    };

    SingleTreeGroupFactory.prototype.isNotAnEmptyTree = function (tree) {
        return tree.text !== undefined && tree.text !== null;
    };
    SingleTreeGroupFactory.prototype.isNotAnInstructionTree = function (tree) {
        return (tree.treeid > 30);
    };
    SingleTreeGroupFactory.prototype.setWriteTextButtonToGroup = function ifEmptyTreeSetWriteTextButtonToGroup(tree) {
        var button, context, tween;
        button = this.group.create(tree.button.x, tree.button.y, 'punzon');
        this.group.buttonSprite = button;
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
                previousTween : tween,
                group : this.group
        };
        button.events.onInputDown.add(function () {
            this.game.add.tween(this.button).to({alpha: 0}, 300, 'Linear', true, 0, 0);
            this.game.add.tween(this.group).to({y: (this.group.y + 550) }, 300, 'Linear', true, 0, 0);
            this.game.tweens.remove(this.previousTween);
            this.button.inputEnabled = false;
            this.button.useHandCursor = false;
            this.observer.clickedOnWriteButton(); // hola
        }, context);
    };

    SingleTreeGroupFactory.prototype.setTreeGroupIntoAllSpritesGroup = function setTreeGroupIntoAllSpritesGroup(id,treeGroup) {
        if (treeGroup !== undefined) {
            this.group = treeGroup;
        }
        this.group.name = id;
        this.mainGroup.add(this.group);
    };
    return SingleTreeGroupFactory;
});