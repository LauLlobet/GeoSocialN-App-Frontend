/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp"], function (undercore, rspv) {
    "use strict";
    function SpriteTreeTextSetter(spriteManagerPhaser) {
        this.spriteManagerPhaser = spriteManagerPhaser;
    }

    SpriteTreeTextSetter.prototype.setIsTyping = function setIsTyping(isTyping, tableEntryId) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId),
            spriteTreeTextSetter = tree.textSetter;
        if (isTyping) {
            spriteTreeTextSetter.startTyping();
        } else {
            spriteTreeTextSetter.stopTyping();
        }
    };
    SpriteTreeTextSetter.prototype.addChar = function addChar(tableEntryId, char) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId),
            spriteTreeTextSetter = tree.textSetter;
        spriteTreeTextSetter.addChar(char);
        return spriteTreeTextSetter.text;
    };

    SpriteTreeTextSetter.prototype.removeChar = function removeChar(tableEntryId) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId),
            spriteTreeTextSetter = tree.textSetter;
        spriteTreeTextSetter.removeChar();
        return spriteTreeTextSetter.text;
    };

    SpriteTreeTextSetter.prototype.unBury = function unBury(tableEntryId, buryLayerId) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId),
            spriteTreeTextSetter = tree.textSetter;
        spriteTreeTextSetter.unBury(buryLayerId);
        return spriteTreeTextSetter.text;
    };

    return SpriteTreeTextSetter;
});