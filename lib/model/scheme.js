"use strict";
var PmzScheme = (function () {
    function PmzScheme(id, name, options, lines) {
        this.id = id;
        this.name = name;
        this.options = options;
        this.lines = lines;
    }
    PmzScheme.prototype.toString = function () {
        return '[object Scheme ' + this.id + ':' + this.name + ']';
    };
    return PmzScheme;
}());
exports.PmzScheme = PmzScheme;
