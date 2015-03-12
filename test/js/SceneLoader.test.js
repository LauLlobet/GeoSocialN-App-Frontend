/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([], function () {
    'use strict';
    module('Scene Loader independent tests');

    asyncTest('Scane loader add tree and bind a new one on it', function () {
        require(["SceneLoader"], function (SceneLoader) {
            var sceneLoader;
            sceneLoader = new SceneLoader();
            sceneLoader.bindTreeAndTweenToTable({
                x: 0,
                y: 0,
                w: 200,
                tween: {
                    x: 100,
                    y: 100,
                    w: 300,
                    t: 1000
                }
            })
            equal(sceneLoader.sceneObjectsTable.length, 2, 'tableSize');
            QUnit.start();
        });
    });
});

