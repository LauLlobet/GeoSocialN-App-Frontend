/*global define, require, module, Phaser*/
/*jslint todo: true */
define(["../InputOutput/GpsMovmentTrigger", "./NearbyTreesFromServerToIncommingTreeList",
    "./TreeLoaderToSceneLoaderFromLists", "../Model/TreeRestClient", "./FillerOfIncommingListIfItGetsEmpty",
    "../InputOutput/HashChangeTrigger", "../View/SceneLoaderLevel/SceneTreeTextSetter",
    "../View/SpriteLevel/SpriteTreeTextSetter"], function (GpsMovmentTrigger, NearbyTreesFromServerToIncommingTreeList,
                                                           TreeLoaderToSceneLoaderFromLists, TreeRestClient,
                                                           FillerOfIncommingListIfItGetsEmpty, HashChangeTrigger,
                                                           SceneTreeTextSetter, SpriteTreeTextSetter) {
    "use strict";
    var NAVIGATE = "navigate",
        WRITTING = "writting";
    function UserInterfaceBussinesController() //noinspection JSLint
    {
            this.state = NAVIGATE;
            this.gpsMovmentTrigger = new GpsMovmentTrigger(this);
            this.incommingList = [];
            this.alreadyDisplayed = [];
            this.mapOfTreesById = {};
            this.mapOfTreesById[-1] = { id: -1, text: '-1' };
            this.fillerOfIncommingListIfItGetsEmpty = new FillerOfIncommingListIfItGetsEmpty(this.incommingList, this);
            this.nearbyTreesFromServerToIncommingTreeList = new NearbyTreesFromServerToIncommingTreeList(this.incommingList, this.alreadyDisplayed, this.mapOfTreesById, this.fillerOfIncommingListIfItGetsEmpty);
            this.lastKnownCoords = undefined;
            this.hashChangeTrigger = new HashChangeTrigger(this);
    }

    UserInterfaceBussinesController.prototype.init = function (sceneLoaderInterface) {
        var that = this,
            tmp;
        this.sceneLoaderInterface = sceneLoaderInterface;
        this.treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
            this.sceneLoaderInterface,
            this.incommingList,
            this.alreadyDisplayed,
            this.mapOfTreesById
        );
        tmp = new SpriteTreeTextSetter(this.sceneLoaderInterface.spriteManagerPhaserApiInterface);
        this.sceneTreeTextSetterInterface = new SceneTreeTextSetter(sceneLoaderInterface, tmp);
        this.gpsMovmentTrigger.forceUpdate();
        this.hashChangeTrigger.storeActualHash();
        this.sceneLoaderInterface.loadScene('forestSwipeLeft', [{id: 1, text: "Swipe left and right and discover arround you!"}, {id: -4, text: ""},  {id: -2, text: ""}, ]);
        this.swipeLeft().then(function () {
            that.hashChangeTrigger.triggerIfStoredHashWasNotEmpty();
        });
        this.fillerOfIncommingListIfItGetsEmpty.start();
    }

    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeLeft = function swipeLeft() {
        var that = this;
        if (this.state === NAVIGATE) {
            return this.treeLoaderToSceneLoaderFromLists.swipeLeft().then( function (ans) {
                console.log("----SL----");
                console.log("incomming: " +  that.incommingList);
                console.log("already: " +  that.alreadyDisplayed);
                that.setHashUrlAndIgnoreUpdatingIfNotUndefined(ans)
            });
        }
    };
    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeRight = function swipeRight() {
        var that = this;
        if (this.state === NAVIGATE) {
            return this.treeLoaderToSceneLoaderFromLists.swipeRight().then( function (ans) {
                console.log("----SR----");
                console.log("incomming: " +  that.incommingList);
                console.log("already: " +  that.alreadyDisplayed);
                that.setHashUrlAndIgnoreUpdatingIfNotUndefined(ans)
            });
        }
    };

    UserInterfaceBussinesController.prototype.setHashUrlAndIgnoreUpdatingIfNotUndefined = function (id) {
        if( id !== undefined){
            this.hashChangeTrigger.setHashAtUrlAndIgnoreUpdatingProcess(id);
        } else {
            this.hashChangeTrigger.removeHash();
        }
    };

    UserInterfaceBussinesController.prototype.linkClicked = function (treeid){
        this.hashChangeTrigger.setHashAtUrlAndStartUpdatingProcess(treeid);
    }

    UserInterfaceBussinesController.prototype.clickedOnWriteButton = function clickedOnWriteButton() {
        if (this.state === NAVIGATE) {
            this.state = WRITTING;
            this.keyboardInterface.showOnScene();
            this.sceneTreeTextSetterInterface.setIsTyping(true);
        }
    };

    UserInterfaceBussinesController.prototype.putTreeOnServer = function(){
        var text = this.sceneTreeTextSetterInterface.getEditedTreeText(),
            coords = this.gpsMovmentTrigger.actualCoordinates,
            treeRestClient = new TreeRestClient(),
            tree ={  text: text, metersToHide: 10, x: coords.longitude, y: coords.latitude},
            that = this;
        treeRestClient.put(tree).then(function (ans) {
            if(ans.treeContent === null) {
                alert("error posting tree");
                throw "error";
            }
            return ans;
        }).then(function(ans) {
            that.hashChangeTrigger.setHashAtUrlAndIgnoreUpdatingProcess(ans.treeContent.id)
            that.gpsMovmentTrigger.forceUpdate();
        });
    }

    UserInterfaceBussinesController.prototype.clickedOnKey = function clickedOnKey(char) {
        console.log("char: " + char);
        if (char === "ok") {
            this.state = NAVIGATE;
            this.keyboardInterface.hideOnScene();
            this.sceneTreeTextSetterInterface.setIsTyping(false);
            this.putTreeOnServer();
        } else if (this.state === WRITTING && char === "cancel") {
            this.state = NAVIGATE;
            this.keyboardInterface.hideOnScene();
            this.sceneTreeTextSetterInterface.setIsTyping(false);
        } else if (this.state === WRITTING && char === "backwards") {
            this.sceneTreeTextSetterInterface.removeChar();
        } else if (this.state === WRITTING) {
            this.sceneTreeTextSetterInterface.addChar(char);
        }
    };

    UserInterfaceBussinesController.prototype.userHasMoved = function userHasMoved(coords) {
        if(coords !== undefined){
            this.lastKnownCoords = {x:coords.longitude, y:coords.latitude};
        }
        this.nearbyTreesFromServerToIncommingTreeList.userHasMovedTo(this.lastKnownCoords);
    };

    UserInterfaceBussinesController.prototype.updateWithoutMoving = function updateWithoutMoving() {
        this.userHasMoved(undefined);
    };

    UserInterfaceBussinesController.prototype.hashHasBeenUpdated = function ( treeId ){
        var that = this;
        this.nearbyTreesFromServerToIncommingTreeList.loadSpecificTreeToHash(treeId).then(function(){
            that.treeLoaderToSceneLoaderFromLists.swipeToSpecificTree(treeId);
        });
    }
    return UserInterfaceBussinesController;
});