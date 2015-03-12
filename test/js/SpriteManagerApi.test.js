/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([], function () {
    'use strict';
    module('SpriteManagerPhaserApi with real PhaserGame');

    asyncTest('add sprites and get it\'s length', function () {
        require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var phaserGame, spriteManagerPhaserApi;
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                spriteManagerPhaserApi.createSprite({
                    x: 720 / 2 - 200,
                    y: 1280 / 2 - 200,
                    w: 200,
                    h: 200,
                    type: "debugTree"
                }, 1234);
                spriteManagerPhaserApi.createSprite({
                    x: -100,
                    y: 100,
                    w: 100,
                    h: 100,
                    type: "debugTree"
                }, 12345);
                spriteManagerPhaserApi.createSprite({
                    x: 400,
                    y: 400,
                    w: 100,
                    h: 100,
                    type: "debugTree"
                }, 123456);
                equal(spriteManagerPhaserApi.size(), 3, 'spriteManagerPhaserApi.size');
                QUnit.start();
            });

        });

    });

    asyncTest('delete sprites', function () {
        require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var phaserGame, spriteManagerPhaserApi;
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                spriteManagerPhaserApi.createSprite({
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 1234);
                spriteManagerPhaserApi.createSprite({
                    x: -100,
                    y: -400,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 12345);
                spriteManagerPhaserApi.createSprite({
                    x: 400,
                    y: -300,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 123456);
                spriteManagerPhaserApi.deleteSprite(123456);
                equal(spriteManagerPhaserApi.size(), 2, 'debugTree.state');
                QUnit.start();
            });

        });
    });


    asyncTest('delete sprites', function () {
        require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var phaserGame, spriteManagerPhaserApi;
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                spriteManagerPhaserApi.createSprite({
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 1234);
                spriteManagerPhaserApi.createSprite({
                    x: -100,
                    y: -400,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 12345);
                spriteManagerPhaserApi.createSprite({
                    x: 400,
                    y: -300,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 123456);
                equal(spriteManagerPhaserApi.existsId(123456), true, 'id of a sprite that exists');
                equal(spriteManagerPhaserApi.existsId(999999), false, 'id of a sprite that doesent exist');
                QUnit.start();
            });

        });
    });

    asyncTest('compare lists of id and delete unexistant', function () {
        require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var phaserGame, spriteManagerPhaserApi;
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                spriteManagerPhaserApi.createSprite({
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 32);
                spriteManagerPhaserApi.createSprite({
                    x: -100,
                    y: -400,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 45);
                spriteManagerPhaserApi.createSprite({
                    x: 400,
                    y: -300,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 12);
                spriteManagerPhaserApi.createSprite({
                    x: -100,
                    y: -400,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 50);
                spriteManagerPhaserApi.tellAllActiveSpritesSoItCanUpdateIt([45, 32]);
                equal(spriteManagerPhaserApi.size(), 2, 'deleted one by ommiting it form the list of ids');
                QUnit.start();
            });

        });
    });

    asyncTest('compare lists of id and delete unexistant', function () {
        require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            //noinspection JSLint
            var phaserGame, spriteManagerPhaserApi,
                sceneLoaderMockSpy = {
                    numcalls : 0,
                    getTreeFromId: function getTreeFromId (id) {
                        this.numcalls += 1;
                        return {
                            x: 400 * Math.random(),
                            y: 400 * Math.random(),
                            w: 50,
                            h: 50,
                            type: "point"
                        };
                    },
                    getNumCalls : function getNumCalls () {
                        return this.numcalls;
                    }
                };
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame, sceneLoaderMockSpy);
                spriteManagerPhaserApi.createSprite({
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 32);
                spriteManagerPhaserApi.createSprite({
                    x: -100,
                    y: -400,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 45);
                spriteManagerPhaserApi.tellAllActiveSpritesSoItCanUpdateIt([45, 12, 21]);
                equal(spriteManagerPhaserApi.size(), 3, 'deleted one by ommiting it form the list of ids and add two');
                equal(sceneLoaderMockSpy.getNumCalls(), 2, 'num of calls to the interface of the scene loader');
                QUnit.start();
            });

        });
    });


    asyncTest('tween animation', function () {
        require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var spriteManagerPhaserApi, phaserGame;
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                spriteManagerPhaserApi.createSprite({
                    x: 360,
                    y: 640,
                    w: 50,
                    h: 50,
                    type: "debugTree"
                }, 32);
                spriteManagerPhaserApi.createSprite({
                    x: 360 - 50,
                    y: 640 - 50,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 45);
                var sprite32 = spriteManagerPhaserApi.findSpriteByNameOrThrowIfNotExists(32);
                spriteManagerPhaserApi.tweenStprite(32, {
                    x: -360,
                    y: -640,
                    w: 720,
                    t: 1000
                });
                setTimeout(function f() {
                    notEqual(0, sprite32.x, 'go to 0');
                    QUnit.start();
                }, 1000);
            });
        });
    });


    asyncTest('compare lists of id and delete unexistant', function () {
        require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            //noinspection JSLint
            var phaserGame, spriteManagerPhaserApi,
                sceneLoaderMockSpy = {
                    numcalls : 0,
                    getTreeFromId: function getTreeFromId (id) {
                        this.numcalls += 1;
                        return {
                            x: 400 * Math.random(),
                            y: 400 * Math.random(),
                            w: 50,
                            h: 50,
                            type: "point",
                            tween: {
                                x: -360,
                                y: -640,
                                w: 360
                            }
                        };
                    },
                    getNumCalls : function getNumCalls () {
                        return this.numcalls;
                    }
                };
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame, sceneLoaderMockSpy);
                spriteManagerPhaserApi.createSprite({
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 32);
                spriteManagerPhaserApi.createSprite({
                    x: -100,
                    y: -400,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 45);
                spriteManagerPhaserApi.tellAllActiveSpritesSoItCanUpdateIt([45, 12, 21]);
                equal(spriteManagerPhaserApi.size(), 3, 'deleted one by ommiting it form the list of ids and add two');
                equal(sceneLoaderMockSpy.getNumCalls(), 2, 'num of calls to the interface of the scene loader');
                QUnit.start();
            });

        });
    });


});

