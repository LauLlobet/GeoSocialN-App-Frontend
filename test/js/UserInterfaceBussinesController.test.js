/**
 * Created by quest on 24/03/15.
 */
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual*/
define([], function () {
    'use strict';
    module('UserInterfaceBussinesController');
    asyncTest('send all full trees', function () {
        require(["SceneLoader", "SpriteManagerPhaserApi", "PhaserGame", "GestureObserver", "UserInterfaceBussinesController"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame, GestureObserver, UserInterfaceBussinesController) {
            var sceneLoader, spriteManagerApi,
                userInterfaceBussinesController = new UserInterfaceBussinesController(),
                gestureObserver = new GestureObserver(userInterfaceBussinesController),
                phaserGame = new PhaserGame(function (phaserGameContext) {
                    spriteManagerApi = new SpriteManagerPhaserApi(phaserGame);
                    sceneLoader = new SceneLoader(spriteManagerApi);
                    spriteManagerApi.sceneLoaderInterface = sceneLoader;
                    userInterfaceBussinesController.sceneLoaderInterface = sceneLoader;
                    sceneLoader.loadScene('forestSwipeRight', ["text1", "text2", "text3", "text4"]);
                    setTimeout(function f() {
                        equal(spriteManagerApi.findSpriteByNameOrThrowIfNotExists(1).type, "cco");
                        QUnit.start();
                    }, 0);
                    return sceneLoader;
                }, gestureObserver);

        });
    });
});