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
            this.lastSwipeTime = Date.now();

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
        this.game.load.image('real', '/OurTreeWeb/assets/realDimensionTree.png');

        this.game.scale.parentIsWindow = true;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.refresh();
        this.game.parent.resizeUpdate();
    };

    PhaserGame.prototype.create = function create() {
        this.game.world.setBounds(0, 0, windowObj.innerWidth, windowObj.innerHeight);
        this.game.input.addPointer();
        setTimeout(callbackFunct(this), 0);
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

    PhaserGame.prototype.onSwipe = function onSwipe() {
        this.lastSwipe =  Date.now() - this.lastSwipeTime;
        var isSwipe = (Phaser.Point.distance(this.game.input.activePointer.position,
            this.game.input.activePointer.positionDown) > 100 &&
        this.game.input.activePointer.duration > 100 &&
        this.game.input.activePointer.duration < 250 && this.lastSwipe > 1000);
        if (isSwipe) {
            this.lastSwipeTime = Date.now();
        }
        if (!isSwipe) {
            return false;
        }
        if (this.game.input.activePointer.positionDown > this.game.input.activePointer.position){
            return "right";
        }
        return "left";
    };
    PhaserGame.prototype.update = function update() //noinspection JSLint
    {
        var swipe = this.game.parent.onSwipe();

            if (swipe === "left") {
                this.sceneLoaderInterface.loadScene('forestSwipeLeft', []);
            }
            if (swipe === "right") {
                this.sceneLoaderInterface.loadScene('forestSwipeRight', []);
            }
    };
    PhaserGame.prototype.render = function render() {
        this.game.debug.inputInfo(16, 16);
        this.game.debug.pointer(this.game.input.activePointer);
    //    this.game.debug.pointer(this.game.input.pointer1);
    };



    return PhaserGame;
});