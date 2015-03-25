/*global define, require, module, asyncTest, equal, start*/
define([], function () {
    'use strict';

    module('controller with mocks', {
        setup: function () {
            // Note: make sure that dependencies for controller will be rebound
            require.undef('controller');
            // Note: mock dependency of controller
            require.config({
                map: {
                    '*': {
                        'model': 'modelMock'
                    }
                }
            });
            define('modelMock', function () {
                return function () {
                    this.state = 'fake';
                };
            });
        },
        teardown: function () {
            // Note: unmock dependency of controller
            require.undef('modelMock');
            require.config({
                map: {
                    '*': {
                        'model': 'model'
                    }
                }
            });
            // Note: make sure that dependencies for controller will be rebound
            require.undef('controller');
        }
    });

    asyncTest('model', function () {
        // Note: with dependencies mocked in setup, now we can instantiate the controller module
        require(['controller'], function (Controller) {
            var controller = new Controller();
            equal(controller.model.state, 'fake', 'model.state');
            start();
        });
    });

    module('controller with model');

    asyncTest('model', function () {
        require(['controller'], function (Controller) {
            var controller = new Controller();
            equal(controller.model.state, 'real', 'model.state');
            start();
        });
    });

});

