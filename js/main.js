/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
var phaserGameGlobal = undefined;
require(["View/SceneLoaderLevel/SceneLoader", "View/SpriteLevel/SpriteManagerPhaserApi",
        "View/UIEngineView/PhaserGame", "InputOutput/GestureObserver",
        "Controll/UserInterfaceBussinesController", "View/UIEngineView/Keyboard",
        "Controll/NewlyPresentedTreeSubjectNotifier","View/UIEngineView/PasswordDialog","View/BackgroundMap"
    ],
    function (SceneLoader, SpriteManagerPhaserApi, PhaserGame, GestureObserver,
              UserInterfaceBussinesController, Keyboard, NewlyPresentedTreeSubjectNotifier,TextDialogHtml, BackgroundMap) {
        "use strict";
        var sceneLoader, spriteManagerApi, keyboard, backgroundMap,
        userInterfaceBussinesController = new UserInterfaceBussinesController(),
            gestureObserver = new GestureObserver(userInterfaceBussinesController),
            newlyPresentedTreeSubjectNotifier = new NewlyPresentedTreeSubjectNotifier(),
            phaserGame = new PhaserGame(function (phaserGameContext) {
                backgroundMap = new BackgroundMap(phaserGame);
                keyboard = new Keyboard(phaserGame, gestureObserver);
                userInterfaceBussinesController.keyboardInterface = keyboard;
                spriteManagerApi = new SpriteManagerPhaserApi(phaserGame, gestureObserver);
                sceneLoader = new SceneLoader(spriteManagerApi, newlyPresentedTreeSubjectNotifier);
                spriteManagerApi.sceneLoaderInterface = sceneLoader;
                userInterfaceBussinesController.init(sceneLoader,backgroundMap);
                return sceneLoader;
            }, gestureObserver);

        phaserGameGlobal = phaserGame;
});