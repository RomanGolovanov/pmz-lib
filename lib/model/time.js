"use strict";
var Base = require('./base');
var PmzTime = (function () {
    function PmzTime(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
        return this;
    }
    PmzTime.parse = function (text) {
        if (!text || !text.length) {
            return null;
        }
        var parts = text.split('.');
        return new PmzTime(Base.asInt(parts[0]), parts.length === 2 ? Base.asInt(parts[1]) : null);
    };
    PmzTime.format = function (time) {
        return [time.minutes, time.seconds].join(',');
    };
    return PmzTime;
}());
exports.PmzTime = PmzTime;
