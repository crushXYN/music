/*
 * @Author: your name
 * @Date: 2021-08-26 17:55:56
 * @LastEditTime: 2021-08-31 17:19:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程练习\阶段性项目\music\gulpfile.js
 */
const { series, src, dest, watch } = require("gulp");
const htmlclean = require("gulp-htmlclean");
const less = require("gulp-less");
const cleanCss = require("gulp-clean-css");
const stripDebug = require("gulp-strip-debug");
const uglify = require("gulp-uglify");
// import imgMin from "gulp-imagemin";
const imgMin = require("gulp-imagemin");
const connect = require("gulp-connect");
const folder = {
  src: "src/",
  dist: "dist/",
};

function html() {
  return src(folder.src + "html/*")
    .pipe(htmlclean())
    .pipe(dest(folder.dist + "html/"))
    .pipe(connect.reload());
}

function css() {
  return src(folder.src + "css/*")
    .pipe(less())
    .pipe(cleanCss())
    .pipe(dest(folder.dist + "css/"))
    .pipe(connect.reload());
}

/* .pipe(stripDebug())
 .pipe(uglify())*/
function js() {
  return src(folder.src + "js/*")
    .pipe(dest(folder.dist + "js/"))
    .pipe(connect.reload());
}

function image() {
  return src(folder.src + "images/*")
    .pipe(imgMin())
    .pipe(dest(folder.dist + "images/"));
}

function server(cb) {
  connect.server({
    port: "8000",
    livereload: true,
  });
  cb();
}
watch(folder.src + "html/*", function (cb) {
  html();
  cb();
});

watch(folder.src + "css/*", function (cb) {
  css();
  cb();
});

watch(folder.src + "js/*", function (cb) {
  js();
  cb();
});

exports.default = series(html, css, js, image, server);
