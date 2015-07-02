/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['underscore', "../lib/rsvp"], function (_, rspv) {
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
        this.deferred.reject();
        return this.deferred.promise;
    };
    StackOfScenes.prototype.playItemOfScenesArray = function playItemOfScenesArray(ctxt) {
        if (ctxt.stackedScenesArray.length === 0) {
            ctxt.alreadyPlaying = false;
            ctxt.deferred.resolve();
            return;
        }
        var sceneAndTexts = ctxt.stackedScenesArray.shift();
        ctxt.sceneLoaderInterface.loadScene(sceneAndTexts.sceneType, sceneAndTexts.texts, ctxt, playItemOfScenesArray);
    };
    return StackOfScenes;
});