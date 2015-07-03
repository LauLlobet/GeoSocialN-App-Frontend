/**
 * Created by quest on 03/07/15.
 */

/* initialization with a full list form front to back and left to right
 */

/* mock tests
incomming list is shifted by one when there are 4 free trees
incomming list is shifted by two when no empty trees
alreadyDisplayedList is increased by one when swiped left and right when all full   */


/* full integrated
5 empty trees
0 empty trees
empty incomming list + 0 empty trees
 */
var createIncommingListFromListLength = function createIncommingListFromListLength(length){
    var ans = {},
        i;
    ans.mapOfTreesById = {};
    ans.incommingList = [];
    for (i = 0; i < length; i += 1) {
        ans.mapOfTreesById[i] = { id: i, text: i.toString() };
        ans.incommingList.push(i);
    }
    return ans;
}

define([], function () {
    'use strict';
    module('TreeLoaderToSceneLoaderFromListss test');

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
                    treeLoaderToSceneLoaderFromLists.init().then(function(){
                        deepEqual(treeLoaderToSceneLoaderFromLists.initializedWithTrees, true, 'init flag');
                        QUnit.start();
                    })
                },fakeGestureObserver
            )
        });
    });
});