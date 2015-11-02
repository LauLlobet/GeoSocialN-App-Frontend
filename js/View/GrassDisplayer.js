/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
var spirte = undefined;
define([], function () {
    function GrassDisplayer(phaserGame) {
        this.currentGrasses = [];
        this.borningLineY = 370;
        this.disappearingY = 650;
        this.offsetSqueareOfProbabilitiyToBePlanted = -100;
        this.probabilityToPlantInSwipe = 5;
        this.wideOfSqueareOfProbabilityToBePlanted = 700;
        this.heihgthOfSqueareOfProbabilityToBePlanted = 30;
        this.game = phaserGame.game;
        this.group = this.game.add.group();
    };
    GrassDisplayer.prototype.swipeLeft = function () {
        this.createNewGrass();
        this.tweenGrasses(true);
    };
    GrassDisplayer.prototype.swipeRight = function () {
        this.createNewGrass();
        this.tweenGrasses(false);
    };
    GrassDisplayer.prototype.createNewGrass = function () {
        var numgrass = Math.floor(Math.random() * this.probabilityToPlantInSwipe),
            i = 0;
        for (i = 0; i <  numgrass; i += 1) {
            this.plantOneGrass();
        }
    };
    GrassDisplayer.prototype.plantOneGrass = function () {
        var x = Math.floor(Math.random() * this.wideOfSqueareOfProbabilityToBePlanted) + this.offsetSqueareOfProbabilitiyToBePlanted,
            y = Math.random() * this.heihgthOfSqueareOfProbabilityToBePlanted + this.borningLineY,
            sprite;
        sprite = this.group.create(x, y, 'flower');
        this.currentGrasses.push(sprite);
    };
    GrassDisplayer.prototype.tweenGrasses = function (leftTrueRightFalse) {
        var i;
        for (i = 0; i < this.currentGrasses.length; i += 1) {
            this.tweenSpecificGrass(this.currentGrasses[i], leftTrueRightFalse);
        }
    };

    GrassDisplayer.prototype.tweenSpecificGrass = function (sprite, leftTrueRightFalse) {
        var newX = sprite.x + 2,
            newY = sprite.y + 30;
        this.game.add.tween(sprite).to({x: newX, y: newY}, 1000, 'Linear', true, 0, 0);

    }

    return GrassDisplayer;
});
