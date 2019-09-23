const presets = ['@babel/env']

if (process.env['ENV'] === 'prod') {
  presets.unshift('babel-preset-minify')
}

module.exports = { presets }
