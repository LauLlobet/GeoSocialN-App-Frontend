
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
        mayusqKeys: [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
            ["Z", "X", "C", "V", "B", "N", "M"]
        ],
        //",!?ABCDEFGHIJKLMNOPQRSTUVWXYZ./\\()_-[]{}:|'`=\"+^Ñ#0123456789",
        specialKeys: [
            [",", "!", "?", ".", "/", "\\", "(", ")", "_", "-"],
            ["[", "]", "{", "}", ":", "|", "'", "`", "=", "\""],
            ["+", "^", "#", "0", "1", "2", "3"]
        ],
        numberKeys: [
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            [",", ".", "?", "!", ":", "|", "'", "`", "=", "\""],
            ["+", "^", "*", "$", "#", "#", "#"]
        ],
        keys: [
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
            ["z", "x", "c", "v", "b", "n", "m"]
        ]
    };
});