/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp"], function (undercore, rspv) {
    "use strict";
    function SpriteTreeRakeSetter(spriteManagerPhaser) {
        this.spriteManagerPhaser = spriteManagerPhaser;
    };
    SpriteTreeRakeSetter.prototype.setAngle = function setAngle(tableEntryId, angle) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId),
            spriteTreeCompassSetter = tree.rakeSetter;
        if (spriteTreeCompassSetter !== undefined) {
            spriteTreeCompassSetter.setAngle(angle);
        }
    };

    SpriteTreeRakeSetter.prototype.disappeare = function disappeare(tableEntryId) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId),
            spriteTreeCompassSetter = tree.rakeSetter;
        if (spriteTreeCompassSetter !== undefined) {
            spriteTreeCompassSetter.disappeare();
        }
    };
    return SpriteTreeRakeSetter;
});