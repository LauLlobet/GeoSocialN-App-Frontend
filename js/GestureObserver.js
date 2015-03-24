/*global define, require, module, Phaser*/
/*jslint todo: true */
define(['underscore'], function (_) {
    "use strict";
    function GestureObserver(bussinesInput) //noinspection JSLint
    {
            this.bussinesInput = bussinesInput;
            this.lastSwipeTime = Date.now();
    }
    GestureObserver.prototype.updatePointer = function updatePointer(activePointer) {
        var ans = this.detectSwipe(activePointer);
        if (!ans) {
            return;
        }if (ans === "right") {
            this.bussinesInput.swipeRight();
        } else {
            this.bussinesInput.swipeLeft();
        }

    };
    GestureObserver.prototype.detectSwipe = function detectSwipe(activePointer) {
        var isSwipe;
        this.lastSwipeElapsed = Date.now() - this.lastSwipeTime;
        isSwipe = this.isSwipe(activePointer);
        this.updateTimeIfSwipe(isSwipe);
        if (!isSwipe) {
            return false;
        }
        return this.returnLeftOrRight(activePointer);
    };

    GestureObserver.prototype.isSwipe = function isSwipe(activePointer) {
        var isLongDistance, lastMoreTime, lastLessTimeThan, lastSwipeWasOneSecondAgo;
        isLongDistance = Phaser.Point.distance(activePointer.position, activePointer.positionDown) > 100;
        lastMoreTime = activePointer.duration > 100;
        lastLessTimeThan = activePointer.duration < 250;
        lastSwipeWasOneSecondAgo = this.lastSwipeElapsed > 1000;
        return isLongDistance && lastMoreTime && lastLessTimeThan && lastSwipeWasOneSecondAgo;
    };

    GestureObserver.prototype.updateTimeIfSwipe = function updateTimeIfSwipe(isSwipe) {
        if (isSwipe) {
            this.lastSwipeTime = Date.now();
        }
    };

    GestureObserver.prototype.returnLeftOrRight = function returnLeftOrRight(activePointer) {
        if (activePointer.positionDown.x > activePointer.position.x) {
            return "right";
        }
        return "left";
    };

    return GestureObserver;
});