
/// <reference path="../typings/windows-1251.d.ts" />

import * as windows1251 from 'windows-1251';

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

function asInt(text: string): number {
    return text && text !== '?' ? parseInt(text) : null;
}

function asArray(text: string): string[] {
    if (!text) return [];
    return text.split(',').map(function(item) {
        return item === '?' ? null : item;
    });
}

function asIntArray(text: string): number[] {
    return asArray(text).map(function(item) {
        if (!item) return null;
        return parseInt(item);
    });
}

function asFloatArray(text: string): number[] {
    return asArray(text).map(function(item) {
        if (!item) return null;
        return parseFloat(item);
    });
}

function asPmzPointArray(text: string): PmzPoint[] {
    var values = asIntArray(text);
    var points: PmzPoint[] = [];
    for (var i = 0; i < (values.length - 1); i += 2) {
        points.push(new PmzPoint(values[i], values[i + 1]));
    }
    return points;
}

function asPmzRectArray(text: string): PmzRect[] {
    var values: number[] = asIntArray(text);
    var rects: PmzRect[] = [];
    for (var i = 0; i < (values.length - 3); i += 2) {
        rects.push(new PmzRect(values[i], values[i + 1], values[i + 2], values[i + 3]));
    }
    return rects;
}

function asPmzPoint(text:string) {
    var values = asIntArray(text);
    return new PmzPoint(values[0], values[1]);
}

function asPmzRect(text:string) {
    var values = asIntArray(text);
    return new PmzRect(values[0], values[1], values[2], values[3]);
}

function asPmzSpline(text:string): PmzSpline {
    var parts = asArray(text);

    var line = parts[0];
    var src = parts[1];
    var dst = parts[2];
    var isSpline = parts.length % 2 === 0;
    var points: PmzPoint[] = [];
    for (var i = 3; i < (parts.length - 1); i += 2) {
        points.push(new PmzPoint(parseInt(parts[i]), parseInt(parts[i + 1])));
    }
    return new PmzSpline(line, src, dst, points, isSpline);
}

function asPmzTime(text: string): PmzTime {
    if (!text || !text.length) {
        return null;
    }
    var parts = text.split('.');
    return new PmzTime(asInt(parts[0]), parts.length === 2 ? asInt(parts[1]) : null);
}

function asPmzColor(text:string): PmzColor {
    if (!text || !text.length) {
        return null;
    }
    return new PmzColor(asInt(text));
}

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
    asPmzPoint,
    asPmzPointArray,
    asPmzRect,
    asPmzRectArray,
    asPmzTime,
    asPmzColor,
    asPmzSpline,
    encodeWindows1251,
    decodeWindows1251
};