
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    transform = require('vinyl-transform');

var src = ['./lib/init.js'];

gulp.task('build-browserify', function() {
  gulp.src(src)
    .pipe(browserify())
    .pipe(rename('pmz-lib.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('pmz-lib.min.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build', ['build-browserify']);

gulp.task('default', ['build']);
