/*global require*/
require.config({
    baseUrl: '../js',
    paths: {
        // jquery: '../lib/jquery',
        sinon: '../test/lib/sinon',
        underscore : '../lib/underscore'
    },

    shim: {
        // jquery : { exports: '$'},
        sinon: { exports: 'sinon'},
        underscore : { exports: '_'}
    }
});
