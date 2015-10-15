/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../lib/underscore'], function (underscore) {
    "use strict";
    function IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList, mapOfTreesById) {
        this.incommingList = incommingList;
        this.mapOfTreesById = mapOfTreesById;
        this.icommingTreesWithItsUnitList = [];
        this.exploredDistanceUnitsByWatchingEmptyTrees = 0;
    }
    IncommingTreesEmptyOnesAndDiscardedCueMixer.prototype.getToLoadAtBackgroundTrees = function getToLoadAtBackgroundTrees(discarded) {
        var toPushOne,
            toPushTwo;
        this.icommingTreesWithItsUnitList = this.orderIncommingListFromFarToNearAndAddDistanceUnits(this.incommingList);
        toPushOne = this.icommingTreesWithItsUnitListToEmptyTreeOrNotInOrderToStackIt();
        toPushTwo = this.icommingTreesWithItsUnitListToEmptyTreeOrNotInOrderToStackIt();
        if (Math.random() > 0.5) {
            return [toPushOne, toPushTwo];
        }
        return [toPushTwo, toPushOne];
    };
    IncommingTreesEmptyOnesAndDiscardedCueMixer.prototype.orderIncommingListFromFarToNearAndAddDistanceUnits = function orderIncommingListFromFarToNearAndAddDistanceUnits(incommingList) {
        return this.icommingTreesWithItsUnitList;
    };
    IncommingTreesEmptyOnesAndDiscardedCueMixer.prototype.icommingTreesWithItsUnitListToEmptyTreeOrNotInOrderToStackIt = function icommingTreesWithItsUnitListToEmptyTreeOrNotInOrderToStackIt() {
        var nearestTree = this.icommingTreesWithItsUnitList[0],
            distanceFromNearestTree;
        if (nearestTree === undefined) {
            return -1; // no more trees in list, returning the code of no more trees in the game
        }
        distanceFromNearestTree = nearestTree.distanceUnit;
        if (distanceFromNearestTree - this.exploredDistanceUnitsByWatchingEmptyTrees < 1) {
            this.deleteTreeFromIncommingList(nearestTree.treeId);
            this.icommingTreesWithItsUnitList.shift();
            return nearestTree.treeId;
        }
        this.exploredDistanceUnitsByWatchingEmptyTrees += 1;
        return undefined;
    };

    IncommingTreesEmptyOnesAndDiscardedCueMixer.prototype.deleteTreeFromIncommingList = function deleteTreeFromIncommingList(treeId) {
        var io = this.incommingList.indexOf(treeId);
        console.log( this.incommingList.splice(io, 1));
        console.log( this.incommingList);
    };
    return IncommingTreesEmptyOnesAndDiscardedCueMixer;
});