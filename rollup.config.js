import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import {uglify} from 'rollup-plugin-uglify';
import banner from 'rollup-plugin-banner';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import merge from 'webpack-merge';

let year = new Date().getFullYear(),
    version = pkg.version;

let bannerText = `js-toolkits v${version}
(c) 2019-${year} weijhfly https://github.com/weijhfly/js-toolkits
Licensed under MIT
Released on: oct 21, 2019`;

let config = {
  input: 'src/index.ts',
  output: {
    name:'tks',
    file: 'dist/js-toolkits.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    json(),
    typescript(),
    banner(bannerText),
  ]
};

let [min, es, cjs] = [merge({}, config), merge({}, config), merge({}, config)];

min.output.file = 'dist/js-toolkits.min.js';
min.plugins.unshift(uglify());

es.output.file = 'dist/js-toolkits.es.js';
es.output.format = 'es';

cjs.output.file = 'dist/js-toolkits.cjs.js';
cjs.output.format = 'cjs';

export default [config, min, es, cjs];