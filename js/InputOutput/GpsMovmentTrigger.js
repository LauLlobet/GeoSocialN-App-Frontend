/*global define, require, module,navigator, Phaser, Group, console, _,setTimeout */
/*jslint todo: true */
define(["../lib/underscore", "/OurTreeWeb/js/util/CoordinatesCalculator.js"], function (underscore, CoordinatesCalculator) {
    "use strict";
    function GpsMovmentTrigger(bussinesController) {
        this.metersToTrigger = 10;
        this.bussinesController = bussinesController;
        this.lastMoveCoordinates = undefined;
        this.actualCoordinates = undefined;
        this.coordinatesCalculator = new CoordinatesCalculator();
        this.options = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: Infinity
        };
        this.setUpUpdate();
    }
    GpsMovmentTrigger.prototype.setUpUpdate = function () {
        navigator.geolocation.watchPosition(_.bind(this.userHasMovedUpdateFunction, this),
                                            _.bind(this.errorCallback, this),
                                            this.options);
    };

    GpsMovmentTrigger.prototype.init = function init(relativeLocationCalculator){
        this.relativeLocationCalculator = relativeLocationCalculator;
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
        console.log("acuracy" + position.coords.accuracy);
        this.handleBegginingOfTrackingIfLastMoveCoordinatesAreUndefined(position);
        var distance = this.coordinatesCalculator.distanceBetweenCoordinates(position.coords, this.lastMoveCoordinates);
        this.actualCoordinates = position.coords;
        //if (distance > this.metersToTrigger) {
            console.log("userhasmoved");
            this.bussinesController.userHasMoved(position.coords);
            this.relativeLocationCalculator !== undefined ? this.relativeLocationCalculator.onNewlyLocationOfTheCellPhone(position.coords) : console.log("relativeLocationCalculator Not Set Yet") ;
            this.lastMoveCoordinates = position.coords;
        //}
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
            _.bind(this.forceUpdateFunction, this),
            _.bind(this.errorCallback, this),
            this.options
        );
    }

    return GpsMovmentTrigger;
});