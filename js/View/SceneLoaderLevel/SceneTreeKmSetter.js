/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp", "../SpriteLevel/SpriteTreeKmCounterSetter"], function (underscore, rspv, SpriteTreeKmSetter) {
    "use strict";
    function SceneTreeKmSetter(sceneLoader, spriteTreeKmSetter) {
        this.sceneLoader = sceneLoader;
        this.spriteTreeKmSetter = spriteTreeKmSetter;
        this.lastDistance = 0;
    }
    SceneTreeKmSetter.prototype.setDistance = function setDistance(meters) {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c")
        if (tableentrytree === null) {
            return;
        }
        this.spriteTreeKmSetter.setDistance(tableentrytree.id, meters);
        this.lastDistance = meters;
        tableentrytree.tree.meters = meters;
    };
    SceneTreeKmSetter.prototype.getLastDistance = function () {
        return this.lastDistance;
    };
    return SceneTreeKmSetter;
});