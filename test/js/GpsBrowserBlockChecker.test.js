/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define([], function () {
    'use strict';
    module('GpsBrowserBlockChecker test');

    asyncTest('Test succesfull at first', function () {
        require(["GpsBrowserBlockChecker"], function (GpsBrowserBlockChecker) {
            var gpsBrowserBlockChecker,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    getCurrentPosition :  function getCurrentPosition(succesfullcallback, errorcallback, properties) {
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
                };
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, loadingTimeLineToTellToContinue);
            gpsBrowserBlockChecker.start();
            equal(loadingTimeLineToTellToContinue.gpsIsEnabledAndWorkingCalled, true, 'all ok continue');
            QUnit.start();
        });
    });

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
                    displayAcceptRequestMessage : function displayAcceptRequestMessage() {
                        this.displayAcceptRequestMessageCalled = true;
                    },
                    displayAcceptRequestMessageCalled: false,
                    displayUnblockGpsMessage : function displayAcceptRequestMessage() {
                        this.displayUnblockGpsMessageCalled = true;
                    },
                    displayUnblockGpsMessageCalled: false
                };
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            setTimeout(function check() {
                equal(gpsErrorMessageDisplayerInterface.displayAcceptRequestMessageCalled, true, 'all ok continue');
                QUnit.start();
            }, 1030);
        });
    });
    asyncTest('Test non succesfull at first with no delay', function () {
        require(["GpsBrowserBlockChecker"], function (GpsBrowserBlockChecker) {
            var gpsBrowserBlockChecker,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    getCurrentPosition : function getCurrentPosition(succesfullcallback, errorcallback, properties) {
                        setTimeout(errorcallback, 30);
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
                    displayAcceptRequestMessageCalled: false,
                    displayUnblockGpsMessage : function displayAcceptRequestMessage() {
                        this.displayUnblockGpsMessageCalled = true;
                    },
                    displayUnblockGpsMessageCalled: false
                };
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            setTimeout(function check() {
                equal(gpsErrorMessageDisplayerInterface.displayUnblockGpsMessageCalled, true, 'all ok continue');
                equal(loadingTimeLineToTellToContinue.gpsIsEnabledAndWorkingCalled, false, 'all ok continue');
                QUnit.start();
            }, 500);
        });
    });

    asyncTest('Test non succesfull during 10 seconds', function () {
        require(["GpsBrowserBlockChecker"], function (GpsBrowserBlockChecker) {
            var gpsBrowserBlockChecker,
                notYetAcceptsGpsRequests = true,
                gpsInterface = { //the OSgpssimulator calls the succes function once getPosition is executed
                    getCurrentPosition : function getCurrentPosition(succesfullcallback, errorcallback, properties) {
                        if (notYetAcceptsGpsRequests) {
                            errorcallback();
                        } else {
                            succesfullcallback();
                        }
                    }
                },
                loadingTimeLineToTellToContinue = {
                    gpsIsEnabledAndWorkingCalled : false,
                    gpsIsEnabledAndWorking : function gpsIsEnabledAndWorking() {
                        this.gpsIsEnabledAndWorkingCalled = true;
                    }
                },
                gpsErrorMessageDisplayerInterface = {
                    displayAcceptRequestMessage : function displayAcceptRequestMessage() {},
                    displayUnblockGpsMessage : function displayAcceptRequestMessage() {
                        this.displayUnblockGpsMessageCalled += 1;
                    },
                    displayUnblockGpsMessageCalled: 0
                };
            gpsBrowserBlockChecker = new GpsBrowserBlockChecker(gpsInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
            gpsBrowserBlockChecker.start();
            setTimeout(function simulateGpsUnlocked() {
                notYetAcceptsGpsRequests = false;
            }, 3000);
            setTimeout(function check() {
                equal(gpsErrorMessageDisplayerInterface.displayUnblockGpsMessageCalled, 10, 'several error messages displayed');
                equal(loadingTimeLineToTellToContinue.gpsIsEnabledAndWorkingCalled, true, 'at the end its enabled');
                QUnit.start();
            }, 3100);
        });
    });

});