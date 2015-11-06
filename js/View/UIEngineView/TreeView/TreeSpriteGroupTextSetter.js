define(["./LinkSetterToTree", "./BurySetterToTree"], function (LinkSetterToTree, BurySetterToTree) {
    "use strict";
    var TEXTLENGTH = 16;

    function TreeSpriteGroupTextSetter(treeSpriteGroup, treeBuryGroup, game, gestureObserver) //noinspection JSLint
    {
            this.treeSpriteGroup = treeSpriteGroup;
            this.game = game;
            this.gestureObserver = gestureObserver;
            this.linkSetterToTree = new LinkSetterToTree();
            this.burySetterToTree = new BurySetterToTree(game, treeBuryGroup, gestureObserver);
    }
    TreeSpriteGroupTextSetter.prototype.createText = function createText(text, unburiedLayers) {
        this.burySetterToTree.setUnburiedLayers(unburiedLayers);
        this.setText(text);
    };
    TreeSpriteGroupTextSetter.prototype.setUnburiedLayers = function (unburiedLayers) {
        this.burySetterToTree.setUnburiedLayers(unburiedLayers);
    };
    TreeSpriteGroupTextSetter.prototype.setText = function setText(text) {
        this.rewriteTextAtributeWithNewTextAndFormatIt(text);
        this.deletePreviousTreesSprites();
        this.addTextImage();
        this.linkSetterToTree.setInteractiveLinksToRetroText(this.treeSpriteGroup, this.formatedText, this.id, this.gestureObserver);
        this.burySetterToTree.handleBuringTextCases(this.text);
    };
    TreeSpriteGroupTextSetter.prototype.rewriteTextAtributeWithNewTextAndFormatIt = function rewriteTextAtributeWithNewTextAndFormatIt(text) {
        if (text === undefined) {
            text = "";
        }
        this.text = this.turnReturnIntoSpaces(text);
        this.formatedText =  this.formatText(text);
    };
    TreeSpriteGroupTextSetter.prototype.addTextImage = function addTextImage() {
        var tmp = this.game.add.bitmapText(4, 60, 'ubuntu', this.formatedText, 24);
        this.textImage =  this.treeSpriteGroup.create(0, 0, tmp.generateTexture());
        tmp.destroy();
        this.textImage.scale.x = 0.90;
        this.textImage.scale.y = 0.90;
    };
    TreeSpriteGroupTextSetter.prototype.addChar = function addChar(char) {
        this.setEditing(true);
        this.setText(this.text + char);
    };
    TreeSpriteGroupTextSetter.prototype.removeChar = function removeChar() {
        this.setText(this.text.substring(0, this.text.length - 1));
    };
    TreeSpriteGroupTextSetter.prototype.setEditing = function setEdting(editing) {
        this.editing = editing;
        this.burySetterToTree.setEditing(editing);
    };
    TreeSpriteGroupTextSetter.prototype.startTyping = function startTyping() {
        this.setEditing(true);
        this.setText(this.text);
    };
    TreeSpriteGroupTextSetter.prototype.stopTyping = function stopTyping() {
        this.setEditing(false);
        this.setText(this.text);
    };
    TreeSpriteGroupTextSetter.prototype.getHeightOfLeafBuryLayer = function () {
        return this.burySetterToTree.getHeightOfLeafBuryLayer();
    };
    TreeSpriteGroupTextSetter.prototype.unBury = function (blid) {
        return this.burySetterToTree.unBury(blid);
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
        textreturned += text.substring(j);
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
    };

    TreeSpriteGroupTextSetter.prototype.deletePreviousTreesSprites = function deletePreviousTreesSprites() {
        if (this.textImage !== undefined) {
            this.textImage.destroy();
        }
        this.linkSetterToTree.removeLinks();
        this.burySetterToTree.destroyBuryLayers();
    };
    return TreeSpriteGroupTextSetter;
});