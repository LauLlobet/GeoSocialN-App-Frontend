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

    FlowerPanel.prototype.addNFlowers = function addNFlowers(treeId, n, inmedeately) {
        var i,
            flowerNumber,
            position,
            flower;
        if (n < 0) {
            this.removeNFlowers(n);
            return;
        }
        for (i = 0; i < n; i += 1) {
            flowerNumber = this.lastFlowerNumber + i;
            position = this.getXYFromNAndId(flowerNumber, treeId);
            flower = this.group.create(position.x, position.y, 'flower');
            this.makeFlowerAppeare(flower, inmedeately);
            this.flowerArray.push(flower);
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
            hashY = this.hashCode(n + " " + n + " Y sugar " + id),
            pos,
            offset = 0;
        hashX = Math.abs(hashX);
        hashY = Math.abs(hashY);
        x = parseInt(( "" + hashX).substring(0, 3));
        y = parseInt(( "" + hashY).substring(0, 3));
        x = x / 1000;
        y = y / 1000;
        x = x * groupw / 2;
        y = y * grouph / 2;
        pos = n % 4;
        if (pos === 0) {
            return { x: x,
                y: y + offset};
        }
        if (pos === 1) {
            return { x: x + (groupw / 2),
                y: y + offset};
        }
        if (pos === 2) {
            return { x: x,
                y: y + (grouph / 2) + offset};
        }
        if (pos === 3) {
            return { x: x + (groupw / 2),
                y: y + (grouph / 2) + offset };
        }


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
    FlowerPanel.prototype.makeFlowerAppeare = function (flowerSprite, inmedeately) {
        var duration = Math.random() * 400,
            delay = Math.random() * 1100;
        if (inmedeately !== undefined) {
            delay = 0;
            duration = 100;
        }
        flowerSprite.alpha = 0;
        flowerSprite.angle += Math.random() * 360;
        this.game.add.tween(flowerSprite).to({alpha: 1}, duration, 'Linear', true, delay, 0);
    };
    return FlowerPanel;
});