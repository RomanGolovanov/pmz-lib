
'use strict';

var fs = require('fs');    
var http = require('http');
var browserify = require('browserify');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('assets', function (cb) {
    http.get("http://maps.ametro.org/maps/Moscow.zip", function(response) {
        var file = fs.createWriteStream("assets/Moscow.zip");
        file.on('finish', cb);
        response.pipe(file);
    });
});
 
 
gulp.task('compile', function(){
    var project = typescript.createProject('src/tsconfig.json');
	return project
        .src()
        .pipe(typescript(project))
        .js
        .pipe(gulp.dest('lib'));    
});

gulp.task('package', ['compile'], function () {
  return browserify({
        entries: 'lib/init.js',
        bundleExternal: false,
        standalone: 'pmz',
        debug: false 
    })
    .bundle()
    .pipe(source('lib/**/*.js'))
    .pipe(buffer())
    .pipe(rename('pmz-lib.js'))
    .pipe(gulp.dest('dist/'))

    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify()).on('error', gutil.log)
    .pipe(rename('pmz-lib.min.js'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
    watch(['src/**/*.ts'], function(event, cb) {
        gulp.start('build');
    });
});

gulp.task('default', ['package']);
gulp.task('build', ['package']);
gulp.task('all', ['package', 'assets']);

