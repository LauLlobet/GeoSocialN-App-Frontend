/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define(['../lib/underscore'], function (underscore) {
    "use strict";
    function NewlyPresentedTreeSubjectNotifier() {
        this.observers = [];
    }

    NewlyPresentedTreeSubjectNotifier.prototype.addObserver = function addObserver(observer){
        if (typeof observer.onNewlyPresentedTree !== 'function') {
            console.log("truing to subscribe observer to a subject when observer has not the update function")
            return;
        }
        this.observers.push(observer);
    }

    NewlyPresentedTreeSubjectNotifier.prototype.newlyPresentedTree = function newlyPresentedTree(tree) {
        var observer,
            i;
        for( i in this.observers) {
            observer = this.observers[i];
            if (typeof observer.onNewlyPresentedTree !== 'function') {
                console.log("observer has not the update function");
            }else {
                observer.onNewlyPresentedTree(tree);
            }
        }
    };
    return NewlyPresentedTreeSubjectNotifier;
});