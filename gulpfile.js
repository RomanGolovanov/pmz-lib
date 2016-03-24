
'use strict';

var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util');

gulp.task('build', function () {
  return browserify({
        entries: './lib/init.js',
        // require: {
        //     "jszip": "JSZip",
        //     "windows-1251": "windows1251"
        // },
        bundleExternal: false,
        debug: false 
    })
    .external('windows-1251')
    .external('JSZip')
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

