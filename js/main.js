/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
var phaserGameGlobal = undefined;
var bussinesControllerGlobal = "notitint";
require(["View/SceneLoaderLevel/SceneLoader", "View/SpriteLevel/SpriteManagerPhaserApi",
        "View/UIEngineView/UiCore/PhaserGame", "InputOutput/GestureObserver",
        "Controll/UserInterfaceBussinesController", "View/UIEngineView/Keyboard",
        "Controll/NewlyPresentedTreeSubjectNotifier", "View/UIEngineView/PasswordDialog", "View/UIEngineView/BackgroundMap",
        "View/UIEngineView/NotPreciseAlert"
    ],
    function (SceneLoader, SpriteManagerPhaserApi, PhaserGame, GestureObserver,
              UserInterfaceBussinesController, Keyboard, NewlyPresentedTreeSubjectNotifier, TextDialogHtml, BackgroundMap,
    NotPreciseAlert) {
        "use strict";

        var timeout = 1000,
            tryLaunch = {},
            start = function start() {
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
                        userInterfaceBussinesController.init(sceneLoader, backgroundMap);
                        userInterfaceBussinesController.notPreciseAndIgnoredAlert = new NotPreciseAlert(phaserGame);
                        return sceneLoader;
                    }, gestureObserver);
                phaserGameGlobal = phaserGame;
                bussinesControllerGlobal = userInterfaceBussinesController;
            };
        console.log("Version &&version&&")
        tryLaunch.tryit = function() {
            alert("went wrong");
        };
        tryLaunch.tryit = function () {
            if (longitude !== undefined && longitude !== 40) {
                start();
                return;
            }
            setTimeout(tryLaunch.tryit, timeout);
        };
        tryLaunch.tryit();
    });
