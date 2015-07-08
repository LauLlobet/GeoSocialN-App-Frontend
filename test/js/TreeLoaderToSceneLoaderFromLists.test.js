/**
 * Created by quest on 03/07/15.
 */

var createIncommingListFromListLength = function createIncommingListFromListLength(length){
    var ans = {},
        i;
    ans.mapOfTreesById = {};
    ans.incommingList = [];
    for (i = 1; i < length + 1; i += 1) {
        ans.mapOfTreesById[i] = { id: i, text: i.toString() };
        ans.incommingList.push(i);
    }
    ans.mapOfTreesById[-1] = { id: -1, text: '-1' };
    ans.incommingList.push(i);
    return ans;
}


/* initialization with a full list form front to back and left to right
 */


define([], function () {
    'use strict';
    module('TreeLoaderToSceneLoaderFromListss test');

    asyncTest('init at all undefined ', function () {
        require(["../js/TreeLoaderToSceneLoaderFromLists", "SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (TreeLoaderToSceneLoaderFromLists, SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var fakeGestureObserver = {
                    updatePointer: function () {}
                },
                phaserGame = new PhaserGame(
                    function () {
                        var spriteManagerApi = new SpriteManagerPhaserApi(phaserGame),
                            sceneLoader = new SceneLoader(spriteManagerApi),
                            incommingListLength = 10,
                            alreadyDisplayedList = [],
                            createIncommingListPackAns = createIncommingListFromListLength(incommingListLength),
                            mapOfTreesById = createIncommingListPackAns.mapOfTreesById,
                            incommingListAndCurrentEmptyTrees = createIncommingListPackAns.incommingList,
                            treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
                                sceneLoader,
                                incommingListAndCurrentEmptyTrees,
                                alreadyDisplayedList,
                                mapOfTreesById);
                        incommingListAndCurrentEmptyTrees.emptyTrees = 0;
                        spriteManagerApi.sceneLoaderInterface = sceneLoader;
                        treeLoaderToSceneLoaderFromLists.init(3).then(function(){
                            deepEqual(treeLoaderToSceneLoaderFromLists.initializedWithTrees, true, 'init flag');
                            equal(sceneLoader.getTreeAlreadyDisplayed(),undefined,"front one is undefined");
                            equal(sceneLoader.getTreeDiscardedWhenSwipeLeft(),undefined,"rigth one is undefined");
                            equal(sceneLoader.getTreeDiscardedWhenSwipeRight(),undefined,"left one is undefined");
                            QUnit.start();
                        })
                    },fakeGestureObserver
                )
        });
    });

    asyncTest('TreeLoaderToSceneLoaderFromLists intialize ', function () {
        require(["../js/TreeLoaderToSceneLoaderFromLists", "SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (TreeLoaderToSceneLoaderFromLists, SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var fakeGestureObserver = {
                    updatePointer: function () {}
                },
                phaserGame = new PhaserGame(
                function () {
                    var spriteManagerApi = new SpriteManagerPhaserApi(phaserGame),
                        sceneLoader = new SceneLoader(spriteManagerApi),
                        incommingListLength = 10,
                        alreadyDisplayedList = [],
                        createIncommingListPackAns = createIncommingListFromListLength(incommingListLength),
                        mapOfTreesById = createIncommingListPackAns.mapOfTreesById,
                        incommingListAndCurrentEmptyTrees = createIncommingListPackAns.incommingList,
                        treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
                            sceneLoader,
                            incommingListAndCurrentEmptyTrees,
                            alreadyDisplayedList,
                            mapOfTreesById);
                    incommingListAndCurrentEmptyTrees.emptyTrees = 0;
                    spriteManagerApi.sceneLoaderInterface = sceneLoader;
                    treeLoaderToSceneLoaderFromLists.init(0).then(function(){
                        deepEqual(treeLoaderToSceneLoaderFromLists.initializedWithTrees, true, 'init flag');
                        equal(sceneLoader.getTreeAlreadyDisplayed(),3,"front one is the third");
                        equal(sceneLoader.getTreeDiscardedWhenSwipeLeft(),2,"rigth one is the second");
                        equal(sceneLoader.getTreeDiscardedWhenSwipeRight(),1,"left one is the third");
                        QUnit.start();
                    })
                },fakeGestureObserver
            )
        });
    });

    asyncTest(' incomming list is NOT shifted by two when empty trees are 0 and initialized normally ', function () {
        require(["../js/TreeLoaderToSceneLoaderFromLists", "SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (TreeLoaderToSceneLoaderFromLists, SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var fakeGestureObserver = {
                    updatePointer: function () {
                    }
                },
                phaserGame = new PhaserGame(
                    function () {
                        var spriteManagerApi = new SpriteManagerPhaserApi(phaserGame),
                            sceneLoader = new SceneLoader(spriteManagerApi),
                            incommingListLength = 10,
                            alreadyDisplayedList = [],
                            createIncommingListPackAns = createIncommingListFromListLength(incommingListLength),
                            mapOfTreesById = createIncommingListPackAns.mapOfTreesById,
                            incommingListAndCurrentEmptyTrees = createIncommingListPackAns.incommingList,
                            treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
                                sceneLoader,
                                incommingListAndCurrentEmptyTrees,
                                alreadyDisplayedList,
                                mapOfTreesById),
                        previousLengthOfIncommingList;
                        incommingListAndCurrentEmptyTrees.emptyTrees = 0;
                        spriteManagerApi.sceneLoaderInterface = sceneLoader;
                        treeLoaderToSceneLoaderFromLists.init(0).then(function () {
                            previousLengthOfIncommingList = incommingListAndCurrentEmptyTrees.length;
                            treeLoaderToSceneLoaderFromLists.swipeLeft();
                        }).then(function (){
                            var popedTreeIds = previousLengthOfIncommingList - incommingListAndCurrentEmptyTrees.length;
                            notEqual(popedTreeIds,2);
                            QUnit.start();
                        })
                    }, fakeGestureObserver
                );

        });
    });


    asyncTest(' incomming list is shifted by two when empty trees are 0 and initialized with three undefined ', function () {
        require(["../js/TreeLoaderToSceneLoaderFromLists", "SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (TreeLoaderToSceneLoaderFromLists, SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var fakeGestureObserver = {
                    updatePointer: function () {
                    }
                },
                phaserGame = new PhaserGame(
                    function () {
                        var spriteManagerApi = new SpriteManagerPhaserApi(phaserGame),
                            sceneLoader = new SceneLoader(spriteManagerApi),
                            incommingListLength = 10,
                            alreadyDisplayedList = [],
                            createIncommingListPackAns = createIncommingListFromListLength(incommingListLength),
                            mapOfTreesById = createIncommingListPackAns.mapOfTreesById,
                            incommingListAndCurrentEmptyTrees = createIncommingListPackAns.incommingList,
                            treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
                                sceneLoader,
                                incommingListAndCurrentEmptyTrees,
                                alreadyDisplayedList,
                                mapOfTreesById),
                            previousLengthOfIncommingList;
                        incommingListAndCurrentEmptyTrees.emptyTrees = 0;
                        spriteManagerApi.sceneLoaderInterface = sceneLoader;
                        treeLoaderToSceneLoaderFromLists.init(3).then(function () {
                            previousLengthOfIncommingList = incommingListAndCurrentEmptyTrees.length;
                            treeLoaderToSceneLoaderFromLists.swipeLeft();
                        }).then(function (){
                            var popedTreeIds = previousLengthOfIncommingList - incommingListAndCurrentEmptyTrees.length;
                            equal(popedTreeIds,2);
                            QUnit.start();
                        })
                    }, fakeGestureObserver
                );

        });
    });

    asyncTest('alreadyDisplayedList is increased by one when swiped left and right when all full ', function () {
        require(["../js/TreeLoaderToSceneLoaderFromLists", "SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (TreeLoaderToSceneLoaderFromLists, SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var fakeGestureObserver = {
                    updatePointer: function () {
                    }
                },
                phaserGame = new PhaserGame(
                    function () {
                        var spriteManagerApi = new SpriteManagerPhaserApi(phaserGame),
                            sceneLoader = new SceneLoader(spriteManagerApi),
                            incommingListLength = 10,
                            alreadyDisplayedList = [],
                            createIncommingListPackAns = createIncommingListFromListLength(incommingListLength),
                            mapOfTreesById = createIncommingListPackAns.mapOfTreesById,
                            incommingListAndCurrentEmptyTrees = createIncommingListPackAns.incommingList,
                            treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
                                sceneLoader,
                                incommingListAndCurrentEmptyTrees,
                                alreadyDisplayedList,
                                mapOfTreesById);
                        incommingListAndCurrentEmptyTrees.emptyTrees = 0;
                        spriteManagerApi.sceneLoaderInterface = sceneLoader;
                        treeLoaderToSceneLoaderFromLists.init(0).then(function () {
                            return treeLoaderToSceneLoaderFromLists.swipeLeft();
                        }).then(function (){
                            deepEqual(alreadyDisplayedList,[3, 1]);
                            QUnit.start();
                        })
                    }, fakeGestureObserver
                );

        });
    });


    asyncTest('init with 0 empty trees and incomming list empty', function () {
        require(["../js/TreeLoaderToSceneLoaderFromLists", "SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (TreeLoaderToSceneLoaderFromLists, SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var fakeGestureObserver = {
                    updatePointer: function () {}
                },
                phaserGame = new PhaserGame(
                    function () {
                        var spriteManagerApi = new SpriteManagerPhaserApi(phaserGame),
                            sceneLoader = new SceneLoader(spriteManagerApi),
                            incommingListLength = 10,
                            alreadyDisplayedList = [],
                            createIncommingListPackAns = createIncommingListFromListLength(incommingListLength),
                            mapOfTreesById = createIncommingListPackAns.mapOfTreesById,
                            incommingListAndCurrentEmptyTrees = [],
                            treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
                                sceneLoader,
                                incommingListAndCurrentEmptyTrees,
                                alreadyDisplayedList,
                                mapOfTreesById);
                        incommingListAndCurrentEmptyTrees.emptyTrees = 0;
                        spriteManagerApi.sceneLoaderInterface = sceneLoader;
                        treeLoaderToSceneLoaderFromLists.init(0).then(function(){
                            deepEqual(treeLoaderToSceneLoaderFromLists.initializedWithTrees, true, 'init flag');
                            equal(sceneLoader.getTreeAlreadyDisplayed(),-1,"front one is undefined");
                            equal(sceneLoader.getTreeDiscardedWhenSwipeLeft(),-1,"rigth one is undefined");
                            equal(sceneLoader.getTreeDiscardedWhenSwipeRight(),-1,"left one is undefined");
                            QUnit.start();
                        })
                    },fakeGestureObserver
                )
        });
    });



    asyncTest('swipe left with 0 empty trees and incomming list empty', function () {
        require(["../js/TreeLoaderToSceneLoaderFromLists", "SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (TreeLoaderToSceneLoaderFromLists, SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
            var fakeGestureObserver = {
                    updatePointer: function () {}
                },
                phaserGame = new PhaserGame(
                    function () {
                        var spriteManagerApi = new SpriteManagerPhaserApi(phaserGame),
                            sceneLoader = new SceneLoader(spriteManagerApi),
                            incommingListLength = 10,
                            alreadyDisplayedList = [],
                            createIncommingListPackAns = createIncommingListFromListLength(incommingListLength),
                            mapOfTreesById = createIncommingListPackAns.mapOfTreesById,
                            incommingListAndCurrentEmptyTrees = [],
                            treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
                                sceneLoader,
                                incommingListAndCurrentEmptyTrees,
                                alreadyDisplayedList,
                                mapOfTreesById);
                        incommingListAndCurrentEmptyTrees.emptyTrees = 0;
                        spriteManagerApi.sceneLoaderInterface = sceneLoader;
                        treeLoaderToSceneLoaderFromLists.init(3).then(function() {
                            return treeLoaderToSceneLoaderFromLists.swipeLeft();
                        }).then(function(ans){
                            deepEqual(treeLoaderToSceneLoaderFromLists.initializedWithTrees, true, 'init flag');
                            equal(sceneLoader.getTreeDiscardedWhenSwipeLeft(),-1,"rigth one is undefined");
                            equal(sceneLoader.getTreeDiscardedWhenSwipeRight(),-1,"left one is undefined");
                            QUnit.start();
                        })
                    },fakeGestureObserver
                )
        });
    });
});