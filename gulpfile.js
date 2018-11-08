var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('css', function() {
  return gulp.src('app/sass/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
        outputStyle: 'expanded'
    }).on('error', $.sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe($.rename({
        suffix: '.min'
    }))
    .pipe($.autoprefixer({
        browsers: ['last 3 versions',
            'not ie <= 8',
            'firefox > 20'
        ],
        cascade: false
    }))
    .pipe($.sass.sync({
        outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.sourcemaps.write('.'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('js', function() {
  gulp.src('app/js/main.js')
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('app/dist/js'));
});

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('serve', function() {
  browserSync.init({
    proxy: 'ilista:5001',
    port: 5000
  });  
});

gulp.task('dev', ['css', 'serve'], function(){
  gulp.watch('app/**/*.scss', ['css', 'reload']);
  gulp.watch('app/**/*.js', ['reload']);
  gulp.watch('./**/*.php', ['reload']);
});