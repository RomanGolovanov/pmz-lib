
'use strict';

var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    http = require('http'),
    fs = require('fs');    

gulp.task('assets', function (cb) {

    http.get("http://maps.ametro.org/maps/Moscow.zip", function(response) {
        var file = fs.createWriteStream("assets/Moscow.zip");
        file.on('finish', cb);
        response.pipe(file);
    });
});

gulp.task('build', function () {
  return browserify({
        entries: './lib/init.js',
        bundleExternal: false,
        standalone: 'pmz',
        debug: false 
    })
    .bundle()
    .pipe(source('./lib/**/*.js'))
    .pipe(buffer())
    .pipe(rename('pmz-lib.js'))
    .pipe(gulp.dest('./dist/'))

    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify()).on('error', gutil.log)
    .pipe(rename('pmz-lib.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build']);

gulp.task('all', ['build', 'assets']);

