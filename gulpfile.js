
var gulp = require('gulp');
var wrapper = require('gulp-wrap');
var pkg = require('./package.json');
var date = (new Date).toISOString().substring(0,10);
var anonymous = '/** @ignore */\n(function () {\'use strict\';\n<%= contents %>\n})()';
var license = '/*\n * s-config version '+pkg.version+' at '+date+
    '\n * @license MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )\
    \n */\n<%= contents %> ';


function src ( name ) {
    return gulp.src(['lib/*.js'])
        .pipe(require('gulp-order')([ // queue of files
            'mapper.js',
            'read.js',
            'merge.js',
            'define.js'
        ]))
        .pipe( require('gulp-concat')(name||'config.js') )
        .pipe( wrapper(anonymous) );
}

gulp.task('concat', function () {
    return src('s-config.js')
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('minify', function () {
    return src('s-config.min.js')
        .pipe( require('gulp-uglify')() )
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('watch', function () {
    
    gulp.watch('lib/*.js', ['build']);

});

gulp.task('lint', function () {
    return gulp.src(['s-config.js','s-config.min.js'])
        .pipe( require('gulp-eslint')() )
        .pipe( require('gulp-eslint').format() )
        .pipe( require('gulp-eslint').failAfterError() );
});

gulp.task('test', function ( done ) {
    return gulp.src('test/test.js', {read: false})
        .pipe( require('gulp-mocha')({reporter: 'nyan'}) );
});

gulp.task('doc', function () {
    var doc = require('gulp-documentation');
    return gulp.src('s-config.js')
        .pipe( doc('html', {}, {
            name: pkg.name.toUpperCase(),
            version: pkg.version,
            license: pkg.license,
            date: date
        }) )
        .pipe( gulp.dest('doc') );
});

gulp.task('doc-md', function () {
    var doc = require('gulp-documentation');
    return gulp.src('s-config.js')
        .pipe( doc('md', {}, {
            name: pkg.name.toUpperCase(),
            version: pkg.version,
            license: pkg.license,
            date: date,
        }) )
        .pipe( gulp.dest('doc') );
});

gulp.task('doc-json', function () {
    var doc = require('gulp-documentation');
    return gulp.src('s-config.js')
        .pipe( doc('json', {}, {
            name: pkg.name.toUpperCase(),
            version: pkg.version,
            license: pkg.license,
            date: date
        }) )
        .pipe( gulp.dest('doc') );
});

gulp.task('build', ['concat', 'minify'], function () {
    gulp.start('doc');
    gulp.start('doc-md');
    // gulp.start('lint');
    // gulp.start('test');
});
