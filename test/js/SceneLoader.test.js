/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define([], function () {
    'use strict';
    module('Scene Loader independent tests');
/*
    asyncTest('Scane loader add tree and bind a new one on it', function () {
        require(["SceneLoader"], function (SceneLoader) {
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
        require(["SceneLoader"], function (SceneLoader) {
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
        require(["SceneLoader"], function (SceneLoader) {
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
        require(["SceneLoader"], function (SceneLoader) {
            var sceneLoader, tree,
                mockSpriteManagerApi = {
                    isOkFlag : false,
                    tellAllActiveSpritesSoItCanUpdateIt : function () { this.isOkFlag = true;},
                    isOk : function () { return this.isOkFlag; }
                };
            sceneLoader = new SceneLoader(mockSpriteManagerApi);
            sceneLoader.loadScene('ForestSwipeLeft', ["text1", "text2", "text3", "text4"]);
            tree = sceneLoader.getTreeFromId(1);
            equal(-98, tree.x);
            equal(true, mockSpriteManagerApi.isOk());
            QUnit.start();
        });
    });

*/
    asyncTest('Load full scene with full equip', function () {
        require(["SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var sceneLoader, tree, spriteManagerApi,
                phaserGame = new PhaserGame(function () {
                    spriteManagerApi = new SpriteManagerPhaserApi(phaserGame);
                    sceneLoader = new SceneLoader(spriteManagerApi);
                    spriteManagerApi.sceneLoaderInterface = sceneLoader;
                    sceneLoader.loadScene('ForestSwipeLeft', ["text1", "text2", "text3", "text4"]);
                    QUnit.start();
                });
        });
    });
});

