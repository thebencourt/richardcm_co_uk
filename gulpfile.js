var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var cache = require('gulp-cache');
var uncss = require('gulp-uncss');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifycss = require('gulp-minify-css');

gulp.task('styles', function () {
  gulp.src('app/assets/sass/styles.scss')
    .pipe(sass({style: 'compact'}))
      // .pipe(uncss({
      //     html: ['app/index.html']
      // })) TODO: This isn't checking the handlebars templates
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/public/css'));
});

gulp.task('scripts', function () {
  gulp.src('app/assets/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/public/js'));

  gulp.src([
    'app/assets/bower_components/jquery/dist/jquery.js',
    'app/assets/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
    'app/assets/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js'
  ])
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('app/public/js'));
});

gulp.task('images', function () {
  gulp.src('app/assets/img/**/*')
    .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
    .pipe(gulp.dest('app/public/img'));
});

gulp.task('watch', function () {
  gulp.watch('app/assets/sass/*.scss', ['styles']);
  gulp.watch('app/assets/js/*.js', ['scripts']);
  gulp.watch('app/assets/img/**/*', ['images']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);
