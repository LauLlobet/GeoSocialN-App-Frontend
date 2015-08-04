/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
require(["View/SceneLoaderLevel/SceneLoader", "View/SpriteLevel/SpriteManagerPhaserApi", "View/UIEngineView/PhaserGame", "InputOutput/GestureObserver", "Controll/UserInterfaceBussinesController", "View/UIEngineView/Keyboard"],
    function (SceneLoader, SpriteManagerPhaserApi, PhaserGame, GestureObserver, UserInterfaceBussinesController, Keyboard) {
        "use strict";
        var sceneLoader, spriteManagerApi, keyboard,
            userInterfaceBussinesController = new UserInterfaceBussinesController(),
            gestureObserver = new GestureObserver(userInterfaceBussinesController),
            phaserGame = new PhaserGame(function (phaserGameContext) {
                keyboard = new Keyboard(phaserGame, gestureObserver);
                userInterfaceBussinesController.keyboardInterface = keyboard;
                spriteManagerApi = new SpriteManagerPhaserApi(phaserGame, gestureObserver);
                sceneLoader = new SceneLoader(spriteManagerApi);
                spriteManagerApi.sceneLoaderInterface = sceneLoader;
                userInterfaceBussinesController.init(sceneLoader);
                return sceneLoader;
            }, gestureObserver);
});