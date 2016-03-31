
export class PmzMetadata {
    name: string;
    cityName: string;
    countryName: string;
    version: string;
    description: string;
    comment: string;
    delays: string[];

    constructor(name: string, cityName: string, countryName: string, version: string, description: string, comment: string, delays: string[]) {
        this.name = name;
        this.cityName = cityName;
        this.countryName = countryName;
        this.version = version;
        this.description = description;
        this.comment = comment;
        this.delays = delays;
    }
}

