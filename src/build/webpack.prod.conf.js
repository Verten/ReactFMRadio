const path = require('path')
const webpack = require('webpack')
const BaseConfig = require('./webpack.conf')
const conf = require('./conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ProdConfig = {
  ...BaseConfig,
}

const publicPath = (publicUrl = `${conf.paths.publicUrl}`)

ProdConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
      PUBLIC_URL: `"${publicUrl}"`,
    },
  }),
)

ProdConfig.plugins.push(
  new CopyWebpackPlugin(
    [
      {
        from: `${path.join(process.cwd(), conf.paths.public)}/customize-service-worker.js`,
        to: `${path.join(process.cwd(), conf.paths.dist)}`,
        toType: 'dir',
      },
    ],
    { debug: 'info' },
  ),
)

ProdConfig.module.rules.push({
  test: /\.(css|scss)$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader!postcss-loader!sass-loader',
  }),
})

ProdConfig.optimization = {
  runtimeChunk: false,
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
  ],
}

Object.assign(ProdConfig, {
  mode: 'production',
  entry: [`babel-polyfill`, `./${conf.path.src('index')}`],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    publicPath: `${publicPath}`,
    filename: 'app.[hash].js',
  },
})

module.exports = ProdConfig
