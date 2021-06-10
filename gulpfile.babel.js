const gulp = require("gulp");
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");
const sass = require("gulp-dart-sass");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const server = require("browser-sync").create();

gulp.task("pug", pugTask);
function pugTask() {
  console.log("### ### ### PUG ### ### ###");
  gulp
    .src("./src/views/pages/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./public"));
}

gulp.task("sass", sassTask);
function sassTask() {
  console.log("### ### ### SASS ### ### ###");
  gulp
    .src("./src/assets/scss/styles.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(
      rename((path) => {
        path.extname = ".min.css";
      })
    )
    .pipe(gulp.dest("./public/assets/css"));
}

gulp.task("default", () => {
  // SERVER
  server.init({
    server: "./public",
  });
  // JS
  gulp.watch("./public/assets/js/*").on("change", server.reload);
  // SASS
  gulp.watch("./src/assets/scss/**/*.scss").on("change", () => {
    sassTask();
    server.reload();
  });
  // PUG
  gulp.watch("./src/views/**/*.pug").on("change", () => {
    pugTask();
    server.reload();
  });
});
