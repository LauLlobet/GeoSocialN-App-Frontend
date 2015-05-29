/*global define, require, module, Phaser, Group, console, underscore,setTimeout */
/*jslint todo: true */
define(["underscore"], function (underscore) {
    "use strict";
    function GpsBrowserBlockChecker(gpsInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface) {
        this.gpsInterface = gpsInterface;
        this.loadingTimeLineToTellToContinue = loadingTimeLineToTellToContinue;
        this.gpsErrorMessageDisplayerInterface = gpsErrorMessageDisplayerInterface;
    }
    GpsBrowserBlockChecker.prototype.start = function start() {
        var properties = { timeout: 5000, enableHighAccuracy: true };
        this.timeBeforeAttempt =  (new Date()).getTime();
        this.gpsInterface.getCurrentPosition(underscore.bind(this.succesfullCallback, this),
                                                underscore.bind(this.errorCallback, this),
                                                properties);
    };
    GpsBrowserBlockChecker.prototype.succesfullCallback =  function succesfullCallback() {
        this.loadingTimeLineToTellToContinue.gpsIsEnabledAndWorking();
    };
    GpsBrowserBlockChecker.prototype.errorCallback = function errorCallback() {
        this.delayOfError =  (new Date()).getTime() - this.timeBeforeAttempt;
        this.showGpsErrorMessageDependingOnTheDelay();
        setTimeout(underscore.bind(this.start, this), 9000);
    };
    GpsBrowserBlockChecker.prototype.showGpsErrorMessageDependingOnTheDelay = function showGpsErrorMessageDependingOnTheDelay(){
        if (this.delayOfError > 300) {
            this.gpsErrorMessageDisplayerInterface.displayAcceptRequestMessage();
        } else {
            this.gpsErrorMessageDisplayerInterface.displayUnblockGpsMessage();
        }
    };
    return GpsBrowserBlockChecker;
});