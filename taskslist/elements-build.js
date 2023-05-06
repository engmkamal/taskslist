const concat = require('concat');

(async function build() {  
  const files =  [
      './dist/taskslist/runtime.js',
      './dist/taskslist/polyfills.js',
      './dist/taskslist/main.js'
    ]; 

  await concat(files, './dist/taskslist/bundle.js');
})();
