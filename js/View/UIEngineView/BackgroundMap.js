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
        this.slidingBackgroundMapWhilOtherLoads = this.game.add.group();
        this.mapGroup = this.game.add.group();

        this.rendertexture = this.game.add.renderTexture(this.mapGroupSpriteImage.width, this.mapGroupSpriteImage.height, 'name', true);
        this.backgroundRenderTexture = this.game.add.renderTexture(this.mapGroupSpriteImage.width, this.mapGroupSpriteImage.height, 'name', true);
        this.slidingBackgroundRenderTexture = this.game.add.renderTexture(this.mapGroupSpriteImage.width, this.mapGroupSpriteImage.height, 'name', true);

        this.backgroundMapWihileTheOtherLoadsGroup.create(x, y, this.backgroundRenderTexture);
        this.mapGroupSprite = this.mapGroup.create(x, y, this.rendertexture);
        this.slidingBackgroundMapWhilOtherLoads.create(x, y, this.slidingBackgroundRenderTexture);


        this.shineGroup = this.game.add.group();
        this.completionSprite = this.game.add.graphics(0, 0);
        this.completionSprite.beginFill(0xFFFFFF, 1);
        this.completionSprite.boundsPadding = 0;
        this.completionSprite.bounds = new PIXI.Rectangle(0, 0, this.mapGroupSpriteImage.width, this.mapGroupSpriteImage.height);
        this.completionSprite.drawRect(0, 0,  this.mapGroupSpriteImage.width, this.mapGroupSpriteImage.height);
        this.shineGroup.add(this.completionSprite);
        this.shineGroup.position.y = 340;
        this.shineGroup.alpha = 0;

    }


    BackgroundMap.prototype.justDisplayedATreeSoDisplayAMap = function (tree) {
        var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + tree.y + ',' + tree.x + '&zoom=15&size=500x300&maptype=roadmap&key=AIzaSyARLL06eu1X3HSK4HpwHGFVbQDuOPWekh8';
        this.dynamicLoadImage(this.game, x, y, url, 'dinmap', undefined);
    };
    BackgroundMap.prototype.displayMap = function () {
        var tween,
            that = this,
            shinetween;
        this.rendertexture.renderXY(this.mapGroupSpriteImage, 0, 0, true);
        this.mapGroup.alpha = 0;
        tween = this.game.add.tween(this.mapGroup).to({alpha: 1}, 400, 'Linear', true, 0, 0);

        this.game.add.tween(this.slidingBackgroundMapWhilOtherLoads).to({y: 500}, 400, 'Linear', true, 0, 0);

        shinetween = this.game.add.tween(this.shineGroup).to({alpha: 1}, 180, 'Linear', true, 0, 0);
        shinetween.onComplete.add(function(){
            that.game.add.tween(that.shineGroup).to({alpha: 0}, 100, 'Linear', true, 0, 0);
        })

        tween.onComplete.add(function () {
            that.backgroundRenderTexture.renderXY(that.mapGroupSpriteImage, 0, 0, true);
            that.slidingBackgroundRenderTexture.renderXY(that.mapGroupSpriteImage, 0, 0, true);
            that.game.add.tween(that.slidingBackgroundMapWhilOtherLoads).to({y: 0}, 1, 'Linear', true, 0, 0);
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
