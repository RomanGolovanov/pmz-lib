"use strict";
var Base = require('./base');
var PmzColor = (function () {
    function PmzColor(c) {
        this.c = c;
        ;
    }
    PmzColor.parse = function (text) {
        return new PmzColor(Base.asInt(text, 16));
    };
    PmzColor.prototype.toString = function () {
        if (this.c === null) {
            return '';
        }
        if (this.c === -1) {
            return '-1';
        }
        return this.c.toString(16).toUpperCase();
    };
    return PmzColor;
}());
exports.PmzColor = PmzColor;
