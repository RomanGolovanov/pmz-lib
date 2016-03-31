"use strict";
var metadata_1 = require('./metadata');
var transport_1 = require('./transport');
var scheme_1 = require('./scheme');
var PmzModel = (function () {
    function PmzModel(metadata) {
        this.metadata = metadata;
        this.transports = [];
        this.schemes = [];
    }
    PmzModel.create = function () {
        var model = new PmzModel(new metadata_1.PmzMetadata('Unknown', null, null, '1.0.0', null, null, null));
        model.addTransport('Metro.trp', transport_1.PmzTransportType.Metro);
        model.addScheme('Metro.map');
        return model;
    };
    PmzModel.prototype.getMetadata = function () {
        return this.metadata;
    };
    PmzModel.prototype.getSchemes = function () {
        return this.schemes.map(function (i) { return i.name; });
    };
    PmzModel.prototype.addScheme = function (name, options, lines) {
        if (options === void 0) { options = null; }
        if (lines === void 0) { lines = null; }
        this.schemes.push(new scheme_1.PmzScheme(name, name, options || {}, lines || []));
    };
    PmzModel.prototype.removeScheme = function (name) {
        this.schemes.splice(this.schemes.indexOf(this.getScheme(name)));
    };
    PmzModel.prototype.getScheme = function (name) {
        var items = this.schemes.filter(function (i) { return i.name === name; });
        if (items) {
            return items[0];
        }
        throw new Error("Scheme " + name + " not found");
    };
    PmzModel.prototype.getTransports = function () {
        return this.transports.map(function (i) { return i.name; });
    };
    PmzModel.prototype.addTransport = function (name, type, lines, transfers) {
        if (lines === void 0) { lines = null; }
        if (transfers === void 0) { transfers = null; }
        this.transports.push(new transport_1.PmzTransport(name, name, type, lines || {}, transfers || {}));
    };
    PmzModel.prototype.removeTransport = function (name) {
        this.transports.splice(this.transports.indexOf(this.getTransport(name)));
    };
    PmzModel.prototype.getTransport = function (name) {
        var items = this.transports.filter(function (i) { return i.name === name; });
        if (items) {
            return items[0];
        }
        throw new Error("Transport " + name + " not found");
    };
    return PmzModel;
}());
exports.PmzModel = PmzModel;
