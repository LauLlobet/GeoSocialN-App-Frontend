define(["./TreeSpriteCompas"], function (TreeSpriteCompas) {
    "use strict";
    var groupx = 55,
        groupy = 258; // abans ended 88
    function TreeCompasTextSetter(parentGroup, game) //noinspection JSLint
    {
            this.phaserGame = game;
            this.parentGroup = parentGroup;
            this.loadCompas();
    }
    TreeCompasTextSetter.prototype.loadCompas = function loadCompas() {
        this.compassSetter = new TreeSpriteCompas(this.parentGroup, this.phaserGame, groupx, groupy);
    };
    TreeCompasTextSetter.prototype.setAngle = function setAngle(angle) {
        this.compassSetter.setAngle(angle);
    };
    TreeCompasTextSetter.prototype.getCompassPosition = function getCompasPostion() {
        return this.compassSetter.background.world;
    };

    return TreeCompasTextSetter;
});