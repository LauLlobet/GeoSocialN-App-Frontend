/**
 * Created by quest on 24/07/15.
 *//*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define([], function () {
    'use strict';
    module('FillerOfIncommingListIfItGetsEmpty.test');

    asyncTest('FillerOfIncommingListIfItGetsEmpty list starts empty', function () {
        require(["FillerOfIncommingListIfItGetsEmpty"], function (FillerOfIncommingListIfItGetsEmpty) {
            var fillerOfIncommingListIfItGetsEmpty,
                incommingList = [],
                updateListInterface = {
                    updateWithoutMoving : function () {
                        incommingList.push(3);
                    }
                };
            fillerOfIncommingListIfItGetsEmpty = new FillerOfIncommingListIfItGetsEmpty( incommingList, updateListInterface );
            fillerOfIncommingListIfItGetsEmpty.start();
            equal(incommingList.length, 1, 'size');
            QUnit.start();
        });
    });

    asyncTest('FillerOfIncommingListIfItGetsEmpty list gets empty', function () {
        require(["FillerOfIncommingListIfItGetsEmpty"], function (FillerOfIncommingListIfItGetsEmpty) {
            var fillerOfIncommingListIfItGetsEmpty,
                incommingList = [ 3 ],
                updateListInterface = {
                    updateWithoutMoving: function () {
                        incommingList.push(3);
                    }
                };
            setTimeout(function () { incommingList.shift(); }, 500);
            fillerOfIncommingListIfItGetsEmpty = new FillerOfIncommingListIfItGetsEmpty(incommingList, updateListInterface);
            fillerOfIncommingListIfItGetsEmpty.start();
            setTimeout(function () {
                equal(incommingList.length, 1, 'size');
                QUnit.start();
            }, 2000);
        });
    });

    asyncTest('FillerOfIncommingListIfItGetsEmpty incomming trees are over', function () {
        require(["FillerOfIncommingListIfItGetsEmpty"], function (FillerOfIncommingListIfItGetsEmpty) {
            var fillerOfIncommingListIfItGetsEmpty,
                incommingList = [ ],
                updateListInterface = {
                    called : 0,
                    updateWithoutMoving: function updateWM() {
                        if (this.called < 2) {
                            incommingList.push(3);
                        } else {
                            fillerOfIncommingListIfItGetsEmpty.treesFromServerAreOver();
                        }
                        this.called += 1;
                    }
                };
            setTimeout(function () { equal(incommingList.length, 1, 'size'); }, 100);
            setTimeout(function () { incommingList.shift(); }, 1500);
            setTimeout(function () { equal(incommingList.length, 1, 'size'); }, 2100);
            setTimeout(function () { incommingList.shift(); }, 2500);
            setTimeout(function () { equal(incommingList.length, 0, 'size'); }, 2600);

            fillerOfIncommingListIfItGetsEmpty = new FillerOfIncommingListIfItGetsEmpty(incommingList, updateListInterface);
            fillerOfIncommingListIfItGetsEmpty.start();
            setTimeout(function () {
                equal(updateListInterface.called, 3, 'has stopped calling server if server is empty from new trees?');
                QUnit.start();
            }, 9000);
        });
    });

});
