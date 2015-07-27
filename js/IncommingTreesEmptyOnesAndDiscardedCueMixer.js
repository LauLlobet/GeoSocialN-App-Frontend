/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['underscore'], function (_) {
    "use strict";
    function IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList) {
        this.incommingList = incommingList;
    }

    IncommingTreesEmptyOnesAndDiscardedCueMixer.prototype.getToLoadAtBackgroundTrees = function getToLoadAtBackgroundTrees(discarded, emptyTrees) {
        var loadToBackgroundList = [],
            chance = 0;
        console.log("empty trees inside:" + emptyTrees);
        switch (emptyTrees) {
            case 6:
                return [undefined, undefined];
                break;
            case 5:
                chance = 3 / 4;
                break;
            case 4:
                chance = 1 / 2;
                break;
            case 3:
                chance = 1 / 8;
                break;
            case 2:
                chance = 1 / 10;
                break;
            case 1:
                chance = 1 / 40;
                break;

        }

        if(Math.random() < chance) {
            loadToBackgroundList.push(undefined);
        }
        if(Math.random() < chance) {
            loadToBackgroundList.push(undefined);
        }

        discarded = discarded.filter(Number);
        while (loadToBackgroundList.length < 2 && discarded.length > 0) {
            loadToBackgroundList.push(discarded.shift());
        }

        while (loadToBackgroundList.length < 2  && this.incommingList.length > 0) {
            loadToBackgroundList.push(this.incommingList.shift());
        }

        if (emptyTrees === 0) {
            while (loadToBackgroundList.length < 2) {
                loadToBackgroundList.push(-1);
            }
        } else {
            while (loadToBackgroundList.length < 2) {
                loadToBackgroundList.push(undefined);
            }
        }
        while (discarded.length > 0) {
            if (discarded !== -1) {
                alert("pushing tree to incomming list");
                this.incommingList.unshift(discarded.shift());
            }
        }
        return loadToBackgroundList;
    };

    return IncommingTreesEmptyOnesAndDiscardedCueMixer;
});