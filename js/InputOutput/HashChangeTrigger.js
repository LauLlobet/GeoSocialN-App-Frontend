define(["util/CoordinatesCalculator", "../lib/underscore"], function (CoordinatesCalculator, undersocre) {
    "use strict";
    function HashChangeTrigger(bussinesController) {
        this.bussinesController = bussinesController;
        this.setUpUpdate();
    }

    HashChangeTrigger.prototype.setUpUpdate = function () {
        if ( "onhashchange" in window ) {
            window.onhashchange = _.bind(this.update, this);
        } else {
            alert(" APP will not work in this browser because it doesent support hashcange");
        }
    };


    HashChangeTrigger.prototype.setHashAtUrlAndStartUpdatingProcess = function (newHash) {
        this.setHash(newHash);
    };

    HashChangeTrigger.prototype.setHashAtUrlAndIgnoreUpdatingProcess = function (newHash) {
        this.ignoreNextUpdate();
        this.setHash(newHash);
    };

    HashChangeTrigger.prototype.setHash = function setHash(newHash) {
        if (newHash === null || newHash === undefined){
            return;
        }
        location.hash = newHash;
    };

    HashChangeTrigger.prototype.storeActualHash = function () {
        this.storedHash = location.hash;
    };


    HashChangeTrigger.prototype.restoreStoredHash = function () {
        location.hash = this.storedHash;
    };

    HashChangeTrigger.prototype.triggerIfStoredHashWasNotEmpty = function () {
        if (!this.isStoredHashEmpty()) {
            this.restoreStoredHash();
        }
    };

    HashChangeTrigger.prototype.isStoredHashEmpty = function () {
        return this.storedHash === "";
    };
    HashChangeTrigger.prototype.removeHash = function removeHash() {
        var loc = window.location;
        if ("pushState" in history)
            history.pushState("", document.title, loc.pathname + loc.search);
        else {
            loc.hash = "";
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