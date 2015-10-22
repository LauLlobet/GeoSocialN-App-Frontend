/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(["../UIEngineView/SingleTreeGroupFactory"], function (SingleTreeGroupFactory) {
    "use strict";
    function SpriteManagerPhaserApi(phaserGame, gestureObserver) //noinspection JSLint
    {
            this.allSpritesGroup = phaserGame.game.add.group();
            this.state = 'ok';
            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.singleTreeGroupFactory = new SingleTreeGroupFactory(phaserGame, this.allSpritesGroup, gestureObserver);
            phaserGame.scaleToReal(40)
            this.deletedSpriteGroupsWithText = [];
            this.deletedSpriteGroupsWithoutText = [];
    }

    //MAIN INPUT FUNCTION
    SpriteManagerPhaserApi.prototype.tellAllActiveSpritesSoItCanUpdateIt = function tellAllActiveSpritesSoItCanUpdateIt(list) {
        this.addTreesThatExistOnTheIncommingListButNotInGroup(list);
        this.removeSpritesThatNoLongerExistInTheIncommingList(list);
    };
    SpriteManagerPhaserApi.prototype.addTreesThatExistOnTheIncommingListButNotInGroup = function addTreesThatExistOnTheIncommingListButNotInGroup(list) {
        var i, tree;
        for (i in list) {
            if (list.hasOwnProperty(i)) {
                if (!this.existsId(list[i])) {
                    tree = this.askForTreeToSceneLoader(list[i]);
                    this.createTreeSpriteGroup(tree, list[i]);
                    if (tree.tween !== undefined) {
                        this.tweenStprite(list[i], tree);
                        this.enableButtonOfSpriteIfItBecomesCentral(list[i], tree);
                    }
                }
            }
        }
    };
    //TODO: refactor loops in separate functions
    SpriteManagerPhaserApi.prototype.removeSpritesThatNoLongerExistInTheIncommingList = function removeSpritesThatNoLongerExistInTheIncommingList(list) {
        var groupLength = this.allSpritesGroup.length,
            namesInGroupNotInList = [],
            i,
            nameInGroup,
            found,
            j,
            k;
        for (i = 0; i < groupLength; i += 1) {
            nameInGroup = this.allSpritesGroup.getAt(i).name;
            found = false;
            for (j in list) { //TODO: es extrany el j in list i despres list[j]
                if (list.hasOwnProperty(j)) {
                    if (list[j] === nameInGroup) {
                        found = true;
                    }
                }
            }
            if (!found) {
                namesInGroupNotInList.push(nameInGroup);
            }
        }
        for (k in namesInGroupNotInList) {
            if (namesInGroupNotInList.hasOwnProperty(k)) {
                this.deleteTreeSpriteGroup(namesInGroupNotInList[k]);
            }
        }
    };
    //MAIN INPUT FUNCTION
    SpriteManagerPhaserApi.prototype.askForTreeToSceneLoader = function askForTreeToSceneLoader(id) {
        return this.sceneLoaderInterface.getTreeFromId(id);
    };
    SpriteManagerPhaserApi.prototype.createTreeSpriteGroup = function createSprite(tree, id) {
        var treeSpriteG;
        if (tree.text !== null) {
            if (tree.text === undefined) {
                treeSpriteG = this.deletedSpriteGroupsWithoutText.pop();
            } else {
                treeSpriteG = this.deletedSpriteGroupsWithText.pop();
            }
        }
        if (treeSpriteG === undefined) {
            this.singleTreeGroupFactory.createTreeSpriteGroup(tree, id);
        } else {
            this.singleTreeGroupFactory.reuseTreeSpriteGroup(tree, id, treeSpriteG);
        }
    };
    SpriteManagerPhaserApi.prototype.tweenStprite = function tweenStprite(id, tree) {
        var group = this.findTreeSpriteGroupByName(id),
            tween = tree.tween,
            spriteRefWidth = this.findTreeSpriteById(id),
            wworld = this.phaserGame.scaleToReal(tween.w),
            scale = wworld / (spriteRefWidth.width / spriteRefWidth.scale.x);
        this.game.add.tween(group).to({
            x : this.phaserGame.coordX(tween.x),
            y : this.phaserGame.coordY(tween.y)
        }, tween.t, "Linear", true, 0, 0);
        this.game.add.tween(group.scale).to({
            x : scale,
            y : scale
        }, tween.t, "Linear", true, 0, 0);
       // this.tweenTint(spriteRefWidth, 0.20 * 255, 0.80 * 255, tween.t);
    };

    SpriteManagerPhaserApi.prototype.tweenTint = function tweenTint(obj, startColor, endColor, time) {
        var colorBlend = {step: 0},
            colorTween = this.game.add.tween(colorBlend).to({step: 10}, time),
            fadeIncrement = (endColor - startColor) / 10;
        colorTween.onUpdateCallback(function () {
            var color = startColor + fadeIncrement * colorBlend.step;
            obj.tint = Phaser.Color.getColor(color, color, color);
        });
        obj.tint = startColor;
        colorTween.start();
    };
    SpriteManagerPhaserApi.prototype.enableButtonOfSpriteIfItBecomesCentral = function enableButtonOfSpriteIfItBecomesCentral(id, tree) {
        var button;
        if (tree.text !== undefined || tree.tween === undefined) {
            return;
        }
        button = this.findTreeButtonById(id);
        if (button === undefined || button === null) {
            return;
        }
        if (tree.finalPosition === '1c') {
            button.inputEnabled = true;
        } else {
            button.inputEnabled = false;
        }
    };
    SpriteManagerPhaserApi.prototype.size = function size() {
        return this.allSpritesGroup.length;
    };
    SpriteManagerPhaserApi.prototype.deleteTreeSpriteGroup = function deleteTreeSpriteGroup(id) {
        var sprite = this.findTreeSpriteGroupByName(id);
        this.allSpritesGroup.remove(sprite);
        if (!sprite.isToPlant) {
            if (sprite.isWrittenByAServerTree) {
                this.deletedSpriteGroupsWithText.push(sprite);
            } else {
                this.deletedSpriteGroupsWithoutText.push(sprite);
            }
        }
    };
    SpriteManagerPhaserApi.prototype.findTreeSpriteGroupByName = function findTreeSpriteGroupByName(id) {
        return this.allSpritesGroup.iterate('name', id, Phaser.Group.RETURN_CHILD);
    };
    SpriteManagerPhaserApi.prototype.findTreeSpriteById = function findTreeSpriteById(id) {
        var group = this.findTreeSpriteGroupByName(id);
        return group.iterate('name', 'treeSprite', Phaser.Group.RETURN_CHILD);
    };
    SpriteManagerPhaserApi.prototype.findTreeButtonById = function findTreeButtonById(id) {
        var group = this.findTreeSpriteGroupByName(id);
        return group.iterate('name', 'button', Phaser.Group.RETURN_CHILD);
    };
    SpriteManagerPhaserApi.prototype.existsId = function existsId(id) {
        return this.findTreeSpriteGroupByName(id) !== null;
    };

    return SpriteManagerPhaserApi;
});