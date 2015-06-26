/**
 * Created by quest on 23/06/15.
 */
/*global define, require, module, asyncTest, equal, start, QUnit, setTimeout, notEqual, deepEqual*/
define([], function () {
    'use strict';
    module('RestApi Test On Server');

    function createRequest() {
        var result = null;
        if (window.XMLHttpRequest) {
            // FireFox, Safari, etc.
            result = new XMLHttpRequest();
            if (typeof result.overrideMimeType != 'undefined') {
                result.overrideMimeType('text/xml'); // Or anything else
            }
        }
        else if (window.ActiveXObject) {
            // MSIE
            result = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else {
            // No known mechanism -- consider aborting the application
        }
        return result;
    }

   /* asyncTest('Get empty list of trees', function () {
        require([], function () {

            var req = createRequest(); // defined above

            req.onreadystatechange = function () {
                if (req.readyState !== 4) return; // Not there yet
                if (req.status != 200) {
                    // Handle request failure here...
                    return;
                }
                // Request successful, read the response
                var resp = req.responseText;
                console.log(resp);
                equal(5, 3, 'empty trees');
                QUnit.start();
                // ... and use it as needed by your app.
            }

            req.open("GET", "http://52.26.137.110:8080/YOUR_PATH/trees", true);
            req.send();
        });
    });*/


    asyncTest('Get empty list of trees', function () {
        require([], function () {

            var req = createRequest(); // defined above

            req.onreadystatechange = function () {
                if (req.readyState !== 4) return; // Not there yet
                if (req.status != 200) {
                    // Handle request failure here...
                    return;
                }
                // Request successful, read the response
                var resp = req.responseText;
                console.log(resp);
                equal(5, 3, 'empty trees');
                QUnit.start();
                // ... and use it as needed by your app.
            }

            req.open("PUT", "http://52.26.137.110:8080/YOUR_PATH/trees?x=40&Y=50", true);
            req.send("{\"text\":\"primer\",\"metersToHide\":3}");
        });
    });

});
