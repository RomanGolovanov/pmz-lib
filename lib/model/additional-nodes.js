'use strict';

function PmzAdditionNodes(line, src, dst, points, isSpline){
	this.line = line;
	this.src = src;
	this.dst = dst;
	this.points = points;
	this.isSpline = isSpline;
	return this;
}

module.exports = PmzAdditionNodes;
