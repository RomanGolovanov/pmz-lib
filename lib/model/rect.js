"use strict";
var Base = require('./base');
var PmzRect = (function () {
    function PmzRect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    PmzRect.prototype.isEmpty = function () {
        return this.x === 0 && this.y === 0 && this.width === 0 && this.height === 0;
    };
    PmzRect.parse = function (text) {
        var values = Base.asIntArray(text);
        return new PmzRect(values[0], values[1], values[2], values[3]);
    };
    PmzRect.parseArray = function (text) {
        var values = Base.asIntArray(text);
        var rects = [];
        for (var i = 0; i < (values.length - 3); i += 2) {
            rects.push(new PmzRect(values[i], values[i + 1], values[i + 2], values[i + 3]));
        }
        return rects;
    };
    PmzRect.format = function (rect) {
        return [rect.x, rect.y, rect.width, rect.height].join(',');
    };
    PmzRect.formatArray = function (rect) {
        return rect.map(PmzRect.format).join(', ');
    };
    return PmzRect;
}());
exports.PmzRect = PmzRect;
