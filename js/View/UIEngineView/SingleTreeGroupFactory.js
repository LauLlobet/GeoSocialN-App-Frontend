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
        this.sprite = this.group.create(0, 0, 'real');
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
        if (this.isNotAnEmptyTree(tree)) {
            this.group.textSetter = new TreeSpriteGroupTextSetter(this.textGroup, this.buryGroup, this.game, this.gestureObserver);
            this.group.textSetter.createText(tree.text, tree.unburiedLayers);
            this.group.kmSetter = new TreeSpriteCounterKmSetter(this.group, this.game);
            this.group.compassSetter = new TreeSpriteCompasSetter(this.group, this.game);
        }
        console.log("CREATING TREE");
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
        return (tree.text !== undefined || tree.button === undefined);
    };
    SingleTreeGroupFactory.prototype.isNotInstructionTree = function (tree) {
        return (tree.treeid !== 1);
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