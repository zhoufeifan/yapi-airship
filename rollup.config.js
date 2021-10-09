// rollup.config.js
// import json from 'rollup-plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
// import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
// 适配node环境的代码
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
    sourceMaps(),
  ],
};


