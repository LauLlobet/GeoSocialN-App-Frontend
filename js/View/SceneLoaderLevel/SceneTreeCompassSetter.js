/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp"], function (underscore, rspv) {
    "use strict";
    function SceneTreeCompassSetter(sceneLoader, spriteCompassSetter) {
        this.sceneLoader = sceneLoader;
        this.spriteCompassSetter = spriteCompassSetter;
    }
    SceneTreeCompassSetter.prototype.setAngle = function setAngle(angle) {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c");
        if (tableentrytree === null) {
            return;
        }
        this.spriteCompassSetter.setAngle(tableentrytree.id, angle);
    };
    return SceneTreeCompassSetter;
});

