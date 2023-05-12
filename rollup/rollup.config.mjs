import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import clear from 'rollup-plugin-clear';
import clearDeclaration from './plugin-clear-declaration';
import createReadme from './plugin-create-readme';
import createPackageJson from './plugin-create-package-json';
import originalPackageInfo from '../package.json';

export default {
  input: './src/index.ts',
  output: {
    name: 'createTimer',
    file: './dist/index.js',
    format: 'umd',
  },
  plugins: [
    clear({
      targets: ['./dist'],
    }),
    resolve(),
    typescript({
      tslib: require.resolve('tslib'),
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    terser(),
    clearDeclaration({
      folder: './dist/types',
      requirements: ['index.d.ts'],
    }),
    createReadme({
      dist: './dist',
    }),
    createPackageJson({
      dist: './dist',
      basic: {
        data: originalPackageInfo,
        keys: [
          'version',
          'description',
          'homepage',
          'license',
          'keywords',
          'author',
          'bugs',
          'repository',
          'dependencies',
        ],
      },
      extra: {
        name: '@shhhplus/timer.js',
        main: './index.js',
        types: './types/index.d.ts',
      },
    }),
  ],
};
