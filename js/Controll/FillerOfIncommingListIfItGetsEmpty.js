/*global define, require, module, Phaser, Group, console, underscore,setTimeout */
/*jslint todo: true */
define(["../lib/underscore"], function (underscore) {
    "use strict";
    function FillerOfIncommingListIfItGetsEmpty(incommingList, updaterOfListInterface) {
        this.incommingList = incommingList;
        this.updaterOfListInterface = updaterOfListInterface;
        this.stopAskingForTrees = false;
    }

    FillerOfIncommingListIfItGetsEmpty.prototype.start = function () {
        this.checkIfEmptyAndFill();
        setInterval(_.bind(this.checkIfEmptyAndFill, this), 1000);
    };
    FillerOfIncommingListIfItGetsEmpty.prototype.checkIfEmptyAndFill = function f() {
        if (this.incommingList.length === 0 && !this.stopAskingForTrees) {
            this.updaterOfListInterface.updateWithoutMoving();
        }
    };

    FillerOfIncommingListIfItGetsEmpty.prototype.treesFromServerAreOver = function treesFromServerAreOver() {
        this.stopAskingForTrees = true;
        console.log("trees form server are over");
    };

    return FillerOfIncommingListIfItGetsEmpty;
});