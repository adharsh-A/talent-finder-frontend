import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from '@rollup/plugin-terser';

export default {
  input: 'src/main.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'TalentFinder',
  },
  plugins: [
    resolve(),
    commonjs(),
    terser(),
  ],
};

