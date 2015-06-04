/*global define, require, module, Phaser*/
/*jslint todo: true */
define(["GpsMovmentTrigger"], function (GpsMovmentTrigger) {
    "use strict";
    var NAVIGATE = "navigate",
        WRITTING = "writting";
    function UserInterfaceBussinesController(sceneLoaderInterface) //noinspection JSLint
    {
            this.sceneLoaderInterface = sceneLoaderInterface;
            this.state = NAVIGATE;
            this.gpsMovmentTrigger = new GpsMovmentTrigger(this);
    }

    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeLeft = function swipeLeft() {
        if (this.state === NAVIGATE) {
            this.sceneLoaderInterface.stackLoadScene("forestSwipeLeft", [' Menudo fieston     monto aqui        felix      the house cat!                     30/10/2014     Pau y Joan   la liaron parda!', undefined, 'En este bar sirven la cerveza poco fria !!Ojo!!']);
            this.sceneLoaderInterface.playAllStackedScenes();
        }
    };
    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeRight = function swipeRight() {
        if (this.state === NAVIGATE) {
            this.sceneLoaderInterface.stackLoadScene("forestSwipeRight", ['Esta parte de barcelona esta genial, despues de este local siempre nos dejamos caer en el Cafe Royal', ' Aga and Hanna     from poland   where here', undefined]);
            this.sceneLoaderInterface.playAllStackedScenes();
        }
    };

    UserInterfaceBussinesController.prototype.clickedOnWriteButton = function clickedOnWriteButton() {
        if (this.state === NAVIGATE) {
            this.state = WRITTING;
            this.keyboardInterface.showOnScene();
            this.sceneLoaderInterface.setIsTyping(true);
        }
    };

    UserInterfaceBussinesController.prototype.clickedOnKey = function clickedOnKey(char) {
        console.log("char: " + char);
        if (char === "ok") {
            this.state = NAVIGATE;
            this.keyboardInterface.hideOnScene();
            this.sceneLoaderInterface.setIsTyping(false);
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
        this.sceneLoaderInterface.stackLoadScene("forestSwipeLeft", [' ...', undefined, '...']);
        this.sceneLoaderInterface.stackLoadScene("forestSwipeRight", [' ...', undefined, '...']);
        this.sceneLoaderInterface.playAllStackedScenes();
    }
    return UserInterfaceBussinesController;
});