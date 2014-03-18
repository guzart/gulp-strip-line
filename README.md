gulp-strip-line
===============

## Information

<table>
<tr> 
<td>Package</td><td>gulp-strip-line</td>
</tr>
<tr>
<td>Description</td>
<td>Strip line plugin for gulp.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

    var gulp = require('gulp');
    var stripLine  = require('gulp-strip-line');

    gulp.task('default', function () {
      return gulp
        .src('app/*.js')
        .pipe(stripLine([/^\/\*\s*jshint/, 'use strict']))
        .pipe(gulp.dest('dist'));
    });

Removes the lines that match an expression or a given array of
expressions.

#### String Expression

If the expression is a string it will remove lines that contain the
given string.

#### RegExp Expression

If the expression is a regular expression it will remove the lines
that match the given expression.
