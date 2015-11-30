
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([ ], function () {
    'use strict';
    var h = 1280 / 2,
        w = 480,
        yinit =  280,
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
        scale: 1.29,
        keysOccupiedBySpace: 4,
        keysOccupiedByEnter: 3,
        keysOccupiedByFeaturesKeys: 5,
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
            ["-", "_", "?", "!", ":", ",", "'", ".", "=", ";"],
            ["+", "&", "*", "$", "#", "@", "€"]
        ],
        keys: [
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
            ["z", "x", "c", "v", "b", "n", "m"]
        ],
        featuresKeyboard: {
            keyboardKeys: [
                ["Lock: ", "Bury: "],
                ["Tweet: ", "Link: "],
                ["Video: ", "Picture: "],
                [undefined, undefined]
            ],
            keyboardMap: [
                ["*passwd:", "*bury "],
                ["@", "#"],
                ["#vid:", "#pic:"],
                [undefined, undefined]
            ],
            keyboardIcons: [
                ["lockBg", "buryBg"],
                ["twitterBg", "linkBg"],
                ["heartBg", "catBg"],
                ["heartBg", undefined]
            ]
        },
        acsiiArtKeyboard: {
            keyboardKeys: [
                ["Heart: ", "Cat: "],
                ["Video: ", undefined],
                ["Lock: ", "Bury: "],
                ["Tweet: ", "Link: "]
            ],
            keyboardMap: [
                ["\t    __  __         /  V   \\        \\     /          \\   /            \\/         ",
                    "\t    /\\___/\\         \\ -.- /          `-.^.-'          /\"\\       "],
                ["*passwd:", "*bury "],
                ["@", "#"],
                ["*video", undefined]
            ],
            keyboardIcons: [
                ["lockBg", "buryBg"],
                ["twitterBg", "linkBg"],
                ["heartBg", "catBg"],
                ["heartBg", undefined]
            ]
        }
    };

    /*
     "                "
     "    __  __      "
     "   /  V   \     "
     "   \     /      "
     "    \   /       "
     "     \/         "
     */
    //"    __  __         /  V   \        \     /          \   /            \/         "
    /*

     "    /\___/\     "
     "    \ -.- /     "
     "    `-.^.-'     "
     "      /"\       "
     */
    //"    /\___/\         \ -.- /         `-.^.-'           /"\       "
});