/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
require(["SceneLoader", "SpriteManagerPhaserApi", "PhaserGame", "GestureObserver", "UserInterfaceBussinesController"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame, GestureObserver, UserInterfaceBussinesController) {
    var sceneLoader, spriteManagerApi,
        userInterfaceBussinesController = new UserInterfaceBussinesController(),
        gestureObserver = new GestureObserver(userInterfaceBussinesController),
        phaserGame = new PhaserGame(function (phaserGameContext) {
            spriteManagerApi = new SpriteManagerPhaserApi(phaserGame,gestureObserver );
            sceneLoader = new SceneLoader(spriteManagerApi);
            spriteManagerApi.sceneLoaderInterface = sceneLoader;
            userInterfaceBussinesController.sceneLoaderInterface = sceneLoader;
            sceneLoader.loadScene('forestSwipeRight', ["aaaa", "bbbb", "cccc"]);
            return sceneLoader;
        }, gestureObserver);
});