require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
    'use strict';
    var phaserGame, spriteManagerPhaserApi, post;

    post = function () {
        console.log("i can feel it" + phaserGame.game.add);
    };
    var phaserGame, spriteManagerPhaserApi;
    phaserGame = new PhaserGame(function () {
        spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
        spriteManagerPhaserApi.displayScreenSizeTest();
        spriteManagerPhaserApi.createSprite({
            x: -720/2,
            y: -1280/2,
            w: 720,
            h: 1280,
            type: "debugTree"
        }, 1234);
        equal('ok', 'ok', 'debugTree.state');
        QUnit.start();
    });
});