"use strict";
var PmzSpline = (function () {
    function PmzSpline(line, src, dst, points, isSmooth) {
        this.line = line;
        this.src = src;
        this.dst = dst;
        this.points = points;
        this.isSmooth = isSmooth;
        return this;
    }
    return PmzSpline;
}());
exports.PmzSpline = PmzSpline;
