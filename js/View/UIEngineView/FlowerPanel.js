define([], function () {
    "use strict";
    var groupx = 0,
        groupy = 0,
        groupw = 458,
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
            position;
        if (n < 0) {
            this.removeNFlowers(n);
            return;
        }
        for (i = 0; i < n; i += 1) {
            flowerNumber = this.lastFlowerNumber + i;
            position = this.getXYFromNAndId(flowerNumber, treeId);
            //position.x = groupw;
            //position.y = grouph;
            this.flowerArray.push(this.group.create(position.x, position.y, 'flower'));
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
    };
    FlowerPanel.prototype.show = function show(treeId, n) {
        this.addNFlowers(treeId, n);
    };
    FlowerPanel.prototype.hide = function hide() {
        this.flowerArray = [];
        this.lastFlowerNumber = 0;
        this.group.destroy();
        this.group = this.game.add.group();
    };

    FlowerPanel.prototype.getXYFromNAndId = function (n, id) {
        var x,
            y,
            hashX = this.hashCode(n + " " + n + "X sugar " + id),
            hashY = this.hashCode(n + " " + n + " Y sugar " + id);
        hashX = Math.abs(hashX);
        hashY = Math.abs(hashY);
        x = parseInt(( "" + hashX).substring(0, 3));
        y = parseInt(( "" + hashY).substring(0, 3));
        console.log("X:" + hashX);
        x = x / 1000;
        y = y / 1000;
        x = x * groupw;
        y = y * grouph;
        return { x: x,
                y: y };
    };
    FlowerPanel.prototype.hashCode = function (string) {
        var hash = 0,
            i,
            char;
        if (string.length == 0) {
            return hash;
        }
        for (i = 0; i < string.length; i += 1) {
            char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };
    return FlowerPanel;
});