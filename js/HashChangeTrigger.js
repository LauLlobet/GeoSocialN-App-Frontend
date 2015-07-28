define(["underscore", "util/CoordinatesCalculator"], function (underscore, CoordinatesCalculator) {
    "use strict";
    function HashChangeTrigger(bussinesController) {
        this.bussinesController = bussinesController;
        this.setUpUpdate();
    }

    HashChangeTrigger.prototype.setUpUpdate = function () {
        if ( "onhashchange" in window ) {
            window.onhashchange = underscore.bind(this.update, this);
        } else {
            alert(" APP will not work in this browser because it doesent support hashcange");
        }
    };

    HashChangeTrigger.prototype.setHashAtUrlAndStartUpdatingProcess = function (newHash) {
        location.hash = newHash;
    };

    HashChangeTrigger.prototype.setHashAtUrlAndIgnoreUpdatingProcess = function (newHash) {
        this.ignoreNextUpdate();
        location.hash = newHash;
    };

    HashChangeTrigger.prototype.triggerIfHashIsNotEmpty = function () {
        if (location.hash !== "") {
            this.update();
        }
    };


    HashChangeTrigger.prototype.update = function () {
        if (this.ignoreNextUpdateFlag) {
            this.ignoreNextUpdateFlag = false;
            return;
        }
        this.bussinesController.hashHasBeenUpdated(location.hash.substr(1));
    };

    HashChangeTrigger.prototype.ignoreNextUpdate = function() {
        this.ignoreNextUpdateFlag = true;
    }

    return HashChangeTrigger;
});