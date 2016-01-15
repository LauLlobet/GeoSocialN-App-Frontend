/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define([], function () {
    'use strict';
    module('GpsBrowserBlockChecker test');



    asyncTest('test cookie manager', function () {
        require(["../js/InputOutput/GpsBrowserBlockChecker", "../js/InputOutput/CookieManager"], function (GpsBrowserBlockChecker, CookieManager) {
            var cookieManager = new CookieManager();

            cookieManager.setCookie("gpsOn", "true");
            equal(cookieManager.getCookie("gpsOn"), "true", 'true');
            cookieManager.setCookie("gpsOn", "test");
            equal(cookieManager.getCookie("gpsOn"), "test", 'test');
            cookieManager.deleteCookie("gpsOn");
            equal(cookieManager.getCookie("gpsOn"), "", 'none');

            QUnit.start();
        });
    });


    asyncTest('ok cookie and gps is enabled', function () {
        require(["../js/InputOutput/GpsBrowserBlockChecker", "../js/InputOutput/CookieManager"], function (GpsBrowserBlockChecker, CookieManager) {
            var gpsBrowserBlockChecker,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    called : false,
                    getCurrentPosition :  function getCurrentPosition(succesfullcallback, errorcallback, properties) {
                        this.called = true;
                        succesfullcallback({
                            coords: {
                                longitude: 10,
                                latitude: 9
                            }
                        });
                    }
                },
                loadingTimeLineToTellToContinue = {
                    gpsIsEnabledAndWorkingCalled : false,
                    gpsIsEnabledAndWorking : function gpsIsEnabledAndWorking() {
                        this.gpsIsEnabledAndWorkingCalled = true;
                    }
                },
                gpsErrorMessageDisplayerInterface = {
                    displayUnblockGpsMessage : function displayAcceptRequestMessage() {
                        this.displayUnblockGpsMessageCalled = true;
                    },
                    displayUnblockGpsMessageCalled: false
                },
                reloadInterface = {
                    called : false,
                    reload : function rif() {
                        this.called = true;
                    }
                },
                cookieManager = new CookieManager();
            ////// PRE
            cookieManager.setCookie("gpsOn", "true");
            ////////
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, reloadInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            /////// POST
            equal(loadingTimeLineToTellToContinue.gpsIsEnabledAndWorkingCalled, true, 'gpsIsEnabledAndWorkingCalled ok continue');
            equal(gpsInterface.called, true, 'all ok continue');
            equal(reloadInterface.called, false, 'all ok continue');
            QUnit.start();
        });
    });

    asyncTest('ok cookie but gps is disabled', function () {
        require(["../js/InputOutput/GpsBrowserBlockChecker", "../js/InputOutput/CookieManager"], function (GpsBrowserBlockChecker, CookieManager) {
            var gpsBrowserBlockChecker,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    called : false,
                    getCurrentPosition :  function getCurrentPosition(succesfullcallback, errorcallback, properties) {
                        this.called = true;
                        errorcallback();//<----------------------DISABLED
                    }
                },
                loadingTimeLineToTellToContinue = {
                    gpsIsEnabledAndWorkingCalled : false,
                    gpsIsEnabledAndWorking : function gpsIsEnabledAndWorking() {
                        this.gpsIsEnabledAndWorkingCalled = true;
                    }
                },
                gpsErrorMessageDisplayerInterface = {
                    displayUnblockGpsMessage : function displayAcceptRequestMessage() {
                        this.displayUnblockGpsMessageCalled = true;
                    },
                    displayUnblockGpsMessageCalled: false
                },
                reloadInterface = {
                    called : false,
                    reload : function rif() {
                        this.called = true;
                    }
                },
                cookieManager = new CookieManager();
            ////// PRE
            cookieManager.setCookie("gpsOn", "true");
            ////////
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, reloadInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            /////// POST
            equal(loadingTimeLineToTellToContinue.gpsIsEnabledAndWorkingCalled, false, 'gpsIsEnabledAndWorkingCalled ok continue');
            equal(gpsInterface.called, true, "gpsInterface");
            equal(reloadInterface.called, true, "reloadInterface");
            equal(cookieManager.getCookie("gpsOn"), "test", "test enabled to relad");
            QUnit.start();
        });
    });

    asyncTest('test cookie and gps is enabled', function () {
        require(["../js/InputOutput/GpsBrowserBlockChecker", "../js/InputOutput/CookieManager"], function (GpsBrowserBlockChecker, CookieManager) {
            var gpsBrowserBlockChecker,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    called : false,
                    getCurrentPosition :  function getCurrentPosition(succesfullcallback, errorcallback, properties) {
                        this.called = true;
                        succesfullcallback({
                            coords: {
                                longitude: 10,
                                latitude: 9
                            }
                        });
                    }
                },
                loadingTimeLineToTellToContinue = {
                    gpsIsEnabledAndWorkingCalled : false,
                    gpsIsEnabledAndWorking : function gpsIsEnabledAndWorking() {
                        this.gpsIsEnabledAndWorkingCalled = true;
                    }
                },
                gpsErrorMessageDisplayerInterface = {
                    displayUnblockGpsMessage : function displayAcceptRequestMessage() {
                        this.displayUnblockGpsMessageCalled = true;
                    },
                    displayUnblockGpsMessageCalled: false
                },
                reloadInterface = {
                    called : false,
                    reload : function rif() {
                        this.called = true;
                    }
                },
                cookieManager = new CookieManager();
            ////// PRE
            cookieManager.setCookie("gpsOn", "test");
            ////////
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, reloadInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            /////// POST
            equal(gpsInterface.called, false, 'gpsInterface all ok continue');
            equal(reloadInterface.called, false, 'areloadInterfacell ok continue');
            equal(gpsErrorMessageDisplayerInterface.displayUnblockGpsMessageCalled, true, 'gpsIsEnabledAndWorkingCalled ok continue');

            setTimeout(function f() {
                equal(loadingTimeLineToTellToContinue.gpsIsEnabledAndWorkingCalled, true, 'gpsIsEnabledAndWorkingCalled ok continue');
                equal(gpsInterface.called, true, 'after gpsInterface all ok continue');
                equal(reloadInterface.called, false, 'after areloadInterfacell ok continue');
                equal(cookieManager.getCookie("gpsOn"), "true", "after test true");
                QUnit.start();
            }, 5000);

        });
    });

    asyncTest('test cookie but gps is disabled', function () {
        require(["../js/InputOutput/GpsBrowserBlockChecker", "../js/InputOutput/CookieManager"], function (GpsBrowserBlockChecker, CookieManager) {
            var gpsBrowserBlockChecker,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    called : false,
                    getCurrentPosition :  function getCurrentPosition(succesfullcallback, errorcallback, properties) {
                        this.called = true;
                        errorcallback();//<----------------------DISABLED
                    }
                },
                loadingTimeLineToTellToContinue = {
                    gpsIsEnabledAndWorkingCalled : false,
                    gpsIsEnabledAndWorking : function gpsIsEnabledAndWorking() {
                        this.gpsIsEnabledAndWorkingCalled = true;
                    }
                },
                gpsErrorMessageDisplayerInterface = {
                    displayUnblockGpsMessage : function displayAcceptRequestMessage() {
                        this.displayUnblockGpsMessageCalled = true;
                    },
                    displayUnblockGpsMessageCalled: false
                },
                reloadInterface = {
                    called : false,
                    reload : function rif() {
                        this.called = true;
                    }
                },
                cookieManager = new CookieManager();
            ////// PRE
            cookieManager.setCookie("gpsOn", "test");
            ////////
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, reloadInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            /////// POST
            equal(loadingTimeLineToTellToContinue.gpsIsEnabledAndWorkingCalled, false, 'gpsIsEnabledAndWorkingCalled ok continue');
            equal(gpsInterface.called, false, 'gpsInterface all ok continue');
            equal(reloadInterface.called, false, 'areloadInterfacell ok continue');
            equal(gpsErrorMessageDisplayerInterface.displayUnblockGpsMessageCalled, true, 'gpsIsEnabledAndWorkingCalled ok continue');
            setTimeout(function f(){
                equal(gpsInterface.called, true, 'after gpsInterface all ok continue');
                equal(reloadInterface.called, true, 'after areloadInterfacell ok continue');
                equal(cookieManager.getCookie("gpsOn"), "test", "after test enabled to relad");
                QUnit.start();
            }, 5000);
        });
    });

    asyncTest('no cookie and gps is enabled', function () {
        require(["../js/InputOutput/GpsBrowserBlockChecker", "../js/InputOutput/CookieManager"], function (GpsBrowserBlockChecker, CookieManager) {
            var gpsBrowserBlockChecker,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    called : false,
                    getCurrentPosition :  function getCurrentPosition(succesfullcallback, errorcallback, properties) {
                        this.called = true;
                        succesfullcallback({
                            coords: {
                                longitude: 10,
                                latitude: 9
                            }
                        });
                    }
                },
                loadingTimeLineToTellToContinue = {
                    gpsIsEnabledAndWorkingCalled : false,
                    gpsIsEnabledAndWorking : function gpsIsEnabledAndWorking() {
                        this.gpsIsEnabledAndWorkingCalled = true;
                    }
                },
                gpsErrorMessageDisplayerInterface = {
                    displayAcceptRequestMessage : function displayAcceptRequestMessage() {
                        this.displayAcceptRequestMessageCalled = true;
                    },
                    displayAcceptRequestMessageCalled: false
                },
                reloadInterface = {
                    called : false,
                    reload : function rif() {
                        this.called = true;
                    }
                },
                cookieManager = new CookieManager();
            ////// PRE
            cookieManager.deleteCookie("gpsOn");
            ////////
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, reloadInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            /////// POST
            equal(gpsInterface.called, false, 'gpsInterface all ok continue');
            equal(reloadInterface.called, false, 'areloadInterfacell ok continue');
            equal(gpsErrorMessageDisplayerInterface.displayAcceptRequestMessageCalled, true, 'gpsIsEnabledAndWorkingCalled ok continue');

            setTimeout(function f() {
                equal(loadingTimeLineToTellToContinue.gpsIsEnabledAndWorkingCalled, true, 'gpsIsEnabledAndWorkingCalled ok continue');
                equal(gpsInterface.called, true, 'after gpsInterface all ok continue');
                equal(reloadInterface.called, false, 'after areloadInterfacell ok continue');
                equal(cookieManager.getCookie("gpsOn"), "true", "after test true");
                QUnit.start();
            }, 5000);

        });
    });

    asyncTest('no cookie but gps is disabled', function () {
        require(["../js/InputOutput/GpsBrowserBlockChecker", "../js/InputOutput/CookieManager"], function (GpsBrowserBlockChecker, CookieManager) {
            var gpsBrowserBlockChecker,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    called : false,
                    getCurrentPosition :  function getCurrentPosition(succesfullcallback, errorcallback, properties) {
                        this.called = true;
                        errorcallback();//<----------------------DISABLED
                    }
                },
                loadingTimeLineToTellToContinue = {
                    gpsIsEnabledAndWorkingCalled : false,
                    gpsIsEnabledAndWorking : function gpsIsEnabledAndWorking() {
                        this.gpsIsEnabledAndWorkingCalled = true;
                    }
                },
                gpsErrorMessageDisplayerInterface = {
                    displayAcceptRequestMessage : function displayAcceptRequestMessage() {
                        this.displayAcceptRequestMessageCalled = true;
                    },
                    displayAcceptRequestMessageCalled: false
                },
                reloadInterface = {
                    called : false,
                    reload : function rif() {
                        this.called = true;
                    }
                },
                cookieManager = new CookieManager();
            ////// PRE
            cookieManager.setCookie("gpsOn", "");
            ////////
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, reloadInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            /////// POST
            equal(loadingTimeLineToTellToContinue.gpsIsEnabledAndWorkingCalled, false, 'gpsIsEnabledAndWorkingCalled ok continue');
            equal(gpsInterface.called, false, 'gpsInterface all ok continue');
            equal(reloadInterface.called, false, 'areloadInterfacell ok continue');
            equal(gpsErrorMessageDisplayerInterface.displayAcceptRequestMessageCalled, true, 'gpsIsEnabledAndWorkingCalled ok continue');
            setTimeout(function f() {
                equal(gpsInterface.called, true, 'after gpsInterface all ok continue');
                equal(reloadInterface.called, true, 'after areloadInterfacell ok continue');
                equal(cookieManager.getCookie("gpsOn"), "test", "after test enabled to relad");
                QUnit.start();
            }, 5000);
        });
    });
/*
    asyncTest('Test non succesfull at first with 1sec delay', function () {
        require(["GpsBrowserBlockChecker"], function (GpsBrowserBlockChecker) {
            var gpsBrowserBlockChecker,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    getCurrentPosition : function getCurrentPosition(succesfullcallback, errorcallback, properties) {
                        setTimeout(errorcallback, 1000);
                    }
                },
                loadingTimeLineToTellToContinue = {
                },
                gpsErrorMessageDisplayerInterface = {
                    displayUnblockGpsMessage : function displayAcceptRequestMessage() {
                        this.displayUnblockGpsMessageCalled = true;
                    },
                    displayUnblockGpsMessageCalled: false
                };
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, reloadInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            setTimeout(function check() {
                equal(gpsErrorMessageDisplayerInterface.displayAcceptRequestMessageCalled, true, 'all ok continue');
                QUnit.start();
            }, 1030);
        });
    });
*/
});