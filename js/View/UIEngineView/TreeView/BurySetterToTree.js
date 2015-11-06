define([], function () {
    "use strict";
    var  BURYSTR = "*bury",
        LOCKSTR = "*passwd:",
        TEXTLENGTH = 16;

    function BurySetterToTree(game, treeBuryGroup, gestureObserver) //noinspection JSLint
    {
            this.linklayers = [];
            this.leafs = undefined;
            this.lock = undefined;
            this.game = game;
            this.treeBuryGroup = treeBuryGroup;
            this.gestureObserver = gestureObserver;
    }

    BurySetterToTree.prototype.setUnburiedLayers = function setUnburiedLayers(unburiedLayers) {
        this.unburiedLayers = unburiedLayers;
    };

    BurySetterToTree.prototype.setEditing = function setEditing(editing) {
        this.editing = editing;
    };
    BurySetterToTree.prototype.handleBuringTextCases = function handleBuringTextCases(text) {
        this.text = text;
        this.buryMessageInLayerOrderAccordingToFirstAppearance();
        if (this.editing) {
            this.setBuryLayersToAlpha();
        } else {
            this.setBuryLayersToSolid();
        }
    };
    BurySetterToTree.prototype.buryMessageInLayerOrderAccordingToFirstAppearance = function buryMessageInLayerOrderAccordingToFirstAppearance() {
        var lockPosition = this.findLineOfCharacterInText(LOCKSTR),
            leafPosition = this.findLineOfCharacterInText(BURYSTR);
        if (lockPosition > leafPosition) {
            this.buryMessageIfNecesary();
            this.buryMessageLeafsIfNecesary();
        } else {
            this.buryMessageLeafsIfNecesary();
            this.buryMessageIfNecesary();
        }
    };


    BurySetterToTree.prototype.unBury = function (buryLayerId, temporary) {
        var mainTween,
            lockTween,
            sprite = buryLayerId === 'leafs' ? this.leafs : this.lock;

        try {
            if (sprite !== undefined) {
                mainTween = this.game.add.tween(sprite).to({alpha: 0}, 200, 'Linear', true, 0, 0);
                mainTween.onComplete.add(function () {
                    if (sprite !== undefined) {
                        sprite.alpha = 0;
                        sprite.destroy();
                        sprite = undefined;
                    }
                }, this);
            }
            if (this.lockpick !== undefined && buryLayerId === "lock") {
                lockTween = this.game.add.tween(this.lockpick).to({alpha: 0}, 200, 'Linear', true, 0, 0);
                lockTween.onComplete.add(function () {
                    this.lockpick.destroy();
                    this.lockpick = undefined;
                }, this);
            }

        } catch (err) {
            alert(err.message);
            console.log(err.stack);
        }
    };
    BurySetterToTree.prototype.buryMessageFromLine = function (group, lineNo, spritename, buryLayerId) {
        var charposX = -10,
            charposY = 21.5 * lineNo,
            tmp,
            scale = 1.3;
        tmp = group.create(charposX, charposY, spritename);
        tmp.scale.x = tmp.scale.y = scale;
        if (spritename === "lock") {
            this.setLockPick(group, tmp.x, tmp.y, tmp.scale.x);
        }
        if (spritename === "leafs") {
            this.leafsLineY = charposY;
        } else {
            this.leafsLineY = undefined;
        }
        this[buryLayerId] = tmp;
    };

    BurySetterToTree.prototype.getHeightOfLeafBuryLayer = function () {
        return this.leafsLineY;
    };
    BurySetterToTree.prototype.setBuryLayersToClickable = function setBuryLayersToClickable(layerSpirte) {
        this.setSpriteToClickableOrNot(layerSpirte, true);
    };
    BurySetterToTree.prototype.setBuryLayersToNotClickable = function setBuryLayersToClickable(layerSpirte) {
        this.setSpriteToClickableOrNot(layerSpirte, false);
    };
    BurySetterToTree.prototype.setSpriteToClickableOrNot = function setSpriteToClickavleOrNot(tmp, bool) {
        tmp.inputEnabled = bool;
        if (bool) {
            tmp.input.priorityID = 50;
        }
    };
    BurySetterToTree.prototype.setLockPick = function (group, x, y, scale) {
        var charposX = x + 60,
            charposY = y + 50,
            tmp;
        tmp = group.create(charposX, charposY, "lockpick");
        tmp.scale.x = tmp.scale.y = scale;
        tmp.inputEnabled = true;
        tmp.input.priorityID = 52;
        tmp.useHandCursor = true;
        tmp.events.onInputDown.add(function () {
            this.gestureObserver.buriedLayerEvent(this.eventId);
        }, {eventId : "lock",
            gestureObserver : this.gestureObserver
            });
        this.lockpick = tmp;

    };
    BurySetterToTree.prototype.buryMessageLeafsIfNecesary  = function buryMessageLeafsIfNecesary() {
        var line = this.findLineOfCharacterInText(BURYSTR);
        if (this.lineWithThatCharExistsOnText(line) &&
                 this.hasntBeenUnburied('leafs') &&
                 this.buryLayerNotAlreadyExists('leafs')) {
            this.buryMessageFromLine(this.treeBuryGroup, line, 'leafs', 'leafs');
        }
    };

    BurySetterToTree.prototype.buryMessageIfNecesary  = function buryMessageIfNecesary() {
        var line = this.findLineOfCharacterInText(LOCKSTR);
        if (this.lineWithThatCharExistsOnText(line)
                && this.hasntBeenUnburied('lock')
                && this.buryLayerNotAlreadyExists('lock')
             ) {
            this.buryMessageFromLine(this.treeBuryGroup, line, 'lock', 'lock');
        }
    };


    BurySetterToTree.prototype.destroyBuryLayers = function destroyBuryLayers() {
        this.treeBuryGroup.removeAll(true, false);
        this.destroyLayer("lockpick");
        this.destroyLayer("lock");
        this.destroyLayer("leafs");
    };
    BurySetterToTree.prototype.destroyLayer = function destroyLayer(layerName) {
        var layer = this[layerName];
        if (layer === undefined) {
            return;
        }
        this[layerName] = undefined;
        layer.destroy();
    };

    BurySetterToTree.prototype.hasntBeenUnburied = function hasntBeenUnBuried(id) {
        return this.unburiedLayers === undefined || this.unburiedLayers[id] === undefined;
    };

    BurySetterToTree.prototype.lineWithThatCharExistsOnText = function lineWithThatCharExistsOnText(line) {
        return line !== -1;
    };

    BurySetterToTree.prototype.setBuryLayersToAlpha  = function setBuryLayersToAlpha() {
        if (this.buryLayerAlreadyExists("lockpick")) {
            this.lockpick.alpha = 0
            this.setBuryLayersToNotClickable(this.lockpick);
        }
        if (this.buryLayerAlreadyExists("lock")) {
            this.lock.alpha = 0.2;
            this.setBuryLayersToNotClickable(this.lock);
        }
        if (this.buryLayerAlreadyExists("leafs")) {
            this.leafs.alpha = 0.2;
            this.setBuryLayersToNotClickable(this.leafs);
        }
    };
    BurySetterToTree.prototype.setBuryLayersToSolid  = function setBuryLayersToSolid() {
        if (this.buryLayerAlreadyExists("lockpick")) {
            this.lockpick.alpha = 1
            this.setBuryLayersToClickable(this.lockpick);
        }
        if (this.buryLayerAlreadyExists("lock")) {
            this.lock.alpha = 1;
            this.setBuryLayersToClickable(this.lock);
        }
        if (this.buryLayerAlreadyExists("leafs")) {
            this.leafs.alpha = 1;
            this.setBuryLayersToClickable(this.leafs);
        }
    };
    BurySetterToTree.prototype.buryLayerAlreadyExists = function (buryLayerName) {
        return this[buryLayerName] !== undefined;
    };
    BurySetterToTree.prototype.buryLayerNotAlreadyExists = function (buryLayerName) {
        return !this.buryLayerAlreadyExists(buryLayerName);
    };
    BurySetterToTree.prototype.regexIndexOf = function (string, regex, startpos) {
        var indexOf = string.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    };
    BurySetterToTree.prototype.toInteresparceRegexp = function (string, char) {
        var i,
            regexp = "",
            toconvert;
        toconvert = string.replace("*", "\\*");
        for (i = 0; i < toconvert.length; i += 1) {
            regexp += toconvert.charAt(i);
            if (toconvert.charAt(i) !== '\\') {
                regexp += "[" + char + "]*";
            }
        }
        return regexp;
    };

    BurySetterToTree.prototype.findLineOfCharacterInText = function (substr) {
        var regexp = this.toInteresparceRegexp(substr, "\n"), // to count line numbers ommiting the fact that /n are two chars
            charPos = this.regexIndexOf(this.text, regexp);
        return Math.floor(charPos / TEXTLENGTH);
    };
    return BurySetterToTree;
});