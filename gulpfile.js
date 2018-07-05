var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gp_concat = require('gulp-concat');
var gutil = require('gulp-util');
var pump = require('pump');

gulp.task('js', function(cb) {
    pump([
        gulp.src([
            './public/javascripts/game_partials/globals.js',
            './public/javascripts/game_partials/init.js',
            './public/javascripts/game_partials/tweens.js',
            './public/javascripts/game_partials/tick.js',
            './public/javascripts/game_partials/events.js',
            './public/javascripts/game_partials/quiz.js',
        ]),
        gp_concat('combined.js'),
        uglify({
                mangle: {
                keep_fnames: false,
            },
            toplevel: true,
            compress: { hoist_funs: false }
        }),
        rename({suffix: '.min'}),
        gulp.dest('./public/javascripts')
    ],cb);
});

gulp.task('default',['js']);