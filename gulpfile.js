const { parallel, series, watch, src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

function css() {
    return src('app/sass/main.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded'
        }).on('error', $.sass.logError))
        .pipe(dest('app/css'))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.postcss([autoprefixer({
            cascade: false
        })]))
        .pipe($.sass.sync({
            outputStyle: 'compressed'
        }).on('error', $.sass.logError))
        .pipe($.sourcemaps.write('.'))
        .pipe(dest('app/css'))

}

// Concat js files (unused yet)
function js() {
    return src('assets/js/**/*.js')
    .pipe($.concat('main.js'))
    .pipe(dest('app/js'))
}

// Put everythin in a dist folder
function copy() {
  return src('app/**/*', {base: './app'})
  .pipe(dest("dist"))
}

function reload(done) {
    browserSync.reload();

    done();
}

function serve() {
    browserSync.init({
        port: 5000,
        proxy: 'http://localhost/mta/auth/authentication'
    });
}

function watchFiles() {
    watch('assets/scss/**/*.scss', css);
}

const dev = parallel(watchFiles, css);
const build = series(css, js, copy);

exports.css = css;
exports.js = js;
exports.copy = copy;
exports.serve = serve;
exports.dev = dev;
exports.build = build;