const path = require('path')
const webpack = require('webpack')
const BaseConfig = require('./webpack.conf')
const conf = require('./conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DevConfig = {
  ...BaseConfig,
}

const publicPath = (publicUrl = `${conf.paths.publicUrl}`)

DevConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
      PUBLIC_URL: `${publicUrl}`,
    },
  }),
)

DevConfig.module.rules.push({
  test: /\.(css|scss)$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader!postcss-loader!sass-loader',
  }),
})

Object.assign(DevConfig, {
  mode: 'production',
  entry: [`babel-polyfill`, `./${conf.path.src('index')}`],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    publicPath: `${publicPath}`,
    filename: 'app.[hash].js',
  },
})

module.exports = DevConfig
