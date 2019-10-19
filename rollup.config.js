import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

export default [
  // nodejs & browsers
  {
    input: 'src/index.js',
    output: {
      name: 'url-change-event',
      file: pkg.main,
      format: 'umd',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
  // browsers min
  {
    input: 'src/index.js',
    output: {
      name: 'url-change-event',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      uglify(),
    ],
  },
  // mjs
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
]
