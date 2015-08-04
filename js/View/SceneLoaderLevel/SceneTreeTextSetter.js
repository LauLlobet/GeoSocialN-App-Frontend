/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp"], function (underscore, rspv) {
    "use strict";
    function SceneTreeTextSetter(sceneLoader) {
        this.sceneLoader = sceneLoader;
        this.spriteManagerPhaserApiInterface = sceneLoader.spriteManagerPhaserApiInterface;
    }

    SceneTreeTextSetter.prototype.setIsTyping = function setIsTyping(isTyping) {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c");
        this.spriteManagerPhaserApiInterface.setIsTyping(isTyping, tableentrytree.id);
    };

    SceneTreeTextSetter.prototype.addChar = function addChar(character) {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c"),
            text = this.spriteManagerPhaserApiInterface.addChar(tableentrytree.id, character);
        tableentrytree.tree.text = text;
    };

    SceneTreeTextSetter.prototype.getEditedTreeText = function getEditedTreeText() {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c");
        return tableentrytree.tree.text;
    };

    SceneTreeTextSetter.prototype.removeChar = function removeChar() {
        var tableentrytree = this.sceneLoader.getTreeWithFinalPosition("1c"),
            text = this.spriteManagerPhaserApiInterface.removeChar(tableentrytree.id);
        tableentrytree.tree.text = text;
    };

    return SceneTreeTextSetter;
});