var concat = require('concat');
const es5 = ['./dist/app/runtime-es5.js','./dist/app/polyfills-es5.js','./dist/app/main-es5.js'];
const es2015= ['./dist/app/runtime-es2015.js','./dist/app/polyfills-es2015.js','./dist/app/main-es2015.js'];
concat(es5, './dist/app/elements-es5.js');
concat(es2015, './dist/app/elements-es2015.js');