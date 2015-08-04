/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp"], function (undercore, rspv) {
    "use strict";
    function SpriteTreeTextSetter(spriteManagerPhaser) {
        this.spriteManagerPhaser = spriteManagerPhaser;
    }

    SpriteTreeTextSetter.prototype.setIsTyping = function setIsTyping(isTyping, tableEntryId) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId);
        if (isTyping) {
            tree.startTyping();
        } else {
            tree.stopTyping();
        }
    };
    SpriteTreeTextSetter.prototype.addChar = function addChar(tableEntryId, char) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId);
        tree.addChar(char);
        return tree.text;
    };
    SpriteTreeTextSetter.prototype.removeChar = function removeChar(tableEntryId) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId);
        tree.removeChar();
        return tree.text;
    };

    return SpriteTreeTextSetter;
});