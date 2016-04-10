"use strict";
var Base = require('./base');
var point_1 = require('./point');
var PmzSpline = (function () {
    function PmzSpline(line, src, dst, points, isSmooth) {
        this.line = line;
        this.src = src;
        this.dst = dst;
        this.points = points;
        this.isSmooth = isSmooth;
        return this;
    }
    PmzSpline.parse = function (text) {
        var parts = Base.asArray(text);
        var line = parts[0];
        var src = parts[1];
        var dst = parts[2];
        var isSmooth = parts.length % 2 === 0;
        var points = [];
        for (var i = 3; i < (parts.length - 1); i += 2) {
            points.push(new point_1.PmzPoint(parseInt(parts[i]), parseInt(parts[i + 1])));
        }
        return new PmzSpline(line, src, dst, points, isSmooth);
    };
    PmzSpline.format = function (spline) {
        return [
            spline.line,
            spline.src,
            spline.dst,
            point_1.PmzPoint.formatArray(spline.points),
            spline.isSmooth
        ].join(',');
    };
    return PmzSpline;
}());
exports.PmzSpline = PmzSpline;
