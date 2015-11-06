/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    var x = 0,
        y = 340;
    function BackgroundMap(phaserGame) {
        this.game = phaserGame.game;
        this.alphaLayerGroupBg = this.game.add.group();
        this.alphaLayerGroupBg.create(x, y, "alphalayerbg");
        this.mapGroup = this.game.add.group();
        this.alphaLayerGroup = this.game.add.group();
        this.alphaLayerSprite = this.alphaLayerGroup.create(x, y, "alphalayer");
        this.alphaLayerSprite.alpha = 0.5;
        this.mapGroupSpriteImage = this.game.add.image(0, -1500, 'map');
        this.tex = this.game.add.renderTexture(this.mapGroupSpriteImage.width, this.mapGroupSpriteImage.height, 'name', true);
        this.mapGroupSprite = this.mapGroup.create(x, y, this.tex);


    }


    BackgroundMap.prototype.justDisplayedATreeSoDisplayAMap = function (tree) {
        var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + tree.y + ',' + tree.x + '&zoom=15&size=500x300&maptype=roadmap&key=AIzaSyARLL06eu1X3HSK4HpwHGFVbQDuOPWekh8';
        console.log(url);
        this.dynamicLoadImage(this.game, x, y, url, 'dinmap', undefined);
    };
    BackgroundMap.prototype.displayMap = function (coordinates) {
        this.tex.renderXY(this.mapGroupSpriteImage, 0, 0, true);
        this.mapGroup.alpha = 0;
        this.game.add.tween(this.mapGroup).to({alpha: 1}, 400, 'Linear', true, 0, 0);


    };
    BackgroundMap.prototype.hideMap = function () {
        if (this.mapGroupSprite === undefined) {
            return;
        }
        this.game.add.tween(this.mapGroup).to({alpha: 0}, 400, 'Linear', true, 0, 0);
    };


    BackgroundMap.prototype._fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        if (success) {
            this.mapGroupSpriteImage.loadTexture(cacheKey);
            this.displayMap();
        }
    };

    BackgroundMap.prototype.dynamicLoadImage = function (game, x, y, url, fallback, key) {
        if (typeof key === 'undefined') key = 'dynamicLoad_' + url;
        var loader = new Phaser.Loader(game);
        loader.image(key, url);
        loader.onFileComplete.addOnce(this._fileComplete, this);
        loader.start();
        return;

    }

    return BackgroundMap;
});
