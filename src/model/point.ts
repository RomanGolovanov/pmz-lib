import * as Base from './base';

export class PmzPoint{
    x:number;
    y:number;
    
    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
    
    isEmpty():boolean {
        return this.x === 0 && this.y === 0;    
    }
    
    static parse(text:string): PmzPoint {
        var values = Base.asIntArray(text);
        return new PmzPoint(values[0], values[1]);
    }
    
    static parseArray(text:string): PmzPoint[] {
        var values = Base.asIntArray(text);
        var points: PmzPoint[] = [];
        for (var i = 0; i < (values.length - 1); i += 2) {
            points.push(new PmzPoint(values[i], values[i + 1]));
        }
        return points;
    }

    static format(point: PmzPoint): string {
        return [point.x, point.y].join(',');
    }
    
    static formatArray(points: PmzPoint[]): string{
        return points.map(PmzPoint.format).join(', ');
    }
}
