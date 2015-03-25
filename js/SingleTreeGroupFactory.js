/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    "use strict";
    function SingleTreeGroupFactory(phaserGame, mainGroup) //noinspection JSLint
    {
            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.mainGroup = mainGroup;
    }

    SingleTreeGroupFactory.prototype.createImgFromTreeTypeAndText = function createImgFromTreeTypeAndText(type, text) {
        var dataTree = this.game.cache.getFrame(type), bmd;
        bmd = this.game.make.bitmapData(dataTree.width, dataTree.height);
        bmd.load(type);
        if (text === undefined) {
            return bmd;
        }
        bmd.ctx.fillStyle = "#000000";
        bmd.ctx.font = '25px san-serif';
        bmd.ctx.fillText(text, 10, 50);
        return bmd;
    };
    SingleTreeGroupFactory.prototype.createTreeSpriteGroup = function createTreeSpriteGroup(tree, id) {
        var imgId = this.createImgFromTreeTypeAndText(tree.type, tree.text);
        this.group = this.phaserGame.game.add.group();
        this.sprite = this.group.create(0, 0, imgId);
        this.sprite.name = "treeSprite";
        this.group.x = this.phaserGame.coordX(tree.x);
        this.group.y = this.phaserGame.coordY(tree.y);
        this.ifEmptyTreeSetWriteTextButtonToGroup(tree);
        this.setPropertiesToNewGroup(tree);
        this.setTreeGroupIntoAllSpritesGroup(id);
    };

    SingleTreeGroupFactory.prototype.setPropertiesToNewGroup = function setPropertiesToNewGroup(tree) {
        var prespectiveScale = tree.h / this.sprite.height,
            cellPhoneScale = this.phaserGame.scale,
            finalScale = prespectiveScale * cellPhoneScale;
        this.group.scale.setTo(finalScale, finalScale);
    };

    SingleTreeGroupFactory.prototype.ifEmptyTreeSetWriteTextButtonToGroup = function ifEmptyTreeSetWriteTextButtonToGroup(tree) {
        var button;
        if (tree.text !== undefined || tree.button === undefined) {
            return;
        }
        button = this.group.create(tree.button.x, tree.button.y, 'punzon');
        button.name = 'button';
        button.height = tree.button.hw;
        button.width = tree.button.hw;
    };

    SingleTreeGroupFactory.prototype.setTreeGroupIntoAllSpritesGroup = function setTreeGroupIntoAllSpritesGroup(id) {
        this.group.name = id;
        this.mainGroup.add(this.group);
    };
    return SingleTreeGroupFactory;
});