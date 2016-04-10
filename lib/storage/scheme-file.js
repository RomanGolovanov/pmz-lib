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
