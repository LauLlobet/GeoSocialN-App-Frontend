//noinspection JSLint,JSHint
define(function () {
    "use strict";
    //noinspection OverlyComplexFunctionJS
    return function SimpleTree(text, x, y, z, dx, dy, dz, initId, endId) //noinspection JSLint
    {
        this.text = text;
        this.y = y;
        this.x = x;
        this.z = z;
        // REMOVE COMMENTS ONCE THE CODE USES SYMBOLS
        //noinspection JSUnusedGlobalSymbols
        this.dx = dx;
        //noinspection JSUnusedGlobalSymbols
        this.dy = dy;
        //noinspection JSUnusedGlobalSymbols
        this.dz = dz;
        this.initId = initId;
        //noinspection JSUnusedGlobalSymbols
        this.endId = endId;
    };
});