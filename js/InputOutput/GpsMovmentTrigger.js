/*global define, require, module,navigator, Phaser, Group, console, _,setTimeout */
/*jslint todo: true */
define(["../lib/underscore", "/OurTreeWeb/js/util/CoordinatesCalculator.js"], function (underscore, CoordinatesCalculator) {
    "use strict";
    function GpsMovmentTrigger(bussinesController, phaserGame) {
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
        if (distance > this.metersToTrigger) {
            console.log("userhasmoved");
            this.bussinesController.userHasMoved(position.coords);
            this.lastMoveCoordinates = position.coords;
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

        if (precisionInMeters === 150 && navigator.userAgent.match("emulated") !== null){
            this.precisionOneToTen = 10;
        }

        //if( this.precisionIsNowImportant ) {
           // this.phaserGame.handlePrecisionGps(this.precisionOneToTen, precisionInMeters);
        //}
    }

    GpsMovmentTrigger.prototype.setPrecisionNowIsImportant = function setpPecisionNowIsImportant(precision) {
        this.precisionIsNowImportant = true;
    }

    GpsMovmentTrigger.prototype.setPrecisionNowIsNotImportant = function setPrecisionNowIsNotImportant(precision) {
        this.precisionIsNowImportant = false;
    }

    return GpsMovmentTrigger;
});