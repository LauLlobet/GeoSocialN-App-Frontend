
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([ ], function () {
    'use strict';
    var h = 1280 / 2,
        w = 720 / 2,
        yinit =  260,
        keySize = 30,
        margin = 5,
        distanceBetweenKeys = 5,
        distanceBetweenLines = 5;
    return {
        yinit: yinit,
        width: 10.5 * (keySize + distanceBetweenKeys),
        height: 4 * (keySize + distanceBetweenLines),
        keySize: keySize,
        margin: margin,
        distanceBetweenKeys: keySize + distanceBetweenKeys,
        distanceBetweenLines: keySize + 5,
        fontSize: 20,
        keysOccupiedBySpace: 4,
        keysOccupiedByEnter: 3,
        popupDistance: keySize + 30,
        keys: [
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
            ["z", "x", "c", "v", "b", "n", "m"]
        ]
    };
});