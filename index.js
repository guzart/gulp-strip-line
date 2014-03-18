'use strict';

var util = require('util');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = slPlugin;

function slPlugin(matchList) {
    var matchers = matchList;
    if (!util.isArray(matchList)) { matchers = [matchers]; }

    return through.obj(objectStream);

    function objectStream(file, enc, cb) {
        /* jshint validthis: true */

        var _this = this;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            _this.emit('error', pluginError('Streaming not supported'));
            return cb();
        }

        try {
            var contents = file.contents.toString();
            file.contents = new Buffer(stripLines(contents, matchers));
        } catch (err) {
            err.fileName = file.path;
            _this.emit('error', pluginError(err));
        }

        _this.push(file);

        cb();
    }
}

function pluginError(msg) {
    return new gutil.PluginError('gulp-strip-line', msg);
}

function stripLines(content, matchers) {
    if (!content) { return ''; }

    var output = content.toString();
    matchers.forEach(function (match) {
        var current = match.toString();
        if (util.isRegExp(match)) {
            current = current.toString().replace(/^\/|\/$/g, '');
        }

        if (current.indexOf('^') === -1) { current = '^.*' + current; }
        if (current.indexOf('$') === -1) { current += '.*$'; }
        current = new RegExp(current.toString(), 'gm');

        output = output.replace(current, '');
    });

    return output;
}
