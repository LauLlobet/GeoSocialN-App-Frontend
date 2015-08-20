/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    "use strict";
    var x = 92,
        y = 100,
        textOffsetx = 9,
        textOffsety = 60;

    function PasswordDialog(phaserGame) {
        this.initSpriteGroupInPhaserEngine(phaserGame);
        this.createBackground();
        this.createText();
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
    PasswordDialog.prototype.createText = function createText() {
        this.keymap = ",!?ABCDEFGHIJKLMNOPQRSTUVWXYZ./\\()_-[]{}:|'`=\"+^$#0123456789";
        this.fontText = this.game.add.retroFont('carved', 120, 120, this.keymap, 5, 0, 0, 0, 0);
        this.textImage = this.game.add.image(x + textOffsetx, y + textOffsety, this.fontText);
        this.displayGroup.add(this.textImage);
        this.textImage.scale.x = 0.27 * 0.5;
        this.textImage.scale.y = 0.27 * 0.5;
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
        this.fontText.text = text;
    };
    PasswordDialog.prototype.setNoText = function setNoText() {
        this.setText("");
    };
    PasswordDialog.prototype.getText = function getText() {
        return this.text;
    };
    PasswordDialog.prototype.addChar = function addChar(char) {
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