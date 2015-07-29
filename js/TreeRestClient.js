/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['underscore', "../lib/restful", "../lib/rsvp"], function (_, restful, rsvp) {
    "use strict";
    function TreeRestClient() {
        this.api = restful( location.host.split(':')[0])
                .header("Accept", "application/json") // set global header
                .prefixUrl('YOUR_PATH')
                .port(8080);
        var host = location.host.split(':')[0] === 'localhost' ? '52.26.137.110:8080' : location.host;
        this.path = 'http://' + host + '/YOUR_PATH/trees';
    }
    TreeRestClient.prototype.deleteAll = function () {
        this.treeApi = this.api.oneUrl('articles', this.path);
        console.log("delete");
        return this.treeApi.delete();
    };


    TreeRestClient.prototype.put = function (tree) {
        this.treeApi = this.api.oneUrl('articles', this.path);
        var that = this;
        return new Promise(function (resolve, reject) {
            that.treeApi.put(tree).then(function (response) {
                var entity = response.body();
                if (entity !== null) {
                    resolve(entity);
                } else {
                    console.log("entity is null");
                    reject("entity is null");
                }
            });
        });
    };

    TreeRestClient.prototype.buildDontIncludeString = function (dontInclude){
        var string = '[';
        if (dontInclude.length === 0) {
            return "[]";
        }
        dontInclude.forEach(function (tree) {
            string += tree + ',';
        });
        return string.substr(0, string.length - 1) + ']';
    }

    TreeRestClient.prototype.get = function (x, y, dontInclude) {
        var dontIncludeString = this.buildDontIncludeString(dontInclude);
        this.treeApi = this.api.allUrl('articles', this.path);
        var that = this;
        return new Promise(function (resolve, reject) {
            that.treeApi.getAll({x:x,y:y,dontInclude:dontIncludeString}).then(function (response) {
                var entity = response.body();
                if (entity !== null) {
                    resolve(entity.data());
                } else {
                    console.log("entity is null");
                    reject("entity is null");
                }
            }).catch(function f(exception){
                console.log("impossible to do a get, no internet connection");
            });
        });
    };

    TreeRestClient.prototype.getSpecificTree = function (treeId) {
        this.treeApi = this.api.allUrl('articles', this.path + "/"+treeId);
        var that = this;
        return new Promise(function (resolve, reject) {
            that.treeApi.getAll({id:treeId, x:0, y:0}).then(function (response) {
                var entity = response.body();
                if (entity !== null) {
                    resolve(entity.data());
                } else {
                    console.log("entity is null");
                    reject("entity is null");
                }
            }).catch(function f(exception){
                console.log("impossible to do a get, no internet connection");
            });
        });
    };




    return TreeRestClient;
});
