var gulp 				= require('gulp'),
		sass 				= require('gulp-sass'),
		browserSync = require('browser-sync'),
		pug        	= require('gulp-pug'),
		prefix			= require('gulp-autoprefixer');

gulp.task('browser-sync', ['styles', 'pug'], function() {
	browserSync.init({
		server: {
			baseDir: './app'
		},
		notify: false
	});
});

gulp.task('styles', function() {
	return gulp.src('sass/*.sass')
		.pipe(sass({
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError))
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function() {
	return gulp.src('pug/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('app'));
});

gulp.task('watch', function() {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('pug/*.pug', ['pug']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);