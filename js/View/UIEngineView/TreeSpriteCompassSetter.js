define(["./TreeSpriteCompas"], function (TreeSpriteCompas) {
    "use strict";
    var groupx = 67,
        groupy = 230;


    function TreeCompasTextSetter(parentGroup, game) //noinspection JSLint
    {
        this.phaserGame = game;
        this.parentGroup = parentGroup;
        this.loadCompas();
    }
    TreeCompasTextSetter.prototype.loadCompas = function loadDigits(digits) {
        this.compassSetter = new TreeSpriteCompas(this.parentGroup, this.phaserGame, groupx, groupy);
    };
    TreeCompasTextSetter.prototype.setAngle = function setAngle(angle) {
        this.compassSetter.setAngle(angle);
    };

    return TreeCompasTextSetter;
});