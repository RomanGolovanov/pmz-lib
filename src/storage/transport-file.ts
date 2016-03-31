import {PmzMetadata} from '../model/metadata';
import {PmzTransport, PmzTransportType} from '../model/transport';

function loadTrpOptions(ini:any):PmzTransportType{
    return PmzTransportType.Metro; // TODO: fix it
}

function loadTrpLines(cityDelays:any, ini:any): any{
    var lines:any = {};
    for(var key in ini){
        var item = ini[key];

        var delays:any = {};
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

function loadTrpTransfers(ini:any): any{
    return ini;
}

function filterTrpLineSections(ini:any):any{
    var sections:any = {};
    for(var key in ini){
        if(['Options','Transfers','AdditionalInfo'].indexOf(key)===-1) {
            sections[key] = ini[key];                    
        }
    }
    return sections;
}

function load(ini:any, name:string, metadata: PmzMetadata):any{
    return new PmzTransport(name, name, 
        loadTrpOptions(ini['Options'] || {}),
        loadTrpLines(metadata.delays, filterTrpLineSections(ini)),
        loadTrpTransfers(ini['Transfers']|| {}));
}

function save(){
    throw new TypeError('Not implemented');
}

export {save, load};