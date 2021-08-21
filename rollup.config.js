// rollup.config.js
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel'
import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";

const extensions = ['.js', '.ts'];

export default {
  input: 'src/main.ts',
  output: {
    file: 'js/content.js',
  },
  plugins: [ 
    json(),
    nodeResolve({
      extensions,
      // modulesOnly: true,
    }),
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    sourceMaps(),
    commonjs()
  ],
};

  // babel({
  //   exclude: 'node_modules/**',
  //   extensions,
  // }),
