import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const commonConfig = {
  input: './src/index.js',
};

export default [
  {
    ...commonConfig,
    output: {
      file: './dist/persian-to-pinglish.esm.js',
      format: 'es',
    },
    plugins: [
      getBabelOutputPlugin({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env'],
      }),
      nodeResolve(),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  },
  {
    ...commonConfig,
    output: {
      file: './dist/persian-to-pinglish.min.js',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      getBabelOutputPlugin({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env'],
      }),
      nodeResolve(),
      commonjs(),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  },
];
