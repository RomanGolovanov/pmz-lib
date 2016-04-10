import * as Base from './base';

export class PmzRect{
    x:number;
    y:number;
    width:number;
    height:number;
    
    constructor(x:number, y:number, width:number, height:number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    isEmpty():boolean {
        return this.x === 0 && this.y === 0 && this.width === 0 && this.height === 0;    
    }
    
    static parse(text:string): PmzRect {
        var values = Base.asIntArray(text);
        return new PmzRect(values[0], values[1], values[2], values[3]);
    }
    
    static parseArray(text:string): PmzRect[] {
        var values: number[] = Base.asIntArray(text);
        var rects: PmzRect[] = [];
        for (var i = 0; i < (values.length - 3); i += 2) {
            rects.push(new PmzRect(values[i], values[i + 1], values[i + 2], values[i + 3]));
        }
        return rects;        
    }

    static format(rect: PmzRect): string {
        return [rect.x, rect.y, rect.width, rect.height].join(',');
    }
    
    static formatArray(rect: PmzRect[]): string{
        return rect.map(PmzRect.format).join(', ');
    }    
}
