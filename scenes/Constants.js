
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([], function () {
    'use strict';
    return {
        compass: {
            x: 79,
            y: 268
        },
        rake: {
            originalScale : 0.5,
            originalX : 90,
            offsetOfBurryLine : 40,
            scaleSizeWhenStillYoyo: 0.6,
            compassX : 9,
            compassY : 184,
            distanceFromTheCenter : 1.9,
            scaleNearCompass : 0.4,
            timing: {
                scaleTweenWhenStillMilliseconds : 100,
                rakeTweenToCompassMs : 400
            }
        }
    };
});
