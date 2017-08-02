var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
let cleanCSS = require('gulp-clean-css');

var appFiles = {
    htmlfiles:[
        'index.html', 
        './app/views/*.html',
        './app/**/*.html'
    ],
    cssFiles:[
        './app/assets/*.css'
    ],
    cssFilesProd:[
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ],
    jsFiles: [
        './app/*.js',
        './app/config/*.js',
        './app/controllers/*.js',
        './app/services/*.js',
        './app/directives/**/**/*.js'       
    ],
    jsFilesProd:[
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js'
    ]
};

gulp.task('clean', function(){
    gulp.src('src/**/**.**')
    .pipe(clean());
});

//** DEV TASKS **//

gulp.task('jshint', function(){
    return gulp.src(appFiles.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', function(){
    return gulp.src(appFiles.jsFiles)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('src/'));
});


//** BUILD TASKS **//
gulp.task('jsDependences-prod', function(){
    return gulp.src(appFiles.jsFilesProd)
    .pipe(concat('dependences.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js/'));
});

gulp.task('jsFiles-prod', function(){
    return gulp.src(appFiles.jsFiles)
    .pipe(concat('app.js'))    
    .pipe(gulp.dest('src/js/'));
});

gulp.task('cssDependences-prod', function(){
    return gulp.src(appFiles.cssFilesProd)
    .pipe(concat('assets.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/css/'));
});

gulp.task('cssFiles-prod', function(){
    return gulp.src(appFiles.cssFiles)
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/css/'));
});


gulp.task('reload', function(done){
    browserSync.reload();
    done();
});

gulp.task('serve', ['js'], function(){
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });

   gulp.watch(appFiles.htmlfiles, ['reload']);
   gulp.watch(appFiles.cssFiles, ['reload']);
   gulp.watch(appFiles.jsFiles, ['js', 'reload']);

});

gulp.task('build', ['clean', 'jsDependences-prod', 'jsFiles-prod', 'cssDependences-prod', 'cssFiles-prod'])
gulp.task('default',['jshint', 'serve']);