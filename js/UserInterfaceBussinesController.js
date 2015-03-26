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
            this.sceneLoaderInterface.loadScene("forestSwipeLeft", ['y text1 ui', undefined, 'y text3 ui']);
        }
    };
    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeRight = function swipeRight() {
        if (this.state === NAVIGATE) {
            this.sceneLoaderInterface.loadScene("forestSwipeRight", ['c text1 ui', 'b text2 ui', undefined]);
        }
    };

    UserInterfaceBussinesController.prototype.clickedOnWriteButton = function clickedOnWriteButton () {
        if (this.state === NAVIGATE) {
            this.state = WRITTING;
        }
        console.log("clicked state" + this.state);
    }
    return UserInterfaceBussinesController;
});