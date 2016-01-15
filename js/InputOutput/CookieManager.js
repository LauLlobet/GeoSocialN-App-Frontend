/*global define, require, module, Phaser, Group, console, underscore,setTimeout */
    /*jslint todo: true */
define(["../lib/underscore"], function (underscore) {
    "use strict";
    function CookieManager(){
    }

    CookieManager.prototype.setCookie = function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        exdays = exdays === undefined ? 10000 : exdays;
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    CookieManager.prototype.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    CookieManager.prototype.deleteCookie = function (cname) {
        this.setCookie(cname,"");
    }
    return CookieManager;
});