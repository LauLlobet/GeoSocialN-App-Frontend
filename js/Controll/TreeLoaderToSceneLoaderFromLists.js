/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../lib/underscore', "../lib/rsvp"], function (underscore, rsvp) {
    "use strict";
    function TreeLoaderToSceneLoaderFromLists(sceneLoader, incommingListAndCurrentEmptyTrees, alreadyDisplayedList, mapOfTreesById, incommingTreesEmptyOnesAndDiscardedCueMixer) {
        this.incommingListAndCurrentEmptyTrees = incommingListAndCurrentEmptyTrees;
        this.sceneLoader = sceneLoader;
        this.alreadyDisplayed = alreadyDisplayedList;
        this.mapOfTreesById = mapOfTreesById;
        this.initializedWithTrees = false;
        this.incommingTreesEmptyOnesAndDiscardedCueMixer = incommingTreesEmptyOnesAndDiscardedCueMixer;
    }
    TreeLoaderToSceneLoaderFromLists.prototype.swipe = function swipe(leftOrRigthText) {
        var discarded,
            toLoad,
            that = this;
        discarded = this.getDiscarded(leftOrRigthText);
        toLoad = this.incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, this.incommingListAndCurrentEmptyTrees.emptyTrees);
        _.each(toLoad, function (treeToLoadToScene) {
            if (treeToLoadToScene !== undefined && treeToLoadToScene !== null) {
                that.alreadyDisplayed.push(treeToLoadToScene);
            }
        });
        toLoad = _.map(toLoad, function (value) {
            return that.mapOfTreesById[value];
        });
        this.sceneLoader.stackLoadScene(leftOrRigthText, toLoad);
        return this.sceneLoader.playAllStackedScenes();
    };

    TreeLoaderToSceneLoaderFromLists.prototype.getDiscarded = function getDiscarded(leftOrRigthText) { //forestSwipeLeft //forestSwipeRight //both
        var discarded = [];
        if (leftOrRigthText === "both") {
            discarded.push(this.sceneLoader.getTreeDiscardedWhenSwipeLeft());
            discarded.push(this.sceneLoader.getTreeDiscardedWhenSwipeRight());
        } else {
            discarded =  leftOrRigthText === 'forestSwipeLeft' ? [ this.sceneLoader.getTreeDiscardedWhenSwipeLeft() ] : [ this.sceneLoader.getTreeDiscardedWhenSwipeRight() ];
        }
        return discarded;
    };

    TreeLoaderToSceneLoaderFromLists.prototype.swipeToSpecificTree = function (treeId) {
        var discarded,
            toLoad,
            that = this,
            emptySetofTrees = [undefined, undefined];
        discarded = this.getDiscarded("both");
        _.each(discarded, function (discardedReturned) {
            if (discardedReturned !== null && discardedReturned !== undefined) {
                that.incommingListAndCurrentEmptyTrees.push(discardedReturned);
            }

        });
        toLoad = [ undefined, treeId];
        toLoad = _.map(toLoad, function (value) {
            return that.mapOfTreesById[value];
        });
        this.sceneLoader.stackLoadScene("forestSwipeLeft", emptySetofTrees);
        this.sceneLoader.stackLoadScene("forestSwipeRight", emptySetofTrees);
        this.sceneLoader.stackLoadScene("forestSwipeLeft", toLoad);
        this.sceneLoader.stackLoadScene("forestSwipeRight", emptySetofTrees);
        return this.sceneLoader.playAllStackedScenes();
    };

    TreeLoaderToSceneLoaderFromLists.prototype.swipeLeft =  function swipeLeft() {
        return this.swipe('forestSwipeLeft');
    };


    TreeLoaderToSceneLoaderFromLists.prototype.swipeRight =  function swipeRight() {
        return this.swipe('forestSwipeRight');
    };

    TreeLoaderToSceneLoaderFromLists.prototype.init = function init(undefTrees) { // nomes es fa servir en els tests
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
                        context.resolve();
                        that.alreadyDisplayed.push(first);
                        that.alreadyDisplayed.push(second);
                        that.alreadyDisplayed.push(third);
                    }
                    );
            });
        return promise;
    }
    return TreeLoaderToSceneLoaderFromLists;
});