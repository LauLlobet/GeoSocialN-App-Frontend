/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['underscore', "../lib/restful", "../lib/rsvp"], function (_, restful, rsvp) {
    "use strict";
    function TreeRestClient() {
        this.api = restful('52.26.137.110')
                .header("Accept", "application/json") // set global header
                .prefixUrl('YOUR_PATH')
                .port(8080);
        this.treeApi = this.api.oneUrl('articles', 'http://52.26.137.110:8080/YOUR_PATH/trees');
    }
    TreeRestClient.prototype.put = function (tree) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.treeApi.put(tree).then(function (response) {
                var entity = response.body();
                if (entity !== null && entity.treeContent !== null) {
                    resolve(entity);
                } else {
                    console.log("entity is null");
                    reject("entity is null");
                }
            });
        });
    };
    return TreeRestClient;
});
