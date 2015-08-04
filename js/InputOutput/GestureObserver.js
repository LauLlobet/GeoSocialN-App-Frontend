define(['../lib/underscore'], function (underscore) {
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

    GestureObserver.prototype.linkClicked = function (treeid) {
        this.bussinesInput.linkClicked(treeid);
    }

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
        isLongDistance = Phaser.Point.distance(activePointer.position, activePointer.positionDown) > 40;
        lastMoreTime = activePointer.duration > 50;
        lastLessTimeThan = activePointer.duration < 600;
        lastSwipeWasOneSecondAgo = this.lastSwipeElapsed > 600;
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

    GestureObserver.prototype.clickedOnWriteButton = function clickedOnWriteButton() {
        this.bussinesInput.clickedOnWriteButton();
    }

    GestureObserver.prototype.clickedOnKey = function (char) {
        this.bussinesInput.clickedOnKey(char);
    }
    return GestureObserver;
});