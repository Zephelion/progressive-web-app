import gulp from 'gulp';
import uglify from 'gulp-uglify';

gulp.task('compress', function() {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});