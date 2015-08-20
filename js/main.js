/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
var phaserGameGlobal = undefined;
require(["View/SceneLoaderLevel/SceneLoader", "View/SpriteLevel/SpriteManagerPhaserApi",
        "View/UIEngineView/PhaserGame", "InputOutput/GestureObserver",
        "Controll/UserInterfaceBussinesController", "View/UIEngineView/Keyboard",
        "Controll/NewlyPresentedTreeSubjectNotifier","View/UIEngineView/PasswordDialog"
    ],
    function (SceneLoader, SpriteManagerPhaserApi, PhaserGame, GestureObserver,
              UserInterfaceBussinesController, Keyboard, NewlyPresentedTreeSubjectNotifier,TextDialogHtml) {
        "use strict";
        var sceneLoader, spriteManagerApi, keyboard,
            userInterfaceBussinesController = new UserInterfaceBussinesController(),
            gestureObserver = new GestureObserver(userInterfaceBussinesController),
            newlyPresentedTreeSubjectNotifier = new NewlyPresentedTreeSubjectNotifier(),
            phaserGame = new PhaserGame(function (phaserGameContext) {
                keyboard = new Keyboard(phaserGame, gestureObserver);
                userInterfaceBussinesController.keyboardInterface = keyboard;
                spriteManagerApi = new SpriteManagerPhaserApi(phaserGame, gestureObserver);
                var observer1 =   {
                    onNewlyPresentedTree: function (treeid) { console.log("observer:" + treeid )}
                };
                newlyPresentedTreeSubjectNotifier.addObserver(observer1);
                sceneLoader = new SceneLoader(spriteManagerApi, newlyPresentedTreeSubjectNotifier);
                spriteManagerApi.sceneLoaderInterface = sceneLoader;
                userInterfaceBussinesController.init(sceneLoader);
                return sceneLoader;
            }, gestureObserver);

        phaserGameGlobal = phaserGame;
});