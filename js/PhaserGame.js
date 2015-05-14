/*global define, require, module, window, Phaser, setTimeout*/
//noinspection JSLint
define(["phaser"], function (phaser) {
    "use strict";
    //noinspection JSLint
    var windowObj = window, callbackFunct, targetW = 720, targetH = 1280;

    function PhaserGame(callback, gestureObserver) //noinspection JSLint
    {
            this.gestureObserver = gestureObserver;
            this.scale = 0.4;
            callbackFunct = callback;
            var element = document.getElementById("canvasBg");
            element.parentNode.removeChild(element);
            this.game = new Phaser.Game(windowObj.innerWidth, windowObj.innerHeight, Phaser.CANVAS, this);
            this.gameState = { preload: this.preload, create: this.create, update: this.update, render: this.render  };
            this.bootState = {  preload: function bootPreload() {
                                                          this.game.load.image('aaaa', '/OurTreeWeb/assets/spaceKey.png');
                                        },
                                create: function () { this.state.start('GameState');
                                        }
                            }
            this.game.state.add('Boot', this.bootState);
            this.game.state.add('GameState', this.gameState);
            this.lastSwipeTime = Date.now();
            this.game.state.start('Boot');

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
        this.game.stage.backgroundColor = '#095712';
        var loading = this.game.add.sprite(50, 50, 'aaaa');
        this.load.setPreloadSprite(loading);


        this.game.load.image('debugTree', '/OurTreeWeb/assets/treeTrunk2.png');
        this.game.load.image('point', '/OurTreeWeb/assets/point.png');
        this.game.load.image('real', '/OurTreeWeb/assets/realDimensionTree4.png');
        this.game.load.image('punzon', '/OurTreeWeb/assets/punzon.png');
        this.game.load.image('keyboardBackground', '/OurTreeWeb/assets/fondoTeclat.png');
        this.game.load.image('keyBackground', '/OurTreeWeb/assets/keyBackground.png');
        this.game.load.image('keySpace', '/OurTreeWeb/assets/spaceKey.png');
        this.game.load.image('keyEnter', '/OurTreeWeb/assets/enter.png');
        this.game.load.image('keyBackwards', '/OurTreeWeb/assets/keyBackwards.png');

        this.game.load.image('carved', '/OurTreeWeb/assets/alphabet.png');


        this.game.scale.parentIsWindow = true;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.refresh();
        this.game.parent.resizeUpdate();
        this.loading = loading;

    };

    PhaserGame.prototype.create = function create() {
        this.game.world.setBounds(0, 0, windowObj.innerWidth, windowObj.innerHeight);
        this.game.input.addPointer();
        setTimeout(callbackFunct(this), 0);
        this.game.world.remove(this.loading);
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
            this.game.parent.gestureObserver.updatePointer(this.game.input.activePointer);
    };
    PhaserGame.prototype.render = function render() {
        //this.game.debug.inputInfo(16, 16);
         //this.game.debug.pointer(this.game.input.activePointer);
    //    this.game.debug.pointer(this.game.input.pointer1);
    };



    return PhaserGame;
});