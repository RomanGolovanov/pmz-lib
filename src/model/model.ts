import {PmzMetadata} from './metadata';
import {PmzTransport, PmzTransportType} from './transport';
import {PmzScheme} from './scheme';
import {PmzSchemeLine} from './scheme-line';

export class PmzModel {

    metadata: PmzMetadata;
    transports: PmzTransport[];
    schemes: PmzScheme[];

    constructor(metadata: PmzMetadata) {
        this.metadata = metadata;
        this.transports = [];
        this.schemes = [];
    }

    static create() {
        var model = new PmzModel(new PmzMetadata('Unknown', null, null, '1.0.0', null, null, null));
        model.addTransport('Metro.trp', PmzTransportType.Metro);
        model.addScheme('Metro.map');
        return model;
    }

    getMetadata(): PmzMetadata {
        return this.metadata;
    }

    getSchemes(): string[] {
        return this.schemes.map(i=> i.name);
    }

    addScheme(name:string, options:any = null, lines:PmzSchemeLine[] = null) {
        this.schemes.push(new PmzScheme(name, name, options || {}, lines || []));
    }

    removeScheme(name:string) {
        this.schemes.splice(this.schemes.indexOf(this.getScheme(name)));
    }

    getScheme(name: string): PmzScheme {
        var items = this.schemes.filter(i=> i.name === name);
        if(items){
            return items[0];
        }
        throw new Error(`Scheme ${name} not found`);
    }

    getTransports(): string[] {
        return this.transports.map(i=> i.name);
    }

    addTransport(name:string, type:PmzTransportType, lines:any = null, transfers:any = null) {
        this.transports.push(new PmzTransport(name, name, type, lines || {}, transfers || {}));
    }

    removeTransport(name: string) {
        this.transports.splice(this.transports.indexOf(this.getTransport(name)));
    }

    getTransport(name: string): PmzTransport {
        var items = this.transports.filter(i=> i.name === name);
        if(items){
            return items[0];
        }
        throw new Error(`Transport ${name} not found`);        
    }
}
