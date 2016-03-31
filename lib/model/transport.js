"use strict";
(function (PmzTransportType) {
    PmzTransportType[PmzTransportType["Metro"] = 0] = "Metro";
    PmzTransportType[PmzTransportType["Bus"] = 1] = "Bus";
})(exports.PmzTransportType || (exports.PmzTransportType = {}));
var PmzTransportType = exports.PmzTransportType;
var PmzTransport = (function () {
    function PmzTransport(id, name, type, lines, transfers) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.lines = lines;
        this.transfers = transfers;
    }
    return PmzTransport;
}());
exports.PmzTransport = PmzTransport;
