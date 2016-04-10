"use strict";
var Base = require('./base');
var PmzPoint = (function () {
    function PmzPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    PmzPoint.prototype.isEmpty = function () {
        return this.x === 0 && this.y === 0;
    };
    PmzPoint.parse = function (text) {
        var values = Base.asIntArray(text);
        return new PmzPoint(values[0], values[1]);
    };
    PmzPoint.parseArray = function (text) {
        var values = Base.asIntArray(text);
        var points = [];
        for (var i = 0; i < (values.length - 1); i += 2) {
            points.push(new PmzPoint(values[i], values[i + 1]));
        }
        return points;
    };
    PmzPoint.format = function (point) {
        return [point.x, point.y].join(',');
    };
    PmzPoint.formatArray = function (points) {
        return points.map(PmzPoint.format).join(', ');
    };
    return PmzPoint;
}());
exports.PmzPoint = PmzPoint;
