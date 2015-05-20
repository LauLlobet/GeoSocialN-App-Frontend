
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([ ], function () {
    'use strict';
    var h = 1280 / 2,
        w = 720 / 2,
        xinit = -450,
        yinit =  300,
        keySize = 30;
    return {
        xinit: xinit,
        yinit: yinit,
        width: -xinit + w,
        height: h - yinit,
        keySize: keySize,
        distanceBetweenKeys: keySize + 5,
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