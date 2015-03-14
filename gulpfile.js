var dev         = "app_dev",
    prod        = "app_prod";

var gulp        = require('gulp'),
    useref      = require('gulp-useref'),
    clean       = require('gulp-clean'),
    serve       = require('gulp-serve');


// Serveur Web
gulp.task('serve', serve('app_prod'));


// Compile JS from HTML tags
gulp.task('compile', function () {
    var assets = useref.assets();

    return gulp.src(dev +'/*.html')
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(prod));
});


// Move files to prod without changing them
gulp.task('moveCss', ['cleanCss'], function () {
  return gulp.src(dev +"/resources/css/**/*")
    .pipe(gulp.dest(prod +'/resources/css'));
});


// Clean directories
gulp.task('cleanCss', function () {
  return gulp.src(prod +"/resources/css")
    .pipe(clean());
});


// Production task
gulp.task('prod', ['compile', 'moveCss'], function () {});
