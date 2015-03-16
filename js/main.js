/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
require(["SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
    var sceneLoader, spriteManagerApi,
        phaserGame = new PhaserGame(function (phaserGameContext) {
            spriteManagerApi = new SpriteManagerPhaserApi(phaserGame);
            sceneLoader = new SceneLoader(spriteManagerApi);
            spriteManagerApi.sceneLoaderInterface = sceneLoader;
            phaserGameContext.sceneLoaderInterface = sceneLoader;
            sceneLoader.loadScene('forestSwipeRight', ["text1", "text2", "text3", "text4"]);
            return sceneLoader;
        });
});