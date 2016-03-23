'use strict';

var PmzUtils = require('../common/utils'),
    PmzPoint = require('../common/point'),
    PmzScheme = require('../model/scheme'),
    PmzSchemeLine = require('../model/scheme-line'),
    PmzAdditionNodes = require('../model/additional-nodes');


function asAdditionalNodes(text){
    var parts = asArray(text);

    var line = parts[0];
    var src = parts[1];
    var dst = parts[2];
    var isSpline = parts.length % 2 === 0;
    var points = [];
    for(var i=3;i<(parts.length-1); i+=2){
        points.push(new PmzPoint(parseInt(parts[i]), parseInt(parts[i+1])));
    }
    return new PmzAdditionNodes(line, src, dst, points, isSpline);
}

function loadMapOptions(ini){
    if(!ini){
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

function loadAdditionalNodes(ini){
    if(!ini){
        return {};
    }

    var lineNodes = {};
    for(var key in ini){
        var item = ini[key];
        var node = asAdditionalNodes(item);
        if(!lineNodes[node.line]){
            lineNodes[node.line] = [];
        }
        lineNodes[node.line].push(asAdditionalNodes(item));
    }
    return lineNodes;
}

function loadMapLines(ini, lineNodes){
    var lines = {};
    for(var key in ini){
        var item = ini[key];

        lines[key] = new PmzSchemeLine(key, key,
            PmzUtils.asColor(item['Color']),
            item['LabelsColor'],
            item['LabelsBColor'],
            PmzUtils.asPmzPointArray(item['Coordinates']),
            PmzUtils.asPmzRectArray(item['Rects']),
            PmzUtils.asFloatArray(item['Heights']),
            PmzUtils.asPmzRect(item['Rect']),
            PmzUtils.asPmzRectArray(item['Rects2']),
            lineNodes[key] || [],
            true );
    }
    return lines;
}

function filterLineSections(ini, model){
    var lineNames = [];

    model.getTransports().forEach(function(key){
        Array.prototype.push.apply(lineNames, Object.keys(model.getTransport(key).lines));
    });

    var sections = {};
    for(var key in ini){
        if(lineNames.indexOf(key)!==-1) {
            sections[key] = ini[key];
        }
    }      
    return sections;  
}

function load(ini, name, model){
    var options = loadMapOptions(ini['Options']);
    var additionalNodes = loadAdditionalNodes(ini['AdditionalNodes']);
    var lines = loadMapLines(filterLineSections(ini, model), additionalNodes);
    return new PmzScheme(name, name, options, lines);
},

function save(){
    throw new TypeError('Not implemented');
}

module.exports.load = load;

module.exports.save = save;


