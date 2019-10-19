import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default [
  // nodejs & browsers
  {
    input: 'src/index.js',
    output: {
      name: 'url-change-event',
      file: `dist/url-change-event.js`,
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
      file: `dist/url-change-event.min.js`,
      name: 'url-change-event',
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
      file: `dist/url-change-event.mjs`,
      format: 'es',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
]
