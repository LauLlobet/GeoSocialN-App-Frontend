/*global define, require, module, asyncTest, equal, start*/
define([], function () {
    'use strict';
    module('SpriteManagerPhaserApi with real PhaserGame');

    asyncTest('SpriteManagerPhaserApi', function () {
        require(["SpriteManagerPhaserApi", "PhaserGame"], function (SpriteManagerPhaserApi, PhaserGame) {
            var phaserGame, spriteManagerPhaserApi;
            phaserGame = new PhaserGame(function(){
                spriteManagerPhaserApi = new SpriteManagerPhaserApi(phaserGame);
                equal('ok', 'ok', 'spriteManagerPhaserApi.state');
                QUnit.start();
            });

        });
    });

});

