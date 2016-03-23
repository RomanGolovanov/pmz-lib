'use strict';

function PmzSchemeLine(id, name, color, labelColor, labelBackgroundColor, coords, rects, heights, rect, rects2, nodes, visible){
	this.id = id;
	this.name = name;

	this.color = color;
	this.labelColor = labelColor;
	this.labelBackgroundColor = labelBackgroundColor;
	this.coords = coords || [];
	this.rects = rects || [];
	this.heights = heights || [];
	this.rect = rect;
	this.rects2 = rects2 || [];
	this.nodes = nodes || [];
	this.visible = visible;
	return this;
}

module.exports = PmzSchemeLine;
