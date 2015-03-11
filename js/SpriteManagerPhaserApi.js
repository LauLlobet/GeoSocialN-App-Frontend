//noinspection JSLint,JSUnusedLocalSymbols
define([], function () {
    "use strict";
    function SpriteManagerPhaserApi(phaserGame) //noinspection JSLint
    {
            this.allSpritesGroup = phaserGame.game.add.group();
            this.state = 'ok';
    }

    return SpriteManagerPhaserApi;
});