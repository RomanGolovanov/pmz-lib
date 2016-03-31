"use strict";
var PmzSchemeLine = (function () {
    function PmzSchemeLine(id, name, color, labelColor, labelBackgroundColor, coords, rects, heights, rect, rects2, splines, visible) {
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
    return PmzSchemeLine;
}());
exports.PmzSchemeLine = PmzSchemeLine;
