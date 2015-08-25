/**
 * Created by quest on 04/08/15.
 */
define([], function () {
    "use strict";
    var TEXTLENGTH = 16;
    function TreeSpriteGroupTextSetter(treeSpriteGroup, game, gestureObserver) //noinspection JSLint
    {
        this.keymap = ",!?ABCDEFGHIJKLMNOPQRSTUVWXYZ./\\()_-[]{}:|'`=\"+*$#0123456789";
        this.treeSpriteGroup = treeSpriteGroup;
        this.game = game;
        this.fontText =  this.game.add.retroFont('carved', 120, 120, this.keymap, 5, 0, 0, 0, 0);
        this.gestureObserver = gestureObserver;
    }
    TreeSpriteGroupTextSetter.prototype.createText = function createText(text, unburiedLayers) {
        this.textImage = this.game.add.image(0, 60, this.fontText);
        this.textImage.scale.x = 0.27 * 0.5;
        this.textImage.scale.y = 0.27 * 0.5;
        if (text === undefined) {
            text = "";
        }
        this.unburiedLayers = unburiedLayers;
        this.treeSpriteGroup.add(this.textImage);
        this.treeSpriteGroup.fontText = this.fontText;
        this.treeSpriteGroup.keymap = this.keymap;
        this.setText(text);
    };
    TreeSpriteGroupTextSetter.prototype.setText = function setText(text) {
        var formatedText =  this.formatText(text);
        this.setInteractiveLinksToRetroText(this.treeSpriteGroup, formatedText);
        this.fontText.setText(formatedText, true, -30, 15, this.keymap, 10);
        this.text = text;
        this.buryMessageInLayerOrderAccordingToFirstAppearance();
        this.unBuryMessageIfNecesary();
        if (this.editing) {
            this.setBuryLayersToAlpha();
        } else {
            this.setBuryLayersToSolid();
        }
    };

    TreeSpriteGroupTextSetter.prototype.buryMessageInLayerOrderAccordingToFirstAppearance = function buryMessageInLayerOrderAccordingToFirstAppearance() {
        var lockPosition = this.findLineOfCharacterInText('$'),
            leafPosition = this.findLineOfCharacterInText('*');
        if (lockPosition > leafPosition) {
            this.buryMessageIfNecesary();
            this.buryMessageLeafsIfNecesary();
        } else {
            this.buryMessageLeafsIfNecesary();
            this.buryMessageIfNecesary();
        }
    };
    TreeSpriteGroupTextSetter.prototype.addChar = function addChar(char) {
        this.editing = true;
        this.setText(this.text + char);
    };
    TreeSpriteGroupTextSetter.prototype.removeChar = function removeChar() {
        this.setText(this.text.substring(0, this.text.length - 1));
    };
    TreeSpriteGroupTextSetter.prototype.startTyping = function startTyping() {
        this.editing = true;
        this.setText(this.text);
    };
    TreeSpriteGroupTextSetter.prototype.stopTyping = function stopTyping() {
        this.editing = false;
        this.setText(this.text);
    };
    TreeSpriteGroupTextSetter.prototype.formatText = function (text) {
        var textreturned = "",
            length =  TEXTLENGTH,
            j;
        text = text.toUpperCase();
        if (this.editing === true) {
            text = text + "}"; // per evitar que quedi tallada la ultima lletra i per mostrar el cursor
        } else {
            text = text + " "; // per evitar que quedi tallada la ultima lletra i per mostrar el cursor
        }
        for (j = 0; j < text.length; j = j + length) {
            textreturned += text.substring(j, j + length) + "\n";
        }
        textreturned += text.substring(j) + "\n";
        return textreturned;
    };

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    TreeSpriteGroupTextSetter.prototype.setInteractiveLinksToRetroText = function (group, formatedText) {
        var initCharposX = 1,//this.textImage.x,
            charposX = initCharposX,
            charposY = 60,//this.textImage.y,
            charposXInc = 12.5,
            charposYInc = 18.5,
            tmp,
            currentLink = "",
            currentLinkCells = [],
            isPartOfTheAdress = false,
            linklayers = [],
            links = [],
            x,
            c,
            i,
            j;

        for (x = 0, c = ''; c = formatedText.charAt(x); x++) {
            if (c === '#' && isPartOfTheAdress === false) {
                isPartOfTheAdress = true;
            } else if (isPartOfTheAdress && !isNumeric(c)) {
                isPartOfTheAdress = false;
                linklayers.push(currentLinkCells);
                currentLinkCells = [];
                links.push(parseInt(currentLink));
                currentLink = "";
            }

            if (isPartOfTheAdress) {
                tmp = group.create(charposX, charposY, 'linkLayer');
                tmp.scale.x = tmp.scale.y = 1.2;
                currentLinkCells.push(tmp);
                if (isNumeric(c)) {
                    currentLink = currentLink + c;
                }
            }
            if (c === '\n') {
                charposY += charposYInc;
                charposX = initCharposX;
            } else {
                charposX += charposXInc;
            }
        }

        for (i = 0; i < linklayers.length; i++) {
            for (j = 0; j < linklayers[i].length; j++) {
                linklayers[i][j].inputEnabled = true;
                linklayers[i][j].input.priorityID = 1;
                linklayers[i][j].useHandCursor = true;
                linklayers[i][j].events.onInputDown.add(function () {
                    this.gestureObserver.linkClicked(this.id);
                }, {
                    id: links[i],
                    gestureObserver: this.gestureObserver
                });
            }
        }
    };
    TreeSpriteGroupTextSetter.prototype.unBury = function (buryLayerId, temporary) {
        if (this[buryLayerId] !== undefined) {
            this[buryLayerId].destroy();
            this[buryLayerId] = undefined;
        }
        if (this[buryLayerId + "pick"] !== undefined) {
            this[buryLayerId + "pick"].destroy();
            this[buryLayerId + "pick"] = undefined;
        }
        if (temporary === undefined) {
            this.unburiedLayers[buryLayerId] = true;
        }
    };
    TreeSpriteGroupTextSetter.prototype.buryMessageFromLine = function (group, lineNo, spritename, buryLayerId){
        var charposX = -10,
            charposY = 52 + 17.2 * lineNo,
            tmp,
            scale = 1.3;
        tmp = group.create(charposX, charposY, spritename);
        tmp.scale.x = tmp.scale.y = scale;
        if (spritename === "lock") {
            this.setLockPick(group, tmp.x, tmp.y, tmp.scale.x);
        }
        this[buryLayerId] = tmp;
    };

    TreeSpriteGroupTextSetter.prototype.setLockPick = function (group, x, y, scale) {
        var charposX = x + 60,
            charposY = y + 50,
            tmp;
        tmp = group.create(charposX, charposY, "lockpick");
        tmp.scale.x = tmp.scale.y = scale;
        tmp.inputEnabled = true;
        tmp.input.priorityID = 1;
        tmp.useHandCursor = true;
        tmp.events.onInputDown.add(function () {
            this.gestureObserver.buriedLayerEvent(this.eventId);
        }, {eventId : "lock",
            gestureObserver : this.gestureObserver
            });
        this["lockpick"] = tmp;
    };
    TreeSpriteGroupTextSetter.prototype.buryMessageLeafsIfNecesary  = function buryMessageLeafsIfNecesary() {
        var line = this.findLineOfCharacterInText('*');
        if ( this.lineWithThatCharExistsOnText(line) &&
            this.hasntBeenUnburied('leafs') &&
            this.buryLayerNotAlreadyExists('leafs')) {
            this.buryMessageFromLine(this.treeSpriteGroup, line, 'leafs', 'leafs');
        }
    };
    TreeSpriteGroupTextSetter.prototype.unBuryMessageIfNecesary  = function unBuryMessageLeafsIfNecesary() {
        var line = this.findLineOfCharacterInText('*');
        if (!this.lineWithThatCharExistsOnText(line)) {
            this.unBury("leafs", true);
        }
        line = this.findLineOfCharacterInText('$');
        if (!this.lineWithThatCharExistsOnText(line)) {
            this.unBury("lock", true);
        }
    };

    TreeSpriteGroupTextSetter.prototype.buryMessageIfNecesary  = function buryMessageIfNecesary() {
        var line = this.findLineOfCharacterInText('$');
        if ( this.lineWithThatCharExistsOnText(line) &&
            this.hasntBeenUnburied('lock') &&
            this.buryLayerNotAlreadyExists('lock') ) {
            this.buryMessageFromLine(this.treeSpriteGroup, line, 'lock', 'lock');
        }
    };

    TreeSpriteGroupTextSetter.prototype.hasntBeenUnburied = function hasntBeenUnBuried(id) {
        return this.unburiedLayers === undefined || this.unburiedLayers[id] === undefined ;
    }

    TreeSpriteGroupTextSetter.prototype.lineWithThatCharExistsOnText = function lineWithThatCharExistsOnText(line) {
        return line !== -1;
    }

    TreeSpriteGroupTextSetter.prototype.setBuryLayersToAlpha  = function setBuryLayersToAlpha() {
        if(this.buryLayerAlreadyExists("lockpick")){
            this["lockpick"].alpha = 0
        }
        if(this.buryLayerAlreadyExists("lock")){
            this["lock"].alpha = 0.2;
        }
        if(this.buryLayerAlreadyExists("leafs")){
            this["leafs"].alpha = 0.2;
        }
    };

    TreeSpriteGroupTextSetter.prototype.setBuryLayersToSolid  = function setBuryLayersToSolid() {
        if(this.buryLayerAlreadyExists("lockpick")){
            this["lockpick"].alpha = 1
        }
        if(this.buryLayerAlreadyExists("lock")){
            this["lock"].alpha = 1;
        }
    };

    TreeSpriteGroupTextSetter.prototype.buryLayerAlreadyExists = function (buryLayerName) {
        return this[buryLayerName] !== undefined;
    }

    TreeSpriteGroupTextSetter.prototype.buryLayerNotAlreadyExists = function (buryLayerName) {
        return !this.buryLayerAlreadyExists(buryLayerName);
    }

    TreeSpriteGroupTextSetter.prototype.findLineOfCharacterInText = function (char) {
        var x, c;
        for (x = 0, c = ''; c = this.text.charAt(x); x = x + 1) {
            if (c === char) {
                return x / TEXTLENGTH;
            }
        }
        return -1;
    };

    return TreeSpriteGroupTextSetter;
});