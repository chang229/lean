// module.exports = require('chd-gulp');
// 实现这个项目的构建任务
const { src, dest, series, parallel, watch } = require("gulp");
const del = require("del");
const loadPlugins = require("gulp-load-plugins");
const browserSync = require("browser-sync");

// loadPlugins返回一个插件列表
const plugins = loadPlugins();

const bs = browserSync.create();

const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html",
    },
    {
      name: "Features",
      link: "features.html",
    },
    {
      name: "About",
      link: "about.html",
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Twitter",
          link: "https://twitter.com/w_zce",
        },
        {
          name: "About",
          link: "https://weibo.com/zceme",
        },
        {
          name: "divider",
        },
        {
          name: "About",
          link: "https://github.com/zce",
        },
      ],
    },
  ],
  pkg: require("./package.json"),
  date: new Date(),
};

// 删除构建目录
const clean = () => {
  return del(["dist", "temp"]);
};

// 处理sass文件
const styles = () => {
  return src("src/assets/styles/*.scss", { base: "src" })
    .pipe(plugins.sass({ outputStyle: "expanded" }))
    .pipe(dest("temp"));
};

// 处理js文件
const scripts = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
    .pipe(dest("temp"));
};

// 处理html文件
const pages = () => {
  return src("src/*.html", { base: "src" })
    .pipe(plugins.swig({ data, defaults: { cache: false } }))
    .pipe(dest("temp"));
};

// 处理图片文件
const images = () => {
  return src("src/assets/images/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

// 处理字体文件
const fonts = () => {
  return src("src/assets/fonts/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

//处理其它静态文件
const extra = () => {
  return src("public/**", { base: "public" }).pipe(dest("dist"));
};

// 使用useref插件处理引用文件,处理构建注释，并完成文件压缩
const useref = () => {
  return src("temp/*.html", { base: "temp" })
    .pipe(plugins.useref({ searchPath: ["temp", "."] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(
      plugins.if(
        /\.html$/,
        plugins.htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        })
      )
    )
    .pipe(dest("dist"));
};

// 使用browserSync创建本地服务器并实现热更新
const serve = () => {
  watch("src/assets/styles/*.scss", styles);
  watch("src/assets/scripts/*.js", scripts);
  watch("src/*.html", pages);
  watch(
    ["src/assets/images/**", "src/assets/fonts/**", "public/**"],
    bs.reload
  );

  bs.init({
    notify: false,
    port: 8080,
    open: true,
    files: "dist/**",
    server: {
      baseDir: ["temp", "src", "public"],
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
};

// 静态文件处理器
const ticker = parallel(images, fonts, extra);

// 编译
const cmpiler = parallel(styles, scripts, pages);

// 本地起项目
const start = series(cmpiler, serve);

// 项目打包
const build = series(clean, cmpiler, useref, ticker);

module.exports = {
  clean,
  start,
  build,
};
