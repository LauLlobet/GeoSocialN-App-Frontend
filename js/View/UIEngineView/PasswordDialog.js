/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    "use strict";
    var x = 92,
        y = 100,
        textOffsetx = 9,
        textOffsety = 60,
        passwordSizeLimit = 11;

    function PasswordDialog(phaserGame) {
        this.initSpriteGroupInPhaserEngine(phaserGame);
        this.createBackground();
        this.setNoText();
        this.hide();
    }
    PasswordDialog.prototype.initSpriteGroupInPhaserEngine = function initSpriteGroupInPhaserEngine(phaserGame) {
        this.game = phaserGame.game;
        this.displayGroup = this.game.add.group();
    };
    PasswordDialog.prototype.createBackground = function () {
        this.background = this.displayGroup.create(x, y, 'passwordBox');
    };

    PasswordDialog.prototype.addTextImage = function addTextImage(textOffsetx, textOffsety, fontText) {
        var tmp = this.game.add.bitmapText(0, 0, 'ubuntu', fontText, 24);
        this.textImage =  this.displayGroup.create(textOffsetx, textOffsety, tmp.generateTexture());
        tmp.destroy();
        this.textImage.scale.x = 0.90;
        this.textImage.scale.y = 0.90;
    };

    PasswordDialog.prototype.show = function show() {
        this.displayGroup.setAll("visible", true);
        this.displayGroup.setAll("exists", true);

    };
    PasswordDialog.prototype.hide = function hide() {
        this.displayGroup.setAll("visible", false);
        this.displayGroup.setAll("exisits", false);

    };
    PasswordDialog.prototype.setText = function setText(text) {
        this.text = text;
        if (this.textImage !== undefined) {
            this.textImage.destroy();
        }
        this.addTextImage(x + textOffsetx, y + textOffsety, this.text);
    };
    PasswordDialog.prototype.setNoText = function setNoText() {
        this.setText("");
    };
    PasswordDialog.prototype.getText = function getText() {
        return this.text;
    };
    PasswordDialog.prototype.addChar = function addChar(char) {
        if (this.text.length > passwordSizeLimit) {
            return;
        }
        this.addCharWithoutRestriction(char);
    };
    PasswordDialog.prototype.addCharWithoutRestriction = function addCharWithoutRestriction(char) {
        if (this.text.length >= passwordSizeLimit) {
            return;
        }
        this.text +=  char;
        this.setText(this.text);
    };
    PasswordDialog.prototype.removeChar = function removeChar() {
        var oneLessCharText = this.text.substring(0, this.text.length - 1);
        this.setText(oneLessCharText);
    };
    PasswordDialog.prototype.hideAndSetNoText = function hideAndSetNoText() {
        this.hide();
        this.setNoText();
    };


    return PasswordDialog;
});