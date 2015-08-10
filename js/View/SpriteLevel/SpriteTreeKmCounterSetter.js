/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp"], function (undercore, rspv) {
    "use strict";
    function SpriteTreeKmCounterSetter(spriteManagerPhaser) {
        this.spriteManagerPhaser = spriteManagerPhaser;
    };
    SpriteTreeKmCounterSetter.prototype.setDistance = function setDistance(tableEntryId, distance) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId),
            spriteTreeKmSetter = tree.kmSetter;
        if (tree.kmSetter !== undefined) {
            spriteTreeKmSetter.setDistance(distance);
        }
    };
    return SpriteTreeKmCounterSetter;
});