/**
 * Created by quest on 23/06/15.
 */
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define(["/OurTreeWeb/js/Model/TreeRestClient.js"], function (TreeRestClient) {
    'use strict';
    module('RestApi Test On Server');
    var deleteAll = function( ) {
        var treeRestClient = new TreeRestClient();
        return treeRestClient.deleteAll();
    };

    asyncTest('test list builder', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            deleteAll().then( function (){
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
    });

    asyncTest('Api Put a single tree', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient();
            deleteAll().then( function (){
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
    });


    asyncTest('Api Put a tree', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient();
            deleteAll().then( function (){
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
    });


    asyncTest('Api get a tree', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                answerIdList = [],
                dontIncludeList = [],
                originalX = 15.21;
            tree.text = "first tree in town";
            tree.metersToHide = 3;
            tree.x = originalX;
            tree.y = 35.11;
            deleteAll().then( function () {

                treeRestClient.put(tree).then(function (val) {
                    answerIdList.push(val.treeContent);
                    tree.x = 15.22;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    dontIncludeList.push(val.treeContent.id);
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    dontIncludeList.push(val.treeContent.id);
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent);
                    tree.x = 15.23;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent);
                    return treeRestClient.get(originalX, tree.y, dontIncludeList);
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
                    deleteAll();
                }).catch(function (error) {
                    equal(2, 0, "exception thrown");
                    QUnit.start();
                    console.log("Failed!", error);
                    deleteAll();
                });
            });
        });
    });




    asyncTest('Api get a tree by Id', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                answerIdList = [],
                dontIncludeList = [],
                originalX = 15.21,
                concreteTree;
            tree.text = "first tree in town";
            tree.metersToHide = 3;
            tree.x = originalX;
            tree.y = 35.11,

            deleteAll().then( function () {
                treeRestClient.put(tree).then(function (val) {
                    answerIdList.push(val.treeContent);
                    tree.x = 15.22;
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    dontIncludeList.push(val.treeContent.id);
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    dontIncludeList.push(val.treeContent.id);
                    tree.text = "target";
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent);
                    concreteTree = val.treeContent;
                    tree.x = 15.23;
                    tree.text = "not target";
                    return treeRestClient.put(tree);
                }).then(function (val) {
                    answerIdList.push(val.treeContent);
                    return treeRestClient.getSpecificTree(concreteTree.id);
                }).then(function (val) {
                    deepEqual(concreteTree, val.treeContent, "list of ids");
                    QUnit.start();
                    deleteAll();
                }).catch(function (error) {
                    equal(2, 0, "exception thrown");
                    QUnit.start();
                    console.log("Failed!", error);
                    deleteAll();
                });
            });
        });
    asyncTest('Api PUT A TREE AND VOTE IT -1', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                originalX = 15.21;
            tree.text = "first tree in town";
            tree.metersToHide = 5;
            tree.x = originalX;
            tree.y = 35.11;

            deleteAll().then( function () {
                treeRestClient.put(tree).then(function (val) {
                    val.treeContent.metersToHide -= 1;
                    return treeRestClient.put(val.treeContent);
                }).then(function (val) {
                    deepEqual(val.treeContent.metersToHide, 4, "meters to hide increased by 1");
                    QUnit.start();
                    deleteAll();
                }).catch(function (error) {
                    equal(2, 0, "exception thrown");
                    QUnit.start();
                    console.log("Failed!", error);
                    deleteAll();
                });
            });
        });
    });

    asyncTest('Api PUT A TREE AND VOTE IT +1', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                originalX = 15.21;
            tree.text = "first tree in town";
            tree.metersToHide = 5;
            tree.x = originalX;
            tree.y = 35.11;

            deleteAll().then( function () {
                treeRestClient.put(tree).then(function (val) {
                    val.treeContent.metersToHide += 1;
                    return treeRestClient.put(val.treeContent);
                }).then(function (val) {
                    deepEqual(val.treeContent.metersToHide, 6, "meters to hide increased by 1");
                    QUnit.start();
                    deleteAll();
                }).catch(function (error) {
                    equal(2, 0, "exception thrown");
                    QUnit.start();
                    console.log("Failed!", error);
                    deleteAll();
                });
            });
        });
    });

    asyncTest('Api PUT A TREE AND VOTE IT +0', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                originalX = 15.21;
            tree.text = "first tree in town";
            tree.metersToHide = 5;
            tree.x = originalX;
            tree.y = 35.11;

            deleteAll().then( function () {
                treeRestClient.put(tree).then(function (val) {
                    return treeRestClient.put(val.treeContent);
                }).then(function (val) {
                    deepEqual(val.treeContent.metersToHide, 5, "meters to hide increased by 1");
                    QUnit.start();
                    deleteAll();
                }).catch(function (error) {
                    equal(2, 0, "exception thrown");
                    QUnit.start();
                    console.log("Failed!", error);
                    deleteAll();
                });
            });
        });
    });

    asyncTest('Api PUT A TREE AND VOTE IT +2', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                originalX = 15.21;
            tree.text = "first tree in town";
            tree.metersToHide = 5;
            tree.x = originalX;
            tree.y = 35.11;

            deleteAll().then( function () {
                treeRestClient.put(tree).then(function (val) {
                    val.treeContent.metersToHide += 2;
                    return treeRestClient.put(val.treeContent);
                }).then(function (val) {
                    deepEqual(val.treeContent, null, "meters to hide increased by 1");
                    QUnit.start();
                    deleteAll();
                }).catch(function (error) {
                    equal(2, 0, "exception thrown");
                    QUnit.start();
                    console.log("Failed!", error);
                    deleteAll();
                });
            });
        });
    });


    asyncTest('Api PUT A TREE AND VOTE IT -2', function () {
        require(["/OurTreeWeb/js/lib/restful.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (restful, TreeRestClient) {
            var tree = {},
                treeRestClient = new TreeRestClient(),
                answerIdList = [],
                dontIncludeList = [],
                originalX = 15.21;
            tree.text = "first tree in town";
            tree.metersToHide = 5;
            tree.x = originalX;
            tree.y = 35.11;

            deleteAll().then( function () {
                treeRestClient.put(tree).then(function (val) {
                    answerIdList.push(val.treeContent);
                    val.treeContent.metersToHide -= 2;
                    return treeRestClient.put(val.treeContent);
                }).then(function (val) {
                    deepEqual(val.treeContent, null, "meters to hide increased by 1");
                    QUnit.start();
                    deleteAll();
                }).catch(function (error) {
                    equal(2, 0, "exception thrown");
                    QUnit.start();
                    console.log("Failed!", error);
                    deleteAll();
                });
            });
        });
    });

});
