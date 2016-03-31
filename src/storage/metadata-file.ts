
import {PmzMetadata} from '../model/metadata';

function load(ini: any): PmzMetadata {
    var options = ini.Options;

    var delayNames = (options['DelayNames'] || '').split('\n');
    return new PmzMetadata(
        options.Name,
        options.CityName,
        options.Country,
        options.NeedVersion,
        options.MapAuthors.reduce(function(a: string, c: string) { return a + '\n' + c; }),
        options['Comment'],
        delayNames);
}

function save(metadata: PmzMetadata): any {
    var ini: any = {
        Options: {
            Name: metadata.name,
            CityName: metadata.cityName || 'Unknown',
            Country: metadata.countryName || 'Unknown',
            NeedVersion: metadata.version || '1.0.0',
            MapAuthors: (metadata.description || '').split('\n'),
        }
    };
    if (metadata.comment) {
        ini.Options.Comment = metadata.comment;
    }
    if (metadata.delays) {
        ini.Options.DelayNames = metadata.delays.reduce(function(a: string, c: string) { return a + ',' + c; });
    }
    return ini;
}

export { load, save };