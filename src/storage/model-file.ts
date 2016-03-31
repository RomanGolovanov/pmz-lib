/// <reference path="../typings/jszip.d.ts" />

import * as JSZip from 'jszip';

import * as PmzUtils from './utils';
import * as PmzMetadataFile from './metadata-file';
import * as PmzTransportFile from './transport-file';
import * as PmzSchemeFile from './scheme-file';
import * as IniFile from './ini-file';

import {PmzModel} from '../model/model';

function endsWith(text: string, suffix: string) {
    if(!text){
        return false;
    }
    return text.indexOf(suffix, text.length - suffix.length) !== -1;
};

function enumerateEntries(zip: any, ext: any, callback: any) {
    for (var entryName in zip.files) {
        var zipEntry: any = zip.files[entryName];
        if (endsWith(entryName, ext)) {
            if (callback(entryName, zipEntry)) {
                return;
            }
        }
    }
}

function enumerateIniEntries(zip: any, ext: string, callback: any) {
    enumerateEntries(zip, ext, function(name: string, entry: any) {
        return callback(name, IniFile.parseIniText(
            PmzUtils.decodeWindows1251(entry.asUint8Array())));
    });
}

function openZip(file: any): any {
    if (['application/x-zip-compressed', 'application/zip'].indexOf(file.type) == -1) {
        throw new TypeError('Invalid file type ' + file.type + ' for PMZ map');
    }
    var zip = new JSZip(file.content);
    enumerateEntries(zip, '.pmz', function(name: string, entry: any) {
        zip = new JSZip(entry.asArrayBuffer());
        return true;
    });
    return zip;
}

export class PmzFile {
    static load(file: any) {

        var zip = openZip(file);

        var model: PmzModel = null;
        enumerateIniEntries(zip, '.cty', function(name: string, ini: any) {
            model = new PmzModel(PmzMetadataFile.load(ini));
        });

        if (!model) {
            throw new TypeError('Invalid file format');
        }

        enumerateIniEntries(zip, '.trp', function(name: string, ini: any) {
            var transport = PmzTransportFile.load(ini, name, model.getMetadata());
            model.addTransport(transport.name, transport.options, transport.lines, transport.transfers);
        });

        enumerateIniEntries(zip, '.map', function(name: string, ini: any) {
            var scheme = PmzSchemeFile.load(ini, name, model);
            model.addScheme(scheme.name, scheme.options, scheme.lines);
        });

        return model;
    }

    static save(file: any, model: PmzModel) {
        var zip = openZip(file);

        var metaIni = PmzMetadataFile.save(model.metadata);
        var metaText = IniFile.formatIniText(metaIni);
        var metaEncoded = PmzUtils.encodeWindows1251(metaText);
        zip.file(model.metadata.name + '.cty', metaEncoded);

        file.content = zip.generate({ type: 'arraybuffer' });
    }

}

