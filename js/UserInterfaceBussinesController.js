/*global define, require, module, Phaser*/
/*jslint todo: true */
define([], function () {
    "use strict";
    var NAVIGATE = "navigate",
        WRITTING = "writting";
    function UserInterfaceBussinesController(sceneLoaderInterface) //noinspection JSLint
    {
            this.sceneLoaderInterface = sceneLoaderInterface;
            this.state = NAVIGATE;
    }

    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeLeft = function swipeLeft() {
        if (this.state === NAVIGATE) {
            this.sceneLoaderInterface.loadScene("forestSwipeLeft", [' Menudo fieston     monto aqui        felix      the house cat!                     30/10/2014     Pau y Joan   la liaron parda!', undefined, 'En este bar sirven la cerveza poco fria !!Ojo!!']);
        }
    };
    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeRight = function swipeRight() {
        if (this.state === NAVIGATE) {
            this.sceneLoaderInterface.loadScene("forestSwipeRight", ['Esta parte de barcelona esta genial, despues de este local siempre nos dejamos caer en el Cafe Royal', ' Aga and Hanna     from poland   where here', undefined]);
        }
    };

    UserInterfaceBussinesController.prototype.clickedOnWriteButton = function clickedOnWriteButton() {
        if (this.state === NAVIGATE) {
            this.state = WRITTING;
            this.keyboardInterface.showOnScene();
        }
    };

    UserInterfaceBussinesController.prototype.clickedOnKey = function (char) {
        console.log("char: " + char);
        if (char === "ok") {
            this.state = NAVIGATE;
            this.keyboardInterface.hideOnScene();
        } else if (this.state === WRITTING && char === "cancel"){
            this.state = NAVIGATE;
            this.keyboardInterface.hideOnScene();
        } else if (this.state === WRITTING) {
            //var tree = this.sceneLoaderInterface.getTreeWithFinalPosition("1c");
        }
    }
    return UserInterfaceBussinesController;
});