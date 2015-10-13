var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass') ;
var rimraf = require('gulp-rimraf');
var gulpFilter = require('gulp-filter');
var bower = require('gulp-bower');
var vendor = require('gulp-concat-vendor');
 

var allHTMLFiles = './src/app/**/*.html';
var buildFolder = './public/';
var angularModuleFile = './src/app/app.js';
var appBundledFileName = 'app-bundled.js';
var appFolder = './src/assets/javascript/';
var cleanSources = [buildFolder,'./src/assets/javascript/app-bundled.js'];
var allBowerComponents = './src/bower_components/**';
var buildBowerComponentsFolder = buildFolder + 'bower_components/';
var src = 'src/';
var dest = 'build/';


gulp.task('default', [ 'clean', 'browserify-modules', 'sass', 'icons', 'watch', 'connect']);

gulp.task('clean', function (cb) {
	return gulp.src(cleanSources, { read: false }) // much faster 
    .pipe(rimraf());
});

gulp.task('copy-bower-components', function () {
  gulp.src(allBowerComponents)
    .pipe(gulp.dest(buildBowerComponentsFolder));
});

gulp.task('connect', function () {
	connect.server({
		root: 'src/',
		port: 8888
	});
});

gulp.task('sass', function() {
  gulp.src('src/sass/*.scss')
  .pipe(sass({
        includePaths: [
          './src/bower_components/bootstrap-sass' + '/assets/stylesheets',
          './src/bower_components/font-awesome/scss',
        ],
   }))
  .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('icons', function() { 
  return gulp.src('./src/bower_components/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('./src/assets/fonts')); 
});

gulp.task('copy-html', function () {
  gulp.src(allHTMLFiles)
    .pipe(gulp.dest(buildFolder));
});

gulp.task('browserify-modules', function () {
	gulp.src(angularModuleFile)
		.pipe(browserify({
			insertGlobals : true,
			debug : true
		}))
		.pipe(concat(appBundledFileName))
		.pipe(gulp.dest(appFolder))
});

gulp.task('watch', function(){
  gulp.watch('src/app/**/*.js', ['browserify-modules']);
  gulp.watch('src/**/*.html', ['copy-html']);
  gulp.watch('src/**/*.scss', ['sass']);
})