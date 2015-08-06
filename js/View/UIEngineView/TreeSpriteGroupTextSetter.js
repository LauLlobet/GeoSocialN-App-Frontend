/**
 * Created by quest on 04/08/15.
 */
define([], function () {
    "use strict";
    function TreeSpriteGroupTextSetter(treeSpriteGroup, game) //noinspection JSLint
    {
        this.keymap = ",!?ABCDEFGHIJKLMNOPQRSTUVWXYZ./\\()_-[]{}:|'`=\"+^Ñ#0123456789";
        this.treeSpriteGroup = treeSpriteGroup;
        this.game = game;
    }

    TreeSpriteGroupTextSetter.prototype.createText = function createText(text) {
        this.fontText =  this.game.add.retroFont('carved', 120, 120, this.keymap, 5, 0, 0, 0, 0);
        this.textImage = this.game.add.image(0, 60, this.fontText);
        this.textImage.scale.x = 0.27 * 0.5;
        this.textImage.scale.y = 0.27 * 0.5;
        if (text === undefined) {
            text = "";
        }
        this.treeSpriteGroup.add(this.textImage);

        this.tmp.fontText = this.fontText;

        this.tmp.setTextUpdateFunctionsToGroup(this.treeSpriteGroup, this.fontText, this.keymap);
        this.tmp.group.setText(text);
    };
    return TreeSpriteGroupTextSetter;
});