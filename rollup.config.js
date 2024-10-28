import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.jsx', // Adjust according to your entry file
  output: {
    file: 'dist/bundle.js', // Output file
    format: 'iife', // Output format
    name: 'MyProject', // Global variable name
  },
  plugins: [
    resolve(), // Resolves npm packages
    commonjs(), // Converts CommonJS modules to ES6
    terser(), // Minifies the output
  ],
};
