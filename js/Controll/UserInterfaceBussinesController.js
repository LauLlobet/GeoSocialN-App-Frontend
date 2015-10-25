/*global define, require, module, Phaser*/
/*jslint todo: true */
define(["../InputOutput/GpsMovmentTrigger", "../Controll/NearbyTreesFromServerToIncommingTreeList",
    "./TreeLoaderToSceneLoaderFromLists", "../Model/TreeRestClient", "./FillerOfIncommingListIfItGetsEmpty",
    "../InputOutput/HashChangeTrigger", "../View/SceneLoaderLevel/SceneTreeTextSetter",
    "../View/SpriteLevel/SpriteTreeTextSetter", "../View/SceneLoaderLevel/SceneTreeKmSetter",
    "../View/SpriteLevel/SpriteTreeKmCounterSetter", "../View/SceneLoaderLevel/SceneTreeCompassSetter",
    "../View/SpriteLevel/SpriteTreeCompassSetter", "./RelativeLocationCalculator", "../View/UIEngineView/PasswordDialog",
    "./LeafPileUnburier", "../js/View/UIEngineView/VotingPanel.js", "../js/View/UIEngineView/FlowerPanel.js",
    "./IncommingTreesEmptyOnesAndDiscardedCueMixer"], function (GpsMovmentTrigger, NearbyTreesFromServerToIncommingTreeList,
                                                           TreeLoaderToSceneLoaderFromLists, TreeRestClient,
                                                           FillerOfIncommingListIfItGetsEmpty, HashChangeTrigger,
                                                           SceneTreeTextSetter, SpriteTreeTextSetter,
                                                           SceneTreeKmSetter, SpriteTreeKmCounterSetter,
                                                           SceneTreeCompassSetter, SpriteTreeCompassSetter,
                                                           RelativeLocationCalculator, PasswordDialog, LeafPileUnburier,
                                                           VotingPanel, FlowerPanel, IncommingTreesEmptyOnesAndDiscardedCueMixer) {
    "use strict";
    var NAVIGATE = "navigate",
        WRITTING = "writting",
        PASSWORD = "password";
    function UserInterfaceBussinesController() //noinspection JSLint
    {
            this.state = NAVIGATE;
            this.incommingList = [];
            this.alreadyDisplayed = [];
            this.mapOfTreesById = {};
            this.mapOfTreesById[-1] = { id: -1, text: '-1' };
            this.fillerOfIncommingListIfItGetsEmpty = new FillerOfIncommingListIfItGetsEmpty(this.incommingList, this);
            this.nearbyTreesFromServerToIncommingTreeList = new NearbyTreesFromServerToIncommingTreeList(this.incommingList, this.alreadyDisplayed, this.mapOfTreesById, this.fillerOfIncommingListIfItGetsEmpty);
            this.lastKnownCoords = undefined;
            this.hashChangeTrigger = new HashChangeTrigger(this);

    }

    UserInterfaceBussinesController.prototype.init = function (sceneLoaderInterface) {
        var that = this,
            tmp;
        this.gpsMovmentTrigger = new GpsMovmentTrigger(this, sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame);
        this.sceneLoaderInterface = sceneLoaderInterface;
        this.incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(this.incommingList, this.mapOfTreesById, this.gpsMovmentTrigger)

        this.treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
            this.sceneLoaderInterface,
            this.incommingList,
            this.alreadyDisplayed,
            this.mapOfTreesById,
            this.incommingTreesEmptyOnesAndDiscardedCueMixer);
        tmp = new SpriteTreeTextSetter(this.sceneLoaderInterface.spriteManagerPhaserApiInterface);
        this.sceneTreeTextSetterInterface = new SceneTreeTextSetter(sceneLoaderInterface, tmp);
        tmp = new SpriteTreeKmCounterSetter(this.sceneLoaderInterface.spriteManagerPhaserApiInterface);
        this.sceneTreeTextKmInterface = new SceneTreeKmSetter(sceneLoaderInterface, tmp);
        tmp = new SpriteTreeCompassSetter(this.sceneLoaderInterface.spriteManagerPhaserApiInterface);
        this.sceneTreeCompassInterface = new SceneTreeCompassSetter(sceneLoaderInterface, tmp);
        this.relativeLocationCalculator = new RelativeLocationCalculator(this.mapOfTreesById, this.sceneTreeTextKmInterface, this.sceneTreeCompassInterface, this.gpsMovmentTrigger);
        this.leafPileUnburier = new LeafPileUnburier(this.mapOfTreesById, this);
        this.sceneLoaderInterface.newlyPresentedTreeSubjectNotifier.addObserver(this.relativeLocationCalculator);
        this.sceneLoaderInterface.newlyPresentedTreeSubjectNotifier.addObserver(this.leafPileUnburier);
        this.gpsMovmentTrigger.init(this.relativeLocationCalculator, this.leafPileUnburier);

        this.passwordDialog = new PasswordDialog(this.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame);
        this.votingPanel = new VotingPanel(this.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame, this);
        this.flowerPanel = new FlowerPanel(this.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame);

        this.nearbyTreesFromServerToIncommingTreeList.loadTreeToHash({
            id: 1,
            ip: "87.223.58.75",
            metersToHide: 10,
            text: "Swipe left and right and discover arround you!",
            timestamp: 1441013147469,
            x: 2.111330986022949,
            y: 2.111330986022949
        });

        this.nearbyTreesFromServerToIncommingTreeList.loadTreeToHash({
            id: 3,
            ip: "87.223.58.75",
            metersToHide: 10,
            text: "",
            timestamp: 1441013147469,
            x: 2.111330986022949,
            y: 2.111330986022949
        });

        this.gpsMovmentTrigger.forceUpdate();
        this.hashChangeTrigger.storeActualHash();
        this.sceneLoaderInterface.stackLoadScene('forestSwipeLeft',
            [
                undefined,
                {id: 1, text: "Swipe left and right and discover arround you!"},
                undefined
            ]
            );
        this.updateWithoutMoving().then(function () {
            alert("longitude " + that.lastKnownCoords.x + "empty:" + that.incommingList.emptyTrees);
            if (that.incommingList.emptyTrees === 0) {
                that.sceneLoaderInterface.stackLoadScene('forestSwipeRight', [{id: 3, text: ""}, undefined, undefined]);
            } else {
                that.sceneLoaderInterface.stackLoadScene('forestSwipeRight', [null, undefined, undefined]);
            }
            that.sceneLoaderInterface.playAllStackedScenes().then(function () {
                that.hashChangeTrigger.triggerIfStoredHashWasNotEmpty();
                that.hashChangeTrigger.update();
            });
            that.fillerOfIncommingListIfItGetsEmpty.start();
        });
    };
    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeLeft = function swipeLeft() {
        var that = this;
        if (this.state === NAVIGATE) {
            that.justLeftBehindATree();
            return this.treeLoaderToSceneLoaderFromLists.swipeLeft().then( function (ans) {
                console.log("----SL----");
                console.log("incomming: " +  that.incommingList);
                console.log("already: " +  that.alreadyDisplayed);
                that.setHashUrlAndIgnoreUpdatingIfNotUndefined(ans);
                that.justDisplayedATree();
            });
        }
    };
    //MAIN INPUT FUNCTION
    UserInterfaceBussinesController.prototype.swipeRight = function swipeRight() {
        var that = this;
        if (this.state === NAVIGATE) {
            that.justLeftBehindATree();
            return this.treeLoaderToSceneLoaderFromLists.swipeRight().then( function (ans) {
                console.log("----SR----");
                console.log("incomming: " +  that.incommingList);
                console.log("already: " +  that.alreadyDisplayed);
                that.setHashUrlAndIgnoreUpdatingIfNotUndefined(ans);
                that.justDisplayedATree();
            });
        }
    };

    UserInterfaceBussinesController.prototype.setHashUrlAndIgnoreUpdatingIfNotUndefined = function (id) {
        if( id !== undefined && id !== 3) {
            this.hashChangeTrigger.setHashAtUrlAndIgnoreUpdatingProcess(id);
        } else {
            this.hashChangeTrigger.removeHash();
        }
    };

    UserInterfaceBussinesController.prototype.linkClicked = function (treeid) {
        this.hashChangeTrigger.setHashAtUrlAndStartUpdatingProcess(treeid);
    };
    UserInterfaceBussinesController.prototype.upVote = function () {
        var music;
        this.voteEmmited(this.getTreeAlreadyDisplayed().id, 1);
        music = this.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame.game.add.audio('bell');
        music.play();
    };
    UserInterfaceBussinesController.prototype.downVote = function () {
        var music;
        this.voteEmmited(this.getTreeAlreadyDisplayed().id, -1);
        music = this.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame.game.add.audio('unbell');
        music.play();
    };
    UserInterfaceBussinesController.prototype.voteEmmited = function (treeid, inc) {
        var treeRestClient = new TreeRestClient(),
            that = this;
        treeRestClient.getSpecificTree(treeid).then(function (val) {
            val.treeContent.metersToHide += inc;
            return treeRestClient.put(val.treeContent);
        }).then(function (val) {
            var tree = that.getTreeAlreadyDisplayed();
            if (tree !== undefined && treeid !== 3) {
                that.flowerPanel.addNFlowers(tree.id, inc);
            }
        }).catch(function (error) {
            alert("error in connection voting tree: " + error);
        });
    };

    UserInterfaceBussinesController.prototype.justDisplayedATree = function () {
        var tree = this.getTreeAlreadyDisplayed();
        if (tree !== undefined && tree !== null && tree.id > 30) {
            this.votingPanel.show();
            this.flowerPanel.addNFlowers(tree.id, tree.metersToHide);
        }
        if (tree === null) {
            this.gpsMovmentTrigger.setPrecisionNowIsImportant();
        }
    };


    UserInterfaceBussinesController.prototype.justLeftBehindATree = function () {
        this.votingPanel.hide();
        this.flowerPanel.hide();
    };

    UserInterfaceBussinesController.prototype.clickedOnWriteButton = function clickedOnWriteButton() {
        if (this.state === NAVIGATE) {
            this.state = WRITTING;
            this.keyboardInterface.showOnScene();
            this.sceneTreeTextSetterInterface.setIsTyping(true);
        }
    };

    UserInterfaceBussinesController.prototype.putTreeOnServer = function () {
        var text = this.sceneTreeTextSetterInterface.getEditedTreeText(),
            coords = this.gpsMovmentTrigger.actualCoordinates,
            treeRestClient = new TreeRestClient(),
            tree = { text: text, metersToHide: 0, x: coords.longitude, y: coords.latitude},
            that = this;

        return new Promise(function (resolve, reject) {
            if (that.gpsMovmentTrigger.precisionOneToTen !== 10) {
                reject("Not enought precision, wait for a while to plant a tree.");
                return;
            }
            treeRestClient.put(tree).then(function (ans) {
                if (ans.treeContent === null) {
                    reject("error posting tree");
                }
                return ans;
            }).then(function (ans) {
                var music;
                that.hashChangeTrigger.setHashAtUrlAndIgnoreUpdatingProcess(ans.treeContent.id)
                that.gpsMovmentTrigger.forceUpdate();
                music = this.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame.game.add.audio('plant');
                music.play();
                resolve();
            });
        });
    };

    UserInterfaceBussinesController.prototype.clickedOnKey = function clickedOnKey(char) {
        var that = this;
        if (this.state === WRITTING) {
            if (char === "ok") {
                this.putTreeOnServer().then(function () {
                    that.state = NAVIGATE;
                    that.keyboardInterface.hideOnScene();
                    that.sceneTreeTextSetterInterface.setIsTyping(false);
                    that.gpsMovmentTrigger.setPrecisionNowIsNotImportant();
                }).catch(function (reason) {
                    alert(reason);
                });
            } else if (char === "cancel") {
                this.state = NAVIGATE;
                this.keyboardInterface.hideOnScene();
                this.sceneTreeTextSetterInterface.setIsTyping(false);
            } else if (char === "backwards") {
                this.sceneTreeTextSetterInterface.removeChar();
            } else {
                this.sceneTreeTextSetterInterface.addChar(char);
            }
        } else if (this.state === PASSWORD) {
            if (char === "ok") {
                if (this.passwordDialog.getText() === this.getPasswordFromLockedTree()) {
                    this.unBuryLayer("lock");
                }
                this.passwordDialog.hideAndSetNoText();
                this.keyboardInterface.hideOnScene();
                this.state = NAVIGATE;
            } else if (char === "cancel") {
                this.passwordDialog.hideAndSetNoText();
                this.keyboardInterface.hideOnScene();
                this.state = NAVIGATE;
            } else if (char === "backwards") {
                this.passwordDialog.removeChar();
            } else {
                this.passwordDialog.addChar(char);
            }
        }
    };

    UserInterfaceBussinesController.prototype.userHasMoved = function userHasMoved(coords) {
        if (coords !== undefined) {
            this.lastKnownCoords = {x : coords.longitude, y : coords.latitude};
        }
        if (this.lastKnownCoords === undefined) {
            this.lastKnownCoords = {x : longitude, y : latitude};
        }
        return this.nearbyTreesFromServerToIncommingTreeList.userHasMovedTo(this.lastKnownCoords);
    };

    UserInterfaceBussinesController.prototype.updateWithoutMoving = function updateWithoutMoving() {
        return this.userHasMoved(undefined);
    };

    UserInterfaceBussinesController.prototype.hashHasBeenUpdated = function (treeId) {
        var that = this;
        this.nearbyTreesFromServerToIncommingTreeList.loadSpecificTreeToHash(treeId).then(
            function () {
                that.treeLoaderToSceneLoaderFromLists.swipeToSpecificTree(treeId).then(function () {
                    that.justDisplayedATree();
                });
            }
        );
    };
    UserInterfaceBussinesController.prototype.buriedLayerEvent = function (buryLayerId) {
        if (buryLayerId === 'lock') {
            this.passwordDialog.show();
            this.state = PASSWORD;
            this.keyboardInterface.showOnScene();
        }
    };
    UserInterfaceBussinesController.prototype.unBuryLayer = function (buryLayerId) {
        var tree = this.getTreeAlreadyDisplayed();
        this.sceneTreeTextSetterInterface.unBury(buryLayerId);
        if (tree.unburiedLayers === undefined) {
            tree.unburiedLayers = {};
        }
        tree.unburiedLayers[buryLayerId] = true;
    };


    UserInterfaceBussinesController.prototype.getPasswordFromLockedTree = function getPasswordFromLockedTree() {
        var tree = this.getTreeAlreadyDisplayed(),
            password,
            rightHalfOfTextFromLockSymbol,
            nextSpace,
            text = tree.text.replace("\n", "");
        rightHalfOfTextFromLockSymbol = text.substring(text.indexOf("*passwd:") + "*passwd:".length, text.length);
        nextSpace = rightHalfOfTextFromLockSymbol.indexOf(' ');
        if (nextSpace !== -1) {
            password = rightHalfOfTextFromLockSymbol.substring(0, nextSpace);
        } else {
            password = rightHalfOfTextFromLockSymbol;
        }
        password = this.firstNcharcters(password, 11);
        console.log("pwd:" + password);
        return password;
    };
    UserInterfaceBussinesController.prototype.firstNcharcters = function firstNcharcters(string, n) {
        if(string.length < n) {
            return string;
        }
        return string.substr(0, n);
    };
    UserInterfaceBussinesController.prototype.getTreeAlreadyDisplayed = function getTreeAlreadyDisplayed() {
        var treeid = this.sceneLoaderInterface.getTreeAlreadyDisplayed(),
            tree;
        if (treeid === null) {
            return null;
        }
        tree = this.mapOfTreesById[treeid];
        return tree;
    };
    return UserInterfaceBussinesController;
});