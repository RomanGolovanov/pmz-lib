
import {PmzColor} from '../model/color';
import {PmzPoint} from '../model/point';
import {PmzRect} from '../model/rect';
import {PmzSpline} from '../model/spline';
import {PmzScheme, PmzSchemeOptions} from '../model/scheme';
import {PmzSchemeLine} from '../model/scheme-line';
import {PmzModel} from '../model/model';

import * as PmzUtils from './utils';

function loadMapOptions(ini: any): PmzSchemeOptions {
    if (!ini) {
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

function loadSplines(ini: any) {
    if (!ini) {
        return {};
    }

    var lineNodes: any = {};
    for (var key in ini) {
        var item: string = ini[key];
        var spline = PmzSpline.parse(item);
        if (!lineNodes[spline.line]) {
            lineNodes[spline.line] = [];
        }
        lineNodes[spline.line].push(spline);
    }
    return lineNodes;
}

function loadMapLines(ini: any, lineNodes: any): PmzSchemeLine[] {
    var lines: PmzSchemeLine[] = [];
    for (var key in ini) {
        var item = ini[key];

        lines.push(new PmzSchemeLine(
            key,
            key,
            PmzColor.parse(item['Color']),
            item['LabelsColor'],
            item['LabelsBColor'],
            PmzPoint.parseArray(item['Coordinates']),
            PmzRect.parseArray(item['Rects']),
            PmzUtils.asFloatArray(item['Heights']),
            PmzRect.parse(item['Rect']),
            PmzRect.parseArray(item['Rects2']),
            lineNodes[key],
            true));
    }
    return lines;
}

function filterLineSections(ini: any, model: PmzModel): any {
    var lineNames: string[] = [];

    model.getTransports().forEach(function(key) {
        Array.prototype.push.apply(lineNames, Object.keys(model.getTransport(key).lines));
    });

    var sections: any = {};
    for (var key in ini) {
        if (lineNames.indexOf(key) !== -1) {
            sections[key] = ini[key];
        }
    }
    return sections;
}

function load(ini: any, name: string, model: PmzModel) {
    var options = loadMapOptions(ini['Options']);
    var splines = loadSplines(ini['AdditionalNodes']);
    var lines = loadMapLines(filterLineSections(ini, model), splines);
    return new PmzScheme(name, name, options, lines);
}

function save() {
    throw new TypeError('Not implemented');
}

export { save, load };