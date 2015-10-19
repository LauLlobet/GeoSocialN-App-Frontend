/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['/OurTreeWeb/js/lib/underscore.js', '/OurTreeWeb/js/util/CoordinatesCalculator.js', './MapKmToDistanceUnits.js'], function (underscore,
                                                                                                                    CoordinatesCalculator,
                                                                                                                    MapKmToDistanceUnits) {
    "use strict";
    function IncommingTreesEmptyOnesAndDiscardedCueMixer(incommingList, mapOfTreesById, gpsMovmentTrigger) {
        this.incommingList = incommingList;
        this.mapOfTreesById = mapOfTreesById;
        this.gpsMovmentTrigger = gpsMovmentTrigger;
        this.coordinatesCalculator = new CoordinatesCalculator();
        this.mapKmToDistanceUnits = new MapKmToDistanceUnits();
        this.icommingTreesWithItsUnitList = [];
        this.exploredDistanceUnitsByWatchingEmptyTrees = 0;
        this.firstUseOfThisClass = true;
        this.lastKnownUserLocation = {};
        this.lastKnownUserLocation.latitude = this.gpsMovmentTrigger.lastMoveCoordinates.latitude;
        this.lastKnownUserLocation.longitude = this.gpsMovmentTrigger.lastMoveCoordinates.longitude;
    }
    IncommingTreesEmptyOnesAndDiscardedCueMixer.prototype.getToLoadAtBackgroundTrees = function getToLoadAtBackgroundTrees(discarded) {
        var toPushOne,
            toPushTwo;
        if (discarded.length > 0) {
            toPushOne = discarded.shift();
            toPushTwo = undefined;
            if (discarded.length > 0) {
                toPushTwo = discarded.shift();
            }
        } else {
            this.ifUserHasMovedResetExploredDistanceUnitsByWatchingEmptyTrees();
            this.icommingTreesWithItsUnitList = this.orderIncommingListFromFarToNearAndAddDistanceUnits(this.incommingList);
            toPushOne = this.icommingTreesWithItsUnitListToEmptyTreeOrNotInOrderToStackIt();
            toPushTwo = this.icommingTreesWithItsUnitListToEmptyTreeOrNotInOrderToStackIt();
        }
        if (Math.random() > 0.5) {
            return [toPushOne, toPushTwo];
        }
        return [toPushTwo, toPushOne];
    };
    IncommingTreesEmptyOnesAndDiscardedCueMixer.prototype.ifUserHasMovedResetExploredDistanceUnitsByWatchingEmptyTrees = function (){
        if (this.firstUseOfThisClass) {
            this.lastKnownUserLocation.latitude = this.gpsMovmentTrigger.lastMoveCoordinates.latitude;
            this.lastKnownUserLocation.longitude = this.gpsMovmentTrigger.lastMoveCoordinates.longitude;
            this.exploredDistanceUnitsByWatchingEmptyTrees = 0;
            this.firstUseOfThisClass = false;
            return;
        }
        var deltaPosition = this.coordinatesCalculator.distanceBetweenCoordinates(
                                                        this.lastKnownUserLocation,
                                                        this.gpsMovmentTrigger.lastMoveCoordinates);
        if (deltaPosition > 30) {
            this.exploredDistanceUnitsByWatchingEmptyTrees -= (this.mapKmToDistanceUnits.map(deltaPosition) - 1);
            if (this.exploredDistanceUnitsByWatchingEmptyTrees < 0) {
                this.exploredDistanceUnitsByWatchingEmptyTrees = 0;
            }
            this.lastKnownUserLocation.latitude = this.gpsMovmentTrigger.lastMoveCoordinates.latitude;
            this.lastKnownUserLocation.longitude = this.gpsMovmentTrigger.lastMoveCoordinates.longitude
        }
    }

    IncommingTreesEmptyOnesAndDiscardedCueMixer.prototype.orderIncommingListFromFarToNearAndAddDistanceUnits = function orderIncommingListFromFarToNearAndAddDistanceUnits(incommingList) {
        var treeIdAndItsDistance = this.calculateMetersOfEachTreeFromTheActualPosition(incommingList),
            that = this;
        treeIdAndItsDistance = _.map(treeIdAndItsDistance, function (value) {
            return { treeId: value.treeId,
                        distanceUnit: that.mapKmToDistanceUnits.map(value.distance),
                        distanceKm: value.distance};
        });
       return treeIdAndItsDistance;
    };

    IncommingTreesEmptyOnesAndDiscardedCueMixer.prototype.calculateMetersOfEachTreeFromTheActualPosition = function calculateMetersOfEachTreeFromTheActualPosition(incommingList) {
        var currentCooridinates = this.gpsMovmentTrigger.lastMoveCoordinates, //.longitude .latitude
            ans = [],
            i,
            itree,
            tmp = {};
        for (i = 0; i < incommingList.length; i += 1) {
            itree = this.mapOfTreesById[incommingList[i]];
            tmp.coordinates = {longitude: itree.x, latitude: itree.y };
            tmp.distance = Math.round(this.coordinatesCalculator.distanceBetweenCoordinates(
                tmp.coordinates,
                currentCooridinates ));
            ans.push({treeId: itree.id, distance: tmp.distance});
        }
        ans.sort(function (a, b) {
            return a.distance - b.distance;
        });
        return ans;
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