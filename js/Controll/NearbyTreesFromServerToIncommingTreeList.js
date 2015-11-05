/*global define, require, module,navigator, Phaser, Group, console, underscore,setTimeout */
/*jslint todo: true */
define(["/OurTreeWeb/js/lib/underscore.js", "/OurTreeWeb/js/Model/TreeRestClient.js"], function (underscore, TreeRestClient) {
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
            that = this,
            newAlreadyDisplayed;
        if (coords === undefined) {
            return;
        }
        newAlreadyDisplayed = _.difference(this.alreadyDisplayed, this.incommingList); // this is to handle trees inside the scent that could be discarded -> re instrted in incomming list AND present on already displayed
        this.alreadyDisplayed.splice(0, this.alreadyDisplayed.length);
        newAlreadyDisplayed.forEach(function(newAlreadyDisplayed){
            that.alreadyDisplayed.push(newAlreadyDisplayed);
        });

        return this.treeRestClient.get(coords.longitude, coords.latitude, this.alreadyDisplayed).then(function (ans) {
            that.incommingList.length = 0;
            if (ans.treeContent === null) {
                throw "no trees in a get, got a null as ans" + coords.longitude + " " + coords.latitude;
            }
            if (ans.treeContent.length === 0) {
                that.fillerOfIncommingListIfItGetsEmpty.treesFromServerAreOver();
            }
            for (i = 0; i < ans.treeContent.length; i += 1) {
                that.incommingList.push(ans.treeContent[i].id);
                that.loadTreeToHash(ans.treeContent[i]);
            }
            that.incommingList.emptyTrees = ans.emptyTrees;
        }).catch(function (err) {
            alert("error");
            console.log("no connection " + err.stack);
        });
    };

    NearbyTreesFromServerToIncommingTreeList.prototype.loadSpecificTreeToHash = function (treeId) {
        var that = this;

        return this.treeRestClient.getSpecificTree(treeId).then( function (ans) {
            if (ans.treeContent === null) {
                ans.treeContent.text = "this tree is null";
            }
            that.mapOfTreesById[ans.treeContent.id] = ans.treeContent;
        }).catch(function (error) {
            alert("error");
            console.log(error.stack);
        });
    };


    NearbyTreesFromServerToIncommingTreeList.prototype.loadTreeToHash = function (tree) {
        if (tree.text === null){
            tree.text = "this tree is null";
        }
        this.mapOfTreesById[tree.id] = tree;
    }
    return NearbyTreesFromServerToIncommingTreeList;
});