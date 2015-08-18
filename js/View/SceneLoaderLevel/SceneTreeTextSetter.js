/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp", "../SpriteLevel/SpriteTreeTextSetter"], function (underscore, rspv, SpriteTreeTextSetter) {
    "use strict";
    function SceneTreeTextSetter(sceneLoader, spriteTreeTextSetter) {
        this.sceneLoader = sceneLoader;
        this.spriteTreeTextSetter = spriteTreeTextSetter;
    }

    SceneTreeTextSetter.prototype.setIsTyping = function setIsTyping(isTyping) {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c");
        this.spriteTreeTextSetter.setIsTyping(isTyping, tableentrytree.id);
    };

    SceneTreeTextSetter.prototype.addChar = function addChar(character) {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c"),
            text = this.spriteTreeTextSetter.addChar(tableentrytree.id, character);
        tableentrytree.tree.text = text;
    };

    SceneTreeTextSetter.prototype.getEditedTreeText = function getEditedTreeText() {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c");
        return tableentrytree.tree.text; // text inside sprites should be equal to this one or modified for colour of tipography reasons
    };

    SceneTreeTextSetter.prototype.removeChar = function removeChar() {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c"),
            text = this.spriteTreeTextSetter.removeChar(tableentrytree.id);
        tableentrytree.tree.text = text;
    };

    SceneTreeTextSetter.prototype.unBury = function unBury(burylayerId) {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c");
        this.spriteTreeTextSetter.unBury(tableentrytree.id, burylayerId);
    };


    return SceneTreeTextSetter;
});