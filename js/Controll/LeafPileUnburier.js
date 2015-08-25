/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../lib/underscore', '/OurTreeWeb/js/util/CoordinatesCalculator.js'], function (underscore, CoordinatesCalculator) {
    "use strict";
    var limitToUnbury = 14;

    function LeafPileUnburier(treeHash, bussinesController) {
        this.treeHashIdToTree = treeHash;

        this.currentTargetCoordinates = undefined;
        this.currentCellPhoneCoordinates = undefined;
        this.currentTargetCoordinates = {};

        this.coordinatesCalculator = new CoordinatesCalculator();
        this.bussinesController = bussinesController;

    }
    LeafPileUnburier.prototype.onNewlyPresentedTree = function onNewlyPresentedTree (treeid) {
        var tree;
        if (treeid === undefined || treeid < 10) {// 10 is the numbers of treeid of trees that gives instructions to users
            return;
        }
        tree = this.treeHashIdToTree[treeid];
        this.currentTargetCoordinates.longitude = tree.x;
        this.currentTargetCoordinates.latitude = tree.y;

        this.checkIfNeedsToBeUnburied();
    }

    LeafPileUnburier.prototype.onNewlyLocationOfTheCellPhone = function onNewlyLocationOfTheCellPhone (coordinates) {
        this.currentCellPhoneCoordinates = coordinates;
        this.checkIfNeedsToBeUnburied();
    }

    LeafPileUnburier.prototype.checkIfNeedsToBeUnburied = function calculateAndSendLocationTips (treeid) {
        if ( this.currentCellPhoneCoordinates === undefined) {
            return;
        }
        this.calculateMetersAndUnburyIfNecesary();
    }

    LeafPileUnburier.prototype.calculateMetersAndUnburyIfNecesary = function calculateAndSendMetersToTreeTip() {
        this.metersFromCellPhoneToTargetTree = this.coordinatesCalculator.distanceBetweenCoordinates(
            this.currentCellPhoneCoordinates,
            this.currentTargetCoordinates);
        if(this.metersFromCellPhoneToTargetTree < limitToUnbury) {
            this.bussinesController.unBuryLayer("leafs");
        }
    }


    LeafPileUnburier.prototype.calculateAndSendCompassOrientationToTreeTip = function calculateAndSendCompassOrientationToTreeTip() {
        var angle = this.coordinatesCalculator.angleWithBetweenCoords(
            this.currentCellPhoneCoordinates,
            this.currentTargetCoordinates
        );
        angle = angle + this.orientationNord;
        this.compassSetter.setAngle(angle);
    }

    return LeafPileUnburier;

});