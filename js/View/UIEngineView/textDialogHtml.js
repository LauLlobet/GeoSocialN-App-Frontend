/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    "use strict";
    var x = 200,
        y = 300;
    function TextDialogHtml(phaserGame) {
        this.initSpriteGroupInPhaserEngine(phaserGame);
        this.createText();
        //this.setNoText();
        this.setText("halo");
        this.createBackground();
        this.show();
    }
    TextDialogHtml.prototype.initSpriteGroupInPhaserEngine = function initSpriteGroupInPhaserEngine(phaserGame) {
        this.game = phaserGame.game;
        this.displayGroup = this.game.add.group();
    };
    TextDialogHtml.prototype.createBackground = function () {
        this.background = this.displayGroup.create(x, y, 'passwordBox');
    };
    TextDialogHtml.prototype.createText = function createText() {
        this.keymap = ",!?ABCDEFGHIJKLMNOPQRSTUVWXYZ./\\()_-[]{}:|'`=\"+^$#0123456789";
        this.fontText = this.game.add.retroFont('carved', 120, 120, this.keymap, 5, 0, 0, 0, 0);
        this.textImage = this.game.add.image(this.game.world.centerX, 6 + 3 * 32, this.fontText);
        this.textImage.scale.x = 0.27 * 0.5;
        this.textImage.scale.y = 0.27 * 0.5;
        this.displayGroup.add(this.textImage);
    };
    TextDialogHtml.prototype.show = function show() {
        this.displayGroup.setAll("true", false);
    };
    TextDialogHtml.prototype.hide = function hide() {
        this.displayGroup.setAll("false", false);
    };
    TextDialogHtml.prototype.setText = function setText(text) {
        this.text = text;
        this.fontText.text = text;
    };
    TextDialogHtml.prototype.setNoText = function setNoText() {
        this.setText("");
    };
    TextDialogHtml.prototype.getText = function getText() {
        return this.text;
    };
    TextDialogHtml.prototype.addChar = function addChar(char) {
        this.text +=  char;
        this.setText(this.text);
    };
    TextDialogHtml.prototype.removeChar = function removeChar() {
        var oneLessCharText = this.text.substring(0, this.text.length - 1);
        this.setText(oneLessCharText);
    };

    return TextDialogHtml;
});