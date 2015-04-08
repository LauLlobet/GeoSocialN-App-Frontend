
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([ "../scenes/WriteButton"], function (writteButton) {
    'use strict';
    var time = 1000,
        widthFactor = 400 / 200;
    return {
        title: "ForestSwipeLeft",
        trees: [
            {
                initialPosition: "3r",
                x: 616,
                y: -439,
                w: 196 * widthFactor,
                h: 354,
                text: "%initial",
                type: "real",
                tween: {
                    x: 310,
                    y: -386,
                    w: 260 * widthFactor,
                    t: time
                },
                finalPosition: "2r",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "3c",
                x: -41,
                y: -441,
                w: 198 * widthFactor,
                h: 356,
                text: "%initial",
                type: "real",
                tween: {
                    x: -548,
                    y: -386,
                    w: 260 * widthFactor,
                    t: time
                },
                finalPosition: "2l",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "2r",
                x: 310,
                y: -386,
                w: 260 * widthFactor,
                h: 464,
                text: "%initial",
                type: "real",
                tween: {
                    x: -237,
                    y: -324,
                    w: 497 * widthFactor,
                    t: time
                },
                finalPosition: "1c",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "2l",
                x: -548,
                y: -386,
                w: 260 * widthFactor,
                h: 464,
                text: "%initial",
                type: "real",
                tween: {
                    x: -1878,
                    y: -329,
                    w: 497 * widthFactor,
                    t: time
                },
                finalPosition: "delete",
                newTree : false,
                button: writteButton
            },
            {
                initialPosition: "1c",
                x: -237,
                y: -324,
                w: 497 * widthFactor,
                h: 893,
                text: "%initial",
                type: "real",
                tween: {
                    x: -1871,
                    y: -729,
                    w: 1411 * widthFactor,
                    t: time
                },
                finalPosition: "delete",
                newTree : false,
                button: writteButton
            }
        ]
    };
});
