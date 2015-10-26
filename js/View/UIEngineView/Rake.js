/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
var rake;
define(["/OurTreeWeb/scenes/Constants.js"], function (constants ) {
    "use strict";
    function Rake(parentGroup, phaserGame, yOfLeafsBuryLayer, compassSpriteAbsolutePostion) //noinspection JSLint
    {
            this.parentGroup = parentGroup;
            this.compassSpriteAbsolutePostion = compassSpriteAbsolutePostion;
            this.createSpritesAndGroup(phaserGame);
            this.center();
            this.setScale(constants.rake.originalScale  );
            this.setXY(constants.rake.originalX, yOfLeafsBuryLayer + constants.rake.offsetOfBurryLine);
            this.constants = constants;
            this.setTween();
            this.setButtonInteraction();
    }
    Rake.prototype.createSpritesAndGroup = function createSpriteAndGroup(phaserGame) {
        this.game = phaserGame;
        this.phaserGame = phaserGame;
        this.group = this.phaserGame.add.group();
        this.parentGroup.add(this.group);
        this.createSprites();
    };
    Rake.prototype.createSprites = function createSprites() {
        this.rake = this.group.create(0, 0, 'rake');
    };
    Rake.prototype.center = function center() {
        this.rake.anchor.setTo(0.5, 0.5);
    };
    Rake.prototype.setXY = function setXY(x, y) {
        this.x = x;
        this.y = y;
        this.setXYfromSettedPosition();
    };
    Rake.prototype.setXYfromSettedPosition = function setXYfromSettedPosition() {
        this.group.x = this.x;
        this.group.y = this.y;
    };
    Rake.prototype.setScale = function setScale(scale) {
        this.scale = scale;
        this.setScalefromSetted();
    };
    Rake.prototype.setScalefromSetted = function setScalefromSetted() {
        this.rake.scale.x = this.scale;
        this.rake.scale.y = this.scale;
    };
    Rake.prototype.setXYScaleFromSetted = function setXYScaleFromSetted() {
        this.setXYfromSettedPosition();
        this.setScalefromSetted();
    };
    Rake.prototype.setAngle = function (angle) {
        if (this.onTheCompass) {
            this.game.add.tween(this.rake).to({
                angle: angle
            }, this.constants.rake.timing.timeToFollowAngle, 'Linear', true, 0, 0);
        }
    };
    Rake.prototype.disappeare = function () {
        var tween = this.game.add.tween(this.rake).to({
            alpha: 0,
        }, this.constants.rake.timing.rakeTweenToCompassMs, 'Linear', true, 0, 0);
        tween.onComplete.add(function () {
            this.destroy();
        }, this);
    };
    Rake.prototype.destroy = function () {
        this.game.tweens.remove(this.rake.initialTween);
        this.rake.destroy();
        this.rake = null;
    };

    Rake.prototype.setOnTheCompass = function (flag) {
        this.onTheCompass = flag;
    };

    Rake.prototype.setTween = function () {
        this.rake.initialTween = this.game.add.tween(this.rake.scale).to({
            x: this.constants.rake.scaleSizeWhenStillYoyo,
            y: this.constants.rake.scaleSizeWhenStillYoyo
        },
                this.constants.rake.scaleTweenWhenStillMilliseconds, 'Linear', true, 0, -1);
        this.rake.initialTween.yoyo(true, this.constants.rake.scaleTweenWhenStillMilliseconds);
    };
    Rake.prototype.setButtonInteraction = function () {
        this.rake.inputEnabled = true;
        this.rake.input.priorityID = 52;
        this.rake.useHandCursor = true;
        this.rake.events.onInputDown.add(function () {
            this.context.game.tweens.remove(this.context.rake.initialTween);
            this.context.rake.inputEnabled = false;
            this.context.rake.useHandCursor = false;
            this.context.goToCompass();
        }, {
            context : this
        });

    }

    Rake.prototype.goToCompass = function goToCompass() {
        var tween;
        this.rake.anchor.y = constants.rake.distanceFromTheCenter;
        rake = this.rake;
        this.setOnTheCompass(true);
        this.game.add.tween(this.rake).to({
            x: this.constants.rake.compassX,
            y: this.constants.rake.compassY
        }, this.constants.rake.timing.rakeTweenToCompassMs, 'Linear', true, 0, 0);

        tween = this.game.add.tween(this.rake.scale).to({
            x: this.constants.rake.scaleNearCompass,
            y: this.constants.rake.scaleNearCompass
        }, this.constants.rake.timing.rakeTweenToCompassMs, 'Linear', true, 0, 0);
        tween.onComplete.add(function () {
            this.rake.initialTween = this.game.add.tween(this.rake.scale).to({
                    x: this.constants.rake.scaleOscilationMaxDuringCompass,
                    y: this.constants.rake.scaleOscilationMaxDuringCompass
                },
                this.constants.rake.timing.yoyoNearCompass, 'Linear', true, 0, -1);
            this.rake.initialTween.yoyo(true, this.constants.rake.timing.yoyoNearCompass);
        }, this);
    };

    return Rake;
});