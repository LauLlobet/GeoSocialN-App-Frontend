/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../lib/underscore.js'], function (underscore) {
    "use strict";
function MapKmToDistanceUnits() {
    }

    // Pl catalunya - pl catalunya      0  m - 30m -> 0 DU
    // Pl catalunya - pl catalunya      30 m - 50m -> 1 DU
    // Pl catalunya - ramblas           50 m - 100m -> 2 DU
    // Barcelona pg de gracia - ramblas 100m - 200m -> 3 Distance units

    // Pl catalunya - drassanes         200  - 1km  -> 6 Distance units
    //                                  1km  - 2km  -> 7 Distance units
    //                                  2km  - 3km  -> 8 Distance units
    //                                  3km  - 4km  -> 9
    //                                  4km  - 5km  -> 10
    //                                  6km  - 10km -> 11

    //                                  10   - 20   -> 14
    //                                  20   - 30   -> 15
    //                                  30   - 40   -> 16
    //                                  40   - 50   -> 17
    //                                  50   - 60   -> 18

    MapKmToDistanceUnits.prototype.map =  function (km) {
        if (km < 30) {
            return 0;
        }
        if (km < 50) {
            return 1;
        }
        if (km < 100) {
            return 2;
        }
        if (km < 200) {
            return 3;
        }
        if (km < 5000) {
            return Math.round(km / 1000) + 5;
        }
        if (km < 10000) {
            return 11;
        }
        return Math.round(km / 10000) + 13;
    };
    return MapKmToDistanceUnits;
});
