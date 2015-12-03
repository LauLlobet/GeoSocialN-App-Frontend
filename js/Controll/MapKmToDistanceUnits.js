/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    "use strict";
    function MapKmToDistanceUnits() {
    }
    MapKmToDistanceUnits.prototype.map =  function (metres) {
        if (metres < 30) {
            return 0;
        }
        if (metres < 50) {
            return 1;
        }
        if (metres < 100) {
            return 3;
        }
        if (metres < 200) {
            return 4;
        }
        if (metres < 400) {
            return 10;
        }
        if (metres < 5000) {
            return Math.round(metres / 1000) * 2 + 10;
        }
        if (metres < 10000) {
            return Math.round(Math.round(metres / 1000) * 0.5) + 20;
        }
        return Math.round(metres / 10000) + 25;
    };
    return MapKmToDistanceUnits;
});
