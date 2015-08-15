/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../lib/underscore', '/OurTreeWeb/js/util/CoordinatesCalculator.js'], function (underscore, CoordinatesCalculator) {
    "use strict";
    function RelativeLocationCalculator(treeHash, sceneKmSetter) {
        this.treeHashIdToTree = treeHash;
        this.sceneKmSetter = sceneKmSetter;

        this.currentTargetCoordinates = undefined;
        this.currentCellPhoneCoordinates = undefined;
        this.currentTargetCoordinates = {};

        this.coordinatesCalculator = new CoordinatesCalculator();
    }
    RelativeLocationCalculator.prototype.onNewlyPresentedTree = function onNewlyPresentedTree (treeid) {
        var tree;
        if (treeid === undefined || treeid < 10) {// 10 is the numbers of treeid of trees that gives instructions to users
            return;
        }
        tree = this.treeHashIdToTree[treeid];
        this.currentTargetCoordinates.longitude = tree.x;
        this.currentTargetCoordinates.latitude = tree.y;

        this.calculateAndSendLocationTips();
    }

    RelativeLocationCalculator.prototype.onNewlyLocationOfTheCellPhone = function onNewlyLocationOfTheCellPhone (coordinates) {
        this.currentCellPhoneCoordinates = coordinates;
        console.log("acuracy:" + coordinates.acuracy);
        this.calculateAndSendLocationTips();
    }

    RelativeLocationCalculator.prototype.calculateAndSendLocationTips = function calculateAndSendLocationTips (treeid) {
        if ( this.currentCellPhoneCoordinates === undefined) {
            return;
        }
        var metersFromCellPhoneToTargetTree = this.coordinatesCalculator.distanceBetweenCoordinates(
            this.currentCellPhoneCoordinates,
            this.currentTargetCoordinates);
        this.sceneKmSetter.setDistance(Math.round(this.currentCellPhoneCoordinates.accuracy));//metersFromCellPhoneToTargetTree));
    }

    return RelativeLocationCalculator;

});