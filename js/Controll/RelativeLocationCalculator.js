/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../lib/underscore', '../util/CoordinatesCalculator'], function (underscore, CoordinatesCalculator) {
    "use strict";
    function RelativeLocationCalculator(treeHash, sceneKmSetter, compassSetter, gpsMovmentTrigger) {
        var that = this;
        this.treeHashIdToTree = treeHash;
        this.sceneKmSetter = sceneKmSetter;
        this.compassSetter = compassSetter;
        this.gpsMovmentTrigger = gpsMovmentTrigger;

        this.currentTargetCoordinates = undefined;
        this.currentCellPhoneCoordinates = undefined;
        this.currentTargetCoordinates = {};

        this.coordinatesCalculator = new CoordinatesCalculator();
        this.orientationNord = 0;
        window.addEventListener('deviceorientation', function (event) {
            that.orientationNord = event.alpha;
            that.calculateAndSendCompassOrientationToTreeTip();
        }, false);
    }
    RelativeLocationCalculator.prototype.onNewlyPresentedTree = function onNewlyPresentedTree (treeid) {
        var tree;
        if (treeid === undefined || treeid < 100 || treeid === null) {// 10 is the numbers of treeid of trees that gives instructions to users
            return;
        }
        tree = this.treeHashIdToTree[treeid];
        this.currentTargetCoordinates.longitude = tree.x;
        this.currentTargetCoordinates.latitude = tree.y;

        this.calculateAndSendLocationTips();
    }

    RelativeLocationCalculator.prototype.onNewlyLocationOfTheCellPhone = function onNewlyLocationOfTheCellPhone (coordinates) {
        this.currentCellPhoneCoordinates = coordinates;
        this.calculateAndSendLocationTips();
    }

    RelativeLocationCalculator.prototype.calculateAndSendLocationTips = function calculateAndSendLocationTips (treeid) {
        if ( this.currentCellPhoneCoordinates === undefined) {
            return;
        }
        this.calculateAndSendMetersToTreeTip();
        this.calculateAndSendCompassOrientationToTreeTip();
    }

    RelativeLocationCalculator.prototype.calculateAndSendMetersToTreeTip = function calculateAndSendMetersToTreeTip() {
        this.metersFromCellPhoneToTargetTree = this.coordinatesCalculator.distanceBetweenCoordinates(
            this.currentCellPhoneCoordinates,
            this.currentTargetCoordinates);
        if(isNaN(this.metersFromCellPhoneToTargetTree)){
            return;
        }
        this.sceneKmSetter.setDistance(Math.round(this.metersFromCellPhoneToTargetTree));//metersFromCellPhoneToTargetTree));
        if (this.metersFromCellPhoneToTargetTree < 130) {
            this.gpsMovmentTrigger.setPrecisionNowIsImportant();
        } else {
            this.gpsMovmentTrigger.setPrecisionNowIsNotImportant();
        }
    }


    RelativeLocationCalculator.prototype.calculateAndSendCompassOrientationToTreeTip = function calculateAndSendCompassOrientationToTreeTip() {
        var angle = this.coordinatesCalculator.angleWithBetweenCoords(
            this.currentCellPhoneCoordinates,
            this.currentTargetCoordinates
            );
        angle = angle + this.orientationNord;
        this.compassSetter.setAngle(angle);
    }

    return RelativeLocationCalculator;

});