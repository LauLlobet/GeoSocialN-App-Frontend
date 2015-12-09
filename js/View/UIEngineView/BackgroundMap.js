/*global define, require, module, Phaser, Group*/
/*jslint todo: true */

var front, back;

define([], function () {
    var x = 0,
        y = 340;
    function BackgroundMap(phaserGame) {
        this.game = phaserGame.game;
        this.game.add.sprite(0, 0, 'fondo');

        this.mapGroupSpriteImage = this.game.add.image(0, -1500, 'map');
        this.backgroundMapWihileTheOtherLoadsGroup = this.game.add.group();

        this.rendertexture = this.game.add.renderTexture(this.mapGroupSpriteImage.width, this.mapGroupSpriteImage.height, 'name', true);
        this.backgroundRenderTexture = this.game.add.renderTexture(this.mapGroupSpriteImage.width, this.mapGroupSpriteImage.height, 'name', true);

        this.backgroundMapWihileTheOtherLoadsGroup.create(x, y, this.backgroundRenderTexture);
        this.mapGroup = this.game.add.group();
        this.mapGroupSprite = this.mapGroup.create(x, y, this.rendertexture);


    }


    BackgroundMap.prototype.justDisplayedATreeSoDisplayAMap = function (tree) {
        var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + tree.y + ',' + tree.x + '&zoom=15&size=500x300&maptype=roadmap&key=AIzaSyARLL06eu1X3HSK4HpwHGFVbQDuOPWekh8';
        this.dynamicLoadImage(this.game, x, y, url, 'dinmap', undefined);
    };
    BackgroundMap.prototype.displayMap = function () {
        var tween,
            that = this;
        this.rendertexture.renderXY(this.mapGroupSpriteImage, 0, 0, true);
        this.mapGroup.alpha = 0;
        tween = this.game.add.tween(this.mapGroup).to({alpha: 1}, 400, 'Linear', true, 0, 0);
        tween.onComplete.add(function () {
            that.backgroundRenderTexture.renderXY(that.mapGroupSpriteImage, 0, 0, true);
        });
        front = this.mapGroupSprite;
        back = this.backgroundMapWihileTheOtherLoadsGroup;
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
