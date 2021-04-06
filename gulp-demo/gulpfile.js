const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const loadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const plugins = loadPlugins();

const bs = browserSync.create();

const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }

const clean = () => {
    return del(['dist']);
}

const style = () => {
    return src('src/assets/styles/*.scss',{base:'src'})
    .pipe(plugins.sass({outputStyle:'expanded'}))
    .pipe(dest('dist'))
}

const script = () => {
    return src('src/assets/scripts/*.js',{base:'src'})
    .pipe(pluins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterE())
    .pipe(plugins.babel({presets:['@babel/preset-env']}))
    .pipe(dest('dist'))
}

const page = () => {
    return src('src/*.html',{base:'src'})
    .pipe(plugins.swig({data}))
    .pipe(dest('dist'))
}

const image = () => {
    return src('src/assets/images/**',{base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
    return src('src/assets/fonts/**',{base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extar = () => {
    return src('public/**',{base:'public'})
    .pipe(dest('dist'))
}

const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
      ], bs.reload)
    bs.init({
        files:'dist/**',
        server: {
            baseDir: ['temp', 'src', 'public'],
            routes: {
              '/node_modules': 'node_modules'
            }
        }
    })
}
const compile = parallel(style,script,page,image,font);

const build = series(clean,parallel(compile,extar))

module.exports = {
    build,
    serve
}