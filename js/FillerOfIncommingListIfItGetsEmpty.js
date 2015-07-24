/*global define, require, module, Phaser, Group, console, underscore,setTimeout */
/*jslint todo: true */
define(["underscore"], function (underscore) {
    "use strict";
    function FillerOfIncommingListIfItGetsEmpty(incommingList, updaterOfListInterface) {
        this.incommingList = incommingList;
        this.updaterOfListInterface = updaterOfListInterface;
    }

    FillerOfIncommingListIfItGetsEmpty.prototype.start = function () {
        this.checkIfEmptyAndFill();
        setInterval(underscore.bind(this.checkIfEmptyAndFill, this), 1000);
    };
    FillerOfIncommingListIfItGetsEmpty.prototype.checkIfEmptyAndFill = function f(){
        if (this.incommingList.length === 0){
            this.updaterOfListInterface.updateWithoutMoving();
        }
    };
    return FillerOfIncommingListIfItGetsEmpty;
});