/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    var x = 110,
        y = 450;
    function NotPreciseAlert(phaserGame) {
        this.game = phaserGame.game;
        this.alphaLayer = this.game.add.group();
        this.alphaLayer.name = "notPreciseAlert";
        this.yesPrecise = this.alphaLayer.create(x, y, "yesPreciseAlert");
        this.notPrecise = this.alphaLayer.create(x, y, "notPreciseAlert");
        this.yesPrecise.scale.x = this.yesPrecise.scale.y = this.notPrecise.scale.x = this.notPrecise.scale.y = 2.2;
        this.hideNotPrecise();
    }
    NotPreciseAlert.prototype.showNotPrecise = function () {
        this.alphaLayer.alpha = 0.2;
        this.game.add.tween(this.notPrecise).to({alpha: 1},
            100, 'Linear', true);
        this.game.add.tween(this.yesPrecise).to({alpha: 0},
            100, 'Linear', true);
        this.initialTween = this.game.add.tween(this.alphaLayer).to({alpha: 0.8},
            1200, 'Linear', true, 0, -1);
        this.initialTween.yoyo(true, 0);
        this.lastUpdateWasToHideNotPrecise = false;
    };
    NotPreciseAlert.prototype.hideNotPrecise = function () {
        if (this.lastUpdateWasToHideNotPrecise) {
            return;
        }
        this.game.add.tween(this.notPrecise).to({alpha: 0},
            100, 'Linear', true);
        this.game.add.tween(this.yesPrecise).to({alpha: 1},
            100, 'Linear', true);
        if (this.initialTween) {
            this.initialTween.stop();
            var showup = this.game.add.tween(this.alphaLayer).to({alpha: 0.9},
                800, 'Linear');
            var fadeout = this.game.add.tween(this.alphaLayer).to({alpha: 0},
                400, 'Linear');
            showup.chain(fadeout);
            showup.start();
        } else {
            this.alphaLayer.alpha = 0;
        }
        this.lastUpdateWasToHideNotPrecise = true;
    };

    /*    function NotPreciseAlert(phaserGame) {
     this.game = phaserGame.game;
     this.alphaLayer = this.game.add.group();
     this.alphaLayer.name = "notPreciseAlert";
     this.notPrecise = this.alphaLayer.create(x, y, "notPreciseAlert");
     this.yesPrecise = this.alphaLayer.create(x, y, "notPreciseAlert");
     this.yesPrecise.alpha = 0;
     this.alphaLayer.scale.x = this.alphaLayer.scale.y = 2.2;
     this.showNotPrecise();
     }
     NotPreciseAlert.prototype.showNotPrecise = function () {
     this.game.add.tween(this.notPrecise).to({alpha: 1},
     100, 'Linear', true, 0, -1);
     this.game.add.tween(this.yesPrecise).to({alpha: 0},
     100, 'Linear', true, 0, -1);
     this.alphaLayer.alpha = 0.2;
     this.initialTween = this.game.add.tween(this.alphaLayer).to({alpha: 0.8},
     800, 'Linear', true, 0, -1);
     this.initialTween.yoyo(true, 0);
     };
     NotPreciseAlert.prototype.hideNotPrecise = function () {
     this.game.add.tween(this.notPrecise).to({alpha: 0},
     100, 'Linear', true, 0, -1);
     this.game.add.tween(this.yesPrecise).to({alpha: 1},
     100, 'Linear', true, 0, -1);
     if (this.initialTween) {
     this.initialTween.stop();
     this.initialTween = this.game.add.tween(this.alphaLayer).to({alpha: 0.9},
     800, 'Linear');
     var fadeout = this.game.add.tween(this.alphaLayer).to({alpha: 0},
     400, 'Linear');
     this.initialTween.chain(fadeout);
     }
     this.alphaLayer.alpha = 0;
     };
*/
     return NotPreciseAlert;
});
