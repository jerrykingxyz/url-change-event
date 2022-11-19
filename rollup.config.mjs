import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' }

export default [
  // cjs & esm & browser
  // because of no import and export in this lib, we can use esm for cjs & browser
  {
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'es',
    },
    plugins: [],
  },
  // browser minify
  {
    input: 'src/index.js',
    output: {
      name: 'url-change-event',
      file: pkg.main.replace('.js', '.min.js'),
      format: 'umd',
    },
    plugins: [
      babel({
        presets: ['@babel/preset-env'],
      }),
      terser(),
    ],
  },
]
