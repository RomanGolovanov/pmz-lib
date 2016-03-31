"use strict";
var PmzMetadata = (function () {
    function PmzMetadata(name, cityName, countryName, version, description, comment, delays) {
        this.name = name;
        this.cityName = cityName;
        this.countryName = countryName;
        this.version = version;
        this.description = description;
        this.comment = comment;
        this.delays = delays;
    }
    return PmzMetadata;
}());
exports.PmzMetadata = PmzMetadata;
