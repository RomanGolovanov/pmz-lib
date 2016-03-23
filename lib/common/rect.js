'use strict';

function PmzRect(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	return this;
}

PmzRect.prototype.isEmpty = function(){
	return this.x === 0 && this.y === 0 && this.width === 0 && this.height === 0;
};

module.exports = PmzRect;
