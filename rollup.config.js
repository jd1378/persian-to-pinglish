import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

let pkg = require('./package.json');

const isDev = process.env.NODE_ENV === 'development';

const banner = `/* persian-to-pinglish v${pkg.version} - License: MIT */`;

const commonConfig = {
  input: 'src/index.js',
};

const babelCommonOptions = {
  exclude: ['node_modules/**'],
};

const terserOptions = {
  output: {
    ecma: 5,
  },
};

export default [
  {
    ...commonConfig,
    output: {
      banner,
      file: pkg.browser,
      format: 'esm',
    },
    plugins: [
      nodeResolve(),
      getBabelOutputPlugin({
        ...babelCommonOptions,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['ie >= 8'],
              },
            },
          ],
        ],
        plugins: [
          [
            '@babel/plugin-transform-modules-umd',
            { moduleId: 'PersianToPinglish' },
          ],
        ],
      }),
      commonjs(),
      isDev ? 0 : terser(terserOptions),
    ].filter(Boolean),
  },
  {
    input: 'src/index.js',
    plugins: [
      getBabelOutputPlugin({
        ...babelCommonOptions,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['last 2 versions'],
              },
              modules: false,
            },
          ],
        ],
      }),
      isDev ? 0 : terser(terserOptions),
    ].filter(Boolean),
    output: {
      banner,
      file: pkg.main,
      format: 'cjs',
    },
  },
  {
    input: 'src/index.js',
    plugins: [
      getBabelOutputPlugin({
        ...babelCommonOptions,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['last 2 versions'],
              },
              modules: false,
            },
          ],
        ],
      }),
      isDev ? 0 : terser(terserOptions),
    ].filter(Boolean),
    output: {
      banner,
      file: pkg.module,
      format: 'esm',
    },
  },
];
