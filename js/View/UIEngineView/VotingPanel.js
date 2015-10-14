/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    "use strict";
    var x = 225,
        y = 550,
        separationBetweenButtons = 160;

    function VotingPanel(phaserGame, bussinesController) {
        this.initSpriteGroupInPhaserEngine(phaserGame);
        this.createButtons(bussinesController);
        this.hide();
    }
    VotingPanel.prototype.initSpriteGroupInPhaserEngine = function initSpriteGroupInPhaserEngine(phaserGame) {
        this.game = phaserGame.game;
        this.displayGroup = this.game.add.group();
    };
    VotingPanel.prototype.createButtons = function (bussinesController) {
        this.downVote = this.displayGroup.create(x + separationBetweenButtons, y, 'downVote');
        this.upVote = this.displayGroup.create(x - separationBetweenButtons, y, 'upVote');
        this.setAsButton(this.downVote, bussinesController, "downVote");
        this.setAsButton(this.upVote, bussinesController, "upVote");
    };
    VotingPanel.prototype.setAsButton = function (button, bussinesController, callbackName) {
        var context = {
            observer : bussinesController,
            button : button,
            callbackName : callbackName,
            panel : this
        };
        button.inputEnabled = true;
        button.input.priorityID = 1;
        button.useHandCursor = true;
        button.events.onInputDown.add(function () {
            this.button.inputEnabled = false;
            this.button.useHandCursor = false;
            this.observer[callbackName]();
            this.panel.hide();
        }, context);
    };
    VotingPanel.prototype.show = function show() {
        this.displayGroup.setAll("visible", true);
        this.displayGroup.setAll("exists", true);
    };
    VotingPanel.prototype.hide = function hide() {
        this.displayGroup.setAll("visible", false);
        this.displayGroup.setAll("exisits", false);
    };

    return VotingPanel;
});