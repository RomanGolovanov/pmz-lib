import {PmzSchemeLine} from './scheme-line';

export class PmzScheme {
    id: string;
    name: string;
    options: any;
    lines: PmzSchemeLine[];

    constructor(id: string, name: string, options: any, lines: PmzSchemeLine[]) {
        this.id = id;
        this.name = name;
        this.options = options;
        this.lines = lines;
    }
}
