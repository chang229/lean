const { src,dest,series,parallel,watch } = require('gulp');
const del = require('del');
const loadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');

// loadPlugins返回一个插件列表
const plugins = loadPlugins();

const bs = browserSync.create();
// 获取当前命令行路径
const cwd = process.cwd();
//默认配置
let config = {
    build: {
        src: 'src',
        dist: 'dist',
        temp: 'temp',
        public: 'public',
        paths: {
          styles: 'assets/styles/*.scss',
          scripts: 'assets/scripts/*.js',
          pages: '*.html',
          images: 'assets/images/**',
          fonts: 'assets/fonts/**'
        }
    }
};

try{
    const pageConfig = require(`${cwd}/pages/config.js`);
    config = Object.assign({},config,pageConfig);
}catch(e){}

// 删除构建目录
const clean = () => {
    return del([config.build.dist, config.build.temp])
}

// 处理sass文件
const styles = () => {
    return src(config.build.paths.styles,{base:config.build.src,cwd: config.build.src})
        .pipe(plugins.sass({outputStyle:'expanded'}))
        .pipe(dest(config.build.temp))
}

// 处理js文件
const scripts = () => {
    return src(config.build.paths.scripts,{base:config.build.src,cwd: config.build.src})
        .pipe(plugins.babel({presets:[require('@babel/preset-env')]}))
        .pipe(dest(config.build.temp))
}

// 处理html文件
const pages = () => {
    return src(config.build.paths.pages,{base:config.build.src,cwd: config.build.src})
        .pipe(plugins.swig({data:config.data,defaults: { cache: false }}))
        .pipe(dest(config.build.temp))
}

// 处理图片文件
const images = () => {
    return src(config.build.paths.images,{base:config.build.src,cwd: config.build.src})
        .pipe(plugins.imagemin())
        .pipe(dest(config.build.dist))
}

// 处理字体文件
const fonts = () => {
    return src(config.build.paths.fonts,{base:config.build.src,cwd: config.build.src})
        .pipe(plugins.imagemin())
        .pipe(dest(config.build.dist))
}

//处理其它静态文件
const extra = () => {
    return src('**',{base: config.build.public, cwd: config.build.public })
        .pipe(dest(config.build.dist))
}

// 使用useref插件处理引用文件,处理构建注释，并完成文件压缩
const useref = () => {
    return src(config.build.paths.pages,{base:config.build.temp,cwd: config.build.temp})
        .pipe(plugins.useref({searchPath:[config.build.temp,'.']}))
        .pipe(plugins.if(/\.js$/,plugins.uglify()))
        .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/,plugins.htmlmin({
            collapseWhitespace:true,
            minifyCSS:true,
            minifyJS:true
        })))
        .pipe(dest(config.build.dist))
}

// 使用browserSync创建本地服务器并实现热更新
const serve = () => {
    watch(config.build.paths.styles,styles);
    watch(config.build.paths.scripts,scripts);
    watch(config.build.paths.pages,pages);

    watch([
        config.build.paths.images,
        config.build.paths.fonts,
    ],bs.reload)

    watch('**', { cwd: config.build.public }, bs.reload)

    bs.init({
        notify:false,
        port:8080,
        open:true,
        files:`${config.build.dist}/**`,
        server:{
            baseDir:[config.build.temp, config.build.src, config.build.public],
            routes:{
                '/node_modules':'node_modules'
            }
        }
    })
}

// 静态文件处理器
const ticker = parallel(images,fonts,extra);

// 编译
const cmpiler = parallel(styles,scripts,pages);

// 本地起项目
const start = series(cmpiler,serve);

// 项目打包
const build = series(clean,cmpiler,useref,ticker);

module.exports = {
    clean,
    start,
    build
}