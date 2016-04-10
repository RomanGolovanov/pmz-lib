(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pmz = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var model_1 = require("./model/model");
exports.PmzModel = model_1.PmzModel;
var model_file_1 = require("./storage/model-file");
exports.PmzFile = model_file_1.PmzFile;

},{"./model/model":5,"./storage/model-file":14}],2:[function(require,module,exports){
"use strict";
function asInt(text, radix) {
    if (radix === void 0) { radix = 10; }
    if (!text || !text.length) {
        return null;
    }
    text = text.trim();
    if (text === '?') {
        return null;
    }
    if (text === '-1') {
        return -1;
    }
    return parseInt(text, radix);
}
exports.asInt = asInt;
function asArray(text) {
    if (!text)
        return [];
    return text.split(',').map(function (item) {
        return item === '?' ? null : item;
    });
}
exports.asArray = asArray;
function asIntArray(text) {
    return asArray(text).map(function (item) {
        if (!item)
            return null;
        return parseInt(item);
    });
}
exports.asIntArray = asIntArray;
function asFloatArray(text) {
    return asArray(text).map(function (item) {
        if (!item)
            return null;
        return parseFloat(item);
    });
}
exports.asFloatArray = asFloatArray;

},{}],3:[function(require,module,exports){
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

},{"./base":2}],4:[function(require,module,exports){
"use strict";
var PmzMetadata = (function () {
    function PmzMetadata(name, cityName, countryName, version, description, comment, delays) {
        this.name = name;
        this.cityName = cityName;
        this.countryName = countryName;
        this.version = version;
        this.description = description;
        this.comment = comment;
        this.delays = delays;
    }
    return PmzMetadata;
}());
exports.PmzMetadata = PmzMetadata;

},{}],5:[function(require,module,exports){
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

},{"./metadata":4,"./scheme":9,"./transport":11}],6:[function(require,module,exports){
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

},{"./base":2}],7:[function(require,module,exports){
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

},{"./base":2}],8:[function(require,module,exports){
"use strict";
var PmzSchemeLine = (function () {
    function PmzSchemeLine(id, name, color, labelColor, labelBackgroundColor, coords, rects, heights, rect, rects2, splines, visible) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.labelColor = labelColor;
        this.labelBackgroundColor = labelBackgroundColor;
        this.coords = coords;
        this.rects = rects;
        this.heights = heights;
        this.rect = rect;
        this.rects2 = rects2;
        this.splines = splines;
        this.visible = visible;
    }
    return PmzSchemeLine;
}());
exports.PmzSchemeLine = PmzSchemeLine;

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"./base":2,"./point":6}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
"use strict";
function formatIniText(ini) {
    var lines = [];
    Object.keys(ini).forEach(function (sectionKey) {
        lines.push('[' + sectionKey + ']');
        Object.keys(ini[sectionKey]).forEach(function (valueKey) {
            var value = ini[sectionKey][valueKey];
            if (value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    lines.push(valueKey + '=' + value[i]);
                }
            }
            else {
                lines.push(valueKey + '=' + value);
            }
        });
    });
    return lines.reduce(function (a, c) { return a + '\n' + c; });
}
exports.formatIniText = formatIniText;
function parseIniText(text) {
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = text.split(/\r\n|\r|\n/);
    var section = null;
    lines.forEach(function (line) {
        if (regex.comment.test(line)) {
            return;
        }
        else if (regex.param.test(line)) {
            var match = line.match(regex.param);
            if (section) {
                var currentValue = value[section][match[1]];
                if (!currentValue) {
                    value[section][match[1]] = match[2];
                }
                else {
                    if (typeof (currentValue) === 'string') {
                        value[section][match[1]] = [currentValue, match[2]];
                    }
                    else {
                        value[section][match[1]].push(match[2]);
                    }
                }
            }
            else {
                value[match[1]] = match[2];
            }
        }
        else if (regex.section.test(line)) {
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        }
        else if (line.length == 0 && section) {
            section = null;
        }
        ;
    });
    return value;
}
exports.parseIniText = parseIniText;

},{}],13:[function(require,module,exports){
"use strict";
var metadata_1 = require('../model/metadata');
function load(ini) {
    var options = ini.Options;
    var delayNames = (options['DelayNames'] || '').split('\n');
    return new metadata_1.PmzMetadata(options.Name, options.CityName, options.Country, options.NeedVersion, options.MapAuthors.reduce(function (a, c) { return a + '\n' + c; }), options['Comment'], delayNames);
}
exports.load = load;
function save(metadata) {
    var ini = {
        Options: {
            Name: metadata.name,
            CityName: metadata.cityName || 'Unknown',
            Country: metadata.countryName || 'Unknown',
            NeedVersion: metadata.version || '1.0.0',
            MapAuthors: (metadata.description || '').split('\n')
        }
    };
    if (metadata.comment) {
        ini.Options.Comment = metadata.comment;
    }
    if (metadata.delays) {
        ini.Options.DelayNames = metadata.delays.reduce(function (a, c) { return a + ',' + c; });
    }
    return ini;
}
exports.save = save;

},{"../model/metadata":4}],14:[function(require,module,exports){
(function (global){
/// <reference path="../typings/jszip.d.ts" />
"use strict";
var JSZip = (typeof window !== "undefined" ? window['JSZip'] : typeof global !== "undefined" ? global['JSZip'] : null);
var PmzUtils = require('./utils');
var PmzMetadataFile = require('./metadata-file');
var PmzTransportFile = require('./transport-file');
var PmzSchemeFile = require('./scheme-file');
var IniFile = require('./ini-file');
var model_1 = require('../model/model');
function endsWith(text, suffix) {
    if (!text) {
        return false;
    }
    return text.indexOf(suffix, text.length - suffix.length) !== -1;
}
;
function enumerateEntries(zip, ext, callback) {
    for (var entryName in zip.files) {
        var zipEntry = zip.files[entryName];
        if (endsWith(entryName, ext)) {
            if (callback(entryName, zipEntry)) {
                return;
            }
        }
    }
}
function enumerateIniEntries(zip, ext, callback) {
    enumerateEntries(zip, ext, function (name, entry) {
        return callback(name, IniFile.parseIniText(PmzUtils.decodeWindows1251(entry.asUint8Array())));
    });
}
function openZip(file) {
    if (['application/x-zip-compressed', 'application/zip'].indexOf(file.type) == -1) {
        throw new TypeError('Invalid file type ' + file.type + ' for PMZ map');
    }
    var zip = new JSZip(file.content);
    enumerateEntries(zip, '.pmz', function (name, entry) {
        zip = new JSZip(entry.asArrayBuffer());
        return true;
    });
    return zip;
}
var PmzFile = (function () {
    function PmzFile() {
    }
    PmzFile.load = function (file) {
        var zip = openZip(file);
        var model = null;
        enumerateIniEntries(zip, '.cty', function (name, ini) {
            model = new model_1.PmzModel(PmzMetadataFile.load(ini));
        });
        if (!model) {
            throw new TypeError('Invalid file format');
        }
        enumerateIniEntries(zip, '.trp', function (name, ini) {
            var transport = PmzTransportFile.load(ini, name, model.getMetadata());
            model.addTransport(transport.name, transport.options, transport.lines, transport.transfers);
        });
        enumerateIniEntries(zip, '.map', function (name, ini) {
            var scheme = PmzSchemeFile.load(ini, name, model);
            model.addScheme(scheme.name, scheme.options, scheme.lines);
        });
        return model;
    };
    PmzFile.save = function (file, model) {
        var zip = openZip(file);
        var metaIni = PmzMetadataFile.save(model.metadata);
        var metaText = IniFile.formatIniText(metaIni);
        var metaEncoded = PmzUtils.encodeWindows1251(metaText);
        zip.file(model.metadata.name + '.cty', metaEncoded);
        file.content = zip.generate({ type: 'arraybuffer' });
    };
    return PmzFile;
}());
exports.PmzFile = PmzFile;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../model/model":5,"./ini-file":12,"./metadata-file":13,"./scheme-file":15,"./transport-file":16,"./utils":17}],15:[function(require,module,exports){
"use strict";
var color_1 = require('../model/color');
var point_1 = require('../model/point');
var rect_1 = require('../model/rect');
var spline_1 = require('../model/spline');
var scheme_1 = require('../model/scheme');
var scheme_line_1 = require('../model/scheme-line');
var PmzUtils = require('./utils');
function loadMapOptions(ini) {
    if (!ini) {
        return {};
    }
    return {
        imageFileName: ini['ImageFileName'],
        stationDiameter: ini['StationDiameter'],
        lineWidth: ini['LinesWidth'],
        upperCase: ini['UpperCase'],
        wordWrap: ini['WordWrap'],
        isVector: ini['IsVector'],
        transports: PmzUtils.asArray(ini['Transports']),
        checkedTransports: PmzUtils.asArray(ini['CheckedTransports'])
    };
}
function loadSplines(ini) {
    if (!ini) {
        return {};
    }
    var lineNodes = {};
    for (var key in ini) {
        var item = ini[key];
        var spline = spline_1.PmzSpline.parse(item);
        if (!lineNodes[spline.line]) {
            lineNodes[spline.line] = [];
        }
        lineNodes[spline.line].push(spline);
    }
    return lineNodes;
}
function loadMapLines(ini, lineNodes) {
    var lines = [];
    for (var key in ini) {
        var item = ini[key];
        lines.push(new scheme_line_1.PmzSchemeLine(key, key, color_1.PmzColor.parse(item['Color']), item['LabelsColor'], item['LabelsBColor'], point_1.PmzPoint.parseArray(item['Coordinates']), rect_1.PmzRect.parseArray(item['Rects']), PmzUtils.asFloatArray(item['Heights']), rect_1.PmzRect.parse(item['Rect']), rect_1.PmzRect.parseArray(item['Rects2']), lineNodes[key], true));
    }
    return lines;
}
function filterLineSections(ini, model) {
    var lineNames = [];
    model.getTransports().forEach(function (key) {
        Array.prototype.push.apply(lineNames, Object.keys(model.getTransport(key).lines));
    });
    var sections = {};
    for (var key in ini) {
        if (lineNames.indexOf(key) !== -1) {
            sections[key] = ini[key];
        }
    }
    return sections;
}
function load(ini, name, model) {
    var options = loadMapOptions(ini['Options']);
    var splines = loadSplines(ini['AdditionalNodes']);
    var lines = loadMapLines(filterLineSections(ini, model), splines);
    return new scheme_1.PmzScheme(name, name, options, lines);
}
exports.load = load;
function save() {
    throw new TypeError('Not implemented');
}
exports.save = save;

},{"../model/color":3,"../model/point":6,"../model/rect":7,"../model/scheme":9,"../model/scheme-line":8,"../model/spline":10,"./utils":17}],16:[function(require,module,exports){
"use strict";
var transport_1 = require('../model/transport');
function loadTrpOptions(ini) {
    return transport_1.PmzTransportType.Metro; // TODO: fix it
}
function loadTrpLines(cityDelays, ini) {
    var lines = {};
    for (var key in ini) {
        var item = ini[key];
        var delays = {};
        if (item['Delays']) {
            var delayValues = item.Delays.split(',');
            for (var i = 0; i < cityDelays.length; i++) {
                delays[cityDelays[i]] = delayValues[i];
            }
        }
        if (item['DelayDay']) {
            delays['Day'] = item.DelayDay;
        }
        if (item['DelayNight']) {
            delays['Night'] = item.DelayNight;
        }
        lines[item.Name] = {
            sectionName: key,
            lineMap: item['LineMap'],
            stations: item['Stations'],
            driving: item['Driving'],
            delays: delays
        };
    }
    return lines;
}
function loadTrpTransfers(ini) {
    return ini;
}
function filterTrpLineSections(ini) {
    var sections = {};
    for (var key in ini) {
        if (['Options', 'Transfers', 'AdditionalInfo'].indexOf(key) === -1) {
            sections[key] = ini[key];
        }
    }
    return sections;
}
function load(ini, name, metadata) {
    return new transport_1.PmzTransport(name, name, loadTrpOptions(ini['Options'] || {}), loadTrpLines(metadata.delays, filterTrpLineSections(ini)), loadTrpTransfers(ini['Transfers'] || {}));
}
exports.load = load;
function save() {
    throw new TypeError('Not implemented');
}
exports.save = save;

},{"../model/transport":11}],17:[function(require,module,exports){
(function (global){
/// <reference path="../typings/windows-1251.d.ts" />
"use strict";
var windows1251 = (typeof window !== "undefined" ? window['windows1251'] : typeof global !== "undefined" ? global['windows1251'] : null);
var base_1 = require('../model/base');
exports.asIntArray = base_1.asIntArray;
exports.asFloatArray = base_1.asFloatArray;
exports.asArray = base_1.asArray;
var constants = {
    DEFAULT_MAP_NAME: 'Metro.map',
    DEFAULT_TRP_NAME: 'Metro.trp',
    DEFAULT_LINE_COLOR: 'black'
};
exports.constants = constants;
function decodeWindows1251(buffer) {
    var byteString = '';
    buffer.forEach(function (b) {
        byteString = byteString + String.fromCharCode(b);
    });
    return windows1251.decode(byteString, { 'mode': 'fatal' });
}
exports.decodeWindows1251 = decodeWindows1251;
function encodeWindows1251(text) {
    var asciiEncodedText = windows1251.encode(text);
    var buffer = new Uint8Array(asciiEncodedText.length);
    for (var i = 0; i < asciiEncodedText.length; i++) {
        buffer[i] = asciiEncodedText.charCodeAt(i);
    }
    return buffer;
}
exports.encodeWindows1251 = encodeWindows1251;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../model/base":2}]},{},[1])(1)
});