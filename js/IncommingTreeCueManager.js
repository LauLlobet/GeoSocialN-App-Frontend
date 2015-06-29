/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['underscore'], function (_) {
    "use strict";
    function IncommingTreeCueManager(incommingList) {
        this.incommingList = incommingList;
    }
    IncommingTreeCueManager.prototype.getToLoadAtBackgroundTrees = function getToLoadAtBackgroundTrees(discarded, emptyTrees) {
        var loadToBackgroundList = [],
            emptyCount = 0;
        if (emptyTrees >= 1) {
            emptyCount = 1;
        }
        if (emptyTrees >= 3) {
            emptyCount = 2;
        }

        discarded = discarded.filter(Number)

        while (loadToBackgroundList.length < 3 && emptyCount > 0) {
            emptyCount -= 1;
            loadToBackgroundList.push(undefined);
        }

        while (loadToBackgroundList.length < 3 && discarded.length > 0) {
            loadToBackgroundList.push(discarded.shift());
        }

        while (loadToBackgroundList.length < 3) {
            loadToBackgroundList.push(this.incommingList.shift());
        }
        return loadToBackgroundList;
    };

    return IncommingTreeCueManager;
});