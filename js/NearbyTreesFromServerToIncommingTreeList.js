/*global define, require, module,navigator, Phaser, Group, console, underscore,setTimeout */
/*jslint todo: true */
define(["underscore", "TreeRestClient"], function (underscore, TreeRestClient) {
    "use strict";
    function NearbyTreesFromServerToIncommingTreeList(incommingList, alreadyDisplayed, mapOfTreesById, fillerOfIncommingListIfItGetsEmpty) {
        this.incommingList = incommingList;
        this.alreadyDisplayed = alreadyDisplayed;
        this.treeRestClient = new TreeRestClient();
        this.mapOfTreesById = mapOfTreesById;
        this.fillerOfIncommingListIfItGetsEmpty = fillerOfIncommingListIfItGetsEmpty;;

    }
    NearbyTreesFromServerToIncommingTreeList.prototype.userHasMovedTo = function (coords) {
        var i = 0,
            that = this;
        if (coords === undefined) {
            return;
        }
        return this.treeRestClient.get(coords.x, coords.y, this.alreadyDisplayed).then(function (ans) {
            that.incommingList.length = 0;
            if (ans.treeContent === null) {
                throw "no trees in a get, got a null as ans" + coords.x + " " + coords.y;
            }
            if (ans.treeContent.length === 0 ) {
                that.fillerOfIncommingListIfItGetsEmpty.treesFromServerAreOver();
            }
            for (i = 0; i < ans.treeContent.length; i += 1) {
                that.incommingList.push(ans.treeContent[i].id);
                that.mapOfTreesById[ans.treeContent[i].id] = ans.treeContent[i];
            }
            that.incommingList.emptyTrees = ans.emptyTrees;
            console.log("emptyTrees:" + that.incommingList.emptyTrees);
        }).catch(function (err) {
            console.log("no connection " + err);
        });
    };
    return NearbyTreesFromServerToIncommingTreeList;
});