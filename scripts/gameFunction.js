//noinspection JSLint,JSUnusedLocalSymbols
define(["StaticScene", 'Scenario', 'iioModule'], function (staticScene, Scenario, iioModule) {
    "use strict";
    return {
        theGameFunction: function theGameFunction(io) {
            var scenario = new Scenario(io);
            scenario.addScene(staticScene);
        }
    };
});