/**
 * Created by quest on 20/02/15.
 */

disableDragCanvas = function(canvasElement) {

    // do nothing in the event handler except canceling the event
    canvasElement.ondragstart = function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        return false;
    }

    // do nothing in the event handler except canceling the event
    canvasElement.onselectstart = function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        return false;
    }

    //This will essentially cancel all default browser behaviors if the user happens to tap anywhere outside of the Canvas or game area.
    document.body.ontouchstart = function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        return false;
    }

    document.body.ontouchmove = function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        return false;
    }
    alert('hola');
}