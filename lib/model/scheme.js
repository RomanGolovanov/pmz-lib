'use strict';

function PmzScheme(id, name, options, lines){
	this.id = id;
	this.name = name;
	this.options = options;
	this.lines = lines;
	return this;
}

module.exports = PmzScheme;
