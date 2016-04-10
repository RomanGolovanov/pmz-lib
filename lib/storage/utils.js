/// <reference path="../typings/windows-1251.d.ts" />
"use strict";
var windows1251 = require('windows-1251');
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
