
var gulp = require('gulp');
var wrapper = require('gulp-wrap');
var anonymous = '(function () {\'use strict\';\n<%= contents %>\n})()';
var license = '/**\n * s-config\
    \n * MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )\
    \n */\n<%= contents %> ';


function src ( name ) {
    return gulp.src(['lib/*.js'])
        .pipe(require('gulp-order')([ // queue of files
            'config.js',
            'define.js'
        ]))
        .pipe( require('gulp-concat')(name||'declare.js') )
        .pipe( wrapper(anonymous) );
}

gulp.task('concat', function () {
    return src('config.js')
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('minify', function () {
    return src('config.min.js')
        .pipe( require('gulp-uglify')() )
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('watch', function () {
    
    gulp.watch('lib/*.js', ['concat']);

});