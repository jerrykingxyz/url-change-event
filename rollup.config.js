import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

const plugins = [
  babel({
    exclude: 'node_modules/**',
  }),
]

const needMinify = process.env['ENV'] === 'prod'
const ext = needMinify ? '.min.js' : '.js'
if (needMinify) {
  plugins.push(uglify())
}

export default {
  input: 'src/index.js',
  output: {
    file: `dist/urlchangeevent${ext}`,
    format: 'cjs',
  },
  plugins,
}
