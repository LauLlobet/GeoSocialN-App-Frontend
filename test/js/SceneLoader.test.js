/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define([], function () {
    'use strict';
    module('Scene Loader independent tests');

    asyncTest('Scane loader add tree and bind a new one on it', function () {
        require(["../../js/View/SceneLoaderLevel/SceneLoader"], function (SceneLoader) {
            var treeentry, sceneLoader;
            sceneLoader = new SceneLoader();
            sceneLoader.bindTreeAndTweenToTable({
                x: 0,
                y: 0,
                w: 300,
                type: 'point',
                text: 'correct text',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '2diagonalLeft',
                finalPosition: '1center'
            });
            sceneLoader.bindTreeAndTweenToTable({
                x: 500,
                y: 500,
                w: 200,
                type: 'point',
                text: 'correct text',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '3center',
                finalPosition: '2diagonalLeft'
            });
            sceneLoader.setAllToOld();
            sceneLoader.bindTreeAndTweenToTable({
                x: 500,
                y: 500,
                w: 300,
                type: 'debugTree',
                text: 'this text shoudnt be displayed',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '2diagonalLeft',
                finalPosition: '3center'
            });
            equal(sceneLoader.sceneObjectsTable.length, 2, 'tableSize');
            treeentry = sceneLoader.getTreeWithFinalPosition('3center');
            equal("point", treeentry.tree.type, 'old image to load');
            equal("correct text", treeentry.tree.text, 'old correct text');
            equal(300, treeentry.tree.w, 'new width');
            QUnit.start();
        });
    });

    asyncTest('getAllActiveIds', function () {
        require(["../../js/View/SceneLoaderLevel/SceneLoader"], function (SceneLoader) {
            var sceneLoader;
            sceneLoader = new SceneLoader();
            sceneLoader.bindTreeAndTweenToTable({
                x: 0,
                y: 0,
                w: 300,
                type: 'point',
                text: 'correct text',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '2diagonalLeft',
                finalPosition: '1center'
            });
            sceneLoader.bindTreeAndTweenToTable({
                x: 500,
                y: 500,
                w: 200,
                type: 'point',
                text: 'correct text',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '3center',
                finalPosition: '2diagonalLeft'
            });
            sceneLoader.setAllToOld();
            sceneLoader.bindTreeAndTweenToTable({
                x: 500,
                y: 500,
                w: 300,
                type: 'debugTree',
                text: 'this text shoudnt be displayed',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '2diagonalLeft',
                finalPosition: '3center'
            });
            sceneLoader.bindTreeAndTweenToTable({
                x: 500,
                y: 500,
                w: 300,
                type: 'debugTree',
                text: 'this text shoudnt be displayed',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '2center',
                finalPosition: '4center'
            });
            deepEqual(sceneLoader.getAllActiveIds(), [1, 3, 4], 'all ids');
            QUnit.start();
        });
    });

    asyncTest('getAllActiveIds overriding one trees', function () {
        require(["../../js/View/SceneLoaderLevel/SceneLoader"], function (SceneLoader) {
            var sceneLoader;
            sceneLoader = new SceneLoader();
            sceneLoader.bindTreeAndTweenToTable({
                x: 0,
                y: 0,
                w: 300,
                type: 'point',
                text: 'correct text',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '2diagonalLeft',
                finalPosition: '1center'
            });
            sceneLoader.bindTreeAndTweenToTable({
                x: 500,
                y: 500,
                w: 200,
                type: 'point',
                text: 'correct text',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '3center',
                finalPosition: '2diagonalLeft'
            });
            sceneLoader.setAllToOld();
            sceneLoader.bindTreeAndTweenToTable({
                x: 500,
                y: 500,
                w: 300,
                type: 'debugTree',
                text: 'this text shoudnt be displayed',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '2diagonalLeft',
                finalPosition: 'delete'
            });
            sceneLoader.bindTreeAndTweenToTable({
                x: 500,
                y: 500,
                w: 300,
                type: 'debugTree',
                text: 'this text shoudnt be displayed',
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                },
                initialPosition: '2center',
                finalPosition: '4center'
            });
            sceneLoader.cleanToDelete();
            deepEqual(sceneLoader.getAllActiveIds(), [1, 4], 'all ids');
            QUnit.start();
        });
    });

    asyncTest('Load full scene with mock', function () {
        require(["../../js/View/SceneLoaderLevel/SceneLoader"], function (SceneLoader) {
            var sceneLoader, tree,
                mockSpriteManagerApi = {
                    isOkFlag : false,
                    tellAllActiveSpritesSoItCanUpdateIt : function () { this.isOkFlag = true;},
                    isOk : function () { return this.isOkFlag; }
                };
            sceneLoader = new SceneLoader(mockSpriteManagerApi);
            sceneLoader.loadScene('forestSwipeLeft', [{text: "text1"}, {text: "text2"}, {text: "text3"}, {text: "text4"}]);
            tree = sceneLoader.getTreeFromId(1);
            equal(-695, tree.x);
            equal(true, mockSpriteManagerApi.isOk());
            QUnit.start();
        });
    });

    asyncTest('Load full scene with full equip', function () {
        require(["../../js/View/SceneLoaderLevel/SceneLoader", "../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var sceneLoader, spriteManagerApi,
                fakeGestureObserver = {
                    updatePointer: function () {}
                },
                phaserGame = new PhaserGame(function () {
                    spriteManagerApi = new SpriteManagerPhaserApi(phaserGame);
                    sceneLoader = new SceneLoader(spriteManagerApi);
                    spriteManagerApi.sceneLoaderInterface = sceneLoader;
                    sceneLoader.loadScene('forestSwipeLeft', [{text: "text1"}, {text: "text2"}, {text: "text3"}, {text: "text4"}]);
                    //sceneLoader.loadScene('forestSwipeRight', ["text1", "text2", "text3", "text4"]);
                    deepEqual(sceneLoader.getAllActiveIds(), [1, 2, 3, 4, 5], 'all ids');
                    QUnit.start();
                }, fakeGestureObserver);
        });
    });

    asyncTest('Load two full scenes with full equip', function () {
        require(["../../js/View/SceneLoaderLevel/SceneLoader", "../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var sceneLoader, spriteManagerApi,
                fakeGestureObserver = {
                    updatePointer: function () {}
                },
                phaserGame = new PhaserGame(function () {
                    spriteManagerApi = new SpriteManagerPhaserApi(phaserGame);
                    sceneLoader = new SceneLoader(spriteManagerApi);
                    spriteManagerApi.sceneLoaderInterface = sceneLoader;
                    sceneLoader.loadScene('forestSwipeLeft', [{text: "text1"}, {text: "text2"}, {text: "text3"}, {text: "text4"}]);
                    sceneLoader.loadScene('forestSwipeRight', [{text: "text1"}, {text: "text2"}, {text: "text3"}, {text: "text4"}]);
                    deepEqual(sceneLoader.getAllActiveIds(), [6, 7, 8, 9, 10, 11], 'all ids');
                    equal(sceneLoader.getTreeWithFinalPosition('1c').tree.text, 'text2');
                    equal(sceneLoader.getTreeWithFinalPosition('2l').tree.text, 'text2');
                    equal(sceneLoader.getTreeWithFinalPosition('2r').tree.text, 'text1');
                    QUnit.start();
                }, fakeGestureObserver);
        });
    });

    asyncTest('when swipping left left entries disapear', function () {
        require(["../../js/View/SceneLoaderLevel/SceneLoader", "../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var sceneLoader, spriteManagerApi,
                fakeGestureObserver = {
                    updatePointer: function () {}
                },
                phaserGame = new PhaserGame(
                    function () {
                        spriteManagerApi = new SpriteManagerPhaserApi(phaserGame);
                        sceneLoader = new SceneLoader(spriteManagerApi);
                        spriteManagerApi.sceneLoaderInterface = sceneLoader;
                        sceneLoader.loadScene('forestSwipeLeft', [{text: "nothing"}, {text: "nothing"}, {text: "nothing"}, {text: "nothing"}]);
                        sceneLoader.stackLoadScene('forestSwipeLeft', [{text: "g2t1", id: 1}, {text: "g2t2", id: 2}]);
                        sceneLoader.playAllStackedScenes().then(function () {
                            equal(sceneLoader.getTreeWithFinalPosition('1c').tree.text, 'nothing');
                            equal(sceneLoader.getTreeWithFinalPosition('2l').tree.text, 'g2t1');
                            equal(sceneLoader.getTreeWithFinalPosition('2r').tree.text, 'g2t2');
                            equal(sceneLoader.getTreeWithFinalPosition('2l').tree.treeid, 1);
                            sceneLoader.stackLoadScene('forestSwipeLeft', [{text: "g3t1", id: 1}, {text: "g3t2", id: 2}]);
                            return sceneLoader.playAllStackedScenes();
                        }).then(function () {
                            equal(sceneLoader.getTreeWithFinalPosition('1c').tree.text, 'g2t1');//g2t2 was removed in the previos swipe
                                                                                                //thus previously to swipe left '2r' positions are the ones that are going to be discarded
                            QUnit.start();
                        });
                    },
                    fakeGestureObserver
                );
        });
    });

    asyncTest('getTreeDiscardedWhenSwipeLeft', function () {
        require(["../../js/View/SceneLoaderLevel/SceneLoader", "../../js/View/SpriteLevel/SpriteManagerPhaserApi", "../../js/View/UIEngineView/PhaserGame"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var sceneLoader, spriteManagerApi,
                fakeGestureObserver = {
                    updatePointer: function () {}
                },
                phaserGame = new PhaserGame(
                    function () {
                        spriteManagerApi = new SpriteManagerPhaserApi(phaserGame);
                        sceneLoader = new SceneLoader(spriteManagerApi);
                        spriteManagerApi.sceneLoaderInterface = sceneLoader;
                        sceneLoader.loadScene('forestSwipeLeft', [{text: "nothing"}, {text: "nothing"}, {text: "nothing"}, {text: "nothing"}]);
                        sceneLoader.stackLoadScene('forestSwipeLeft', [undefined, {text: "g2t2", id: 233}]);
                        sceneLoader.playAllStackedScenes().then(function () {
                            equal(sceneLoader.getTreeDiscardedWhenSwipeLeft(), 233);
                            sceneLoader.stackLoadScene('forestSwipeLeft', [{text: "g3t1", id: 1}, {text: "g3t2", id: 2}]);
                            return sceneLoader.playAllStackedScenes();
                        }).then(function () {
                            equal(sceneLoader.getTreeWithFinalPosition('1c').tree.id, undefined);//g2t2 was removed in the previos swipe
                            //thus previously to swipe left '2r' positions are the ones that are going to be discarded
                            QUnit.start();
                        });
                    },
                    fakeGestureObserver
                );
        });
    });
});

