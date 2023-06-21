const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const beautify = require('gulp-beautify');
const imagemin = require('gulp-imagemin');

function buildHtml() {
    return src('./app/*.html')
        .pipe(dest('./src/'))
}

function buildJS() {
    return src('./app/js/**/*.js')
        .pipe(beautify.js({ indent_size: 4 }))
        .pipe(dest('./src/js/'))

}

function buildFonts() {
    return src('./app/fonts/**/*.*')
        .pipe(dest('./src/fonts'))
}

function buildImg() {
    return src('./app/img/**/*.*')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
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
    watch(['./app/**/*.js'], series(buildJS, browserSyncReload));
}
exports.scss = buildStyles;
exports.html = watchTask;
exports.js = buildJS;
exports.img = buildImg;

exports.default = series(
    buildHtml,
    buildImg,
    buildFonts,
    buildStyles,
    buildJS,
    parallel(
        browserSyncInit,
        watchTask
    )
);