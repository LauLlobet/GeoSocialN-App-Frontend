define([], function () {
    'use strict';
    module('Stack of Scenes test');

    asyncTest('Test full grid and non discarded', function () {
        require(["../../js/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 0,
                discarded = [undefined],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, emptyTrees);
            deepEqual(ans, [1, 2], 'size');
            QUnit.start();
        });
    });

    asyncTest('Test full grid and 1 discarded ', function () {
        require(["../../js/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 0,
                discarded = [11],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, emptyTrees);
            deepEqual(ans, [11, 1], 'size');
            QUnit.start();
        });
    });

    asyncTest('Test with empty grid, 5 free trees', function () {
        require(["../../js/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 6,
                discarded = [undefined],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, emptyTrees);
            deepEqual(ans,[undefined, undefined], "equals");
            QUnit.start();
        });
    });

    asyncTest('Test all empty', function () {
        require(["../../js/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [],
                emptyTrees = 0,
                discarded = [undefined],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans = incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, emptyTrees);
            deepEqual(ans, [], 'size');
            QUnit.start();
        });
    });

    asyncTest('Test with equal', function () {
        require(["../../js/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 5,
                expectedProportion = 3 / 4,
                margin = 0.1,
                discarded = [],
                listOfAns = [],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans = [],
                flatListOfAns,
                i,
                counted,
                attempts = 1000;
            for (i = 0; i < attempts; i += 1) {
                incommingTreesEmptyOnesAndDiscardedCueMixer.incommingList = [1, 2, 3, 4, 5];
                listOfAns.push(incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, emptyTrees));
            }
            flatListOfAns = _.flatten(listOfAns);
            counted = _.groupBy(flatListOfAns, function (num) {
                return num === undefined ? 'undef' : 'def';
            });
            if (typeof counted.undef == 'undefined') {
                counted.undef = [];
            }
            var proportion = counted.undef.length / (attempts * 2);
            console.log("expected: " + expectedProportion + " real: " + proportion);
            equal((expectedProportion - margin) < proportion && proportion < (expectedProportion + margin), true);
            QUnit.start();
        });
    });


    asyncTest('Test with equal', function () {
        require(["../../js/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 4,
                expectedProportion = 1 / 2,
                margin = 0.1,
                discarded = [],
                listOfAns = [],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans = [],
                flatListOfAns,
                i,
                counted,
                attempts = 1000;
            for (i = 0; i < attempts; i += 1) {
                incommingTreesEmptyOnesAndDiscardedCueMixer.incommingList = [1, 2, 3, 4, 5];
                listOfAns.push(incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, emptyTrees));
            }
            flatListOfAns = _.flatten(listOfAns);
            counted = _.groupBy(flatListOfAns, function (num) {
                return num === undefined ? 'undef' : 'def';
            });
            if (typeof counted.undef == 'undefined') {
                counted.undef = [];
            }
            var proportion = counted.undef.length / (attempts * 2);
            console.log("expected: " + expectedProportion + " real: " + proportion);
            equal((expectedProportion - margin) < proportion && proportion < (expectedProportion + margin), true);
            QUnit.start();
        });
    });

    asyncTest('Test with equal', function () {
        require(["../../js/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 3,
                expectedProportion = 1 / 8,
                margin = 0.1,
                discarded = [],
                listOfAns = [],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans = [],
                flatListOfAns,
                i,
                counted,
                attempts = 1000;
            for (i = 0; i < attempts; i += 1) {
                incommingTreesEmptyOnesAndDiscardedCueMixer.incommingList = [1, 2, 3, 4, 5];
                listOfAns.push(incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, emptyTrees));
            }
            flatListOfAns = _.flatten(listOfAns);
            counted = _.groupBy(flatListOfAns, function (num) {
                return num === undefined ? 'undef' : 'def';
            });
            if (typeof counted.undef == 'undefined') {
                counted.undef = [];
            }
            var proportion = counted.undef.length / (attempts * 2);
            console.log("expected: " + expectedProportion + " real: " + proportion);
            equal((expectedProportion - margin) < proportion && proportion < (expectedProportion + margin), true);
            QUnit.start();
        });
    });


    asyncTest('Test with equal', function () {
        require(["../../js/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 2,
                expectedProportion = 1 / 10,
                margin = 0.1,
                discarded = [],
                listOfAns = [],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans = [],
                flatListOfAns,
                i,
                counted,
                attempts = 1000;
            for (i = 0; i < attempts; i += 1) {
                incommingTreesEmptyOnesAndDiscardedCueMixer.incommingList = [1, 2, 3, 4, 5];
                listOfAns.push(incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, emptyTrees));
            }
            flatListOfAns = _.flatten(listOfAns);
            counted = _.groupBy(flatListOfAns, function (num) {
                return num === undefined ? 'undef' : 'def';
            });
            if (typeof counted.undef == 'undefined') {
                counted.undef = [];
            }
            var proportion = counted.undef.length / (attempts * 2);
            console.log("expected: " + expectedProportion + " real: " + proportion);
            equal((expectedProportion - margin) < proportion && proportion < (expectedProportion + margin), true);
            QUnit.start();
        });
    });

    asyncTest('Test with equal', function () {
        require(["../../js/IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (IncommingTreesEmptyOnesAndDiscardedCueMixer) {
            var incommingList = [1, 2, 3, 4, 5],
                emptyTrees = 1,
                expectedProportion = 1 / 40,
                margin = 0.05,
                discarded = [],
                listOfAns = [],
                incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList),
                ans = [],
                flatListOfAns,
                i,
                counted,
                attempts = 10000;
            for (i = 0; i < attempts; i += 1) {
                incommingTreesEmptyOnesAndDiscardedCueMixer.incommingList = [1, 2, 3, 4, 5];
                listOfAns.push(incommingTreesEmptyOnesAndDiscardedCueMixer.getToLoadAtBackgroundTrees(discarded, emptyTrees));
            }
            flatListOfAns = _.flatten(listOfAns);
            counted = _.groupBy(flatListOfAns, function (num) {
                return num === undefined ? 'undef' : 'def';
            });
            if (typeof counted.undef == 'undefined') {
                counted.undef = [];
            }
            var proportion = counted.undef.length / (attempts * 2);
            console.log("expected: " + expectedProportion + " real: " + proportion);
            equal((expectedProportion - margin) < proportion && proportion < (expectedProportion + margin), true);
            QUnit.start();
        });
    });
});
