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
            stackOfScenes.stackLoadScene("forestSwipeRight", [{text : 'Esta parte'}, {text : ' Aga and Hanna'}, {text : undefined}]);
            stackOfScenes.stackLoadScene("forestSwipeRight", [{text : 'Esta parte2'}, {text : ' Aga and Hanna2}'}, {text : undefined}]);
            stackOfScenes.stackLoadScene("forestSwipeRight", [{text : 'Esta parte3'}, {text : ' Aga and Hanna3'}, {text : undefined}]);
            equal(stackOfScenes.stackedScenesArray.length, 3, 'size');
            QUnit.start();
        });
    });
    asyncTest('Test pop', function () {
        require(["StackOfScenes"], function (StackOfScenes) {
            var stackOfScenes;
            var sceneLoaderMock = {
                getTreeAlreadyDisplayed: function () {
                    return 3;
                }
            };
            stackOfScenes = new StackOfScenes(sceneLoaderMock);
            stackOfScenes.stackLoadScene("1", [{text : 'Esta parte'}, {text : ' Aga and Hanna'}, {text : undefined}]);
            stackOfScenes.stackLoadScene("2", [{text : 'Esta parte2'}, {text : ' Aga and Hanna2}'}, {text : undefined}]);
            stackOfScenes.stackLoadScene("3", [{text : 'Esta parte3'}, {text : ' Aga and Hanna3'}, {text : undefined}]);
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
                getTreeAlreadyDisplayed: function(){
                    return 3;
                },
                loaded : 0
            };
            stackOfScenes = new StackOfScenes(sceneLoaderMock);
            stackOfScenes.stackLoadScene("forestSwipeRight", [{text : 'Esta parte'}, {text : ' Aga and Hanna'}, {text : undefined}]);
            stackOfScenes.stackLoadScene("forestSwipeRight", [{text : 'Esta parte2'}, {text : ' Aga and Hanna2}'}, {text : undefined}]);
            stackOfScenes.stackLoadScene("forestSwipeRight", [{text : 'Esta parte3'}, {text : ' Aga and Hanna3'}, {text : undefined}]);
            stackOfScenes.playAllStackedScenes();
            equal(sceneLoaderMock.loaded, 3, 'loaded a scene');
            QUnit.start();
        });
    });
});
