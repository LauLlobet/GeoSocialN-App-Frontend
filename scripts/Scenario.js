//noinspection JSUnusedLocalSymbols,JSLint
define(['iioModule'], function (iiomodule) {
    "use strict";
    return function Scenario(io) {
        this.hashtable = {};
        this.treeAndObj = function treeAndObj(tree, obj) {
            //noinspection JSUnusedGlobalSymbols
            this.tree = tree;
            //noinspection JSUnusedGlobalSymbols
            this.obj = obj;
        };
        this.createAndAddWoodEngineImg = function createAndAddWoodEngineImg(x, y, w, h, scale) {
            var wood;
            //noinspection JSLint
            wood = new iio.Rect(x, y, w * scale, h * scale);
            wood.enableKinematics();
            wood.createWithImage('treeTrunk.png',
                function () {
                    io.addObj(wood);
                }
                );
            //noinspection MagicNumberJS
            wood.setImgSize(100, 200);
            //  wood.setImgSize(w*scale,h*scale);
            return wood;
        };
        this.addTree = function addTree(tree) {
            var imgObj, treeAndObj;
            //noinspection MagicNumberJS
            imgObj = this.createAndAddWoodEngineImg(tree.x, tree.y, 100, 200, tree.z);
            treeAndObj  = new this.treeAndObj(tree, imgObj);
            this.hashtable[tree.initId] = treeAndObj;
        };
        this.addScene = function addScene(scene) {
            var i;
            for (i = 0; i < scene.trees.length; i += 1) {
                this.addTree(scene.trees[i]);
            }
        };
    };
});