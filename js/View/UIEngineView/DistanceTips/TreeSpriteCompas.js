/*global define, require, module, Phaser, Group*/
/*jslint todo: true */

define([], function () {
    "use strict";
    function TreeSpriteCompas(parentGroup, phaserGame, x, y) //noinspection JSLint
    {
            this.parentGroup = parentGroup;
            this.createSpritesAndGroup(phaserGame);
            this.setScale(0.50);
            this.centerNeedle();
            this.setXY(x, y);
    }
    TreeSpriteCompas.prototype.createSpritesAndGroup = function createSpriteAndGroup(phaserGame) {
        this.game = phaserGame.game;
        this.phaserGame = phaserGame;
        this.group = this.phaserGame.add.group();
        this.parentGroup.add(this.group);
        this.createSprites();
    };
    TreeSpriteCompas.prototype.createSprites = function createSprites() {
        this.background = this.group.create(0, 0, 'compasBg');
        this.needle = this.group.create(0, 0, 'needle');
    };
    TreeSpriteCompas.prototype.centerNeedle = function centerNeedle() {

        this.needle.x = this.needle.width / 2;
        this.needle.y = this.needle.width / 2;
        this.needle.anchor.setTo(0.5, 0.5);
    };
    TreeSpriteCompas.prototype.setXY = function setXY(x,y) {
        this.x = x;
        this.y = y;
        this.setXYfromSettedPosition();
    };
    TreeSpriteCompas.prototype.setXYfromSettedPosition = function setXYfromSettedPosition() {
        this.group.x = this.x;
        this.group.y = this.y;
    };
    TreeSpriteCompas.prototype.setScale = function setScale(scale) {
        this.scale = scale;
        this.setScalefromSetted();
    };
    TreeSpriteCompas.prototype.setScalefromSetted = function setScalefromSetted() {
        this.needle.scale.x = this.scale;
        this.needle.scale.y = this.scale;
        this.background.scale.x = this.scale;
        this.background.scale.y = this.scale;
    };
    TreeSpriteCompas.prototype.setXYScaleFromSetted = function setXYScaleFromSetted() {
        this.setXYfromSettedPosition();
        this.setScalefromSetted();
    };
    TreeSpriteCompas.prototype.setAngle = function (angle) {
        this.needle.angle = angle;
    };
    return TreeSpriteCompas;
});