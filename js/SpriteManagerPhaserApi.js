/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(["SingleTreeGroupFactory"], function (SingleTreeGroupFactory) {
    "use strict";
    function SpriteManagerPhaserApi(phaserGame, gestureObserver) //noinspection JSLint
    {
            this.allSpritesGroup = phaserGame.game.add.group();
            this.state = 'ok';
            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.singleTreeGroupFactory = new SingleTreeGroupFactory(phaserGame, this.allSpritesGroup, gestureObserver);
            phaserGame.scaleToReal(40);
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
                    this.singleTreeGroupFactory.createTreeSpriteGroup(tree, list[i]);
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
            for (j in list) {
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
        this.singleTreeGroupFactory.createTreeSpriteGroup(tree, id);
    };
    SpriteManagerPhaserApi.prototype.tweenStprite = function tweenStprite(id, tree) {
        var sprite = this.findTreeSpriteGroupByName(id),
            tween = tree.tween,
            tree = this.findTreeSpriteById(id),
            wworld = this.phaserGame.scaleToReal(tween.w),
            scale = wworld / (tree.width / tree.scale.x);
        this.game.add.tween(sprite).to({
            x : this.phaserGame.coordX(tween.x),
            y : this.phaserGame.coordY(tween.y)
        }, tween.t, "Linear", true, 0, 0);
        this.game.add.tween(sprite.scale).to({
            x : scale,
            y : scale
        }, tween.t, "Linear", true, 0, 0);
    };
    SpriteManagerPhaserApi.prototype.enableButtonOfSpriteIfItBecomesCentral = function enableButtonOfSpriteIfItBecomesCentral(id, tree) {
        var button;
        if (tree.text !== undefined || tree.tween === undefined) {
            return;
        }
        button = this.findTreeButtonById(id);
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
        sprite.destroy();
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
    SpriteManagerPhaserApi.prototype.displayScreenSizeTest = function displayScreenSizeTest() {
        var point, point2, point3, point4, point5;
        point = this.game.add.sprite(this.phaserGame.coordX(0), this.phaserGame.coordY(0), 'point');
        point.anchor.set(0.5);
        this.phaserGame.resizeSprite(point);
        point2 = this.game.add.sprite(this.phaserGame.coordX(360), this.phaserGame.coordY(640), 'point');
        point2.anchor.set(0.5);
        this.phaserGame.resizeSprite(point2);
        point3 = this.game.add.sprite(this.phaserGame.coordX(-360), this.phaserGame.coordY(640), 'point');
        point3.anchor.set(0.5);
        this.phaserGame.resizeSprite(point3);
        point4 = this.game.add.sprite(this.phaserGame.coordX(360), this.phaserGame.coordY(-640), 'point');
        point4.anchor.set(0.5);
        this.phaserGame.resizeSprite(point4);
        point5 = this.game.add.sprite(this.phaserGame.coordX(-360), this.phaserGame.coordY(-640), 'point');
        this.phaserGame.resizeSpriteToSize(point5, 360, 360);

        this.game.camera.x = this.game.world.centerX - this.game.camera.width / 2;
        this.game.camera.y = this.game.world.centerY - this.game.camera.height / 2;
    };
    return SpriteManagerPhaserApi;
});