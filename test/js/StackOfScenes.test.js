/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define([], function () {
    'use strict';
    module('Stack of Scenes test');

    asyncTest('Test empty stack', function () {
        require(["StackOfScenes"], function (StackOfScenes) {
            var stackOfScenes;
            stackOfScenes = new StackOfScenes();
            equal(stackOfScenes.stackedScenesArray.length, 0, 'size');
            QUnit.start();
        });
    });
    asyncTest('Test to stack', function () {
        require(["StackOfScenes"], function (StackOfScenes) {
            var stackOfScenes;
            stackOfScenes = new StackOfScenes();
            stackOfScenes.stackLoadScene("forestSwipeRight", ['Esta parte', ' Aga and Hanna', undefined]);
            stackOfScenes.stackLoadScene("forestSwipeRight", ['Esta parte2', ' Aga and Hanna2', undefined]);
            stackOfScenes.stackLoadScene("forestSwipeRight", ['Esta parte3', ' Aga and Hanna3', undefined]);
            equal(stackOfScenes.stackedScenesArray.length, 3, 'size');
            QUnit.start();
        });
    });
    asyncTest('Test pop', function () {
        require(["StackOfScenes"], function (StackOfScenes) {
            var stackOfScenes;
            stackOfScenes = new StackOfScenes();
            stackOfScenes.stackLoadScene("1", ['1', ' Aga and Hanna', undefined]);
            stackOfScenes.stackLoadScene("2", ['2', ' Aga and Hanna2', undefined]);
            stackOfScenes.stackLoadScene("3", ['3', ' Aga and Hanna3', undefined]);
            equal(stackOfScenes.stackedScenesArray.shift().sceneType, 1, 'size');
            equal(stackOfScenes.stackedScenesArray.shift().sceneType, 2, 'size');
            equal(stackOfScenes.stackedScenesArray.shift().sceneType, 3, 'size');
            QUnit.start();
        });
    });
    asyncTest('Test isplaying', function () {
        require(["StackOfScenes"], function (StackOfScenes) {
            var stackOfScenes;
            var sceneLoaderMock = {
                loadScene: function (type, texts, ctxt, funct){
                    this.loaded += 1;
                    funct(ctxt);
                },
                loaded : 0
            };
            stackOfScenes = new StackOfScenes(sceneLoaderMock);
            stackOfScenes.stackLoadScene("1", ['1', ' Aga and Hanna', undefined]);
            stackOfScenes.stackLoadScene("1", ['1', ' Aga and Hanna', undefined]);
            stackOfScenes.stackLoadScene("1", ['1', ' Aga and Hanna', undefined]);
            stackOfScenes.playAllStackedScenes();
            equal(sceneLoaderMock.loaded, 3, 'loaded a scene');
            QUnit.start();
        });
    });
});
