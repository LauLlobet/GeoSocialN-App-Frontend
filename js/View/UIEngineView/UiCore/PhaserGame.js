/*global define, require, module, window, Phaser, setTimeout*/
//noinspection JSLint
define(['../../../InputOutput/GpsBrowserBlockChecker'], function (GpsBrowserBlockChecker) {
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
                                                          this.game.load.image('aaaa', '/VisitTreeNumber/assets/spaceKey.png');
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

    var blockElement = function (element,dontfade) {
        var elem = document.getElementById(element);
        if (elem !== null) {
            if (dontfade === undefined) {
                fadeIn(elem);
            }else{
                elem.style.display = 'block';
            }
        }
    };

    var displayNoneElement = function (element,dontfade) {
        var elem = document.getElementById(element);
        if (elem !== null) {
            if (dontfade === undefined){
                fadeOut(elem);
            }else{
                elem.style.display = 'none';
            }
        }
    };

    var fadeOut = function fade(element) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 1);
    };

    var fadeIn = function fadeIn(element) {
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 1);
    }

    var setPrecision = function (precision) {
        var elem = document.getElementById("calibratingGPSPrecision");
        if (elem !== null) {
            elem.textContent = "precision: " + Math.floor(precision) + " expected: 14";
        }
    };

    var displayNoText = function (element) {
        var elem = document.getElementById(element);
        elem.textContent = "";
    };
    PhaserGame.prototype.handleIncorrect = function handleIncorrect() {
      //  blockElement("turn");
    };

    PhaserGame.prototype.handleCorrect = function handleCorrect() {
        //displayNoneElement("turn");
    };

    PhaserGame.prototype.removeWelcomeScreen = function removeWelcomeScreen() {
        displayNoneElement("welcomeScreen");
    };

    PhaserGame.prototype.handleDesktop = function handleDesktop() {
        blockElement("desktopWarning");
    };

    PhaserGame.prototype.handleMobile = function handleMobile() {
        displayNoneElement("desktopWarning");
    };
    PhaserGame.prototype.ignorePrecisionGps = function ignorePrecisionGps() {
        this.ignorePrecision = true;
        displayNoneElement("calibratingGPS0",true);
        displayNoneElement("calibratingGPS2",true);
        displayNoneElement("calibratingGPS5",true);
        displayNoneElement("calibratingGPS7",true);
        displayNoneElement("calibratingGPS9",true);
        displayNoText("calibratingGPSPrecision");
    };
    PhaserGame.prototype.handlePrecisionGps = function handlePrecisionGps(precision, meters) {
        displayNoneElement("calibratingGPS0",true);
        displayNoneElement("calibratingGPS2",true);
        displayNoneElement("calibratingGPS5",true);
        displayNoneElement("calibratingGPS7",true);
        displayNoneElement("calibratingGPS9",true);
        displayNoText("calibratingGPSPrecision");

        if (this.ignorePrecision) {
            return;
        }
        if (precision === 0) {
            blockElement("calibratingGPS0",true);
            setPrecision(meters);
        } else if (precision < 3) {
            blockElement("calibratingGPS2",true);
            setPrecision(meters);
        } else if (precision < 6) {
            blockElement("calibratingGPS5",true);
            setPrecision(meters);
        } else if (precision < 8) {
            blockElement("calibratingGPS7",true);
            setPrecision(meters);
        } else if (precision < 10) {
            blockElement("calibratingGPS9",true);
            setPrecision(meters);
        }
    };
    PhaserGame.prototype.preload = function preload() {
        this.game.time.advancedTiming = true;
        this.game.stage.backgroundColor = '#99b4cf';
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
    };
    PhaserGame.prototype.loadImages = function loadImages(){
        this.game.load.image('real', '/VisitTreeNumber/assets/tree.png');
        this.game.load.image('roots', '/VisitTreeNumber/assets/treeWithRoots.png');
        this.game.load.image('fullTerritory', '/VisitTreeNumber/assets/fullTerritory.png');

        this.game.load.image('fondo', '/VisitTreeNumber/assets/fondo.png');

        this.game.load.image('pala', '/VisitTreeNumber/assets/pala.png');

        this.game.load.image('keyboardBackground', '/VisitTreeNumber/assets/fondoTeclat.png');
        this.game.load.image('keyBackground', '/VisitTreeNumber/assets/keyBackground.png');
        this.game.load.image('keySpace', '/VisitTreeNumber/assets/spaceKey.png');
        this.game.load.image('keyEnter', '/VisitTreeNumber/assets/enter.png');
        this.game.load.image('keyBackwards', '/VisitTreeNumber/assets/keyBackwards.png');
        this.game.load.image('keyOk', '/VisitTreeNumber/assets/keyOk.png');
        this.game.load.image('keyCancel', '/VisitTreeNumber/assets/keyCancel.png');
        this.game.load.image('keySwitchKeyboard', '/VisitTreeNumber/assets/keySwitchKeyboard.png');
        this.game.load.image('lock', '/VisitTreeNumber/assets/lock.png');
        this.game.load.image('lockpick', '/VisitTreeNumber/assets/lockpick.png');


        this.game.load.image('leafs', '/VisitTreeNumber/assets/pileOfLeafs.png');
        this.game.load.image('leafspick', '/VisitTreeNumber/assets/leaf.png');

        this.game.load.image('linkLayer', '/VisitTreeNumber/assets/linkLayer.png');
        this.game.load.image('passwordBox', '/VisitTreeNumber/assets/passwordBox.png');

        this.game.load.image('lockBg', '/VisitTreeNumber/assets/lockBg.png');
        this.game.load.image('buryBg', '/VisitTreeNumber/assets/buryBg.png');
        this.game.load.image('twitterBg', '/VisitTreeNumber/assets/twitterBg.png');
        this.game.load.image('linkBg', '/VisitTreeNumber/assets/linkBg.png');
        this.game.load.image('heartBg', '/VisitTreeNumber/assets/heartBg.png');
        this.game.load.image('catBg', '/VisitTreeNumber/assets/catBg.png');


        this.game.load.image('downVote', '/VisitTreeNumber/assets/downVote.png');
        this.game.load.image('upVote', '/VisitTreeNumber/assets/upVote.png');
        this.game.load.image('flower', '/VisitTreeNumber/assets/flower.png');

        this.game.load.image('alphalayer', '/VisitTreeNumber/assets/alphaLayer.png');
        this.game.load.image('alphalayerbg', '/VisitTreeNumber/assets/alphaLayerBg.png');
        this.game.load.image('map', '/VisitTreeNumber/assets/alphaLayerBg.png');

        //  Firefox doesn't support mp3 files, so use ogg
        this.game.load.audio('bell', ['/VisitTreeNumber/assets/bell.ogg']);
        this.game.load.audio('plant', ['/VisitTreeNumber/assets/plant.ogg']);
        this.game.load.audio('unbell', ['/VisitTreeNumber/assets/unbell.ogg']);

        var i;
        for(i=0; i<10; i= i+1){
            this.game.load.image(i+'km', '/VisitTreeNumber/assets/'+i+'km.png');
        }
        i = 'n';
        this.game.load.image(i+'km', '/VisitTreeNumber/assets/'+i+'km.png');
        i = 'm';
        this.game.load.image(i+'km', '/VisitTreeNumber/assets/'+i+'km.png');
        i = 'k';
        this.game.load.image(i+'km', '/VisitTreeNumber/assets/'+i+'km.png');

        this.game.load.image('compasBg', '/VisitTreeNumber/assets/compasBg.png');
        this.game.load.image('needle', '/VisitTreeNumber/assets/needle.png');
        this.game.load.image('notPreciseAlert', '/VisitTreeNumber/assets/notPreciseAlert.png');
        this.game.load.image('yesPreciseAlert', '/VisitTreeNumber/assets/yesPreciseAlert.png');
        this.game.load.bitmapFont('font', '/VisitTreeNumber/assets/font.png', '/VisitTreeNumber/assets/font.fnt');

        this.game.load.image('welcomeCa', '/VisitTreeNumber/assets/welcomeCa.png');
        this.game.load.image('welcomeEn', '/VisitTreeNumber/assets/welcomeEn.png');
        this.game.load.image('welcomeEs', '/VisitTreeNumber/assets/welcomeEs.png');

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
       // this.game.debug.text(this.game.time.fps || '--', 2, 14, "#ffff00");

    };



    return PhaserGame;
});