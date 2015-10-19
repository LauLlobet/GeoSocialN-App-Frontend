define([], function () {
    'use strict';
    module('Stack of Scenes test');
/*
   asyncTest('tree is at 0 distance', function () {
        require(["../js/Controll/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans;
            incommingTreesEmptyOnesAndDiscardedCueMixer.icommingTreesWithItsUnitList = [ {treeId: 1, distanceUnit: 0},
                                                                                           {treeId: 2, distanceUnit: 0}];
            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.icommingTreesWithItsUnitListToEmptyTreeOrNotInOrderToStackIt();
            deepEqual(ans, 1, 'size');
            QUnit.start();
        });
    });

    asyncTest('2 trees at 0 distance', function () {
        require(["../js/Controll/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans,
                ans2;
            incommingTreesEmptyOnesAndDiscardedCueMixer.icommingTreesWithItsUnitList = [ {treeId: 1, distanceUnit: 0},
                                                                                         {treeId: 2, distanceUnit: 0}];
            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.icommingTreesWithItsUnitListToEmptyTreeOrNotInOrderToStackIt();
            ans2 = incommingTreesEmptyOnesAndDiscardedCueMixer.icommingTreesWithItsUnitListToEmptyTreeOrNotInOrderToStackIt();
            deepEqual(ans, 1, 'size');
            deepEqual(ans2, 2, 'size');
            QUnit.start();
        });
    });

    asyncTest('2 trees at 0 distance', function () {
        require(["../js/Controll/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans,
                ans2;
            incommingTreesEmptyOnesAndDiscardedCueMixer.orderIncommingListFromFarToNearAndAddDistanceUnits = function (incommingList){
                return [ {treeId: 2, distanceUnit: 0},
                    {treeId: 3, distanceUnit: 4},
                    {treeId: 1, distanceUnit: 4},
                    {treeId: 4, distanceUnit: 4},
                    {treeId: 5, distanceUnit: 4} ];
            };
            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees();
            if (ans[0] !== undefined) {
                deepEqual(ans, [2, undefined], 'size');
            } else {
                deepEqual(ans, [undefined, 2], 'size');
            }
            deepEqual(incommingList, [1, 3, 4, 5], 'size');
            QUnit.start();
        });
    });

    asyncTest('2 trees at 0 distance', function () {
        require(["../js/Controll/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans,
                ans2;
            incommingTreesEmptyOnesAndDiscardedCueMixer.orderIncommingListFromFarToNearAndAddDistanceUnits = function (incommingList){
                return [ {treeId: 2, distanceUnit: 2},
                    {treeId: 3, distanceUnit: 4},
                    {treeId: 1, distanceUnit: 7},
                    {treeId: 4, distanceUnit: 7},
                    {treeId: 5, distanceUnit: 7} ];
            };
            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees();
            deepEqual(ans, [undefined, undefined], 'size');
            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees();
            if (ans[0] !== undefined) {
                deepEqual(ans, [2, undefined], '2');
            } else {
                deepEqual(ans, [undefined, 2], '2');
            }
            incommingTreesEmptyOnesAndDiscardedCueMixer.orderIncommingListFromFarToNearAndAddDistanceUnits = function (incommingList){
                return [ {treeId: 3, distanceUnit: 4},
                    {treeId: 1, distanceUnit: 7},
                    {treeId: 4, distanceUnit: 7},
                    {treeId: 5, distanceUnit: 7} ];
            };
            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees();
            if (ans[0] !== undefined) {
                deepEqual(ans, [3, undefined], '3');
            } else {
                deepEqual(ans, [undefined, 3], '3');
            }
            deepEqual(incommingList, [1, 4, 5], 'size');
            QUnit.start();
        });
    });

    asyncTest('distance to meters', function () {
        require(["../js/Controll/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                mapOfTreesById = {},
                gpsMovmentTrigger = { lastMoveCoordinates: {longitude: 1, latitude: 1}},
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList, mapOfTreesById, gpsMovmentTrigger),
                expectedAns,
                ans;
            mapOfTreesById[1] = {id: 1, x: 3.14, y: 4.14 };
            mapOfTreesById[2] = {id: 2, x: 3.25, y: 4.0 };
            mapOfTreesById[3] = {id: 3, x: 3.14, y: 4.0 };
            mapOfTreesById[4] = {id: 4, x: 1.6, y: 1.3 };
            mapOfTreesById[5] = {id: 5, x: 1, y: 1.001};

            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.calculateMetersOfEachTreeFromTheActualPosition(incommingList);
            expectedAns =  [{
                "distance": 111,
                "treeId": 5
            }, {
                "distance": 74663,
                "treeId": 4
            }, {
                "distance": 410070,
                "treeId": 3
            }, {
                "distance": 417288,
                "treeId": 2
            }, {
                "distance": 422851,
                "treeId": 1
            }]
            deepEqual(expectedAns, ans, 'distance');
            QUnit.start();
        });
    });
*/
    asyncTest('whole class', function () {
        require(["../js/Controll/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4],
                mapOfTreesById = {},
                //41.386667,2.17
                longi = 41.386667,
                lati = 2.17,
                gpsMovmentTrigger = { lastMoveCoordinates: {longitude: longi, latitude: lati}},
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList, mapOfTreesById, gpsMovmentTrigger),
                expectedAns,
                ans;
            mapOfTreesById[1] = {id: 1, x: longi, y: lati + 0.0009 }; // discarded
            mapOfTreesById[2] = {id: 2, x: longi, y: lati + 0.0011 }; // 3 u
            mapOfTreesById[3] = {id: 3, x: longi, y: lati + 0.0021 }; // 5 u
            mapOfTreesById[4] = {id: 4, x: longi, y: lati - 0.0081 }; // 6 u direccio oposada

            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees([1]);
            if (ans[0] !== undefined) {
                deepEqual(ans, [1, undefined], '1');
            } else {
                deepEqual(ans, [undefined, 1], '1');
            }
            deleteFromArray(incommingList, 1);
            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees([]);
            deepEqual(ans, [undefined, undefined], '2');
            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees([]);
            if (ans[0] !== undefined) {
                deepEqual(ans, [2, undefined], '3');
            } else {
                deepEqual(ans, [undefined, 2], '3');
            }
            deleteFromArray(incommingList, 2);
            ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees([]);
            if (ans[0] !== undefined) {
                deepEqual(ans, [2, undefined], '3');
            } else {
                deepEqual(ans, [undefined, 2], '3');
            }

            QUnit.start();
        });

        function deleteFromArray(incommingList,element){
            var index = incommingList.indexOf(element);
            if (index > -1) {
                incommingList.splice(index, 1);
            }
            console.log(incommingList);
        }
    });
});
