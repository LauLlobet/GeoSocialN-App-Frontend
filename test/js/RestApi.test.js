/**
 * Created by quest on 23/06/15.
 */
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define([], function () {
    'use strict';
    module('RestApi Test On Server');
   /* asyncTest('Get empty list of trees', function () {
        require(["../lib/restful"], function (restful) {
            var api = restful('52.26.137.110')
                .header("Accept", "application/json") // set global header
                .prefixUrl('YOUR_PATH')
                .port(8080);

            var treeList = api.oneUrl('articles', 'http://52.26.137.110:8080/YOUR_PATH/trees?dontInclude=%5B%5D&x=12&y=10');
            treeList.get().then(function (response) {
                var articleEntity = response.body();
                var article = articleEntity.data();
                console.log(article.emptyTrees); // hello, world!
                equal(5, article.emptyTrees, 'empty trees');
                QUnit.start();
            });
        });
    });

    asyncTest('Raw Put a tree', function () {
        require(["../lib/restful"], function (restful) {
            var tree = {};
            tree.text = "first tree in town";
            tree.metersToHide = 3;
            tree.x = 42;
            tree.y = 33;
            var api = restful('52.26.137.110')
                .header("Accept", "application/json") // set global header
                .prefixUrl('YOUR_PATH')
                .port(8080);
            var treeApi = api.oneUrl('articles', 'http://52.26.137.110:8080/YOUR_PATH/trees');
            treeApi.put(tree).then(function (response) {
                var articleEntity = response.body();
                equal(articleEntity.treeContent.x, 42, "x");
                QUnit.start();
            });
        });
    });

    asyncTest('Api Put a tree', function () {
        require(["../lib/restful", "TreeRestClient"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient();
            tree.text = "first tree in town";
            tree.metersToHide = 3;
            tree.x = 12;
            tree.y = 35;

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

*/
    asyncTest('Api Put a tree', function () {
        require(["../lib/restful", "TreeRestClient"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient();
            tree.text = "first tree in town";
            tree.metersToHide = 3;
            tree.x = 15.2;
            tree.y = 35;

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
                return treeRestClient.put(tree);
            }).then(function (val) {
                console.log("emptyTrees:" + val.emptyTrees);
                return treeRestClient.put(tree);
            }).then(function (val) {
                console.log("emptyTrees:" + val.emptyTrees);
                return treeRestClient.put(tree);
            }).catch(function (error) {
                equal(2, 3);
                QUnit.start();
                console.log("Failed!", error);
            })
        });
    });
/*
    asyncTest('Api Get a trees', function () {
        require(["../lib/restful", "TreeRestClient"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient();
            tree.text = "1";
            tree.metersToHide = 3;
            tree.x = 42;
            tree.y = 35;
            var emptyCallback = function (ansObj) {}
            treeRestClient.put(tree,emptyCallback);
            tree.text = "2";
            treeRestClient.put(tree,emptyCallback);
            tree.text = "2";
            treeRestClient.put(tree,emptyCallback);
            tree.text = "2";
            treeRestClient.put(tree,emptyCallback);
        });
    });*/

});
