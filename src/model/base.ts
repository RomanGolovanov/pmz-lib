
function asInt(text: string, radix:number = 10): number {
    if(!text || !text.length){
        return null;
    }
    text = text.trim();
    if(text === '?'){
        return null;
    }
    if(text === '-1'){
        return -1;
    }
    return parseInt(text, radix);
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

export {
    asInt,
    asArray,
    asIntArray,
    asFloatArray
};