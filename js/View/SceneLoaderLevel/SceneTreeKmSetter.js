/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp", "../SpriteLevel/SpriteTreeKmCounterSetter"], function (underscore, rspv, SpriteTreeKmSetter) {
    "use strict";
    function SceneTreeKmSetter(sceneLoader, spriteTreeKmSetter) {
        this.sceneLoader = sceneLoader;
        this.spriteTreeKmSetter = spriteTreeKmSetter;
    }
    SceneTreeKmSetter.prototype.setDistance = function setDistance(meters) {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c")
        if (tableentrytree === null) {
            return;
        }
        this.spriteTreeKmSetter.setDistance(tableentrytree.id, meters);
        tableentrytree.tree.meters = meters;
    };
    return SceneTreeKmSetter;
});