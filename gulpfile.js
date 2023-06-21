const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssMin = require('gulp-cssmin');

function buildHtml() {
    return src('./app/*.html')
    .pipe(dest('./src/'))
}

function buildFonts() {
    return src('./app/fonts/**/*.*')
    .pipe(dest('./src/fonts'))
}

function buildImg() {
    return src('./app/img/**/*.*')
    .pipe(dest('./src/img/'))
}

function buildStyles() {
    return src('./app/styles/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('./src/styles'));
}


function browserSyncInit() {
    return browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}
function watchTask() {
    watch('./app/*.html', series(buildHtml, browserSyncReload));
    watch(['./app/**/*.scss'], series(buildStyles, browserSyncReload));
}
exports.scss = buildStyles;
exports.html = watchTask;

exports.default = series(
    buildHtml, 
    buildImg,
    buildFonts,
    buildStyles,
    parallel(
        browserSyncInit,
        watchTask
        )
);