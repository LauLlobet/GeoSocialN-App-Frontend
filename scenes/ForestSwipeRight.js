
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([ "../scenes/WriteButton"], function (writteButton) {
    'use strict';
    var time = 1000;
    return {
        title: "ForestSwipeLeft",
        trees: [
            {
                initialPosition: "3r",
                x: 625,
                y: -397,
                w: 174,
                h: 357,
                text: "%initial",
                type: "real",
                tween: {
                    x: 323,
                    y: -329,
                    w: 227,
                    t: time
                },
                finalPosition: "2r",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "3c",
                x: -33,
                y: -397,
                w: 174,
                h: 357,
                text: "%initial",
                type: "real",
                tween: {
                    x: -535,
                    y: -329,
                    w: 227,
                    t: time
                },
                finalPosition: "2l",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "2r",
                x: 324,
                y: -329,
                w: 227,
                h: 464,
                text: "%initial",
                type: "real",
                tween: {
                    x: -215,
                    y: -216,
                    w: 436,
                    t: time
                },
                finalPosition: "1c",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "2l",
                x: -535,
                y: -329,
                w: 227,
                h: 464,
                text: "%initial",
                type: "real",
                tween: {
                    x: -1858,
                    y: -221,
                    w: 436,
                    t: time
                },
                finalPosition: "delete",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "1c",
                x: -216,
                y: -216,
                w: 436,
                h: 893,
                text: "%initial",
                type: "real",
                tween: {
                    x: -1812,
                    y: -443,
                    w: 1241,
                    t: time
                },
                finalPosition: "delete",
                newTree : false,
                button: writteButton
            }
        ]
    };
});
