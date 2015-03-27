
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([ ], function () {
    'use strict';
    var h = 1280 / 2,
        w = 720 / 2,
        xinit = -450,
        yinit =  260;
    return {
        xinit: xinit,
        yinit: yinit,
        width: -xinit + w,
        height: h - yinit,
        keys: [
            ["q", "w", "e", "r"],
            ["a", "s", "d", "f"],
            ["z", "x", "c", "v"],
        ]
    };
});