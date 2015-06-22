/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['underscore'], function (_) {
    "use strict";
    function StackOfScenes(sceneLoader) {
        this.sceneLoaderInterface = sceneLoader;
        this.stackedScenesArray = [];
        this.alreadyPlaying = false;
    }
    StackOfScenes.prototype.stackLoadScene = function stackLoadScene(sceneType, texts) {
        this.stackedScenesArray.push({sceneType : sceneType, texts : texts});
    };
    StackOfScenes.prototype.playAllStackedScenes = function playAllStackedScenes() {
        if (this.stackedScenesArray.length > 0 && !this.alreadyPlaying) {
            this.alreadyPlaying = true;
            this.playItemOfScenesArray(this);
        }
    };
    StackOfScenes.prototype.playItemOfScenesArray = function playItemOfScenesArray(ctxt) {
        if (ctxt.stackedScenesArray.length === 0) {
            ctxt.alreadyPlaying = false;
            return;
        }
        var sceneAndTexts = ctxt.stackedScenesArray.shift();
        ctxt.sceneLoaderInterface.loadScene(sceneAndTexts.sceneType, sceneAndTexts.texts, ctxt, playItemOfScenesArray);
    };
    return StackOfScenes;
});