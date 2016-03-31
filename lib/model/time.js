"use strict";
var PmzTime = (function () {
    function PmzTime(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
        return this;
    }
    return PmzTime;
}());
exports.PmzTime = PmzTime;
