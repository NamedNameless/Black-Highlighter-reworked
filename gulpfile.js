// Load plugins
const gulp = require("gulp");
const sync = require("gulp-npm-script-sync");

// import tasks
const img = require("./gulp-tasks/images.js");
const js = require("./gulp-tasks/scripts.js");
const server = require("./gulp-tasks/browsersync.js");
const css = require("./gulp-tasks/styles.js");
const clean = require("./gulp-tasks/clean.js");
const copy = require("./gulp-tasks/copy.js");

// Watch files
function watchFiles() {
  gulp.watch("./src/assets/css/**/*", css.build);
  gulp.watch("./src/assets/img/**/*", gulp.parallel(img.resize, copy.assets));
}

// define tasks
const watch = gulp.parallel(watchFiles, server.init);
const build = gulp.series(
  clean.dist,
  gulp.parallel(
    copy.assets,
    css.build,
    img.resize,
    gulp.series(js.lint, js.build)
  )
);

// expose tasks to CLI
exports.images = img.optimise;
exports.watch = watch;
exports.build = build;
exports.default = build;

sync(gulp);