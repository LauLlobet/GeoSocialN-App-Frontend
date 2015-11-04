/*global define, require, module,navigator, Phaser, Group, console, _,setTimeout */
/*jslint todo: true */

var forgedAccuracy = 12;
define(["../lib/underscore", "/OurTreeWeb/js/util/CoordinatesCalculator.js"], function (underscore, CoordinatesCalculator) {
    "use strict";
    function GpsMovmentTrigger(bussinesController, phaserGame) {
        this.metersToTrigger = 10;
        this.isFirstIteration = true;
        this.bussinesController = bussinesController;
        this.lastMoveCoordinates = undefined;
        this.actualCoordinates = {
            longitude: longitude,
            latitude: latitude
        };
        this.coordinatesCalculator = new CoordinatesCalculator();
        this.options = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 30000
        };
        this.setUpUpdate();
        this.phaserGame = phaserGame;
        this.precisionIsNowImportant = false;
    }
    GpsMovmentTrigger.prototype.setUpUpdate = function () {
        navigator.geolocation.watchPosition(_.bind(this.userHasMovedUpdateFunction, this),
                                            _.bind(this.errorCallback, this),
                                            this.options);
    };

    GpsMovmentTrigger.prototype.forceUpdate = function () {
        navigator.geolocation.watchPosition(_.bind(this.userHasMovedUpdateFunction, this),
            _.bind(this.errorCallback, this),
            this.options);
    };

    GpsMovmentTrigger.prototype.init = function init(relativeLocationCalculator, leafPileUnburier){
        this.relativeLocationCalculator = relativeLocationCalculator;
        this.leafPileUnburier = leafPileUnburier;
    };

    GpsMovmentTrigger.prototype.userHasMovedUpdateFunction = function userHasMovedUpdateFunction(position) {
        var pos2;
        if (navigator.userAgent.match("emulated") !== null) {
            console.log("Forged accuracy:" + forgedAccuracy);
            pos2 = { coords:{
                latitude : position.coords.latitude,
                longitude : position.coords.longitude,
                accuracy : forgedAccuracy
                }
            }
            this.updateFunction(pos2);
            return;
        }
        this.updateFunction(position);
    };

    GpsMovmentTrigger.prototype.forceUpdateFunction = function forceUpdateFunction(position) {
        this.handleBegginingOfTrackingIfLastMoveCoordinatesAreUndefined(position);
        this.actualCoordinates = position.coords;
        this.bussinesController.userHasMoved(position.coords);
        this.lastMoveCoordinates = position.coords;
    };
    GpsMovmentTrigger.prototype.updateFunction = function updateFunction(position) {
        this.handleBegginingOfTrackingIfLastMoveCoordinatesAreUndefined(position);
        var distance = this.coordinatesCalculator.distanceBetweenCoordinates(position.coords, this.lastMoveCoordinates);
        this.actualCoordinates = position.coords;
        if (distance > this.metersToTrigger || this.isFirstIteration) {
            this.bussinesController.userHasMoved(position.coords);
            this.lastMoveCoordinates = position.coords;
            this.isFirstIteration = false;
            console.log("GPS: Accuracy:" + position.coords.accuracy + " lattitude:" +  position.coords.latitude );
        }
        this.relativeLocationCalculator !== undefined ? this.relativeLocationCalculator.onNewlyLocationOfTheCellPhone(position.coords) : console.log("relativeLocationCalculator Not Set Yet");
        this.relativeLocationCalculator !== undefined ? this.leafPileUnburier.onNewlyLocationOfTheCellPhone(position.coords) : console.log("leafPileUnburier Not Set Yet");
        this.handlePrecisionAlerts(position.coords.accuracy);
    };
    GpsMovmentTrigger.prototype.handleBegginingOfTrackingIfLastMoveCoordinatesAreUndefined = function handleBegginingOfTrackingIfLastMoveCoordinatesAreUndefined(position) {
        if (this.lastMoveCoordinates === undefined) {
            this.lastMoveCoordinates = position.coords;
        }
    };
    GpsMovmentTrigger.prototype.errorCallback = function errorCallback(error) {
        if (navigator.userAgent.match("emulated") === null) {
            alert("error tracking coordinates");
        } else {
            console.log("error tracking coordinates" + error + " " + error.stack);
        }

    };

    GpsMovmentTrigger.prototype.forceUpdate = function forceUpdate() {
        navigator.geolocation.getCurrentPosition(
            _.bind(this.forceUpdateFunction, this),
            _.bind(this.errorCallback, this),
            this.options
        );
    }

    GpsMovmentTrigger.prototype.handlePrecisionAlerts = function handlePrecisionAlerts(precision, precisionInMeters) {
        var precisionInMeters = precision;
       this.precisionOneToTen = 0;


        if (precisionInMeters < 35){
            this.precisionOneToTen = 2;
        } if (precisionInMeters < 20){
            this.precisionOneToTen = 5;
        } if (precisionInMeters < 18 ){
            this.precisionOneToTen = 7;
        } if (precisionInMeters < 16){
            this.precisionOneToTen = 9;
        } if (precisionInMeters < 14){
            this.precisionOneToTen = 10;
        }

        if( this.precisionIsNowImportant ) {
           this.phaserGame.handlePrecisionGps(this.precisionOneToTen, precisionInMeters);
        }
    }

    GpsMovmentTrigger.prototype.setPrecisionNowIsImportant = function setpPecisionNowIsImportant(precision) {
        this.precisionIsNowImportant = true;
        this.handlePrecisionAlerts(this.lastMoveCoordinates.accuracy);
    }

    GpsMovmentTrigger.prototype.setPrecisionNowIsNotImportant = function setPrecisionNowIsNotImportant(precision) {
        this.precisionIsNowImportant = false;
    }

    return GpsMovmentTrigger;
});