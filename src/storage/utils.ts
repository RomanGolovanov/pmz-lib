
/// <reference path="../typings/windows-1251.d.ts" />

import * as windows1251 from 'windows-1251';

import { asInt, asIntArray, asFloatArray, asArray } from '../model/base';
import { PmzPoint } from '../model/point';
import { PmzRect } from '../model/rect';
import { PmzTime } from '../model/time';
import { PmzColor } from '../model/color';
import { PmzSpline } from '../model/spline';

let constants = {
    DEFAULT_MAP_NAME: 'Metro.map',
    DEFAULT_TRP_NAME: 'Metro.trp',
    DEFAULT_LINE_COLOR: 'black'
};


function decodeWindows1251(buffer: Uint8Array): string {
    var byteString = '';
    buffer.forEach(function(b) {
        byteString = byteString + String.fromCharCode(b);
    });
    return windows1251.decode(byteString, { 'mode': 'fatal' });
    
}

function encodeWindows1251(text: string): Uint8Array {
    var asciiEncodedText = windows1251.encode(text);
    var buffer = new Uint8Array(asciiEncodedText.length);
    for (var i = 0; i < asciiEncodedText.length; i++) {
        buffer[i] = asciiEncodedText.charCodeAt(i);
    }
    return buffer;
}

export {
    constants,
    asArray,
    asIntArray,
    asFloatArray,
    asPmzTime,
    encodeWindows1251,
    decodeWindows1251
};