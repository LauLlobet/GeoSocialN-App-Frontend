define(["../InputOutput/GpsMovmentTrigger", "../Controll/NearbyTreesFromServerToIncommingTreeList",
    "./TreeLoaderToSceneLoaderFromLists", "../Model/TreeRestClient", "./FillerOfIncommingListIfItGetsEmpty",
    "../InputOutput/HashChangeTrigger", "../View/SceneLoaderLevel/SceneTreeTextSetter",
    "../View/SpriteLevel/SpriteTreeTextSetter", "../View/SceneLoaderLevel/SceneTreeKmSetter",
    "../View/SpriteLevel/SpriteTreeKmCounterSetter", "../View/SceneLoaderLevel/SceneTreeCompassSetter",
    "../View/SpriteLevel/SpriteTreeCompassSetter", "./RelativeLocationCalculator", "../View/UIEngineView/PasswordDialog",
    "./LeafPileUnburier", "../js/View/UIEngineView/VotingPanel.js", "../js/View/UIEngineView/FlowerPanel.js",
    "./IncommingTreesEmptyOnesAndDiscardedCueMixer", "../lib/rsvp", "../View/SceneLoaderLevel/SceneTreeRakeSetter",
    "../View/SpriteLevel/SpriteTreeRakeSetter"], function (GpsMovmentTrigger, NearbyTreesFromServerToIncommingTreeList,
                                                TreeLoaderToSceneLoaderFromLists, TreeRestClient,
                                                FillerOfIncommingListIfItGetsEmpty, HashChangeTrigger,
                                                SceneTreeTextSetter, SpriteTreeTextSetter,
                                                SceneTreeKmSetter, SpriteTreeKmCounterSetter,
                                                SceneTreeCompassSetter, SpriteTreeCompassSetter,
                                                RelativeLocationCalculator, PasswordDialog, LeafPileUnburier,
                                                VotingPanel, FlowerPanel, IncommingTreesEmptyOnesAndDiscardedCueMixer,
                                                rsvp, SceneTreeRakeSetter, SpriteTreeRakeSetter) {
    function InitializatorOfBussinesController(bussinesController) {
        this.bussinesController = bussinesController;
    }
    InitializatorOfBussinesController.prototype.init = function (sceneLoaderInterface) {
        var tmp;
        this.bussinesController.gpsMovmentTrigger = new GpsMovmentTrigger(this.bussinesController, sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame);
        this.bussinesController.sceneLoaderInterface = sceneLoaderInterface;
        this.bussinesController.incommingTreesEmptyOnesAndDiscardedCueMixer = new IncommingTreesEmptyOnesAndDiscardedCueMixer(this.bussinesController.incommingList, this.bussinesController.mapOfTreesById, this.bussinesController.gpsMovmentTrigger)

        this.bussinesController.treeLoaderToSceneLoaderFromLists = new TreeLoaderToSceneLoaderFromLists(
            this.bussinesController.sceneLoaderInterface,
            this.bussinesController.incommingList,
            this.bussinesController.alreadyDisplayed,
            this.bussinesController.mapOfTreesById,
            this.bussinesController.incommingTreesEmptyOnesAndDiscardedCueMixer);
        tmp = new SpriteTreeTextSetter(this.bussinesController.sceneLoaderInterface.spriteManagerPhaserApiInterface);
        this.bussinesController.sceneTreeTextSetterInterface = new SceneTreeTextSetter(sceneLoaderInterface, tmp);
        tmp = new SpriteTreeKmCounterSetter(this.bussinesController.sceneLoaderInterface.spriteManagerPhaserApiInterface);
        this.bussinesController.sceneTreeTextKmInterface = new SceneTreeKmSetter(sceneLoaderInterface, tmp);
        tmp = new SpriteTreeCompassSetter(this.bussinesController.sceneLoaderInterface.spriteManagerPhaserApiInterface);
        this.bussinesController.sceneTreeCompassInterface = new SceneTreeCompassSetter(sceneLoaderInterface, tmp);
        tmp = new SpriteTreeRakeSetter(this.bussinesController.sceneLoaderInterface.spriteManagerPhaserApiInterface);
        this.bussinesController.sceneTreeRakeInterface = new SceneTreeRakeSetter(sceneLoaderInterface, tmp);
        this.bussinesController.relativeLocationCalculator = new RelativeLocationCalculator(this.bussinesController.mapOfTreesById, this.bussinesController.sceneTreeTextKmInterface, this.bussinesController.sceneTreeCompassInterface, this.bussinesController.sceneTreeRakeInterface , this.bussinesController.gpsMovmentTrigger);
        this.bussinesController.leafPileUnburier = new LeafPileUnburier(this.bussinesController.mapOfTreesById, this.bussinesController);
        this.bussinesController.sceneLoaderInterface.newlyPresentedTreeSubjectNotifier.addObserver(this.bussinesController.relativeLocationCalculator);
        this.bussinesController.sceneLoaderInterface.newlyPresentedTreeSubjectNotifier.addObserver(this.bussinesController.leafPileUnburier);
        this.bussinesController.gpsMovmentTrigger.init(this.bussinesController.relativeLocationCalculator, this.bussinesController.leafPileUnburier);
        this.bussinesController.passwordDialog = new PasswordDialog(this.bussinesController.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame);
        this.bussinesController.votingPanel = new VotingPanel(this.bussinesController.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame, this.bussinesController);
        this.bussinesController.flowerPanel = new FlowerPanel(this.bussinesController.sceneLoaderInterface.spriteManagerPhaserApiInterface.phaserGame);

    }

    return InitializatorOfBussinesController;

});