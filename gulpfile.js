const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImages(){
    return gulp.src('./build/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./source/images'))
}

function comprimeJavascript(){
    return gulp.src('./build/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./source/scripts'))
}

function compilaSass(){
    return gulp.src('./build/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./source/styles'));
    }

exports.default = function(){
    gulp.watch('./build/styles/*scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./build/images/*', {ignoreInitial: false}, gulp.series(comprimeImages));
    gulp.watch('./build/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavascript));
}
