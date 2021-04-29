import * as gulp from 'gulp';
import jestTask from './gulp-tasks/jest';

gulp.task('test', async function () {
  await jestTask();
});
