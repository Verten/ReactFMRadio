const path = require('path')
const webpack = require('webpack')
const BaseConfig = require('./webpack.conf')
const conf = require('./conf')

const DevConfig = {
  ...BaseConfig,
}

const publicPath = (publicUrl = `${conf.paths.publicUrl}`)

DevConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
      PUBLIC_URL: `${publicUrl}`,
    },
  }),
)

DevConfig.module.rules.push({
  test: /(\.css|\.scss)$/,
  use: 'style-loader!css-loader!postcss-loader!sass-loader',
})

Object.assign(DevConfig, {
  mode: 'development',
  devtool: '#source-map',
  entry: [`babel-polyfill`, `./${conf.path.src('index')}`],
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    publicPath: `${publicPath}`,
    filename: 'app.js',
  },
  devServer: {
    port: 3000,
    hot: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
    contentBase: [path.join(process.cwd(), conf.paths.tmp)],
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' },
      },
    },
  },
})

module.exports = DevConfig
