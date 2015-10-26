/*global define, require, module, window, Phaser, setTimeout*/
//noinspection JSLint
define(['../../InputOutput/GpsBrowserBlockChecker'], function (GpsBrowserBlockChecker) {
    "use strict";
    //noinspection JSLint
    var windowObj = window, callbackFunct, targetW = 480, targetH = 640; //also refernced in keyboard
    //var windowObj = window, callbackFunct, targetW = 720, targetH = 1280;

    function PhaserGame(callback, gestureObserver) //noinspection JSLint
    {
            this.gestureObserver = gestureObserver;
            this.scale = 0.5; // temporal, it gets updated in this.resizeUpdate()
            this.virtualWidth = targetW;
            this.virtualHeight = targetH;
            callbackFunct = callback;
            var element = document.getElementById("canvasBg");
            if (element !== null) {
                element.parentNode.removeChild(element);
            }
            this.game = new Phaser.Game(targetW, targetH, Phaser.CANVAS, this);
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
            this.ignorePrecision = false;
    };
    PhaserGame.prototype.blockElement = function (element) {
        var elem = document.getElementById(element);
        if (elem !== null) {
            elem.style.display = "block";
        }
    };
    PhaserGame.prototype.displayNoneElement = function (element) {
        var elem = document.getElementById(element);
        if (elem !== null) {
            elem.style.display = "none";
        }
    };

    var blockElement = function (element) {
        var elem = document.getElementById(element);
        if (elem !== null) {
            elem.style.display = "block";
        }
    };
    var displayNoneElement = function (element) {
        var elem = document.getElementById(element);
        if (elem !== null) {
            elem.style.display = "none";
        }
    };
    PhaserGame.prototype.handleIncorrect = function handleIncorrect() {
      //  blockElement("turn");
    };

    PhaserGame.prototype.handleCorrect = function handleCorrect() {
        //displayNoneElement("turn");
    };

    PhaserGame.prototype.handleDesktop = function handleDesktop() {
        blockElement("desktopWarning");
    };

    PhaserGame.prototype.handleMobile = function handleMobile() {
        displayNoneElement("desktopWarning");
    };
    PhaserGame.prototype.ignorePrecisionGps = function ignorePrecisionGps() {
        this.ignorePrecision = true;
        displayNoneElement("calibratingGPS0");
        displayNoneElement("calibratingGPS2");
        displayNoneElement("calibratingGPS5");
        displayNoneElement("calibratingGPS7");
        displayNoneElement("calibratingGPS9");
    };
    PhaserGame.prototype.handlePrecisionGps = function handlePrecisionGps(precision) {
        displayNoneElement("calibratingGPS0");
        displayNoneElement("calibratingGPS2");
        displayNoneElement("calibratingGPS5");
        displayNoneElement("calibratingGPS7");
        displayNoneElement("calibratingGPS9");
        if (this.ignorePrecision) {
            return;
        }
        if (precision === 0) {
            blockElement("calibratingGPS0");
        } else if (precision < 3) {
            blockElement("calibratingGPS2");
        } else if (precision < 6) {
            blockElement("calibratingGPS5");
        } else if (precision < 8) {
            blockElement("calibratingGPS7");
        } else if (precision < 10) {
            blockElement("calibratingGPS9");
        }
    };
    PhaserGame.prototype.preload = function preload() {
        this.game.time.advancedTiming = true;
        this.game.stage.backgroundColor = '#99b4cf';
        var loading = this.game.add.sprite(50, 50, 'aaaa');
        this.load.setPreloadSprite(loading);
        this.game.parent.loadImages();
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.forceOrientation(false, true);
        this.game.scale.enterIncorrectOrientation.add(this.game.parent.handleIncorrect);
        this.game.scale.leaveIncorrectOrientation.add(this.game.parent.handleCorrect);
        if (this.game.device.desktop) {
            this.game.parent.handleDesktop();
        } else {
            this.game.parent.handleMobile();
        }
        this.game.loading = loading;
    };
    PhaserGame.prototype.loadImages = function loadImages(){
        this.game.load.image('real', '/OurTreeWeb/assets/realDimensionTree4.png');
        this.game.load.image('roots', '/OurTreeWeb/assets/treeWithRoots.png');
        this.game.load.image('punzon', '/OurTreeWeb/assets/punzon.png');
        this.game.load.image('fullTerritory', '/OurTreeWeb/assets/fullTerritory.png');


        this.game.load.image('keyboardBackground', '/OurTreeWeb/assets/fondoTeclat.png');
        this.game.load.image('keyBackground', '/OurTreeWeb/assets/keyBackground.png');
        this.game.load.image('keySpace', '/OurTreeWeb/assets/spaceKey.png');
        this.game.load.image('keyEnter', '/OurTreeWeb/assets/enter.png');
        this.game.load.image('keyBackwards', '/OurTreeWeb/assets/keyBackwards.png');
        this.game.load.image('keyOk', '/OurTreeWeb/assets/keyOk.png');
        this.game.load.image('keyCancel', '/OurTreeWeb/assets/keyCancel.png');
        this.game.load.image('keySwitchKeyboard', '/OurTreeWeb/assets/keySwitchKeyboard.png');
        this.game.load.image('lock', '/OurTreeWeb/assets/lock.png');
        this.game.load.image('lockpick', '/OurTreeWeb/assets/lockpick.png');


        this.game.load.image('leafs', '/OurTreeWeb/assets/pileOfLeafs.png');
        this.game.load.image('leafspick', '/OurTreeWeb/assets/leaf.png');

        this.game.load.image('carved', '/OurTreeWeb/assets/alphabet2.png');
        this.game.load.image('linkLayer', '/OurTreeWeb/assets/linkLayer.png');
        this.game.load.image('passwordBox', '/OurTreeWeb/assets/passwordBox.png');

        this.game.load.image('lockBg', '/OurTreeWeb/assets/lockBg.png');
        this.game.load.image('buryBg', '/OurTreeWeb/assets/buryBg.png');
        this.game.load.image('twitterBg', '/OurTreeWeb/assets/twitterBg.png');
        this.game.load.image('linkBg', '/OurTreeWeb/assets/linkBg.png');
        this.game.load.image('heartBg', '/OurTreeWeb/assets/heartBg.png');
        this.game.load.image('catBg', '/OurTreeWeb/assets/catBg.png');


        this.game.load.image('downVote', '/OurTreeWeb/assets/downVote.png');
        this.game.load.image('upVote', '/OurTreeWeb/assets/upVote.png');
        this.game.load.image('flower', '/OurTreeWeb/assets/flower.png');
        this.game.load.image('rake', '/OurTreeWeb/assets/rake.png');

        //  Firefox doesn't support mp3 files, so use ogg
        this.game.load.audio('bell', ['/OurTreeWeb/assets/bell.ogg']);
        this.game.load.audio('plant', ['/OurTreeWeb/assets/plant.ogg']);
        this.game.load.audio('unbell', ['/OurTreeWeb/assets/unbell.ogg']);

        var i;
        for(i=0; i<10; i= i+1){
            this.game.load.image(i+'km', '/OurTreeWeb/assets/'+i+'km.png');
        }
        i = 'n';
        this.game.load.image(i+'km', '/OurTreeWeb/assets/'+i+'km.png');
        i = 'm';
        this.game.load.image(i+'km', '/OurTreeWeb/assets/'+i+'km.png');
        i = 'k';
        this.game.load.image(i+'km', '/OurTreeWeb/assets/'+i+'km.png');

        this.game.load.image('compasBg', '/OurTreeWeb/assets/compasBg.png');
        this.game.load.image('needle', '/OurTreeWeb/assets/needle.png');

        this.game.load.bitmapFont('ubuntu', '/OurTreeWeb/assets/font.png', '/OurTreeWeb/assets/font.fnt');
    };
    PhaserGame.prototype.create = function create() {
        var elapsedTimeSinceStartZoomingMap = ((new Date()).getTime() - this.game.zoomStartedMillieconds),
            restOfTheTime = this.game.mapZoomTotalMilliseconds - elapsedTimeSinceStartZoomingMap;
        setTimeout(this.game.parent.afterMapZoomStartGame, restOfTheTime, this);
    };
    PhaserGame.prototype.afterMapZoomStartGame = function afterMapZoomStartGame(parent) {
        parent.game.world.setBounds(0, 0, windowObj.innerWidth, windowObj.innerHeight);
        parent.game.input.addPointer();
        setTimeout(callbackFunct(parent), 0);
        parent.game.stage.backgroundColor = '#93fbbc';
        parent.game.world.remove(parent.game.loading);
        parent.game.world.remove(parent.game.map);
    };
    PhaserGame.prototype.coordX = function coordX(xi) {
        return xi * this.scale + targetW / 2;//+ this.game.world.centerX;
    };

    PhaserGame.prototype.coordY = function coordY(yi) {
        return yi * this.scale + targetH / 2;//+ this.game.world.centerY;
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
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#ffff00");

    };



    return PhaserGame;
});