
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([ "../scenes/WriteButton"], function (writteButton) {
    'use strict';
    var time = 1000;
    return {
        title: "ForestSwipeLeft",
        trees: [
            {
                initialPosition: "3l",
                x: -695,
                y: -441,
                w: 196,
                h: 356,
                text: "%initial",
                type: "real",
                tween: {
                    x: -548,
                    y: -386,
                    w: 259,
                    t: time
                },
                finalPosition: "2l",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "3c",
                x: -41,
                y: -441,
                w: 198,
                h: 357,
                text: "%initial",
                type: "real",
                tween: {
                    x: 310,
                    y: -386,
                    w: 259,
                    t: time
                },
                finalPosition: "2r",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "2r",
                x: 310,
                y: -368,
                w: 260,
                h: 464,
                text: "%initial",
                type: "real",
                tween: {
                    x: 1406,
                    y: -326,
                    w: 497,
                    t: time
                },
                finalPosition: "delete",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "2l",
                x: -548,
                y: -386,
                w: 260,
                h: 464,
                text: "%initial",
                type: "real",
                tween: {
                    x: -237,
                    y: -324,
                    w: 497,
                    t: time
                },
                finalPosition: "1c",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "1c",
                x: -237,
                y: -324,
                w: 497,
                h: 893,
                text: "%initial",
                type: "real",
                tween: {
                    x: 466,
                    y: -729,
                    w: 1411,
                    t: time
                },
                finalPosition: "delete",
                newTree : false,
                button: writteButton
            }
        ]
    };
});
