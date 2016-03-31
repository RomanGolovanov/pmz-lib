class Rect{
   constructor(x:number,y:number,w:number,h:number){
   }
}

class Point {
    constructor(x:number,y:number){
    }
}

class TimeSpan { 
    constructor(minutes:number, seconds: number){
    }
}

class Color{
    constructor(c:number){}
    
    DEFAULT_LABEL_COLOR = 0;
    DEFAULT_BG_COLOR = 0;
    DEFAULT_LABEL_BG_COLOR = -1;
    
}

enum TransportType{
    METRO = 0,
    BUS = 1
}

var CtyFile = {
	options: {
		// unique identifier
		name: String, 
		cityName: String,
		rusName: String,
		country: String,
		needVersion: String,
		mapAuthors: [String],
		comment: [String],
		delayNames: [String]
	}
};

var TrpFile = {
	options: {
		type: TransportType
	},
	lines: [{
		name: String,

		// aliases: [String],
		// stations: [String],
		// driving: [TimeSpan],
		// previous parameters loaded as
		stations: [{
			name: String,
			alias: String,
			next: [{ name: String, delay: TimeSpan }],
			previous: [{ name: String, delay: TimeSpan }]
		}],

		lineMap: String, // ref to Map file
		delay: [TimeSpan]

	}],
	transfers: [{ lineFrom: String, stationFrom: String, lineTo: String, stationTo: String, delay: TimeSpan }]
};

var MapFile = {
	options: {
		stationDiameter: Number,
		imageFileName: String,
		isVector: Boolean,
		linesWidth: Number,
		upperCase: Boolean,
		wordWrap: Boolean,
		transports: [String],
		checkedTransports: [String]
	},
	lines: [{ 
		name: String,
		color: Color,
		labelColor: Color,
		labelsBColor: Color,

		width: Number,
		coordinates: [Point],
		rects: [Rect],
		rect: Rect,
		heights: [Number]
	}],
	additionalNodes: [{ line: String, stationFrom: String, stationTo: String, coordinates: [Point], isSpline:Boolean }]
};


