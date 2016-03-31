
export enum PmzTransportType{
    Metro,
    Bus
}

export class PmzTransport {
    id: string;
    name: string;
    type: PmzTransportType;
    lines: any;
    transfers: any;

    constructor(id: string, name: string, type: PmzTransportType, lines: any, transfers: any) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.lines = lines;
        this.transfers = transfers;
    }
}
