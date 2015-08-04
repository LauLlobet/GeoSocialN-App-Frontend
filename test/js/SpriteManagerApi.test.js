/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([ "../../scenes/WriteButton"], function (writeButton) {
    'use strict';
    module('SpriteManagerPhaserApi with real PhaserGame');
    asyncTest('add sprites and get it\'s length', function () {
        require(["../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var phaserGame, spriteManagerPhaserApi,
                fakeGestureObserver = {
                    updatePointer: function () {}
                };
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: 720 / 2 - 200,
                    y: 1280 / 2 - 200,
                    w: 200,
                    h: 200,
                    type: "debugTree"
                }, 1234);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: -100,
                    y: 100,
                    w: 100,
                    h: 100,
                    type: "debugTree"
                }, 12345);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: 400,
                    y: 400,
                    w: 100,
                    h: 100,
                    type: "debugTree"
                }, 123456);
                equal(spriteManagerPhaserApi.size(), 3, 'spriteManagerPhaserApi.size');
                QUnit.start();
            }, fakeGestureObserver);

        });

    });

    asyncTest('delete sprites', function () {
        require(["../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var phaserGame,
                spriteManagerPhaserApi,
                fakeGestureObserver = {
                    updatePointer: function () {}
                },
                phaserGame = new PhaserGame(function () {
                    spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                    spriteManagerPhaserApi.createTreeSpriteGroup({
                        x: 0,
                        y: 0,
                        w: 50,
                        h: 50,
                        type: "point"
                    }, 1234);
                    spriteManagerPhaserApi.createTreeSpriteGroup({
                        x: -100,
                        y: -400,
                        w: 50,
                        h: 50,
                        type: "point"
                    }, 12345);
                    spriteManagerPhaserApi.createTreeSpriteGroup({
                        x: 400,
                        y: -300,
                        w: 50,
                        h: 50,
                        type: "point"
                    }, 123456);
                    spriteManagerPhaserApi.deleteTreeSpriteGroup(123456);
                    equal(spriteManagerPhaserApi.size(), 2, 'debugTree.state');
                    QUnit.start();
                }, fakeGestureObserver);
        });
    });


    asyncTest('delete sprites', function () {
        require(["../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var phaserGame, spriteManagerPhaserApi,
                fakeGestureObserver = {
                    updatePointer: function () {}
                };
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 1234);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: -100,
                    y: -400,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 12345);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: 400,
                    y: -300,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 123456);
                equal(spriteManagerPhaserApi.existsId(123456), true, 'id of a sprite that exists');
                equal(spriteManagerPhaserApi.existsId(999999), false, 'id of a sprite that doesent exist');
                QUnit.start();
            }, fakeGestureObserver);

        });
    });

    asyncTest('compare lists of id and delete unexistant', function () {
        require(["../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var phaserGame,
                spriteManagerPhaserApi,
                fakeGestureObserver = {
                    updatePointer: function () {}
                };
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 32);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: -100,
                    y: -400,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 45);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: 400,
                    y: -300,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 12);
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: -100,
                    y: -400,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 50);
                spriteManagerPhaserApi.tellAllActiveSpritesSoItCanUpdateIt([45, 32]);
                equal(spriteManagerPhaserApi.size(), 2, 'deleted one by ommiting it form the list of ids');
                QUnit.start();
            }, fakeGestureObserver);

        });
    });

    asyncTest('compare lists of id and delete unexistant', function () {
        require(["../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
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
                },
                fakeGestureObserver = {
                     updatePointer: function () {}
                },
            phaserGame = new PhaserGame(function () {
                    spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame, undefined);
                    spriteManagerPhaserApi.sceneLoaderInterface = sceneLoaderMockSpy;
                    spriteManagerPhaserApi.createTreeSpriteGroup({
                        x: 0,
                        y: 0,
                        w: 50,
                        h: 50,
                        type: "point"
                    }, 32);
                    spriteManagerPhaserApi.createTreeSpriteGroup({
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
                }, fakeGestureObserver);

        });
    });


    asyncTest('compare lists of id and delete unexistant', function () {
        require(["../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
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
                                w: 360,
                                t: 15000
                            },
                            button: {}
                        };
                    },
                    getNumCalls : function getNumCalls () {
                        return this.numcalls;
                    }
                },
                fakeGestureObserver = {
                    updatePointer: function () {}
                };
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame, undefined);
                spriteManagerPhaserApi.sceneLoaderInterface = sceneLoaderMockSpy;
                spriteManagerPhaserApi.createTreeSpriteGroup({
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 50,
                    type: "point"
                }, 32);
                spriteManagerPhaserApi.createTreeSpriteGroup({
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
            },fakeGestureObserver);

        });
    });


    asyncTest('compare lists of id and delete unexistant', function () {
        require(["../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            //noinspection JSLint
            var phaserGame, spriteManagerPhaserApi,
                sceneLoaderMockSpy = {
                    numcalls : 0,
                    getTreeFromId: function getTreeFromId (id) {
                        return {
                            initialPosition: "2l",
                            x: -535,
                            y: -329,
                            w: 227,
                            h: 464,
                            text: undefined,
                            type: "real",
                            tween: {
                                x: -216,
                                y: -216,
                                w: 436,
                                t: 3000
                            },
                            finalPosition: "1c",
                            newTree : false,
                            button: writeButton
                        };
                    }
                },
                fakeGestureObserver = {
                    updatePointer: function () {}
                };
            phaserGame = new PhaserGame(function () {
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame, undefined);
                spriteManagerPhaserApi.sceneLoaderInterface = sceneLoaderMockSpy;
                spriteManagerPhaserApi.tellAllActiveSpritesSoItCanUpdateIt([45]);
                equal(spriteManagerPhaserApi.findTreeSpriteGroupByName(45).length, 3, '3 elements in treeGroups that are empty');
                QUnit.start();
            }, fakeGestureObserver);

        });
    });



});

