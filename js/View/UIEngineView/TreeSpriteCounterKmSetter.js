define(["../UIEngineView/TreeSpriteKmDigit"], function (TreeSpriteKmDigit) {
    "use strict";
    var groupx = 13,
        inc = 20,
        groupy = 340;


    function TreeSpriteGroupTextSetter(treeSpriteGroup, game) //noinspection JSLint
    {
        this.phaserGame = game;
        this.treeSpriteGroup = treeSpriteGroup;
        this.counterGroup = this.phaserGame.add.group();
        this.treeSpriteGroup.add(this.counterGroup);
        this.digits = {};
        this.loadDigits(9);
    }

    TreeSpriteGroupTextSetter.prototype.loadDigits = function loadDigits(digits) {
        var i;
        this.amountOfDigits = digits;
        for (i = 0; i < digits; i = i + 1) {
            this.digits[i] = new TreeSpriteKmDigit(groupx + (inc * i), groupy, this.phaserGame, this.counterGroup);
        }
    };
    TreeSpriteGroupTextSetter.prototype.setDistance = function setKm(km) {
        var strkm = "" + km + "k";
        for ( var k = 0; k < this.amountOfDigits; k++) {
            if (strkm.length > k) {
                this.digits[ (this.amountOfDigits - strkm.length) + k].setDigit(strkm.charAt(k));
            }
        }
    };

    return TreeSpriteGroupTextSetter;
});