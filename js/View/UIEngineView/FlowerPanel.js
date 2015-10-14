define([], function () {
    "use strict";
    var groupx = 0,
        groupy = 0,
        groupw = 500,
        grouph = 100;
    function FlowerPanel(game) //noinspection JSLint
    {
            this.createGroup(game);
            this.lastFlowerNumber = 0;
            this.flowerArray = [];
    }

    FlowerPanel.prototype.createGroup = function createSpriteAndGroup(phaserGame) {
        this.game = phaserGame.game;
        this.group = this.game.add.group();
        this.group.x = groupx;
        this.group.y = groupy;
    };

    FlowerPanel.prototype.addNFlowers = function addNFlowers(treeId, n) {
        var i,
            flowerNumber,
            x,
            y;
        if (n < 0) {
            this.removeNFlowers(n);
            return;
        }
        for (i = 0; i < n; i += 1) {
            flowerNumber = this.lastFlowerNumber + i;
            x = (flowerNumber % 5) *  groupw / 5;
            y = ((flowerNumber - (flowerNumber % 5)) / 5) * 40;
            this.flowerArray.push(this.group.create(x, y, 'flower'));
        }
        this.lastFlowerNumber += n;
    };
    FlowerPanel.prototype.removeNFlowers = function addNFlowers(n) {
        var i,
            flower;
        n = n * -1;
        for (i = 0; i < n; i += 1) {
            flower = this.flowerArray.pop();
            flower.destroy();
        }
    }
    FlowerPanel.prototype.show = function show(treeId, n) {
        this.addNFlowers(treeId, n);
    };
    FlowerPanel.prototype.hide = function hide() {
        this.flowerArray = [];
        this.lastFlowerNumber = 0;
        this.group.destroy();
        this.group = this.game.add.group();
    };
    return FlowerPanel;
});