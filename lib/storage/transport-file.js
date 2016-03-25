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
