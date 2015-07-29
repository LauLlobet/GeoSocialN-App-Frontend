/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    "use strict";
    var TEXTLENGTH = 16;
    function SingleTreeGroupFactory(phaserGame, mainGroup, gestureObserver) //noinspection JSLint
    {
            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.mainGroup = mainGroup;
            this.gestureObserver = gestureObserver;
            this.textImage = undefined;
    }

    SingleTreeGroupFactory.prototype.createTreeSpriteGroup = function createTreeSpriteGroup(tree, id) {
        this.group = this.phaserGame.game.add.group();
        this.sprite = this.group.create(0, 0, 'real');
        this.sprite.anchor.x = 104 / 400;
        this.sprite.anchor.y = 172 / 611;
        this.group.x = this.phaserGame.coordX(tree.x);
        this.group.y = this.phaserGame.coordY(tree.y);
        this.ifEmptyTreeSetWriteTextButtonToGroup(tree);
        this.setScalePropertiesToNewGroup(tree);
        this.sprite.name = "treeSprite";
        this.setTreeGroupIntoAllSpritesGroup(id);
        this.createText(tree.text);
    };

    SingleTreeGroupFactory.prototype.createText = function createText(text) {
        var image;
        this.keymap = ",!?ABCDEFGHIJKLMNOPQRSTUVWXYZ./\\()_-[]{}:|'`=\"+^Ñ#0123456789";
        this.fontText =  this.game.add.retroFont('carved', 120, 120, this.keymap, 5, 0, 0, 0, 0);
        this.textImage = this.game.add.image(0, 60, this.fontText);
        this.textImage.scale.x = 0.27 * 0.5;
        this.textImage.scale.y = 0.27 * 0.5;
        if (text === undefined) {
            text = "";
        }
        this.group.add(this.textImage);
        this.setTextUpdateFunctionsToGroup(this.group, this.fontText, this.keymap);
        this.group.setText(text);
    };

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    SingleTreeGroupFactory.prototype.setInteractiveLinksToRetroText = function (group, formatedText){
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
            links = [];

        for (var x = 0, c=''; c = formatedText.charAt(x); x++){
            if(c === '#' && isPartOfTheAdress === false){
                isPartOfTheAdress = true;
            } else if( isPartOfTheAdress && !isNumeric(c)){
                isPartOfTheAdress = false;
                linklayers.push( currentLinkCells );
                currentLinkCells = [];
                links.push(parseInt(currentLink));
                currentLink = "";
            }

            if(isPartOfTheAdress){
                tmp = this.group.create(charposX, charposY, 'linkLayer');
                tmp.scale.x = tmp.scale.y = 1.2;
                currentLinkCells.push(tmp);
                if(isNumeric(c)){
                    currentLink = currentLink + c;
                }
            }
            if(c === '\n'){
                charposY += charposYInc;
                charposX = initCharposX;
            }else {
                charposX += charposXInc;
            }
        }

        for(var i = 0; i < linklayers.length; i++ ){
            for(var j = 0 ; j < linklayers[i].length ; j++){
                linklayers[i][j].inputEnabled = true;
                linklayers[i][j].input.priorityID = 1;
                linklayers[i][j].useHandCursor = true;
                linklayers[i][j].events.onInputDown.add(function () {
                    this.gestureObserver.linkClicked(this.id);
                    console.log("clicked");
                }, {id:links[i],
                    gestureObserver:this.gestureObserver});
            }
        }
    };


    SingleTreeGroupFactory.prototype.setTextUpdateFunctionsToGroup = function setTextUpdateFunctionsToGroup(group, fontText, keymap) {
        var that = this;
        group.fontText = fontText;
        group.keymap = keymap;
        group.setText = function setText(text) {
            var formatedText =  group.formatText(text);
            that.setInteractiveLinksToRetroText(group,formatedText);
            group.fontText.setText(formatedText, true, -30, 15, group.keymap, 10);
            group.text = text;
        };
        group.addChar = function addChar(char) {
            group.editing = true;
            group.setText(group.text + char);
        };
        group.removeChar = function removeChar() {
            group.setText(group.text.substring(0, group.text.length - 1));
        };
        group.startTyping = function startTyping() {
            group.editing = true;
            group.setText(group.text);
        }
        group.stopTyping = function stopTyping(){
            group.editing = false;
            group.setText(group.text)
        }
        group.formatText = function (text) {
            var textreturned = "",
                length =  TEXTLENGTH,
                j;
            text = text.toUpperCase();
            if (group.editing === true) {
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
    };

    SingleTreeGroupFactory.prototype.setScalePropertiesToNewGroup = function setPropertiesToNewGroup(tree) {
        var prespectiveScale = tree.w / this.sprite.width,
            cellPhoneScale = this.phaserGame.scale,
            finalScale = prespectiveScale * cellPhoneScale;
        this.group.scale.setTo(finalScale, finalScale);
    };

    SingleTreeGroupFactory.prototype.ifEmptyTreeSetWriteTextButtonToGroup = function ifEmptyTreeSetWriteTextButtonToGroup(tree) {
        var button, context, tween;
        if (tree.text !== undefined || tree.button === undefined) {
            return;
        }
        button = this.group.create(tree.button.x, tree.button.y, 'punzon');
        button.name = 'button';
        button.height = tree.button.hw;
        button.width = tree.button.hw;
        button.inputEnabled = true;
        button.input.priorityID = 1;
        button.useHandCursor = true;
        tween = this.game.add.tween(button).to({y: tree.button.y - 100}, 500, 'Linear', true, 0, -1);
        tween.yoyo(true, 500);
        context = {
            observer : this.gestureObserver,
            button : button,
            game : this.game,
            previousTween : tween
        };
        button.events.onInputDown.add(function () {
            this.game.add.tween(this.button).to({alpha: 0}, 300, 'Linear', true, 0, 0);
            this.game.tweens.remove(this.previousTween);
            this.button.inputEnabled = false;
            this.button.useHandCursor = false;
            this.observer.clickedOnWriteButton();
        }, context);
    };

    SingleTreeGroupFactory.prototype.setTreeGroupIntoAllSpritesGroup = function setTreeGroupIntoAllSpritesGroup(id) {
        this.group.name = id;
        this.mainGroup.add(this.group);
    };
    return SingleTreeGroupFactory;
});