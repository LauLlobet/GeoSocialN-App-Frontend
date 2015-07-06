/*global define, require, module, Phaser*/
/*jslint todo: true */
define(['underscore', "../scenes/ForestSwipeRight", "../scenes/ForestSwipeLeft", 'StackOfScenes'], function (_, forestSwipeRight, forestSwipeLeft, StackOfScenes) {
    "use strict";
    function SceneLoader(spriteManagerPhaserApiInterface) //noinspection JSLint
    {
            this.idCounter = 0;
            this.spriteManagerPhaserApiInterface = spriteManagerPhaserApiInterface;
            this.sceneObjectsTable = [];
            this.stackOfScenes = new StackOfScenes(this);
            this.initial = true;
    }
    SceneLoader.prototype.stackLoadScene = function stackloadScene(sceneType, newTrees) {
        this.stackOfScenes.stackLoadScene(sceneType, newTrees);
    };
    SceneLoader.prototype.playAllStackedScenes = function playAllStackedScenes(){
        return this.stackOfScenes.playAllStackedScenes();
    };

    SceneLoader.prototype.loadScene = function loadScene(sceneType, newTrees, context, callback) {
        this.cleanToDelete();
        var scene = this.loadSceneFromScenes(sceneType),
            i = 0;
        _.each(scene.trees, function (entry) {
            if (entry.initialPosition.charAt(0) === '3' || (this.initial === true && entry.text === "%initial")) {
                if (newTrees[i] !== undefined) {
                    entry.text = newTrees[i].text;
                    if (typeof newTrees[i].id !== 'undefined') {
                        entry.treeid = newTrees[i].id; // this treeid is the one from backend
                    }
                    i += 1;
                } else if (newTrees.length < i) { // the array is less than 2 ( no empty trees nor full ones )
                    entry.text = "You've seen all the written trees in the whole world, and you are in a place which trees are full, move to find empty trees and post!";
                    entry.treeid = -1;
                } else if (newTrees[i] === undefined) {
                    entry.text = undefined;
                    entry.treeid = undefined;
                    i += 1;
                }
            }
        }, this);
        this.initial = false;
        _.each(scene.trees, function (entry) {
            if (entry.nocreate === true && this.findIndexOfOldTreeWithFinalPosition(entry.initialPosition) < 0) {
                return;
            }
            this.bindTreeAndTweenToTable(entry);
        }, this); // bind to table
        this.setAllToOld();
        this.spriteManagerPhaserApiInterface.tellAllActiveSpritesSoItCanUpdateIt(this.getAllActiveIds());
        return this.callCallbackAfterTween(context, callback, scene.lengthInTime);
    };

    SceneLoader.prototype.callCallbackAfterTween = function callCallbackAfterTween(context, callback, sceneLengthInTime){
        if (callback !== undefined) {
            setTimeout(function () {callback(context); }, sceneLengthInTime);
        }
    };
    SceneLoader.prototype.bindTreeAndTweenToTable = function bindTreeAndTweenToTable(tree) {
        var tableentry;
        tableentry = this.createTableEntry(tree);
        this.deleteIfExistSameFinalPostionEntryAndCopyHisTextAndType(tree.initialPosition, tableentry);
        this.sceneObjectsTable.push(tableentry);
        return this.idCounter;
    };

    SceneLoader.prototype.setAllToOld = function setAllToOld(){
        _.each(this.sceneObjectsTable, function (entry) {
            entry.isOld = true;
        }, this); // bind to table

    };

    SceneLoader.prototype.getTreeFromId = function getTreeFromId(id){
        var treesWithId = _.filter(this.sceneObjectsTable, function (entry) {
            return entry.id === id;
        });
        return treesWithId[0].tree;
    };
    SceneLoader.prototype.getAllActiveIds = function getAllActiveIds() {
        var array = [],
            i;
        for (i = 0; i < this.sceneObjectsTable.length; i++){
            array.push(this.sceneObjectsTable[i].id);
        }
        return array;
    };
    SceneLoader.prototype.createTableEntry = function createTableEntry(tree) {
        this.idCounter += 1;
        return {
            tree: tree,
            finalPosition: tree.finalPosition,
            initialPosition: tree.initialPosition,
            id: this.idCounter
        };
    };

    SceneLoader.prototype.deleteIfExistSameFinalPostionEntryAndCopyHisTextAndType = function deleteIfExistSameFinalPostionEntryAndCopyHisTextAndType(initialPosition, newTreetableentry) {
        var toSubstituteTreeEntry,
            toSubstituteIndex = this.findIndexOfOldTreeWithFinalPosition(initialPosition);
        toSubstituteTreeEntry = this.sceneObjectsTable[toSubstituteIndex];
        if (toSubstituteIndex.text === '1') {
            console.log('HOLA');
        }
        if (toSubstituteIndex >= 0) {
            this.sceneObjectsTable.splice(toSubstituteIndex, 1);
            this.copyValuesFromOldTreeToNewOne(toSubstituteTreeEntry, newTreetableentry);
        }

    };

    SceneLoader.prototype.copyValuesFromOldTreeToNewOne = function copyValuesFromOldTreeToNewOne(oldTree, newTree) {
        newTree.tree.text = oldTree.tree.text;
        newTree.tree.type = oldTree.tree.type;
        if (typeof oldTree.tree.treeid !== 'undefined') {
            newTree.tree.treeid = oldTree.tree.treeid;
        } else {
            newTree.tree.treeid = undefined;
        }
    };

    SceneLoader.prototype.findIndexOfOldTreeWithFinalPosition = function findIndexOfOldTreeWithFinalPosition(position) {
        var i;
        for (i = 0; i < this.sceneObjectsTable.length; i += 1) {
            if (this.sceneObjectsTable[i].finalPosition === position && this.sceneObjectsTable[i].isOld === true) {
                return i;
            }
        }
        return -1;
    };

    SceneLoader.prototype.findIndexOfTreeWithFinalPosition = function findIndexOfTreeWithFinalPosition(position) {
        var i;
        for (i = 0; i < this.sceneObjectsTable.length; i += 1) {
            if (this.sceneObjectsTable[i].finalPosition === position) {
                return i;
            }
        }
        return -1;
    };

    SceneLoader.prototype.getTreeWithFinalPosition = function getTreeWithFinalPosition(position) {
        var i = this.findIndexOfTreeWithFinalPosition(position);
        if (i >= 0) {
            return this.sceneObjectsTable[i];
        }
        return null;
    };

    SceneLoader.prototype.getTreeDiscardedWhenSwipeLeft = function getTreeDiscardedWhenSwipeLeft() {
        var tree = this.getTreeWithFinalPosition('2r');
        return tree.tree.treeid;
    }

    SceneLoader.prototype.getTreeDiscardedWhenSwipeRight = function getTreeDiscardedWhenSwipeRight() {
        return this.getTreeWithFinalPosition('2l').tree.treeid;
    }

    SceneLoader.prototype.getTreeAlreadyDisplayed = function getTreeAlreadyDisplayed() {
        return this.getTreeWithFinalPosition('1c').tree.treeid;
    }

    SceneLoader.prototype.cleanToDelete = function cleanToDelete(){
        this.sceneObjectsTable = _.filter(this.sceneObjectsTable, function (entry) {
            return entry.finalPosition !== 'delete';
        });
    };

    SceneLoader.prototype.loadSceneFromScenes = function loadSceneFromScenes(sceneType) {
        if (sceneType === 'forestSwipeRight') {
            return JSON.parse(JSON.stringify(forestSwipeRight));
        }
        return JSON.parse(JSON.stringify(forestSwipeLeft));
    };

    SceneLoader.prototype.setIsTyping = function setIsTyping(isTyping) {
        var tableentrytree = this.getTreeWithFinalPosition("1c");
        this.spriteManagerPhaserApiInterface.setIsTyping(isTyping, tableentrytree.id);
    };

    SceneLoader.prototype.addChar = function addChar(character) {
        var tableentrytree = this.getTreeWithFinalPosition("1c"),
            text = this.spriteManagerPhaserApiInterface.addChar(tableentrytree.id, character);
        tableentrytree.tree.text = text;
    };

    SceneLoader.prototype.removeChar = function removeChar() {
        var tableentrytree = this.getTreeWithFinalPosition("1c"),
            text = this.spriteManagerPhaserApiInterface.removeChar(tableentrytree.id, character);
        tableentrytree.tree.text = text;
    };


    return SceneLoader;
});