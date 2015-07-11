/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['underscore', "../lib/rsvp", "IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (_, rsvp, IncommingTreesEmptyOnesAndDiscardedCueMixer) {
    "use strict";
    function TreeLoaderToSceneLoaderFromLists(sceneLoader, incommingListAndCurrentEmptyTrees, alreadyDisplayedList, mapOfTreesById, arrayListOrderRandomizer) {
        this.incommingListAndCurrentEmptyTrees = incommingListAndCurrentEmptyTrees;
        this.sceneLoader = sceneLoader;
        this.alreadyDisplayed = alreadyDisplayedList;
        this.mapOfTreesById = mapOfTreesById;
        this.initializedWithTrees = false;
        this.incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingListAndCurrentEmptyTrees);
    }
    TreeLoaderToSceneLoaderFromLists.prototype.swipe = function swipe(leftOrRigthText) {
        var discarded,
            toLoad,
            that = this;
        discarded =  leftOrRigthText === 'forestSwipeLeft' ? [ this.sceneLoader.getTreeDiscardedWhenSwipeLeft() ] : [ this.sceneLoader.getTreeDiscardedWhenSwipeRight() ];
        console.log("discarded:" + discarded);
        toLoad = this.incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, this.incommingListAndCurrentEmptyTrees.emptyTrees);
        toLoad = _.map(toLoad, function (value) {
            return that.mapOfTreesById[value];
        });
        this.sceneLoader.stackLoadScene(leftOrRigthText, toLoad);
        return this.sceneLoader.playAllStackedScenes().then(function () {
            return that.addCurrentlyDisplayedToAlreadyDisplayed();
        });
    };

    TreeLoaderToSceneLoaderFromLists.prototype.swipeLeft =  function swipeLeft() {
        return this.swipe('forestSwipeLeft');
    };


    TreeLoaderToSceneLoaderFromLists.prototype.swipeRight =  function swipeRight() {
        return this.swipe('forestSwipeRight');
    };

    TreeLoaderToSceneLoaderFromLists.prototype.addCurrentlyDisplayedToAlreadyDisplayed = function addCurrentlyDisplayedToAlreadyDisplayed() {
        var treeid = this.sceneLoader.getTreeAlreadyDisplayed();
        if (treeid !== undefined) {
            this.alreadyDisplayed.push(treeid);
        }
    };

    TreeLoaderToSceneLoaderFromLists.prototype.init = function init(undefTrees) {
        var that = this,
            third = undefTrees >= 1 ? undefined : (this.incommingListAndCurrentEmptyTrees[0] !== undefined ? this.incommingListAndCurrentEmptyTrees.shift() : -1),
            second = undefTrees >= 2 ? undefined : (this.incommingListAndCurrentEmptyTrees[0] !== undefined ? this.incommingListAndCurrentEmptyTrees.shift() : -1),
            first = undefTrees >= 3 ? undefined : (this.incommingListAndCurrentEmptyTrees[0] !== undefined ? this.incommingListAndCurrentEmptyTrees.shift() : -1),
            promise = new Promise(function (resolve, reject) {
                that.initializedWithTrees = true;
                that.resolve = resolve;
                that.sceneLoader.loadScene('forestSwipeLeft',
                    [that.mapOfTreesById[third],
                        that.mapOfTreesById[second],
                        undefined,
                        that.mapOfTreesById[first]],
                    that,
                    function (context) {
                        that.addCurrentlyDisplayedToAlreadyDisplayed();
                        context.resolve();
                    }
                    );
            });
        return promise;
    }
    return TreeLoaderToSceneLoaderFromLists;
});