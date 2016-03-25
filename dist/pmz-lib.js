(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pmz = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function PmzPoint(x,y){
	this.x = x;
	this.y = y;
	return this;
}

PmzPoint.prototype.isEmpty = function(){
	return this.x === 0 && this.y === 0;
};

module.exports = PmzPoint;

},{}],2:[function(require,module,exports){
'use strict';

function PmzRect(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	return this;
}

PmzRect.prototype.isEmpty = function(){
	return this.x === 0 && this.y === 0 && this.width === 0 && this.height === 0;
};

module.exports = PmzRect;

},{}],3:[function(require,module,exports){
'use strict';

function PmzTime(minutes, seconds){
	this.minutes = minutes;
	this.seconds = seconds;
	return this;
}

module.exports = PmzTime;

},{}],4:[function(require,module,exports){
(function (global){
'use strict';

var windows1251 = (typeof window !== "undefined" ? window['windows1251'] : typeof global !== "undefined" ? global['windows1251'] : null),
	PmzPoint = require('./point'),
	PmzRect = require('./rect'),
	PmzTime = require('./time');

function asInt(text){
	return text && text!=='?' ? parseInt(text) : null;
}

function asArray(text){
	if(!text) return [];
	return text.split(',').map(function(item){ 
		return item === '?' ? null : item; 
	});
}

function asIntArray(text){
	return asArray(text).map(function(item){ 
		if(!item) return null;
		return parseInt(item); 
	});
}

function asFloatArray(text){
	return asArray(text).map(function(item){ 
		if(!item) return null;
		return parseFloat(item); 
	});
}

module.exports = {
    constants: {
        DEFAULT_MAP_NAME: 'Metro.map',
        DEFAULT_TRP_NAME: 'Metro.trp',
        DEFAULT_LINE_COLOR: 'black'
    },

	asArray: asArray,

	asIntArray: asIntArray,
    
	asFloatArray: asFloatArray,

	asPmzPointArray: function(text){
		var values = asIntArray(text);
		var points = [];
		for(var i =0; i<(values.length-1); i+=2){
			points.push(new PmzPoint(values[i],values[i+1]));
		}
		return points;
	},

	asPmzRectArray: function(text){
		var values = asIntArray(text);
		var rects = [];
		for(var i =0; i<(values.length-3); i+=2){
			rects.push(new PmzRect(values[i],values[i+1],values[i+2],values[i+3]));
		}
		return rects;
	},

	asPmzPoint: function(text){
		var values = asIntArray(text);
		return new PmzPoint(values[0],values[1]);
	},

	asPmzRect: function(text){
		var values = asIntArray(text);
		return new PmzRect(values[0],values[1],values[2],values[3]);
	},

	asAdditionalNodes: function(text){
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
	},

	asPmzTime: function(text){
		if(!text || !text.length){
			return null;
		}
		var parts = text.split('.');
		return new PmzTime(asInt(parts[0]), 
			parts.length === 2 ? asInt(parts[1]) : null);
	},

    asColor: function(text){
        if(!text || !text.length){
            return null;
        }
        return '#' + text;
    },

    decodeWindows1251 : function (buffer){
        var byteString = '';
        buffer.forEach(function(b){ 
            byteString = byteString + String.fromCharCode(b); 
        });
        return windows1251.decode(byteString, { 'mode': 'fatal' });
    },

    encodeWindows1251 : function (text){
        var asciiEncodedText = windows1251.encode(text);
        var buffer = new Uint8Array(asciiEncodedText.length);
        for(var i=0;i<asciiEncodedText.length;i++){
            buffer[i] = asciiEncodedText.charCodeAt(i);
        }
        return buffer;
    }

};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./point":1,"./rect":2,"./time":3}],5:[function(require,module,exports){
'use strict';

module.exports.Model = require('./model/model');

module.exports.File = require('./storage/model-file');


},{"./model/model":8,"./storage/model-file":14}],6:[function(require,module,exports){
'use strict';

function PmzAdditionNodes(line, src, dst, points, isSpline){
	this.line = line;
	this.src = src;
	this.dst = dst;
	this.points = points;
	this.isSpline = isSpline;
	return this;
}

module.exports = PmzAdditionNodes;

},{}],7:[function(require,module,exports){
'use strict';

function PmzMetadata(name, cityName, countryName, version, description, comment, delays){
	var self = this;

	this.name = name;
	this.cityName = cityName;
	this.countryName = countryName;
	this.version = version;
	this.description = description;
	this.comment = comment;
	this.delays = delays;

	return this;
}

module.exports = PmzMetadata;

},{}],8:[function(require,module,exports){
'use strict';

var PmzMetadata = require('./metadata'),
	PmzScheme = require('./scheme'),
	PmzTransport = require('./transport');


function PmzModel(metadata){
	this.metadata = metadata;
	this.transports = {};
	this.schemes = {};
	return this;
}


PmzModel.create = function(){
	var model = new PmzModel(new PmzMetadata('Unknown', null, null, '1.0.0'));
	model.addTransport('Metro.trp', 'Метро');
	model.addScheme('Metro.map');
	return model;
};


PmzModel.prototype.getMetadata = function(){
	return this.metadata;
};


PmzModel.prototype.getSchemes = function(){
	return Object.keys(this.schemes);
};

PmzModel.prototype.addScheme = function(name, options, lines){
	this.schemes[name] = new PmzScheme(name, name, options || {}, lines || {});
};

PmzModel.prototype.removeScheme = function(name){
	delete this.schemes[name];
};

PmzModel.prototype.getScheme = function(name){
	return this.schemes[name];
};


PmzModel.prototype.getTransports = function(){
	return Object.keys(this.transports);
};

PmzModel.prototype.addTransport = function(name, type, lines, transfers){
	this.transports[name] = new PmzTransport(name, name, { type: type }, lines || {}, transfers || {});
};

PmzModel.prototype.removeTransport = function(name){
	delete this.transports[name];
};

PmzModel.prototype.getTransport = function(name){
	return this.transports[name];
};

module.exports = PmzModel;

},{"./metadata":7,"./scheme":10,"./transport":11}],9:[function(require,module,exports){
'use strict';

function PmzSchemeLine(id, name, color, labelColor, labelBackgroundColor, coords, rects, heights, rect, rects2, nodes, visible){
	this.id = id;
	this.name = name;

	this.color = color;
	this.labelColor = labelColor;
	this.labelBackgroundColor = labelBackgroundColor;
	this.coords = coords || [];
	this.rects = rects || [];
	this.heights = heights || [];
	this.rect = rect;
	this.rects2 = rects2 || [];
	this.nodes = nodes || [];
	this.visible = visible;
	return this;
}

module.exports = PmzSchemeLine;

},{}],10:[function(require,module,exports){
'use strict';

function PmzScheme(id, name, options, lines){
	this.id = id;
	this.name = name;
	this.options = options;
	this.lines = lines;
	return this;
}

module.exports = PmzScheme;

},{}],11:[function(require,module,exports){
'use strict';

function PmzTransport(id, name, options, lines, transfers){
	this.id = id;
	this.name = name;
	this.options = options;
	this.lines = lines;
	this.transfers = transfers;
	return this;
}

module.exports = PmzTransport;

},{}],12:[function(require,module,exports){
'use strict';

module.exports.formatIniText = function(ini){
    var lines = [];
    Object.keys(ini).forEach(function(sectionKey){
        lines.push('[' + sectionKey + ']');
        Object.keys(ini[sectionKey]).forEach(function(valueKey){
            var value = ini[sectionKey][valueKey];
            if(value instanceof Array){
                for(var i=0;i<value.length;i++){
                lines.push(valueKey + '=' + value[i]);
                }
            }else{
                lines.push(valueKey + '=' + value);
            }
        });
    });
    return lines.reduce(function(a,c){ return a+'\n'+c; });
};

module.exports.parseIniText = function(text){
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = text.split(/\r\n|\r|\n/);
    var section = null;
    lines.forEach(function(line){
        if(regex.comment.test(line)){
            return;
        }else if(regex.param.test(line)){
            var match = line.match(regex.param);
            if(section){
                var currentValue = value[section][match[1]];
                if(!currentValue){
                    value[section][match[1]] = match[2];
                }else{
                    if(typeof(currentValue)==='string'){
                        value[section][match[1]] = [currentValue, match[2]];
                    }else{
                        value[section][match[1]].push(match[2]);
                    }
                }



            }else{
                value[match[1]] = match[2];
            }
        }else if(regex.section.test(line)){
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        }else if(line.length == 0 && section){
            section = null;
        };
    });
    return value;
};

},{}],13:[function(require,module,exports){
'use strict';

var PmzMetadata = require('../model/metadata');

function load(ini){
    var options = ini.Options;

    var delayNames = (options['DelayNames'] || '').split('\n');
    return new PmzMetadata(
        options.Name,
        options.CityName,
        options.Country,
        options.NeedVersion,
        options.MapAuthors.reduce(function(a, c) { return a + '\n' + c; }),
        options['Comment'],
        delayNames);
}

function save(metadata){
    var ini = { 
        Options: {
            Name: metadata.name,
            CityName: metadata.cityName || 'Unknown',
            Country: metadata.countryName || 'Unknown',
            NeedVersion: metadata.version || '1.0.0',
            MapAuthors: (metadata.description || '').split('\n'),
        }
    };
    if(metadata.comment){
        ini.Options.Comment = metadata.comment;
    }
    if(metadata.delays){
        ini.Options.DelayNames = metadata.delays.reduce(function(a,c){ return a + ',' + c; });
    }
    return ini;
}

module.exports.load = load;

module.exports.save = save;

},{"../model/metadata":7}],14:[function(require,module,exports){
(function (global){
'use strict';

var JSZip = (typeof window !== "undefined" ? window['JSZip'] : typeof global !== "undefined" ? global['JSZip'] : null),
    IniFile = require('./ini-file'),
    PmzUtils = require('../common/utils'),
    PmzModel = require('../model/model'),
    PmzMetadataFile = require('./metadata-file'),
    PmzTransportFile = require('./transport-file'),
    PmzSchemeFile = require('./scheme-file');


function enumerateEntries(zip, ext, callback){
    for(var entryName in zip.files){
        var zipEntry = zip.files[entryName];
        if(entryName.endsWith(ext)){
            if(callback(entryName, zipEntry)){
                return;
            }
        }
    }        
}

function enumerateIniEntries(zip, ext, callback){
    enumerateEntries(zip, ext, function(name, entry){
        return callback(name, IniFile.parseIniText(
            PmzUtils.decodeWindows1251(entry.asUint8Array())));
    });
}

function openZip(file){
    if(['application/x-zip-compressed', 'application/zip'].indexOf(file.type)==-1){
        throw new TypeError('Invalid file type ' + file.type + ' for PMZ map');
    }
    var zip = new JSZip(file.content);
    enumerateEntries(zip, '.pmz', function(name, entry){ 
        zip = new JSZip(entry.asArrayBuffer()); 
        return true;
    });
    return zip;
}

function load(file){

    var zip = openZip(file);

    var model = null;
    enumerateIniEntries(zip, '.cty', function(name, ini){
        model = new PmzModel(PmzMetadataFile.load(ini));
    });

    if(!model){
        throw new TypeError('Invalid file format');
    }

    enumerateIniEntries(zip, '.trp', function(name, ini){
        var transport = PmzTransportFile.load(ini, name, model.getMetadata());
        model.addTransport(transport.name, transport.options, transport.lines, transport.transfers);
    });

    enumerateIniEntries(zip, '.map', function(name, ini){
        var scheme = PmzSchemeFile.load(ini, name, model);
        model.addScheme(scheme.name, scheme.options, scheme.lines);
    });

    return model;
}

function save(file, model){
    var zip = openZip(file);
    
    var metaIni = PmzMetadataFile.save(model.metadata);
    var metaText = IniFile.formatIniText(metaIni);
    var metaEncoded = PmzUtils.encodeWindows1251(metaText);
    zip.file(model.metadata.name + '.cty', metaEncoded);

    file.content = zip.generate({type:'arraybuffer'});
}

module.exports.load = load;

module.exports.save = save;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/utils":4,"../model/model":8,"./ini-file":12,"./metadata-file":13,"./scheme-file":15,"./transport-file":16}],15:[function(require,module,exports){
'use strict';

var PmzUtils = require('../common/utils'),
    PmzPoint = require('../common/point'),
    PmzScheme = require('../model/scheme'),
    PmzSchemeLine = require('../model/scheme-line'),
    PmzAdditionNodes = require('../model/additional-nodes');


function asAdditionalNodes(text){
    var parts = PmzUtils.asArray(text);

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
}

function save(){
    throw new TypeError('Not implemented');
}

module.exports.load = load;

module.exports.save = save;



},{"../common/point":1,"../common/utils":4,"../model/additional-nodes":6,"../model/scheme":10,"../model/scheme-line":9}],16:[function(require,module,exports){
'use strict';

var PmzTransport = require('../model/transport');


function loadTrpOptions(ini){
    return {
        type: ini['Type'] || 'Метро'
    }
}

function loadTrpLines(cityDelays, ini){
    var lines = {};
    for(var key in ini){
        var item = ini[key];

        var delays = {};
        if(item['Delays']){
            var delayValues = item.Delays.split(',');
            for(var i=0; i<cityDelays.length; i++){
                delays[cityDelays[i]] = delayValues[i];
            }
        }
        if(item['DelayDay']){
            delays['Day'] =  item.DelayDay;
        }

        if(item['DelayNight']){
            delays['Night'] =  item.DelayNight;
        }

        lines[item.Name] = {
            sectionName: key,
            lineMap: item['LineMap'],
            stations: item['Stations'],
            driving: item['Driving'],
            delays: delays
        }            

    }
    return lines;
}

function loadTrpTransfers(ini){
    return ini;
}

function filterTrpLineSections(ini){
    var sections = {};
    for(var key in ini){
        if(['Options','Transfers','AdditionalInfo'].indexOf(key)===-1) {
            sections[key] = ini[key];                    
        }
    }
    return sections;
}

function load(ini, name, metadata){
    return new PmzTransport(name, name, 
        loadTrpOptions(ini['Options'] || {}),
        loadTrpLines(metadata.delays, filterTrpLineSections(ini)),
        loadTrpTransfers(ini['Transfers']|| {}));
}

function save(){
    throw new TypeError('Not implemented');
}

module.exports.load = load;

module.exports.save = save;

},{"../model/transport":11}]},{},[5])(5)
});