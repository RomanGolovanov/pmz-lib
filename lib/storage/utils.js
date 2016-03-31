/// <reference path="../typings/windows-1251.d.ts" />
"use strict";
var windows1251 = require('windows-1251');
var point_1 = require('../model/point');
var rect_1 = require('../model/rect');
var time_1 = require('../model/time');
var color_1 = require('../model/color');
var spline_1 = require('../model/spline');
var constants = {
    DEFAULT_MAP_NAME: 'Metro.map',
    DEFAULT_TRP_NAME: 'Metro.trp',
    DEFAULT_LINE_COLOR: 'black'
};
exports.constants = constants;
function asInt(text) {
    return text && text !== '?' ? parseInt(text) : null;
}
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
function asPmzPointArray(text) {
    var values = asIntArray(text);
    var points = [];
    for (var i = 0; i < (values.length - 1); i += 2) {
        points.push(new point_1.PmzPoint(values[i], values[i + 1]));
    }
    return points;
}
exports.asPmzPointArray = asPmzPointArray;
function asPmzRectArray(text) {
    var values = asIntArray(text);
    var rects = [];
    for (var i = 0; i < (values.length - 3); i += 2) {
        rects.push(new rect_1.PmzRect(values[i], values[i + 1], values[i + 2], values[i + 3]));
    }
    return rects;
}
exports.asPmzRectArray = asPmzRectArray;
function asPmzPoint(text) {
    var values = asIntArray(text);
    return new point_1.PmzPoint(values[0], values[1]);
}
exports.asPmzPoint = asPmzPoint;
function asPmzRect(text) {
    var values = asIntArray(text);
    return new rect_1.PmzRect(values[0], values[1], values[2], values[3]);
}
exports.asPmzRect = asPmzRect;
function asPmzSpline(text) {
    var parts = asArray(text);
    var line = parts[0];
    var src = parts[1];
    var dst = parts[2];
    var isSpline = parts.length % 2 === 0;
    var points = [];
    for (var i = 3; i < (parts.length - 1); i += 2) {
        points.push(new point_1.PmzPoint(parseInt(parts[i]), parseInt(parts[i + 1])));
    }
    return new spline_1.PmzSpline(line, src, dst, points, isSpline);
}
exports.asPmzSpline = asPmzSpline;
function asPmzTime(text) {
    if (!text || !text.length) {
        return null;
    }
    var parts = text.split('.');
    return new time_1.PmzTime(asInt(parts[0]), parts.length === 2 ? asInt(parts[1]) : null);
}
exports.asPmzTime = asPmzTime;
function asPmzColor(text) {
    if (!text || !text.length) {
        return null;
    }
    return new color_1.PmzColor(asInt(text));
}
exports.asPmzColor = asPmzColor;
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
