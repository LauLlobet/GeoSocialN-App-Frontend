/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
require(["SceneLoader", "SpriteManagerPhaserApi", "PhaserGame"], function (SceneLoader, SpriteManagerPhaserApi, PhaserGame) {
    var sceneLoader, spriteManagerApi,
        phaserGame = new PhaserGame(function () {
            spriteManagerApi = new SpriteManagerPhaserApi(phaserGame);
            sceneLoader = new SceneLoader(spriteManagerApi);
            spriteManagerApi.sceneLoaderInterface = sceneLoader;
            sceneLoader.loadScene('ForestSwipeLeft', ["text1", "text2", "text3", "text4"]);
        });
});