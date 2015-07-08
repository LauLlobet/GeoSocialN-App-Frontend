define(["TreeRestClient"], function (TreeRestClient) {
    'use strict';
    module('Stack of Scenes test');
    var deleteAll = function( ) {
        var treeRestClient = new TreeRestClient();
        treeRestClient.deleteAll();
    }

    asyncTest('Test full grid and non discarded', function () {
        require(["NearbyTreesFromServerToIncommingTreeList","TreeRestClient"], function (NearbyTreesFromServerToIncommingTreeList, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                answerIdList = [],
                incommingList = [1,2,3],
                alreadyDisplayed = [],
                mapOfTreesById = {},
                nearbyTreesFromServerToIncommingTreeList = new NearbyTreesFromServerToIncommingTreeList(incommingList, alreadyDisplayed, mapOfTreesById),
                dontIncludeList = [];
            tree.text = "first tree in town";
            tree.metersToHide = 3;
            tree.x = 15.21;
            tree.y = 35.11;
            deleteAll();

            treeRestClient.put(tree).then(function (val) {
                answerIdList.push(val.treeContent.id);
                return treeRestClient.put(tree);
            }).then(function (val) {
                answerIdList.push(val.treeContent.id);
                return treeRestClient.put(tree);
            }).then(function (val) {
                answerIdList.push(val.treeContent.id);
                return treeRestClient.put(tree);
            }).then(function (val) {
                answerIdList.push(val.treeContent.id);
                tree.x = 5;
                return treeRestClient.put(tree);
            }).then(function (val) {
                answerIdList.unshift(val.treeContent.id);
                return nearbyTreesFromServerToIncommingTreeList.userHasMovedTo({x: tree.x, y: tree.y})
            }).then(function (val) {
                deepEqual(answerIdList, incommingList, "list of ids");
                QUnit.start();
            }).catch(function (error) {
                equal(2, 0,"exception thrown");
                QUnit.start();
                console.log("Failed!", error);
            });
        });
    });
});