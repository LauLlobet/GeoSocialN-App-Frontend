/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['underscore', "../lib/rsvp"], function (_, rsvp) {
    "use strict";
    function TreeLoaderToSceneLoaderFromLists(sceneLoader, incommingListAndCurrentEmptyTrees, alreadyDisplayedList, mapOfTreesById, arrayListOrderRandomizer) {
        this.incommingListAndCurrentEmptyTrees = incommingListAndCurrentEmptyTrees;
        this.sceneLoader = sceneLoader;
        this.alreadyDisplay = alreadyDisplayedList;
        this.mapOfTreesById = mapOfTreesById;
        this.initializedWithTrees = false;
    }
    TreeLoaderToSceneLoaderFromLists.prototype.swipeLeft = function swipeLeft() {

    };
    TreeLoaderToSceneLoaderFromLists.prototype.swipeRight = function swipeRight() {

    };

    TreeLoaderToSceneLoaderFromLists.prototype.init = function init() {
        var that = this,
            third = this.incommingListAndCurrentEmptyTrees.shift(),
            second = this.incommingListAndCurrentEmptyTrees.shift(),
            first = this.incommingListAndCurrentEmptyTrees.shift(),

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
                    }
                    );
            });
        return promise;
    }
    return TreeLoaderToSceneLoaderFromLists;
});