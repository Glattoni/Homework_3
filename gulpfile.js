const { src, dest, parallel, series, watch } = require('gulp');
const sync          = require('browser-sync').create();
const scss          = require('gulp-sass');
const notify        = require('gulp-notify');
const plumber       = require('gulp-plumber');
const sourcemap     = require("gulp-sourcemaps");
const rename        = require('gulp-rename');
const cleanCSS      = require('gulp-clean-css');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const fileinclude   = require('gulp-file-include');
const ttf2woff2     = require('gulp-ttf2woff2');
const del           = require('del');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const uglify        = require('gulp-uglify-es').default;
const imagemin      = require('gulp-imagemin');



const server = (done) => {
  sync.init({
    server: {
      baseDir: './dist'
    },
    notify: false,
    online: true
  }),

  watch('./src/scss/**/*.scss', styles);
  watch('./src/index.html', htmlInclude);
  watch('./src/**/*.html', htmlInclude);
  watch('./src/img/*.png', imToDist);
  watch('./src/img/*.jpg', imToDist);
  watch('./src/fonts/*.ttf', fonts);
  watch('./src/js/**/*.js', scripts);

  done();
}

const styles = () => {
  return src('src/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(scss({
    outputStyle: "expanded"
	}).on('error', notify.onError()))
	.pipe(rename({
		suffix: '.min'
	}))
  .pipe(postcss([
    autoprefixer({
			overrideBrowserslist:  ['last 2 versions'],
      cascade: false
		})
	]))
	.pipe(cleanCSS({
		level: 2
	}))
  .pipe(sourcemap.write('.'))
  .pipe(dest('dist/css'))
  .pipe(sync.stream());
}

const htmlInclude = () => {
  return src(['./src/**/*.html'])
  .pipe(fileinclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(dest('./dist'))
  .pipe(sync.stream());
}

const scripts = () =>{
	return src('./src/js/main.js')
		.pipe(webpackStream({
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					}
				]
			}
		}))
		.on('error', function (err) {
		console.error('WEBPACK ERROR', err);
		this.emit('end'); // Don't stop the rest of the task
		})

		.pipe(sourcemap.init())
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemap.write('.'))
		.pipe(dest('./dist/js'))
		.pipe(sync.stream());
}

const imToDist = () => {
  return src(['./src/img/**/*.png', './src/img/**/*.jpg'])
  .pipe(dest('./dist/img'))
}

const fonts = () => {
  return src('./src/fonts/*.ttf')
  .pipe(ttf2woff2())
  .pipe(dest('./dist/fonts'))
}

const clean = () => {
  return del(['dist/*'])
}

exports.server = server;
exports.styles = styles;
exports.fonts = fonts;

exports.default = series(clean, parallel(htmlInclude, styles, scripts, imToDist, fonts, server));


const stylesBuild = () => {
  return src('src/scss/**/*.scss')
  .pipe(plumber())
  .pipe(scss({
    outputStyle: "compressed"
  }
	).on('error', notify.onError()))
	.pipe(rename({
		suffix: '.min'
	}))
  .pipe(postcss([
    autoprefixer({
			overrideBrowserslist:  ['last 2 versions'],
      cascade: false
		})
	]))
	.pipe(cleanCSS({
		level: 2
	}))
  .pipe(dest('dist/css'))
}

const scriptsBuild = () =>{
	return src('./src/js/main.js')
		.pipe(webpackStream({
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					}
				]
			}
		}))
		.on('error', function (err) {
		console.error('WEBPACK ERROR', err);
		this.emit('end'); // Don't stop the rest of the task
		})
		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest('./dist/js'))
}

const images = () => {
  return src(['./src/img/**/*.png', './src/img/**/*.jpg'])
  .pipe(imagemin())
  .pipe(dest('./dist/img/'))
}

exports.build = series(clean, parallel(htmlInclude, stylesBuild, scriptsBuild, imToDist, fonts, images));
