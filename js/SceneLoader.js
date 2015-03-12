/*global define, require, module, Phaser*/
/*jslint todo: true */
define([], function () {
    "use strict";
    function SceneLoader(spriteManagerPhaserApiInterface) //noinspection JSLint
    {
            this.idCounter = 0;
            this.spriteManagerPhaserApiInterface = spriteManagerPhaserApiInterface;
            this.sceneObjectsTable = [];
    }
    SceneLoader.prototype.bindTreeAndTweenToTable = function bindTreeAndTweenToTable(tree) {
        this.idCounter += 1;
        var tableentry = {
            tree: tree,
            finalPosition: finalPosition,
            id: idCounter
        }
        this.sceneObjectsTable.push(tableentry);
        return idCounter;
    };
    return SceneLoader;
});