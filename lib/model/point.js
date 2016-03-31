"use strict";
var PmzPoint = (function () {
    function PmzPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    PmzPoint.prototype.isEmpty = function () {
        return this.x === 0 && this.y === 0;
    };
    return PmzPoint;
}());
exports.PmzPoint = PmzPoint;
