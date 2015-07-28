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

    HashChangeTrigger.prototype.triggerIfHashIsNotEmpty = function () {
        if (location.hash !== "") {
            this.update();
        }
    };


    HashChangeTrigger.prototype.update = function () {
        this.bussinesController.hashHasBeenUpdated(location.hash.substr(1));
    };

    return HashChangeTrigger;
});