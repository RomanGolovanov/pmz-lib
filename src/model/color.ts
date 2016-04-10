import * as Base from './base';

export class PmzColor{
    c: number;
    
    constructor(c:number){
        this.c = c;;
    }
    
    static parse(text: string): PmzColor {
        return new PmzColor(Base.asInt(text, 16));
    }
    
    toString(): string {
        if(this.c === null){
            return '';
        }
        if(this.c === -1){
            return '-1';
        }
        return this.c.toString(16).toUpperCase();
    }
}
