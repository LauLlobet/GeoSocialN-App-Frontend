/*global define, require, module, window, Phaser, setTimeout*/
//noinspection JSLint
define(['../../InputOutput/GpsBrowserBlockChecker'], function (GpsBrowserBlockChecker) {
    "use strict";
    //noinspection JSLint
    var windowObj = window, callbackFunct, targetW = 720, targetH = 1280;

    function PhaserGame(callback, gestureObserver) //noinspection JSLint
    {
            this.gestureObserver = gestureObserver;
            this.scale = 0.4; // temporal, it gets updated in this.resizeUpdate()
            this.virtualWidth = targetW;
            this.virtualHeight = targetH;
            callbackFunct = callback;
            var element = document.getElementById("canvasBg");
            if (element !== null) {
                element.parentNode.removeChild(element);
            }
            this.game = new Phaser.Game(windowObj.innerWidth, windowObj.innerHeight, Phaser.CANVAS, this);
            this.gameState = { preload: this.preload, create: this.create, update: this.update, render: this.render  };
            this.bootState = {  preload: function bootPreload() {
                                                          this.game.load.image('aaaa', '/OurTreeWeb/assets/spaceKey.png');
                                                          this.game.load.image('mercator', '/OurTreeWeb/assets/mercator.png');
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
        //if (!this.game.device.desktop) {
        //blockElement("turn");
        //}
    };

    PhaserGame.prototype.handleCorrect = function handleCorrect() {
        //if (!this.game.device.desktop) {
        displayNoneElement("turn");
        //}
    };

    PhaserGame.prototype.handleDesktop = function handleDesktop() {
        //document.getElementById("desktopWarning").style.display = "block";
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

    PhaserGame.prototype.setZoomMap = function setZoomMap() {
        var mapWidth = 1100,
            mapHeight = 750;

        var map = this.game.add.sprite(0, 0, 'mercator');
        map.anchor.x = 0.5;
        map.anchor.y = 0.5;
        map.x = windowObj.innerWidth/2;
        map.y = windowObj.innerHeight/2;

        var scale = windowObj.innerWidth / mapWidth;

        if (typeof latitude !== 'undefined') {
            var lat = latitude;
            var long = longitude;
            this.game.mapZoomTotalMilliseconds = 300;
        } else {
            var lat = 34;
            var long = 12;
            this.game.mapZoomTotalMilliseconds = 1;
        }
        var x = (long+180)*(mapWidth/365);
        var latRad = lat*Math.PI/180;
        var mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)));
        var y = (mapHeight/2)-(mapWidth*mercN/(2*Math.PI));

        map.anchor.x = x / mapWidth;
        map.anchor.y = y / mapHeight;

        map.scale.x = scale;
        map.scale.y = scale;

        this.game.zoomStartedMillieconds = (new Date()).getTime();


        this.game.add.tween(map.scale).to({x : 30, y : 30}, this.game.mapZoomTotalMilliseconds, 'Linear').start();
        this.game.add.tween(map).to({ x: windowObj.innerWidth / 2, y : windowObj.innerHeight / 2 }, this.game.mapZoomTotalMilliseconds, 'Linear').start();
        this.game.map = map;
    };

    PhaserGame.prototype.preload = function preload() {
        this.game.stage.backgroundColor = '#99b4cf';
        var loading = this.game.add.sprite(50, 50, 'aaaa');
        this.load.setPreloadSprite(loading);
        this.game.parent.setZoomMap();
        this.game.parent.loadImages();
        this.game.scale.parentIsWindow = true;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.forceOrientation(false, true);
        this.game.scale.enterIncorrectOrientation.add(this.game.parent.handleIncorrect);
        this.game.scale.leaveIncorrectOrientation.add(this.game.parent.handleCorrect);
        if (this.game.device.desktop) {
            this.game.parent.handleDesktop();
        }else{
            this.game.parent.handleMobile();
        }
        this.game.scale.refresh();
        this.game.parent.resizeUpdate();
        this.game.loading = loading;
    };
    PhaserGame.prototype.loadImages = function loadImages(){
        this.game.load.image('debugTree', '/OurTreeWeb/assets/treeTrunk2.png');
        this.game.load.image('point', '/OurTreeWeb/assets/point.png');
        this.game.load.image('real', '/OurTreeWeb/assets/realDimensionTree4.png');
        this.game.load.image('punzon', '/OurTreeWeb/assets/punzon.png');

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

        this.game.load.image('carved', '/OurTreeWeb/assets/alphabet2.png');
        this.game.load.image('linkLayer', '/OurTreeWeb/assets/linkLayer.png');
        this.game.load.image('passwordBox', '/OurTreeWeb/assets/passwordBox.png');

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