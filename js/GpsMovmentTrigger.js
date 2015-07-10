/*global define, require, module,navigator, Phaser, Group, console, underscore,setTimeout */
/*jslint todo: true */
define(["underscore", "util/CoordinatesCalculator"], function (underscore, CoordinatesCalculator) {
    "use strict";
    function GpsMovmentTrigger(bussinesController) {
        this.metersToTrigger = 10;
        this.bussinesController = bussinesController;
        this.lastMoveCoordinates = undefined;
        this.actualCoordinates = undefined;
        this.coordinatesCalculator = new CoordinatesCalculator();
        this.options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };
        this.setUpUpdate();
    }
    GpsMovmentTrigger.prototype.setUpUpdate = function () {
        navigator.geolocation.watchPosition(underscore.bind(this.userHasMovedUpdateFunction, this),
                                            underscore.bind(this.errorCallback, this),
                                            this.options);
    };


    GpsMovmentTrigger.prototype.userHasMovedUpdateFunction = function userHasMovedUpdateFunction(position) {
        this.updateFunction(position);
    };

    GpsMovmentTrigger.prototype.forceUpdateFunction = function forceUpdateFunction(position) {
        console.log("forcedupdateoftrees");
        this.handleBegginingOfTrackingIfLastMoveCoordinatesAreUndefined(position);
        this.actualCoordinates = position.coords;
        this.bussinesController.userHasMoved(position.coords);
        this.lastMoveCoordinates = position.coords;
    };
    GpsMovmentTrigger.prototype.updateFunction = function updateFunction(position) {
        this.handleBegginingOfTrackingIfLastMoveCoordinatesAreUndefined(position);
        var distance = this.coordinatesCalculator.distanceBetweenCoordinates(position.coords, this.lastMoveCoordinates);
        this.actualCoordinates = position.coords;
        if (distance > this.metersToTrigger) {
            console.log("userhasmoved");
            this.bussinesController.userHasMoved(position.coords);
            this.lastMoveCoordinates = position.coords;
        }
    };
    GpsMovmentTrigger.prototype.handleBegginingOfTrackingIfLastMoveCoordinatesAreUndefined = function handleBegginingOfTrackingIfLastMoveCoordinatesAreUndefined(position) {
        if (this.lastMoveCoordinates === undefined) {
            this.lastMoveCoordinates = position.coords;
        }
    };
    GpsMovmentTrigger.prototype.errorCallback = function errorCallback() {
        alert("error tracking coordinates");
    };

    GpsMovmentTrigger.prototype.forceUpdate = function forceUpdate() {
        navigator.geolocation.getCurrentPosition(
            underscore.bind(this.forceUpdateFunction, this),
            underscore.bind(this.errorCallback, this),
            this.options
        );
    }

    return GpsMovmentTrigger;
});