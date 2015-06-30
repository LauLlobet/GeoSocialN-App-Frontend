define([], function () {
    'use strict';
    module('Stack of Scenes test');

    asyncTest('Test zero empty and non discarded', function () {
        require(["IncommingTreeCueManager"], function (IncommingTreeCueManager) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 0,
                discarded = [],
                incommingTreeCueManager = new IncommingTreeCueManager(incommingList),
                ans = incommingTreeCueManager.getToLoadAtBackgroundTrees(discarded, emptyTrees);
            deepEqual(ans, [1, 2, 3], 'size');
            QUnit.start();
        });
    });

    asyncTest('Test with two empty', function () {
        require(["IncommingTreeCueManager"], function (IncommingTreeCueManager) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 5,
                discarded = [],
                incommingTreeCueManager = new IncommingTreeCueManager(incommingList),
                ans = incommingTreeCueManager.getToLoadAtBackgroundTrees(discarded, emptyTrees);

            var isequal = _.all(ans, function (v) {
                return _.include([1, undefined, undefined], v);
            });
            equal(isequal, true, "equals");
            equal(ans.length, 3, "equals");
            QUnit.start();
        });
    });

    asyncTest('Test with one empty', function () {
        require(["IncommingTreeCueManager"], function (IncommingTreeCueManager) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 1,
                discarded = [],
                incommingTreeCueManager = new IncommingTreeCueManager(incommingList),
                ans = incommingTreeCueManager.getToLoadAtBackgroundTrees(discarded, emptyTrees);

            var isequal = _.all(ans, function (v) {
                return _.include([1, 2, undefined], v);
            });
            equal(isequal, true, "equals");
            equal(ans.length, 3, "equals");
            QUnit.start();
        });
    });

    asyncTest('Test wit two empty and two discarded', function () {
        require(["IncommingTreeCueManager"], function (IncommingTreeCueManager) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 5,
                discarded = [11, 12, undefined],
                incommingTreeCueManager = new IncommingTreeCueManager(incommingList),
                ans = incommingTreeCueManager.getToLoadAtBackgroundTrees(discarded, emptyTrees);

            var isequal = _.all(ans, function (v) {
                return _.include([undefined, 11, undefined], v);
            });
            equal(isequal, true, "equals");
            equal(ans.length, 3, "equals");
            QUnit.start();
        });
    });


    asyncTest('Test with zero empty and three discarded33', function () {
        require(["IncommingTreeCueManager"], function (IncommingTreeCueManager) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 0,
                discarded = [11, 12, undefined, 13],
                incommingTreeCueManager = new IncommingTreeCueManager(incommingList),
                ans = incommingTreeCueManager.getToLoadAtBackgroundTrees(discarded, emptyTrees);


            console.log(ans);
            var isequal = _.all(ans, function (v) {
                return _.include([12, 11, 13], v);
            });
            equal(isequal, true, "equals");
            equal(ans.length, 3, "equals");
            QUnit.start();
        });
    });

    asyncTest('Test with one empty one discarded and one from the list', function () {
        require(["IncommingTreeCueManager"], function (IncommingTreeCueManager) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 1,
                discarded = [11, undefined],
                incommingTreeCueManager = new IncommingTreeCueManager(incommingList),
                ans = incommingTreeCueManager.getToLoadAtBackgroundTrees(discarded, emptyTrees);
            console.log(ans);
            var isequal = _.all(ans, function (v) {
                return _.include([1, 11, undefined], v);
            });
            equal(isequal, true, "equals");
            equal(ans.length, 3, "equals");
            QUnit.start();
        });
    });
});
