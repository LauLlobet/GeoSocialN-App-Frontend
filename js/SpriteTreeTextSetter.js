/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['underscore', "../lib/rsvp"], function (_, rspv) {
    "use strict";
    function SpriteTreeTextSetter(sceneLoader) {
        this.sceneLoader = sceneLoader;
        this.updateToCurrentFrontTree();
    }

    SpriteTreeTextSetter.prototype.updateToCurrentFrontTree = function updateToCurrentFrontTree() {
        this.currentFrontTreeView = this.sceneLoader.getFrontTreeViewInterface();

    };

    return SpriteTreeTextSetter;
});