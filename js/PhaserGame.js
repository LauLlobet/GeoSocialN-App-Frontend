//noinspection JSLint,JSUnusedLocalSymbols
define(["phaser"], function (phaser) {
    "use strict";
    //noinspection JSLint
    var windowObj = window;
    var callbackFunct;
    var targetW = 720;
    var targetH = 1280;

    function PhaserGame(callback) //noinspection JSLint
    {
        this.scale = 0.4;
        callbackFunct = callback;
        this.game = new Phaser.Game(windowObj.innerWidth, windowObj.innerHeight, Phaser.CANVAS, this ,
                { preload: this.preload, create: this.create, update: this.update, render: this.render  });

    }

    PhaserGame.prototype.resizeUpdate = function () {
        if (window.innerWidth / window.innerHeight > targetW / targetH) {
            this.scale = window.innerHeight / targetH;
        } else {
            this.scale = window.innerWidth / targetW;
        }
        if(this.game.scale !== null) {
            this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
        }
    }

    PhaserGame.prototype.preload = function () {
        this.game.stage.backgroundColor = '#336699';
        this.game.load.image('debugTree', '/OurTreeWeb/assets/treeTrunk2.png');
        this.game.load.image('point', '/OurTreeWeb/assets/point.png');

        this.game.scale.parentIsWindow = true;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.refresh();
        this.game.parent.resizeUpdate();
    };

    PhaserGame.prototype.create = function () {
        this.game.world.setBounds(0, 0, windowObj.innerWidth, windowObj.innerHeight);
        console.log("create");
        setTimeout( callbackFunct(), 0); // check again in a second
    };

    PhaserGame.prototype.coordX = function (xi) {
        return xi * this.scale + this.game.world.centerX;
    };

    PhaserGame.prototype.coordY = function (yi) {
        return yi * this.scale + this.game.world.centerY;
    };

    PhaserGame.prototype.resizeSprite = function (sprite) {
        this.game.scale.scaleSprite(sprite, sprite.width * this.scale, sprite.height * this.scale, true);
    };

    PhaserGame.prototype.resizeSpriteToSize = function (sprite, width, height) {
        this.game.scale.scaleSprite(sprite, width * this.scale, height * this.scale, true);
    };

    PhaserGame.prototype.update = function () //noinspection JSLint
    {
       // console.log("updatinggggggg");
    };
    PhaserGame.prototype.render = function () {
        this.game.debug.inputInfo(16, 16);
    };

    return PhaserGame;
});