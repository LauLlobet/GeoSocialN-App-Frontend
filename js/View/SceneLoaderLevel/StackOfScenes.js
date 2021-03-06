/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp"], function (underscore, rspv) {
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
        this.deferred = rspv.defer();
        if (this.stackedScenesArray.length > 0 && !this.alreadyPlaying) {
            this.alreadyPlaying = true;
            this.playItemOfScenesArray(this);
            return this.deferred.promise;
        }
        return this.deferred.promise;
    };
    StackOfScenes.prototype.playItemOfScenesArray = function playItemOfScenesArray(ctxt) {
        var id;
        if (ctxt.stackedScenesArray.length === 0) {
            ctxt.alreadyPlaying = false;
            id = ctxt.sceneLoaderInterface.getTreeAlreadyDisplayed();
            ctxt.deferred.resolve(id); // return the id of the final tree
            return;
        }
        var sceneAndTexts = ctxt.stackedScenesArray.shift();
        ctxt.sceneLoaderInterface.loadScene(sceneAndTexts.sceneType, sceneAndTexts.texts, ctxt, playItemOfScenesArray);
    };
    return StackOfScenes;
});