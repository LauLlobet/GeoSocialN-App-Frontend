
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
            distanceFromTheCenter : 2.1,
            scaleOscilationMaxDuringCompass : 0.45,
            scaleNearCompass : 0.4,
            timing: {
                scaleTweenWhenStillMilliseconds : 300,
                rakeTweenToCompassMs : 400,
                yoyoNearCompass : 100,
                timeToFollowAngle : 20
            }
        },
        specialTreesCodes: {
            es: 1,
            sp: 2,
            ca: 3,
            defaultLanguage: 1,
            fullForest: 99
        }
    };
});
