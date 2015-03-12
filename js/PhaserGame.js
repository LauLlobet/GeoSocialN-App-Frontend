/*global define, require, module, window, Phaser, setTimeout*/
//noinspection JSLint
define(["phaser"], function (phaser) {
    "use strict";
    //noinspection JSLint
    var windowObj = window, callbackFunct, targetW = 720, targetH = 1280;

    function PhaserGame(callback) //noinspection JSLint
    {
            this.scale = 0.4;
            callbackFunct = callback;
            this.game = new Phaser.Game(windowObj.innerWidth, windowObj.innerHeight, Phaser.CANVAS, this,
                    { preload: this.preload, create: this.create, update: this.update, render: this.render  });

    }

    PhaserGame.prototype.resizeUpdate = function resizeUpdate() {
        if (window.innerWidth / window.innerHeight > targetW / targetH) {
            this.scale = window.innerHeight / targetH;
        } else {
            this.scale = window.innerWidth / targetW;
        }
        if (this.game.scale !== null) {
            this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
        }
    };

    PhaserGame.prototype.preload = function preload() {
        this.game.stage.backgroundColor = '#336699';
        this.game.load.image('debugTree', '/OurTreeWeb/assets/treeTrunk2.png');
        this.game.load.image('point', '/OurTreeWeb/assets/point.png');

        this.game.scale.parentIsWindow = true;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.refresh();
        this.game.parent.resizeUpdate();
    };

    PhaserGame.prototype.create = function create() {
        this.game.world.setBounds(0, 0, windowObj.innerWidth, windowObj.innerHeight);
        setTimeout(callbackFunct(), 0);
    };

    PhaserGame.prototype.coordX = function coordX(xi) {
        return xi * this.scale + this.game.world.centerX;
    };

    PhaserGame.prototype.coordY = function coordY(yi) {
        return yi * this.scale + this.game.world.centerY;
    };

    PhaserGame.prototype.scaleToReal = function scaleToRealT(value) {
        return value * this.scale;
    };

    PhaserGame.prototype.resizeSprite = function resizeSprite(sprite) {
        this.game.scale.scaleSprite(sprite, sprite.width * this.scale, sprite.height * this.scale, true);
    };

    PhaserGame.prototype.resizeSpriteToSize = function resizeSpriteToSize(sprite, width, height) {
        this.game.scale.scaleSprite(sprite, width * this.scale, height * this.scale, true);
    };

    PhaserGame.prototype.update = function update() //noinspection JSLint
    {
       // console.log("updatinggggggg");
    };
    PhaserGame.prototype.render = function render() {
        this.game.debug.inputInfo(16, 16);
    };

    return PhaserGame;
});