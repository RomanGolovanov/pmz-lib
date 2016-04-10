import * as Base from './base';

export class PmzTime {
    minutes:number;
    seconds:number;
    
    constructor (minutes:number, seconds: number){
        this.minutes = minutes;
        this.seconds = seconds;
        return this;
    }
    
    static parse(text: string): PmzTime {
        if (!text || !text.length) {
            return null;
        }
        var parts = text.split('.');
        return new PmzTime(Base.asInt(parts[0]), parts.length === 2 ? Base.asInt(parts[1]) : null);
    }

    static format(time: PmzTime): string {
        return [time.minutes,time.seconds].join(',');
    }
    
} 
