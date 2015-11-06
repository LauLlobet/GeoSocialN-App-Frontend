/*global define, require, module, Phaser, Group*/
/*jslint todo: true */


define([], function () {
    "use strict";
    function TreeSpriteKmDigit(x, y, phaserGame, parentGroup) //noinspection JSLint
    {
        this.parentGroup = parentGroup;
        this.createSpritesAndGroup(phaserGame);
        this.setDigitToBlank();
        this.setXY(x, y);
        this.setScale(0.55);
    }
    TreeSpriteKmDigit.prototype.createSpritesAndGroup = function createSpriteAndGroup(phaserGame) {
        this.game = phaserGame.game;
        this.phaserGame = phaserGame;
        this.group = this.phaserGame.add.group();
        this.parentGroup.add(this.group);
        this.createSpritesHash();
    };
    TreeSpriteKmDigit.prototype.createSpritesHash = function createSpritesHash() {
        var id;
        this.spriteHash = {};
        for (id = 0; id < 10; id = id + 1) {
            this.addToHashAndSetInvisible(id);
        }
        this.addToHashAndSetInvisible('n');
        this.addToHashAndSetInvisible('m');
        this.addToHashAndSetInvisible('k');
    };
    TreeSpriteKmDigit.prototype.addToHashAndSetInvisible = function addToHashAndSetInvisible(id) {
        this.spriteHash[id] = this.group.create(0, 0, id + 'km');
        this.spriteHash[id].visible = false;
    };
    TreeSpriteKmDigit.prototype.setXY = function setXY(x,y) {
        this.x = x;
        this.y = y;
        this.setXYfromSettedPosition();
    };
    TreeSpriteKmDigit.prototype.setXYfromSettedPosition = function setXYfromSettedPosition() {
        this.group.x = this.x;
        this.group.y = this.y;
    };
    TreeSpriteKmDigit.prototype.setScale = function setScale(scale) {
        this.scale = scale;
        this.setScalefromSetted();
    };
    TreeSpriteKmDigit.prototype.setScalefromSetted = function setScalefromSetted() {
        this.sprite.scale.x = this.scale;
        this.sprite.scale.y = this.scale;
    };
    TreeSpriteKmDigit.prototype.setXYScaleFromSetted = function setXYScaleFromSetted() {
        this.setXYfromSettedPosition();
        this.setScalefromSetted();
    };
    TreeSpriteKmDigit.prototype.setDigit = function (digit) {
        if (this.sprite !== undefined) {
            this.sprite.visible = false;
        }
        this.sprite = this.spriteHash[digit];
        this.sprite.visible = true;
        this.setXYScaleFromSetted();
    };
    TreeSpriteKmDigit.prototype.setDigitToBlank = function () {
        this.setDigit('n');
    }
    return TreeSpriteKmDigit;
});