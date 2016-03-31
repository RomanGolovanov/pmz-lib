var Rect = (function () {
    function Rect(x, y, w, h) {
    }
    return Rect;
}());
var Point = (function () {
    function Point(x, y) {
    }
    return Point;
}());
var TimeSpan = (function () {
    function TimeSpan(minutes, seconds) {
    }
    return TimeSpan;
}());
var Color = (function () {
    function Color(c) {
        this.DEFAULT_LABEL_COLOR = 0;
        this.DEFAULT_BG_COLOR = 0;
        this.DEFAULT_LABEL_BG_COLOR = -1;
    }
    return Color;
}());
var TransportType;
(function (TransportType) {
    TransportType[TransportType["METRO"] = 0] = "METRO";
    TransportType[TransportType["BUS"] = 1] = "BUS";
})(TransportType || (TransportType = {}));
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
            lineMap: String,
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
    additionalNodes: [{ line: String, stationFrom: String, stationTo: String, coordinates: [Point], isSpline: Boolean }]
};
