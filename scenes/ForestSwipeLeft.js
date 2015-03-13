
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([], function () {
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
                text: "arbre del centre, benvingut siguis",
                type: "real",
                tween: {
                    x: 323,
                    y: -329,
                    w: 227,
                    t: time
                },
                finalPostion: "delete",
                newTree : false
            },
            {
                initialPosition: "3c",
                x: -33,
                y: -397,
                w: 174,
                h: 357,
                text: "arbre del centre, benvingut siguis",
                type: "real",
                tween: {
                    x: -535,
                    y: -329,
                    w: 227,
                    t: time
                },
                finalPostion: "delete",
                newTree : false
            },
            {
                initialPosition: "2r",
                x: 324,
                y: -329,
                w: 227,
                h: 464,
                text: "arbre del centre, benvingut siguis",
                type: "real",
                tween: {
                    x: -215,
                    y: -216,
                    w: 436,
                    t: time
                },
                finalPostion: "delete",
                newTree : false
            },
            {
                initialPosition: "2l",
                x: -535,
                y: -329,
                w: 227,
                h: 464,
                text: "arbre del centre, benvingut siguis",
                type: "real",
                tween: {
                    x: -1858,
                    y: -221,
                    w: 436,
                    t: time
                },
                finalPostion: "delete",
                newTree : false
            },
            {
                initialPosition: "1c",
                x: -216,
                y: -216,
                w: 436,
                h: 893,
                text: "arbre del centre, benvingut siguis",
                type: "real",
                tween: {
                    x: -1812,
                    y: -443,
                    w: 1241,
                    t: time
                },
                finalPostion: "delete",
                newTree : false
            }
        ]
    };
});

/*      tree = {
 x: 400 * Math.random(),
 y: 400 * Math.random(),
 w: 50,
 h: 50,
 type: "point",
 tween:
 x: -360,
 y: -640,
 w: 360,
 t: 15000
 }
 }*/

/* {
 x: 0,
 y: 0,
 w: 198,
 h: 406,
 text: "arbre del centre, benvingut siguis",
 type: "point",
 tween: {
 x: -823,
 y: -201,
 w: 564,
 t: 1000
 },
 initialPosition: "central",
 finalPostion: "delete",
 newTree : false
 }*/