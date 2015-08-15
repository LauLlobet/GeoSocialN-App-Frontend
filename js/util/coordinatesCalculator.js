/*global define, require, module, Phaser, Group, console, underscore,setTimeout */
/*jslint todo: true */
define(["underscore"], function (underscore) {
    "use strict";
    function CoordinatesCalculator() {
    }

    CoordinatesCalculator.prototype.distanceBetweenCoordinates = function distanceBetweenCoordinates(coordinate1, coordinate2) {
        var lon1 = coordinate1.longitude,
            lat1 = coordinate1.latitude,
            lon2 = coordinate2.longitude,
            lat2 = coordinate2.latitude;
        var R = 6378.137; // Radius of earth in KM
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d * 1000; // meters
    };

    CoordinatesCalculator.prototype.angleWithBetweenCoords = function angleWithBetweenCoords(coordinate1, coordinate2){
        var lon1 = coordinate1.longitude,
            lat1 = coordinate1.latitude,
            lon2 = coordinate2.longitude,
            lat2 = coordinate2.latitude;

        var dy = lat2 - lat1;
        var dx = Math.cos(Math.PI / 180 * lat1) * (lon2 - lon1);
        var angle = Math.atan2(dy, dx);

        var degrees = angle * (180 / Math.PI);

        return degrees;
    }

    return CoordinatesCalculator;
});