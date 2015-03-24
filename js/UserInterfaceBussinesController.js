/*global define, require, module, Phaser*/
/*jslint todo: true */
define([], function () {
    "use strict";
    function UserInterfaceBussinesController(sceneLoaderInterface) //noinspection JSLint
    {
            this.sceneLoaderInterface = sceneLoaderInterface;
    }

    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeLeft = function swipeLeft() {
        this.sceneLoaderInterface.loadScene("forestSwipeLeft", ['y text1 ui', 'y text2 ui', 'y text3 ui']);
    };
    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeRight = function swipeRight() {
        this.sceneLoaderInterface.loadScene("forestSwipeRight", ['c text1 ui', 'b text2 ui', 'a text3 ui']);
    };
    return UserInterfaceBussinesController;
});