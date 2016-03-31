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
}

