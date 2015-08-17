define([], function () {
    'use strict';
    module('CoordinatesCalculator.test');

    asyncTest('Calculate angles ', function () {
        require(["../js/util/CoordinatesCalculator"], function (CoordinatesCalculator) {
            var coordCalc = new CoordinatesCalculator(),
                coorNorth = { longitude : 3, latitude : 43.001},
                coorSouth = { longitude : 3, latitude : 41},
                coorEast = { longitude : 4, latitude : 42},
                coorWest = { longitude : 2, latitude : 42},
                coorNE = { longitude : 4, latitude : 43},
                coorNW = { longitude : 2, latitude : 43},
                coorSE = { longitude : 4, latitude : 41},
                coorSW = { longitude : 2, latitude : 42},
                coorCenter = { longitude : 3, latitude : 42},
                north = coordCalc.angleWithBetweenCoords(coorCenter, coorNorth),
                south = coordCalc.angleWithBetweenCoords(coorCenter, coorSouth),
                east = coordCalc.angleWithBetweenCoords(coorCenter, coorEast),
                west = coordCalc.angleWithBetweenCoords(coorCenter, coorWest);
                /*ne = coordCalc.angleWithBetweenCoords(coorCenter, coorNE),
                nw = coordCalc.angleWithBetweenCoords(coorCenter, coorNW),
                se = coordCalc.angleWithBetweenCoords(coorCenter, coorSE),
                sw = coordCalc.angleWithBetweenCoords(coorCenter, coorSW);*/

            equal(north, 0, 'north');
            equal(south, - 360 + 180, 'south');
            equal(east, - 360 + 90, 'east');
            equal(west, -360 + 270, 'west');
            /*equal(ne, -360 + 45, 'ne');
            equal(nw, -360 + -45, 'nw');
            equal(se, -360 + 135, 'se');
            equal(sw, -360 + -135, 'swt');*/

            QUnit.start();
        });
    });
});