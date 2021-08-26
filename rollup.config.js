// rollup.config.js
// import json from 'rollup-plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
// import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import babel from '@rollup/plugin-babel'
import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
// import replace from '@rollup/plugin-replace';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

const extensions = ['.js', '.ts'];

export default {
  input: 'src/main.ts',
  output: {
    file: 'js/content.js',
    // format: 'cjs'
  },
  plugins: [ 
    json(),
    // replace({
    //   'process.env.BABEL_TYPES_8_BREAKING': JSON.stringify('')
    // }),
    resolve({
      extensions,
      // modulesOnly: true,
    }),
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    commonjs({
      include: 'node_modules/**',  // Default: undefined
      browser: true,
      preferBuiltins: false,
      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false,  // Default: false
      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false  // Default: true
    }),
    globals(),
    builtins(),
    // babel({
    //   extensions,
    //   babelHelpers: 'bundled'
    // }),
    sourceMaps(),
  ],
};


