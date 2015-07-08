/*global define, require, module,navigator, Phaser, Group, console, underscore,setTimeout */
/*jslint todo: true */
define(["underscore","TreeRestClient"], function (underscore,TreeRestClient) {
    "use strict";
    function NearbyTreesFromServerToIncommingTreeList(incommingList, alreadyDisplayed, mapOfTreesById) {
        this.incommingList = incommingList;
        this.alreadyDisplayed = alreadyDisplayed;
        this.treeRestClient = new TreeRestClient();
    }
    NearbyTreesFromServerToIncommingTreeList.prototype.userHasMovedTo = function (coords) {
        var i = 0,
            that = this;
        return this.treeRestClient.get(coords.x, coords.y, []).then(function (ans) {
            that.incommingList.length = 0;
            if (ans.treeContent === null){
                throw "no trees in a get, got a null as ans" + coords.x + " " + coords.y;
            }
            for (i = 0; i < ans.treeContent.length; i += 1) {
                that.incommingList.push(ans.treeContent[i].id);
            }
            console.log(ans);
        });
    };
    return NearbyTreesFromServerToIncommingTreeList;
});