/**
 * Created by quest on 23/06/15.
 */
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define(["TreeRestClient"], function (TreeRestClient) {
    'use strict';
    module('RestApi Test On Server');
    var deleteAll = function( ) {
        var treeRestClient = new TreeRestClient();
        treeRestClient.deleteAll();
    }

    asyncTest('test list builder', function () {
        require(["../lib/restful", "TreeRestClient"], function (restful, TreeRestClient) {
            deleteAll();
            var treeRestClient = new TreeRestClient(),
                dontIncludeList = [],
                ans;
            dontIncludeList.push(1);
            dontIncludeList.push(2);
            dontIncludeList.push(3);
            dontIncludeList.push(4);
            ans = treeRestClient.buildDontIncludeString(dontIncludeList);
            equal(ans, "[1,2,3,4]");
            QUnit.start();
        });
    });

    asyncTest('Api Put a single tree', function () {
        require(["../lib/restful", "TreeRestClient"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient();
            deleteAll();
            tree.text = "first tree in town";
            tree.metersToHide = 3;
            tree.x = 35;
            tree.y = 35.333;

            treeRestClient.put(tree).then(
                function (ansObj) {
                    equal(ansObj.treeContent.x, 35, "x");
                    notEqual(ansObj.treeContent.ip, "");
                    console.log("promised is ok");
                    QUnit.start();
                },
                function (ansObj) {
                    QUnit.fail();
                }
            );
        });
    });


    asyncTest('Api Put a tree', function () {
        require(["../lib/restful", "TreeRestClient"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient();
            deleteAll();
            tree.text = "first tree in town";
            tree.metersToHide = 3;
            tree.x = 15.27;
            tree.y = 35.1;

            treeRestClient.put(tree).then(function (val) {
                console.log("emptyTrees:" + val.emptyTrees);
                return treeRestClient.put(tree);
            }).then(function (val) {
                console.log("emptyTrees:" + val.emptyTrees);
                return treeRestClient.put(tree);
            }).then(function (val) {
                console.log("emptyTrees:" + val.emptyTrees);
                return treeRestClient.put(tree);
            }).then(function (val) {
                console.log("emptyTrees:" + val.emptyTrees);
                equal(val.emptyTrees, 2);
                return treeRestClient.put(tree);
            }).then(function (val) {
                console.log("emptyTrees:" + val.emptyTrees);
                equal(val.emptyTrees, 1);
                return treeRestClient.put(tree);
            }).then(function (val) {
                console.log("emptyTrees:" + val.emptyTrees);
                equal(val.emptyTrees, 0);
                QUnit.start();
            }).catch(function (error) {
                QUnit.fail();
                QUnit.start();
                console.log("Failed!", error);
            });
        });
    });

    asyncTest('Api get a tree', function () {
        require(["../lib/restful", "TreeRestClient"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                answerIdList = [],
                dontIncludeList = [];
            tree.text = "first tree in town";
            tree.metersToHide = 3;
            tree.x = 15.21;
            tree.y = 35.11;
            deleteAll();

            treeRestClient.put(tree).then(function (val) {
                answerIdList.push(val.treeContent);
                return treeRestClient.put(tree);
            }).then(function (val) {
                dontIncludeList.push(val.treeContent.id);
                return treeRestClient.put(tree);
            }).then(function (val) {
                dontIncludeList.push(val.treeContent.id);
                return treeRestClient.put(tree);
            }).then(function (val) {
                answerIdList.push(val.treeContent);
                return treeRestClient.put(tree);
            }).then(function (val) {
                answerIdList.push(val.treeContent);
                return treeRestClient.get(tree.x, tree.y, dontIncludeList);
            }).then(function (val) {
                var expectedAns = [],
                    answerAns = [];
                val.treeContent.forEach(function (val) {
                    answerAns.push(val.id);
                });
                answerIdList.forEach(function (val) {
                    expectedAns.push(val.id);
                });
                deepEqual(answerAns, expectedAns, "list of ids");
                QUnit.start();
            }).catch(function (error) {
                equal(2, 0,"exception thrown");
                QUnit.start();
                console.log("Failed!", error);
            });
           // equal(2, 0);
           // QUnit.start();
        });
    });



});