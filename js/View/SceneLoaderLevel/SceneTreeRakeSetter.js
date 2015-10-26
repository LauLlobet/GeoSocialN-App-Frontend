/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp"], function (underscore, rspv) {
    "use strict";
    function SceneTreeRakeSetter(sceneLoader, spriteRakeSetter) {
        this.sceneLoader = sceneLoader;
        this.spriteRakeSetter = spriteRakeSetter;
    }
    SceneTreeRakeSetter.prototype.setAngle = function setAngle(angle) {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c");
        if (tableentrytree === null) {
            return;
        }
        this.spriteRakeSetter.setAngle(tableentrytree.id, angle);
    };

    SceneTreeRakeSetter.prototype.disappeare = function disappeare() {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c");
        if (tableentrytree === null) {
            return;
        }
        this.spriteRakeSetter.disappeare(tableentrytree.id);
    };
    return SceneTreeRakeSetter;
});