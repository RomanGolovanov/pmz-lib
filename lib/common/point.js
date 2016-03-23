'use strict';

function PmzPoint(x,y){
	this.x = x;
	this.y = y;
	return this;
}

PmzPoint.prototype.isEmpty = function(){
	return this.x === 0 && this.y === 0;
};

module.exports = PmzPoint;
