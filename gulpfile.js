var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concatCSS = require('gulp-concat-css');
var uglifyCSS = require('gulp-uglifycss')

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

// creates main.js
gulp.task('bundle', function() {
    return browserify({
        entries: './app/main.jsx',
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('app'))
})

// convert sass to css
gulp.task('styles', function() {
    gulp.src('app/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/sources'));
});

// watch sass conversion, run 'styles' on changes
gulp.task('watch-sass', function() {
    gulp.watch('app/*.sass', ['styles'])
});

gulp.task('finalize-scripts', function() {
    return gulp.src(['app/sources/*.js',
                     'app/main.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('app/dist'))
//        .pipe(uglify())
//        .pipe(gulp.dest('app/dist'));
});

gulp.task('finalize-css', function() {
    return gulp.src('app/sources/*.css')
        .pipe(concatCSS('style.css'))
        .pipe(gulp.dest('app/dist'))
//        .pipe(uglifyCSS())
//        .pipe(gulp.dest('app/dist'))
});

// remove app/style.css once finalize-css is back into the mix
gulp.task('copy', function() {
    return gulp.src(['app/index.html', 'app/style.css', 'app/sources/bootstrap.min.css'])
        .pipe(gulp.dest('app/dist'));
});

gulp.task('default', ['copy',
                      'bundle',
//                      'styles',
                      'finalize-scripts'],
//                      'finalize-css'],
					  function() {
    console.log('Gulp completed...');
});
