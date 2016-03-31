import {PmzColor} from './color';
import {PmzPoint} from './point';
import {PmzRect} from './rect';
import {PmzSpline} from './spline';

export class PmzSchemeLine {

    id: string;
    name: string;
    color: PmzColor;
    labelColor: PmzColor;
    labelBackgroundColor: PmzColor;
    coords: PmzPoint[];
    rects: PmzRect[];
    heights: number[];
    rect: PmzRect;
    rects2: PmzRect[];
    splines: PmzSpline[];
    visible: boolean;

    constructor(
        id: string,
        name: string,
        color: PmzColor,
        labelColor: PmzColor,
        labelBackgroundColor: PmzColor,
        coords: PmzPoint[],
        rects: PmzRect[],
        heights: number[],
        rect: PmzRect,
        rects2: PmzRect[],
        splines: PmzSpline[],
        visible: boolean) {

        this.id = id;
        this.name = name;

        this.color = color;
        this.labelColor = labelColor;
        this.labelBackgroundColor = labelBackgroundColor;
        this.coords = coords;
        this.rects = rects;
        this.heights = heights;
        this.rect = rect;
        this.rects2 = rects2;
        this.splines = splines;
        this.visible = visible;
    }
} 
