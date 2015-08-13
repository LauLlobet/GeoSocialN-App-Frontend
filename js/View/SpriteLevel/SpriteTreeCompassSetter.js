/*jslint todo: true */
define(['../../lib/underscore', "../../lib/rsvp"], function (undercore, rspv) {
    "use strict";
    function SpriteTreeCompassSetterSetter(spriteManagerPhaser) {
        this.spriteManagerPhaser = spriteManagerPhaser;
    };
    SpriteTreeCompassSetterSetter.prototype.setAngle = function setAngle(tableEntryId, angle) {
        var tree = this.spriteManagerPhaser.findTreeSpriteGroupByName(tableEntryId),
            spriteTreeCompassSetter = tree.compassSetter;
        if (spriteTreeCompassSetter !== undefined) {
            spriteTreeCompassSetter.setAngle(angle);
        }
    };
    return SpriteTreeCompassSetterSetter;
});