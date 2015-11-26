/*global define, require, module, Phaser*/
/*jslint todo: true */
define([ "../Controll/NearbyTreesFromServerToIncommingTreeList",
    "./FillerOfIncommingListIfItGetsEmpty",
    "../InputOutput/HashChangeTrigger",
    "./InitializatorOfBussinesController",
    "../View/UIEngineView/IframeDisplayer",
    "../Controll/WelcomeOfUserDinamic",
    "../Model/TreeRestClient"
    ], function (NearbyTreesFromServerToIncommingTreeList,
                                                          FillerOfIncommingListIfItGetsEmpty,
                                                          HashChangeTrigger,
                                                          InitializatiorOfBussinesController,
                                                          IframeDisplayer,
                                                          WelcomeOfUserDinamic,
                                                          TreeRestClient) {
    "use strict";
    var NAVIGATE = "navigate",
        WRITTING = "writting",
        PASSWORD = "password",
        VIDEOKEY = 'vid:',
        PICKEY = 'pic:';
    function UserInterfaceBussinesController() //noinspection JSLint
    {
            this.state = NAVIGATE;
            this.incommingList = [];
            this.incommingList.push = function (argument) {
                if (argument === null || argument === undefined) {
                    console.log("bug detected");
                }
                return Array.prototype.push.apply(this, arguments);
            }
            this.alreadyDisplayed = [];
            this.mapOfTreesById = {};
            this.fillerOfIncommingListIfItGetsEmpty = new FillerOfIncommingListIfItGetsEmpty(this.incommingList, this);
            this.nearbyTreesFromServerToIncommingTreeList = new NearbyTreesFromServerToIncommingTreeList(this.incommingList, this.alreadyDisplayed, this.mapOfTreesById, this.fillerOfIncommingListIfItGetsEmpty);
            this.hashChangeTrigger = new HashChangeTrigger(this);
    }

    UserInterfaceBussinesController.prototype.init = function (sceneLoaderInterface, backgroundMap) {
        var initializatorOfBussinesController = new InitializatiorOfBussinesController(this),
            welcomeOfUserDinamic;
        this.backgroundMap = backgroundMap;
        welcomeOfUserDinamic = new WelcomeOfUserDinamic(this);
        initializatorOfBussinesController.init(sceneLoaderInterface);
        welcomeOfUserDinamic.startWelcomeToUser();
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
            }).catch(function (error) {
                alert("error");
                console.log(error.stack);
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
            }).catch(function (error) {
                alert("error");
                console.log(error.stack);
            });
        }
    };

    UserInterfaceBussinesController.prototype.linkClicked = function (treeid) {
        var iframeDisplayer = new IframeDisplayer();
        if(isNumeric(treeid)) {
            this.hashChangeTrigger.setHashAtUrlAndStartUpdatingProcess(treeid);
            return;
        }
        if(startsWith(treeid,VIDEOKEY)) {
            iframeDisplayer.showYoutubeVideo(treeid.substr(VIDEOKEY.length))
            return;
        }
        if(startsWith(treeid,PICKEY)) {
            iframeDisplayer.showImgurPicture(treeid.substr(PICKEY.length))
            return;
        }
        alert("Hashtags are still not enabled, but use them so they'll be useful in the future");
    };

    UserInterfaceBussinesController.prototype.setHashUrlAndIgnoreUpdatingIfNotUndefined = function (id) {
        if( id !== undefined && id !== 3) {
            this.hashChangeTrigger.setHashAtUrlAndIgnoreUpdatingProcess(id);
        } else {
            this.hashChangeTrigger.removeHash();
        }
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
                that.flowerPanel.addNFlowers(tree.id, inc, "inmediately");
            }
        }).catch(function (error) {
            alert("error in connection voting tree: " + error);
            console.log(error.stack);
        });
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
                reject("not enought precision");
            }
            return treeRestClient.put(tree).then(function (ans) {
                if (ans.treeContent === null) {
                    reject("error posting tree, this place might be full");
                }
                return ans;
            }).then(function (ans) {
                that.hashChangeTrigger.setHashAtUrlAndIgnoreUpdatingProcess(ans.treeContent.id)
                that.gpsMovmentTrigger.forceUpdate();
                that.nearbyTreesFromServerToIncommingTreeList.loadSpecificTreeToHash(ans.treeContent.id).then(function(){
                    that.incommingList.push(ans.treeContent.id);
                    resolve();
                })
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
                }).catch(function (error) {
                    alert(error);
                    that.state = NAVIGATE;
                    that.keyboardInterface.hideOnScene();
                    that.sceneTreeTextSetterInterface.setIsTyping(false);
                    that.gpsMovmentTrigger.setPrecisionNowIsNotImportant();
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

    UserInterfaceBussinesController.prototype.unBuryLayer = function (buryLayerId) {
        var tree = this.getTreeAlreadyDisplayed();
        this.sceneTreeTextSetterInterface.unBury(buryLayerId);
        if (tree.unburiedLayersTreeLevel === undefined) {
            tree.unburiedLayersTreeLevel = {}; // unburiedLaters == {};
        }
        tree.unburiedLayersTreeLevel[buryLayerId] = true;
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

    /*


    EVENTS


     */

    UserInterfaceBussinesController.prototype.justDisplayedATree = function () {
        var tree = this.getTreeAlreadyDisplayed();
        if (tree !== undefined && tree !== null) {
            if(tree.id > 30) {
                this.votingPanel.show();
                this.flowerPanel.addNFlowers(tree.id, tree.metersToHide);
            }
            this.backgroundMap.justDisplayedATreeSoDisplayAMap(tree);
        }
        if (tree === null) {
            this.gpsMovmentTrigger.setPrecisionNowIsImportant();
        }
    };


    UserInterfaceBussinesController.prototype.justLeftBehindATree = function () {
        this.votingPanel.hide();
        this.flowerPanel.hide();
        this.backgroundMap.hideMap();

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



    UserInterfaceBussinesController.prototype.userHasMoved = function userHasMoved(coords) {
        return this.nearbyTreesFromServerToIncommingTreeList.userHasMovedTo(this.gpsMovmentTrigger.actualCoordinates);
    };

    UserInterfaceBussinesController.prototype.updateWithoutMoving = function updateWithoutMoving() {
        return this.userHasMoved(undefined);
    };

    UserInterfaceBussinesController.prototype.hashHasBeenUpdated = function (treeId) {
        var that = this;
        if (isNaN(treeId) || treeId === "") {
            return;
        }
        this.nearbyTreesFromServerToIncommingTreeList.loadSpecificTreeToHash(treeId).then(
            function () {
                that.treeLoaderToSceneLoaderFromLists.swipeToSpecificTree(treeId).then(function () {
                    that.justDisplayedATree();
                }).catch(function (error) {
                    alert("error");
                    console.log(error.stack);
                });
            }
        ).catch(function (error) {
                alert("error");
                console.log(error.stack);
            });
    };

    /*

     AUX


     */

    UserInterfaceBussinesController.prototype.firstNcharcters = function firstNcharcters(string, n) {
        if(string.length < n) {
            return string;
        }
        return string.substr(0, n);
    };

    UserInterfaceBussinesController.prototype.buriedLayerEvent = function (buryLayerId) {
        if (buryLayerId === 'lock') {
            this.passwordDialog.show();
            this.state = PASSWORD;
            this.keyboardInterface.showOnScene();
        }
    };

    UserInterfaceBussinesController.prototype.handleIgnoredPrecision = function (precisionOneToTen) {
        if(precisionOneToTen < 10 ){
            this.notPreciseAndIgnoredAlert.showNotPrecise();
            return;
        }
        this.notPreciseAndIgnoredAlert.hideNotPrecise();
    }

    UserInterfaceBussinesController.prototype.forceHandlePrecisionAlerts = function () {
        this.gpsMovmentTrigger.forceHandlePrecisionAlerts();
    }

    UserInterfaceBussinesController.prototype.appHasStarted = function () {
        this.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame.removeWelcomeScreen();
    }

    var isNumeric = function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    var startsWith = function (string, prefix){
        return string.indexOf(prefix) === 0
    }

    return UserInterfaceBussinesController;
});