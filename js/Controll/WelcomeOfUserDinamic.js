/**
 * Created by quest on 05/11/15.
 */
/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../lib/underscore', "/VisitTreeNumber/scenes/Constants.js"], function (underscore, constants) {
    "use strict";
    function WelcomeOfUserDinamic(bussinesController) {
        this.bussinesController = bussinesController;
    }
    WelcomeOfUserDinamic.prototype.startWelcomeToUser = function () {
        this.loadWelcomeTrees();
        this.setUpHashes();
        this.stackLoadSceneWithWelcomeTreeCorrespondingToTheBrowserLanguage();
        this.playWelcomeTrees();
    };
    WelcomeOfUserDinamic.prototype.loadWelcomeTrees = function loadWelcomeTrees (coordinates) {
        this.bussinesController.nearbyTreesFromServerToIncommingTreeList.loadTreeToHash({
            id: constants.specialTreesCodes.es,
            ip: "87.223.58.75",
            metersToHide: 10,
            text: "",
            timestamp: 1441013147469,
            x: this.bussinesController.gpsMovmentTrigger.actualCoordinates.longitude,
            y: this.bussinesController.gpsMovmentTrigger.actualCoordinates.latitude
        });

        this.bussinesController.nearbyTreesFromServerToIncommingTreeList.loadTreeToHash({
            id: constants.specialTreesCodes.en,
            ip: "87.223.58.75",
            metersToHide: 10,
            text: "",
            timestamp: 1441013147469,
            x: this.bussinesController.gpsMovmentTrigger.actualCoordinates.longitude,
            y: this.bussinesController.gpsMovmentTrigger.actualCoordinates.latitude
        });

        this.bussinesController.nearbyTreesFromServerToIncommingTreeList.loadTreeToHash({
            id: constants.specialTreesCodes.ca,
            ip: "87.223.58.75",
            metersToHide: 10,
            text: "",
            timestamp: 1441013147469,
            x: this.bussinesController.gpsMovmentTrigger.actualCoordinates.longitude,
            y: this.bussinesController.gpsMovmentTrigger.actualCoordinates.latitude
        });

    };
    WelcomeOfUserDinamic.prototype.setUpHashes = function () {
        this.bussinesController.gpsMovmentTrigger.forceUpdate();
        this.bussinesController.hashChangeTrigger.storeActualHash();
    };
    WelcomeOfUserDinamic.prototype.stackLoadSceneWithWelcomeTreeCorrespondingToTheBrowserLanguage = function () {
        var languageId = this.getBrowserLanguageId();
        this.stackLoadSceneWithWelcomeTreeCorrespondingToTheIdOfTheBrowserLanguage(languageId);
    };
    WelcomeOfUserDinamic.prototype.getBrowserLanguageId = function () {
        var userLang = navigator.language || navigator.userLanguage;
        if (constants.specialTreesCodes[userLang] !== undefined) {
            return constants.specialTreesCodes[userLang];
        }
        return constants.specialTreesCodes.defaultLanguage;
    },
    WelcomeOfUserDinamic.prototype.stackLoadSceneWithWelcomeTreeCorrespondingToTheIdOfTheBrowserLanguage = function (languageId) {
        if(this.bussinesController.mapOfTreesById[languageId] === undefined) {
            throw "Welcome tree with ID "+languageId+" is not loaded";
        }
        this.bussinesController.sceneLoaderInterface.stackLoadScene('forestSwipeLeft',
            [
                undefined,
                this.bussinesController.mapOfTreesById[languageId],
                undefined
            ]
        )
    },
    WelcomeOfUserDinamic.prototype.playWelcomeTrees = function () {
        var that = this.bussinesController;
        var constantsThat = constants;
        this.bussinesController.updateWithoutMoving().then(function () {
            if (that.incommingList.emptyTrees === 0) {
                that.sceneLoaderInterface.stackLoadScene('forestSwipeRight', [undefined, {id: constantsThat.specialTreesCodes.fullForest, text: ""}, undefined]);
            } else {
                that.sceneLoaderInterface.stackLoadScene('forestSwipeRight', [undefined, null, undefined]);
            }
            that.sceneLoaderInterface.playAllStackedScenes().then(function () {
                that.justDisplayedATree();
                that.hashChangeTrigger.triggerIfStoredHashWasNotEmpty();
                that.hashChangeTrigger.update();
            }).catch(function (error) {
                alert("error");
                console.log(error.stack);
            });
            that.fillerOfIncommingListIfItGetsEmpty.start();
        }).catch(function (error) {
            alert("error");
            console.log(error.stack);
        });
    }
    return WelcomeOfUserDinamic;
});