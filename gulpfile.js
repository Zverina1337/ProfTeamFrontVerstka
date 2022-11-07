const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

const PATHS = {
    src: 'src',
    dist: 'dist',
    scss: `${PATHS.src}/scss/**/*.scss`,
    html: `${PATHS.src}/**/*.html`,
    images: `${PATHS.src}/images/**/*.*`
};

// Таск компиляции SASS в CSS
function buildSass() {
    return src(PATHS.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ['last 2 versions']
                }),
                cssnano()
            ])
        )
        .pipe(sourcemaps.write())
        .pipe(dest(`${PATHS.src}/css`))
        .pipe(dest(`${PATHS.dist}/css`))
        .pipe(browserSync.stream());
}

// Таск работы с html файлами
function buildHtml() {
    return src(PATHS.html)
        .pipe(dest(PATHS.dist))
        .pipe(browserSync.stream());
}

// Таск копирования статичных файлов
function copy() {
    return src([PATHS.images], { base: PATHS.src }).pipe(dest(PATHS.dist));
}

// Таск очистки dist
function cleanDist() {
    return src('dist', { allowEmpty: true }).pipe(clean());
}

// Таск отслеживания изменения файлов
function serve() {
    watch(PATHS.scss, buildSass);
    watch(PATHS.html, buildHtml);
}

// Создание дев-сервера
function createDevServer() {
    browserSync.init({
        server: PATHS.src,
        notify: false
    })
}

exports.build = series(cleanDist, buildSass, buildHtml, copy);
exports.default = series(buildSass, parallel(createDevServer, serve));