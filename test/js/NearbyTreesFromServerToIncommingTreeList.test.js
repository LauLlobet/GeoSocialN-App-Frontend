define(["/VisitTreeNumber/js/Model/TreeRestClient.js"], function (TreeRestClient) {
    'use strict';
    module('Stack of Scenes test');
    var deleteAll = function( ) {
        var treeRestClient = new TreeRestClient();
        return treeRestClient.deleteAll();
    }
   asyncTest('Incomming list gets fulled with new trees', function () {
        require(["/VisitTreeNumber/js/Controll/NearbyTreesFromServerToIncommingTreeList.js"], function (NearbyTreesFromServerToIncommingTreeList) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                answerIdList = [],
                incommingList = [1,2,3],
                alreadyDisplayed = [],
                mapOfTreesById = {},
                nearbyTreesFromServerToIncommingTreeList = new NearbyTreesFromServerToIncommingTreeList(incommingList, alreadyDisplayed, mapOfTreesById),
                dontIncludeList = [],
                originalX = 10,
                i;
            tree.text = "first tree in town";
            tree.metersToHide = 3;

            tree.x = 11;
            tree.y = 35.11;
            deleteAll().then( function(){
                treeRestClient.put(tree).then(function (val) {
                    answerIdList.push(val.treeContent.id);
                    tree.x = 99;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    alreadyDisplayed.push(val.treeContent.id);
                    tree.x = 12;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent.id);
                    tree.x = 13;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent.id);
                    tree.x = 10;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.unshift(val.treeContent.id);
                    return nearbyTreesFromServerToIncommingTreeList.userHasMovedTo({x: 10, y: tree.y})
                }).then(function (val) {
                    deepEqual(incommingList, answerIdList, "list of ids");
                    QUnit.start();
                }).catch(function (error) {
                    equal(2, 0, "exception thrown");
                    QUnit.start();
                    console.log("Failed!", error);
                });
            });
        });
    });

    asyncTest('Map gets filled from incomming trees', function () {
        require(["/VisitTreeNumber/js/Controll/NearbyTreesFromServerToIncommingTreeList.js","/VisitTreeNumber/js/Model/TreeRestClient.js"], function (NearbyTreesFromServerToIncommingTreeList, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                answerIdList = [],
                incommingList = [1,2,3],
                alreadyDisplayed = [],
                mapOfTreesById = {},
                nearbyTreesFromServerToIncommingTreeList = new NearbyTreesFromServerToIncommingTreeList(incommingList, alreadyDisplayed, mapOfTreesById),
                dontIncludeList = [];
            tree.text = "1";
            tree.metersToHide = 3;
            tree.x = 11;
            tree.y = 35.11;
            deleteAll().then( function() {

                treeRestClient.put(tree).then(function (val) {
                    answerIdList.push(val.treeContent.id);
                    tree.text = "2";
                    tree.x = 12;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent.id);
                    tree.text = "3";
                    tree.x = 13;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent.id);
                    tree.text = "4";
                    tree.x = 14;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent.id);
                    tree.text = "5";
                    tree.x = 15;
                    tree.x = 5;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent.id);
                    return nearbyTreesFromServerToIncommingTreeList.userHasMovedTo({x: 10, y: tree.y})
                }).then(function (val) {
                    var i = 1;
                    answerIdList.forEach(function (val) {
                        equal(mapOfTreesById[val].text, "" + i);
                        i += 1;
                    })
                    QUnit.start();
                }).catch(function (error) {
                    equal(2, 0, "exception thrown");
                    QUnit.start();
                    console.log("Failed!", error);
                });
            });
        });
    });

});