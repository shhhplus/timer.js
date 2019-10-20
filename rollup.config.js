const babel = require('rollup-plugin-babel');

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'createTimer',
  },
  plugins: [babel()],
};
