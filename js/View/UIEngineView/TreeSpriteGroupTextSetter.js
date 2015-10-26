/**
 * Created by quest on 04/08/15.
 */
define([], function () {
    "use strict";
    var TEXTLENGTH = 16,
        LOCKSTR = "*passwd:",
        BURYSTR = "*bury",
        LINKSTR = "#";
    function TreeSpriteGroupTextSetter(treeSpriteGroup, treeBuryGroup, game, gestureObserver) //noinspection JSLint
    {
        this.treeSpriteGroup = treeSpriteGroup;
        this.game = game;
        this.gestureObserver = gestureObserver;
        this.treeBuryGroup = treeBuryGroup;
    }
    TreeSpriteGroupTextSetter.prototype.createText = function createText(text, unburiedLayers) {
        this.unburiedLayers = unburiedLayers;
        this.setText(text);
    };
    TreeSpriteGroupTextSetter.prototype.setText = function setText(text) {
        this.rewriteTextAtributeWithNewTextAndFormatIt(text);
        this.deletePreviousTreesSprites();
        this.addTextImage();
        this.setInteractiveLinksToRetroText();
        this.handleBuringTextCases();
    };
    TreeSpriteGroupTextSetter.prototype.rewriteTextAtributeWithNewTextAndFormatIt = function rewriteTextAtributeWithNewTextAndFormatIt(text) {
        if (text === undefined) {
            text = "";
        }
        this.text = this.turnReturnIntoSpaces(text);
        this.formatedText =  this.formatText(text);
    };
    TreeSpriteGroupTextSetter.prototype.deletePreviousTreesSprites = function deletePreviousTreesSprites() {
        if (this.textImage !== undefined) {
            this.textImage.destroy();
        }
        this.removeLinks();
        this.destroyBuryLayers();
    };
    TreeSpriteGroupTextSetter.prototype.destroyBuryLayers = function destroyBuryLayers() {
        this.treeBuryGroup.removeAll(true, false);
        this.destroyLayer("lockpick");
        this.destroyLayer("lock");
        this.destroyLayer("leafs");
    };
    TreeSpriteGroupTextSetter.prototype.destroyLayer = function destroyLayer(layerName) {
        var layer = this[layerName];
        if (layer === undefined) {
            return;
        }
        this[layerName] = undefined;
        layer.destroy();
    };
    TreeSpriteGroupTextSetter.prototype.addTextImage = function addTextImage() {
        var tmp = this.game.add.bitmapText(4, 60, 'ubuntu', this.formatedText, 24);
        this.textImage =  this.treeSpriteGroup.create(0, 0, tmp.generateTexture());
        tmp.destroy();
        this.textImage.scale.x = 0.90;
        this.textImage.scale.y = 0.90;
    };
    TreeSpriteGroupTextSetter.prototype.handleBuringTextCases = function handleBuringTextCases() {
        this.buryMessageInLayerOrderAccordingToFirstAppearance();
        if (this.editing) {
            this.setBuryLayersToAlpha();
        } else {
            this.setBuryLayersToSolid();
        }
    };
    TreeSpriteGroupTextSetter.prototype.buryMessageInLayerOrderAccordingToFirstAppearance = function buryMessageInLayerOrderAccordingToFirstAppearance() {
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
        text = this.turnReturnIntoSpaces(text);
        if (this.editing === true) {
            text = text + "|"; // per evitar que quedi tallada la ultima lletra i per mostrar el cursor
        } else {
            text = text + " "; // per evitar que quedi tallada la ultima lletra i per mostrar el cursor
        }
        for (j = 0; j < text.length; j = j + length) {
            textreturned += text.substring(j, j + length) + "\n";
        }
        textreturned += text.substring(j) + "\n";
        return textreturned;
    };

    TreeSpriteGroupTextSetter.prototype.turnReturnIntoSpaces = function (inputText) {
        var spaces = "",
            nspaces = TEXTLENGTH - (inputText.indexOf("\t") % TEXTLENGTH),
            i;
        for (i = 0; i < nspaces; i = i + 1) {
            spaces += " ";
        }
        inputText = inputText.replace("\t", spaces);
        return inputText;
    }

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
            j,
            group = this.treeSpriteGroup,
            formatedText = this.formatedText;

        for (x = 0, c = ''; c = formatedText.charAt(x); x++) {
            if (c === LINKSTR && isPartOfTheAdress === false) {
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
        this.linklayers = linklayers;
    };
    TreeSpriteGroupTextSetter.prototype.removeLinks = function removeLinks() {
        if (this.linklayers === undefined) {
            return;
        }
        var i, j;
        for (i = 0; i < this.linklayers.length; i++) {
            for (j = 0; j < this.linklayers[i].length; j++) {
                this.linklayers[i][j].destroy();
            }
        }
    };
    TreeSpriteGroupTextSetter.prototype.unBury = function (buryLayerId, temporary) {
        var mainTween,
            lockTween,
            that = this;
        if (this[buryLayerId] !== undefined) {
            mainTween = this.game.add.tween(this[buryLayerId]).to({alpha: 0}, 200, 'Linear', true, 0, 0);
            mainTween.onComplete.add(function() {
                that[buryLayerId].destroy();
                that[buryLayerId] = undefined;
            }, this);
        }
        if (this[buryLayerId + "pick"] !== undefined) {
            lockTween = this.game.add.tween(this[buryLayerId + "pick"]).to({alpha: 0}, 200, 'Linear', true, 0, 0);
            lockTween.onComplete.add(function() {
                that[buryLayerId + "pick"].destroy();
                that[buryLayerId + "pick"] = undefined;
            }, this);
        }
        if (temporary === undefined) {
            this.unburiedLayers[buryLayerId] = true;
        }
    };
    TreeSpriteGroupTextSetter.prototype.buryMessageFromLine = function (group, lineNo, spritename, buryLayerId) {
        var charposX = -10,
            charposY = 21.5 * lineNo,
            tmp,
            scale = 1.3;
        tmp = group.create(charposX, charposY, spritename);
        tmp.scale.x = tmp.scale.y = scale;
        if (spritename === "lock") {
            this.setLockPick(group, tmp.x, tmp.y, tmp.scale.x);
        }
        if (spritename == "leafs") {
            this.leafsLineY = charposY;
        } else {
            this.leafsLineY = undefined;
        }
        this[buryLayerId] = tmp;
    };

    TreeSpriteGroupTextSetter.prototype.getHeightOfLeafBuryLayer = function () {
        return this.leafsLineY;
    }

    TreeSpriteGroupTextSetter.prototype.setBuryLayersToClickable = function setBuryLayersToClickable(layerSpirte) {
        this.setSpriteToClickableOrNot(layerSpirte, true);
    };
    TreeSpriteGroupTextSetter.prototype.setBuryLayersToNotClickable = function setBuryLayersToClickable(layerSpirte) {
        this.setSpriteToClickableOrNot(layerSpirte, false);
    };
    TreeSpriteGroupTextSetter.prototype.setSpriteToClickableOrNot = function setSpriteToClickavleOrNot(tmp,bool) {
        tmp.inputEnabled = bool;
        if (bool) {
            tmp.input.priorityID = 50;
        }
    }
    TreeSpriteGroupTextSetter.prototype.setLockPick = function (group, x, y, scale) {
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
        this["lockpick"] = tmp;

    };
    TreeSpriteGroupTextSetter.prototype.buryMessageLeafsIfNecesary  = function buryMessageLeafsIfNecesary() {
        var line = this.findLineOfCharacterInText(BURYSTR);
        if ( this.lineWithThatCharExistsOnText(line) &&
            this.hasntBeenUnburied('leafs') &&
            this.buryLayerNotAlreadyExists('leafs')) {
            this.buryMessageFromLine(this.treeBuryGroup, line, 'leafs', 'leafs');
        }
    };
    TreeSpriteGroupTextSetter.prototype.unBuryMessageIfNecesary  = function unBuryMessageLeafsIfNecesary() {
        var line = this.findLineOfCharacterInText(BURYSTR);
        if (!this.lineWithThatCharExistsOnText(line)) {
            this.unBury("leafs", true);
        }
        line = this.findLineOfCharacterInText(LOCKSTR);
        if (!this.lineWithThatCharExistsOnText(line)) {
            this.unBury("lock", true);
        }
    };

    TreeSpriteGroupTextSetter.prototype.buryMessageIfNecesary  = function buryMessageIfNecesary() {
        var line = this.findLineOfCharacterInText(LOCKSTR);
        if (this.lineWithThatCharExistsOnText(line)
                  && this.hasntBeenUnburied('lock')
                  && this.buryLayerNotAlreadyExists('lock')
        ) {
            this.buryMessageFromLine(this.treeBuryGroup, line, 'lock', 'lock');
        }
    };

    TreeSpriteGroupTextSetter.prototype.hasntBeenUnburied = function hasntBeenUnBuried(id) {
        return this.unburiedLayers === undefined || this.unburiedLayers[id] === undefined;
    }

    TreeSpriteGroupTextSetter.prototype.lineWithThatCharExistsOnText = function lineWithThatCharExistsOnText(line) {
        return line !== -1;
    }

    TreeSpriteGroupTextSetter.prototype.setBuryLayersToAlpha  = function setBuryLayersToAlpha() {
        if(this.buryLayerAlreadyExists("lockpick")){
            this["lockpick"].alpha = 0
            this.setBuryLayersToNotClickable(this["lockpick"]);
        }
        if(this.buryLayerAlreadyExists("lock")){
            this["lock"].alpha = 0.2;
            this.setBuryLayersToNotClickable(this["lock"]);
        }
        if(this.buryLayerAlreadyExists("leafs")){
            this["leafs"].alpha = 0.2;
            this.setBuryLayersToNotClickable(this["leafs"]);
        }
    };

    TreeSpriteGroupTextSetter.prototype.setBuryLayersToSolid  = function setBuryLayersToSolid() {
        if(this.buryLayerAlreadyExists("lockpick")){
            this["lockpick"].alpha = 1
            this.setBuryLayersToClickable(this["lockpick"]);
        }
        if(this.buryLayerAlreadyExists("lock")){
            this["lock"].alpha = 1;
            this.setBuryLayersToClickable(this["lock"]);
        }
        if(this.buryLayerAlreadyExists("leafs")){
            this["leafs"].alpha = 1;
            this.setBuryLayersToClickable(this["leafs"]);
        }
    };

    TreeSpriteGroupTextSetter.prototype.buryLayerAlreadyExists = function (buryLayerName) {
        return this[buryLayerName] !== undefined;
    }

    TreeSpriteGroupTextSetter.prototype.buryLayerNotAlreadyExists = function (buryLayerName) {
        return !this.buryLayerAlreadyExists(buryLayerName);
    }

    String.prototype.regexIndexOf = function(regex, startpos) {
        var indexOf = this.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    };

    String.prototype.toInteresparceRegexp = function(char) {
        var i,
            regexp = "",
            toconvert;
        toconvert = this.replace("*","\\*");
        for(i = 0; i< toconvert.length; i++) {
            regexp += toconvert.charAt(i)
            if(toconvert.charAt(i)!== '\\') {
                regexp += "[" + char + "]*"
            }
        }
        return regexp;
    };

    TreeSpriteGroupTextSetter.prototype.findLineOfCharacterInText = function (substr) {
        var regexp = substr.toInteresparceRegexp("\n"),
            charPos = this.text.regexIndexOf(regexp);
        return Math.floor( charPos / TEXTLENGTH );
    };

    return TreeSpriteGroupTextSetter;
});