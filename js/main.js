require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
    'use strict';
    var phaserGame, spriteManagerPhaserApi, post;

    post = function () {
        console.log("i can feel it" + phaserGame.game.add);
    };

    phaserGame = new PhaserGame(post);


    //spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
});