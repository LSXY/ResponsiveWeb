var gulp = require('gulp');
//给文件名添加一段hash，避免cache
var rev = require('gulp-rev');
//更新文件链接
var revReplace = require('gulp-rev-replace');
//合并文件
var useref = require('gulp-useref');
//筛选文件放到进程里
var filter = require('gulp-filter');
//压缩js代码
var uglify = require('gulp-uglify');
//压缩css代码
var csso = require('gulp-csso');

gulp.task('hk', function (){
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });
  var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });
  //  分析index/html里的注释任务
  return gulp.src('src/index.html')
    .pipe(useref())
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(indexHtmlFilter)
    .pipe(rev())
    .pipe(indexHtmlFilter.restore)
    .pipe(revReplace())
    .pipe(gulp.dest('dist'));
});