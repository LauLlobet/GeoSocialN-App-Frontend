/*global require*/
require.config({
    paths: {
    //    jquery: '../lib/jquery'
        underscore : '../lib/underscore'
    },
    shim: {
    //    jquery : { exports: '$'}
        underscore : { exports: '_'}
    }
});

// Note: enable to debug issues in module loading
//require.onResourceLoad = function (context, map) { /*, depArray*/
//    window.console.log('Loaded ' + map.url);
//};
