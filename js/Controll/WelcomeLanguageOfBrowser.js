/**
 * Created by quest on 05/11/15.
 */
/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../lib/underscore'], function (underscore) {
    "use strict";
    function WelcomeLanguageOfBrowser() {

    }
    WelcomeLanguageOfBrowser.prototype.loadWelcomeTreesInSeveralLanguages = function onNewlyPresentedTree (treeHash) {

    }

    WelcomeLanguageOfBrowser.prototype.getWelcomeTreeIdDependingOnTheBrowserLanguages = function onNewlyLocationOfTheCellPhone (coordinates) {
        this.currentCellPhoneCoordinates = coordinates;
        this.calculateAndSendLocationTips();
    }
    return WelcomeLanguageOfBrowser;

});