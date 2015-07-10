/*global define, require, module, Phaser*/
/*jslint todo: true */
define(["GpsMovmentTrigger", "NearbyTreesFromServerToIncommingTreeList", "TreeLoaderToSceneLoaderFromLists", "TreeRestClient"], function (GpsMovmentTrigger, NearbyTreesFromServerToIncommingTreeList, TreeLoaderToSceneLoaderFromLists, TreeRestClient) {
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
            this.nearbyTreesFromServerToIncommingTreeList = new NearbyTreesFromServerToIncommingTreeList(this.incommingList, this.alreadyDisplayed, this.mapOfTreesById);

    }

    UserInterfaceBussinesController.prototype.init = function (sceneLoaderInterface) {
        this.sceneLoaderInterface = sceneLoaderInterface;
        this.treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
            this.sceneLoaderInterface,
            this.incommingList,
            this.alreadyDisplayed,
            this.mapOfTreesById
        );
        this.gpsMovmentTrigger.forceUpdate();
    }

    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeLeft = function swipeLeft() {
        if (this.state === NAVIGATE) {
            this.treeLoaderToSceneLoaderFromLists.swipeLeft();
            console.log("----SL----");
            console.log("incomming: " +  this.incommingList);
            console.log("already: " +  this.alreadyDisplayed);
        }
    };
    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeRight = function swipeRight() {
        if (this.state === NAVIGATE) {
            this.treeLoaderToSceneLoaderFromLists.swipeRight();
            console.log("----SR----");
            console.log("incomming: " +  this.incommingList);
            console.log("already: " +  this.alreadyDisplayed);
        }
    };

    UserInterfaceBussinesController.prototype.clickedOnWriteButton = function clickedOnWriteButton() {
        if (this.state === NAVIGATE) {
            this.state = WRITTING;
            this.keyboardInterface.showOnScene();
            this.sceneLoaderInterface.setIsTyping(true);
        }
    };

    UserInterfaceBussinesController.prototype.putTreeOnServer = function(){
        var text = this.sceneLoaderInterface.getEditedTreeText(),
            coords = this.gpsMovmentTrigger.actualCoordinates,
            treeRestClient = new TreeRestClient(),
            tree ={  text: text, metersToHide: 10, x: coords.longitude, y: coords.latitude},
            that = this;
        treeRestClient.put(tree).then(function() {
            alert("tree penjat");
            that.gpsMovmentTrigger.forceUpdate();
        });
    }

    UserInterfaceBussinesController.prototype.clickedOnKey = function clickedOnKey(char) {
        console.log("char: " + char);
        if (char === "ok") {
            this.state = NAVIGATE;
            this.keyboardInterface.hideOnScene();
            this.sceneLoaderInterface.setIsTyping(false);
            this.putTreeOnServer();
        } else if (this.state === WRITTING && char === "cancel") {
            this.state = NAVIGATE;
            this.keyboardInterface.hideOnScene();
            this.sceneLoaderInterface.setIsTyping(false);
        } else if (this.state === WRITTING && char === "backwards") {
            this.sceneLoaderInterface.removeChar();
        } else if (this.state === WRITTING) {
            this.sceneLoaderInterface.addChar(char);
        }
    };

    UserInterfaceBussinesController.prototype.userHasMoved = function userHasMoved(coords) {
        var coordxy = {x:coords.longitude, y:coords.latitude};
        this.nearbyTreesFromServerToIncommingTreeList.userHasMovedTo(coordxy);
    }


    return UserInterfaceBussinesController;
});