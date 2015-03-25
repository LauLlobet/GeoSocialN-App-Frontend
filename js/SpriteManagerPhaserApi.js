/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    "use strict";
    function SpriteManagerPhaserApi(phaserGame, sceneLoaderInterface) //noinspection JSLint
    {
            this.allSpritesGroup = phaserGame.game.add.group();
            this.state = 'ok';
            this.game = phaserGame.game;
            this.phaserGame = phaserGame;
            this.sceneLoaderInterface = sceneLoaderInterface;
            phaserGame.scaleToReal(40);
    }

    //MAIN INPUT FUNCTION
    SpriteManagerPhaserApi.prototype.tellAllActiveSpritesSoItCanUpdateIt = function tellAllActiveSpritesSoItCanUpdateIt(list) {
        this.addTreesThatExistOnTheIncommingListButNotInGroup(list);
        this.removeSpritesThatNoLongerExistInTheIncommingList(list);
    };
    //MAIN INPUT FUNCTION
    SpriteManagerPhaserApi.prototype.askForTreeToSceneLoader = function askForTreeToSceneLoader(id) {
        return this.sceneLoaderInterface.getTreeFromId(id);
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
    SpriteManagerPhaserApi.prototype.createImgFromTreeTypeAndText = function createImgFromTreeTypeAndText(type, text) {
        var dataTree = this.game.cache.getFrame(type),
            bmd = this.game.make.bitmapData(dataTree.width, dataTree.height);
        bmd.load(type);
        bmd.ctx.fillStyle = "#000000";
        bmd.ctx.font = '25px san-serif';
        bmd.ctx.fillText(text, 10, 50);
        return bmd;
    };
    SpriteManagerPhaserApi.prototype.createTreeSpriteGroup = function createSprite(tree, id) {
        var imgId = this.createImgFromTreeTypeAndText(tree.type, tree.text),
            group = this.phaserGame.game.add.group(),
            sprite = group.create(this.phaserGame.coordX(tree.x),  this.phaserGame.coordY(tree.y), imgId);
        group.name = id;
        this.allSpritesGroup.add(group);
        sprite.name = "treeSprite";
        sprite.height = tree.h;
        sprite.width = tree.w;
        this.phaserGame.resizeSprite(sprite);
    };
    SpriteManagerPhaserApi.prototype.tweenStprite = function tweenStprite(id, tween) {
        var sprite = this.findTreeSpriteGroupByName(id),
            wworld = this.phaserGame.scaleToReal(tween.w),
            scale = wworld / (sprite.width / sprite.scale.x);
        this.game.add.tween(sprite).to({
            x : this.phaserGame.coordX(tween.x),
            y : this.phaserGame.coordY(tween.y)
        }, tween.t, "Linear", true, 0, 0);
        this.game.add.tween(sprite.scale).to({
            x : scale,
            y : scale
        }, tween.t, "Linear", true, 0, 0);
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
    }

    SpriteManagerPhaserApi.prototype.existsId = function existsId(id) {
        return this.findTreeSpriteGroupByName(id) !== null;
    };

    SpriteManagerPhaserApi.prototype.addTreesThatExistOnTheIncommingListButNotInGroup = function addTreesThatExistOnTheIncommingListButNotInGroup(list) {
        var i, tree;
        for (i in list) {
            if (list.hasOwnProperty(i)) {
                if (!this.existsId(list[i])) {
                    tree = this.askForTreeToSceneLoader(list[i]);
                    this.createTreeSpriteGroup(tree, list[i]);
                    if (tree.tween !== undefined) {
                        this.tweenStprite(list[i], tree.tween);
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
    return SpriteManagerPhaserApi;
});