/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(["./TreeSpriteGroupTextSetter", "../DistanceTips/TreeSpriteCounterKmSetter", "../DistanceTips/TreeSpriteCompassSetter",  "/VisitTreeNumber/scenes/Constants.js"], function (TreeSpriteGroupTextSetter, TreeSpriteCounterKmSetter, TreeSpriteCompasSetter, constants) {
    "use strict";
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
        this.textGroup = this.phaserGame.game.add.group();
        this.buryGroup = this.phaserGame.game.add.group();
        this.compasAndKmGroup = this.phaserGame.game.add.group();
        if (tree.treeid !== null) {
            if (tree.treeid === constants.specialTreesCodes.fullForest) {
                this.sprite = this.group.create(0, 0, 'fullTerritory');
                this.group.isReusable = false;
            } else {
                this.sprite = this.group.create(0, 0, 'real');
            }
        } else {
            this.sprite = this.group.create(0, 0, 'roots');
        }

        if (tree.treeid === constants.specialTreesCodes.ca) {
            this.welcomeMessage = this.group.create(0, 0, 'welcomeCa');
            this.setHelpButtonOfWelcomeScreen('ca');
        }
        if (tree.treeid === constants.specialTreesCodes.en) {
            this.welcomeMessage = this.group.create(0, 0, 'welcomeEn');
            this.setHelpButtonOfWelcomeScreen('en');
        }
        if (tree.treeid === constants.specialTreesCodes.es) {
            this.welcomeMessage = this.group.create(0, 0, 'welcomeEs');
            this.setHelpButtonOfWelcomeScreen('es');
        }

        this.group.add(this.textGroup);
        this.group.add(this.buryGroup);
        this.group.add(this.compasAndKmGroup);
        this.sprite.anchor.x = 104 / 400;
        this.sprite.anchor.y = 172 / 611;
        this.group.x = this.phaserGame.coordX(tree.x);
        this.group.y = this.phaserGame.coordY(tree.y);
        this.setScalePropertiesToNewGroup(tree);
        this.sprite.name = "treeSprite";
        this.setTreeGroupIntoAllSpritesGroup(id);
        if (tree.unburiedLayersTreeLevel === undefined) {
            tree.unburiedLayersTreeLevel = undefined;
        }
        if (tree.treeid === constants.specialTreesCodes.fullForest) {
            return;
        }

        if (this.isNotAnEmptyTree(tree)) {
            this.group.textSetter = new TreeSpriteGroupTextSetter(this.textGroup, this.buryGroup, this.game, this.gestureObserver);
            this.group.textSetter.setUnburiedLayers(tree.unburiedLayersTreeLevel);
            this.group.textSetter.createText(tree.text);
            if (this.isNotAnInstructionTree(tree)) {
                this.group.kmSetter = new TreeSpriteCounterKmSetter(this.group, this.game);
                this.group.compassSetter = new TreeSpriteCompasSetter(this.group, this.game);
                this.group.isWrittenByAServerTree = true;
            }
        }
        if (tree.treeid === null) {
            this.group.isReusable = false;
            this.setWriteTextButtonToGroup(tree);
            this.group.textSetter = new TreeSpriteGroupTextSetter(this.textGroup, this.buryGroup, this.game, this.gestureObserver);
            this.group.textSetter.createText(" ", tree.unburiedLayersTreeLevel);
        }
    };

    SingleTreeGroupFactory.prototype.reuseTreeSpriteGroup = function reuseTreeSpriteGroup(tree, id, group) {
        this.group = group;
        this.sprite.anchor.x = 104 / 400;
        this.sprite.anchor.y = 172 / 611;
        this.group.x = this.phaserGame.coordX(tree.x);
        this.group.y = this.phaserGame.coordY(tree.y);
        this.setScalePropertiesToNewGroup(tree);
        this.setTreeGroupIntoAllSpritesGroup(id);
        if (tree.unburiedLayersTreeLevel === undefined || tree.initialPosition.charAt(0) === '3') {
            tree.unburiedLayersTreeLevel = {};
        }

        if (tree.text !== undefined) {
            this.group.textSetter.setUnburiedLayers(tree.unburiedLayersTreeLevel);
            this.group.textSetter.setText(tree.text);
        }
    };

    SingleTreeGroupFactory.prototype.setScalePropertiesToNewGroup = function setPropertiesToNewGroup(tree) {
        var prespectiveScale = tree.w / this.sprite.width,
            cellPhoneScale = this.phaserGame.scale,
            finalScale = prespectiveScale * cellPhoneScale;
        this.group.scale.setTo(finalScale, finalScale);
    };

    SingleTreeGroupFactory.prototype.isNotAnEmptyTree = function (tree) {
        return tree.text !== undefined && tree.text !== null;
    };
    SingleTreeGroupFactory.prototype.isNotAnInstructionTree = function (tree) {
        return (tree.treeid > 30);
    };
    SingleTreeGroupFactory.prototype.setWriteTextButtonToGroup = function ifEmptyTreeSetWriteTextButtonToGroup(tree) {
        var button, context, tween;
        button = this.group.create(tree.button.x, tree.button.y, 'punzon');
        this.group.buttonSprite = button;
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
            previousTween : tween,
            group : this.group
        };
        button.events.onInputDown.add(function () {
            var music;
            this.game.add.tween(this.button).to({alpha: 0}, 300, 'Linear', true, 0, 0);
            this.game.add.tween(this.group).to({y: (this.group.y + 550 + 300) }, 300, 'Linear', true, 0, 0);
            this.game.tweens.remove(this.previousTween);
            this.button.inputEnabled = false;
            this.button.useHandCursor = false;
            this.observer.clickedOnWriteButton();
            music = this.game.add.audio('plant');
            music.play();

        }, context);
    };

    SingleTreeGroupFactory.prototype.setTreeGroupIntoAllSpritesGroup = function setTreeGroupIntoAllSpritesGroup(id, treeGroup) {
        if (treeGroup !== undefined) {
            this.group = treeGroup;
        }
        this.group.name = id;
        this.mainGroup.add(this.group);
    };
    SingleTreeGroupFactory.prototype.setHelpButtonOfWelcomeScreen = function (lang) {
        var button = this.group.create(40, 270, "linkLayer");
        button.scale.x = 13
        button.inputEnabled = true;
        button.input.priorityID = 1;
        button.useHandCursor = true;
        button.events.onInputDown.add(function () {
            this.context.gestureObserver.linkClicked(constants.specialTreesHelpTreesIds[lang]);
        }, {
            context : this
        });
    }
    return SingleTreeGroupFactory;
});