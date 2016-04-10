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
