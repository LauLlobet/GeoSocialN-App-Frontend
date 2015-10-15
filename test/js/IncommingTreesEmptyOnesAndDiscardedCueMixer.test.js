define([], function () {
    'use strict';
    module('Stack of Scenes test');

  /*  asyncTest('tree is at 0 distance', function () {
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
*/
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
});
