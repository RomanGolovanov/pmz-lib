import * as Base from './base';
import { PmzPoint } from './point';

export class PmzSpline {
    
    line: string;
    src: string;
    dst: string;
    points: PmzPoint[];
    isSmooth: boolean;
    
    constructor(line: string, src: string, dst: string, points: PmzPoint[], isSmooth: boolean) {
        this.line = line;
        this.src = src;
        this.dst = dst;
        this.points = points;
        this.isSmooth = isSmooth;
        return this;
    }
    
    static parse(text:string): PmzSpline {
        var parts = Base.asArray(text);

        var line = parts[0];
        var src = parts[1];
        var dst = parts[2];
        var isSmooth = parts.length % 2 === 0;
        var points: PmzPoint[] = [];
        for (var i = 3; i < (parts.length - 1); i += 2) {
            points.push(new PmzPoint(parseInt(parts[i]), parseInt(parts[i + 1])));
        }
        return new PmzSpline(line, src, dst, points, isSmooth);
    }    
    
    static format(spline: PmzSpline): string {
        return [
            spline.line,
            spline.src,
            spline.dst,
            PmzPoint.formatArray(spline.points),
            spline.isSmooth
            ].join(',')
    } 
}

