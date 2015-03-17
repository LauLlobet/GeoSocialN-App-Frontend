/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
require(["SceneLoader", "SpriteManagerPhaserApi", "PhaserGame", "GestureObserver"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame, GestureObserver) {
    var sceneLoader, spriteManagerApi,
        gestureObserver = new GestureObserver({
            swipeRight: function () { console.log("swipe right"); },
            swipeLeft: function () { console.log("swipe left"); }
        }),
        phaserGame = new PhaserGame(function (phaserGameContext) {
            spriteManagerApi = new SpriteManagerPhaserApi(phaserGame);
            sceneLoader = new SceneLoader(spriteManagerApi);
            spriteManagerApi.sceneLoaderInterface = sceneLoader;
            sceneLoader.loadScene('forestSwipeRight', ["text1", "text2", "text3", "text4"]);
            return sceneLoader;
        }, gestureObserver);
});