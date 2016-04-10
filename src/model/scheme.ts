import {PmzSchemeLine} from './scheme-line';

export interface PmzSchemeOptions {
    imageFileName?: string;
    stationDiameter?: number;
    lineWidth?: number;
    upperCase?: boolean;
    wordWrap?: boolean;
    isVector?: boolean;
    transports?: string[];
    checkedTransports?: string[];
}

export class PmzScheme {
    id: string;
    name: string;
    options: PmzSchemeOptions;
    lines: PmzSchemeLine[];

    constructor(id: string, name: string, options: PmzSchemeOptions, lines: PmzSchemeLine[]) {
        this.id = id;
        this.name = name;
        this.options = options;
        this.lines = lines;
    }
    
    public toString(): string {
        return '[object Scheme ' + this.id + ':' + this.name + ']';
    }
}
