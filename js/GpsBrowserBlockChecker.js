/*global define, require, module, Phaser, Group, console, underscore,setTimeout */
/*jslint todo: true */
define(["underscore", "CookieManager"], function (underscore, CookieManager) {
    "use strict";
    function GpsBrowserBlockChecker(gpsInterface, reloadInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface) {
        this.gpsInterface = gpsInterface;
        this.loadingTimeLineToTellToContinue = loadingTimeLineToTellToContinue;
        this.gpsErrorMessageDisplayerInterface = gpsErrorMessageDisplayerInterface;
        this.reloadInterface = reloadInterface;
        this.cookieManager = new CookieManager();
    }
    GpsBrowserBlockChecker.prototype.start = function start() {
        switch (this.cookieManager.getCookie("gpsOn")) {
            case "true":
                this.testGps();
                break;
            case "test":
                this.gpsErrorMessageDisplayerInterface.displayUnblockGpsMessage();
                setTimeout(underscore.bind(this.testGps, this), 4000);
                break;
            case "":
                this.gpsErrorMessageDisplayerInterface.displayAcceptRequestMessage();
                setTimeout(underscore.bind(this.testGps, this), 4000);
                break;
        }
    };

    GpsBrowserBlockChecker.prototype.testGps = function test() {
        var properties = { timeout: 5000, enableHighAccuracy: false };
        this.gpsInterface.getCurrentPosition(underscore.bind(this.succesfullCallback, this),
                                                underscore.bind(this.errorCallback, this),
                                                properties);

    }
    GpsBrowserBlockChecker.prototype.succesfullCallback =  function succesfullCallback() {
        this.loadingTimeLineToTellToContinue.gpsIsEnabledAndWorking();
        this.cookieManager.setCookie("gpsOn", "true");
    };
    GpsBrowserBlockChecker.prototype.errorCallback = function errorCallback() {
        this.cookieManager.setCookie("gpsOn", "test");
        this.reloadInterface.reload();
    };
    return GpsBrowserBlockChecker;
});