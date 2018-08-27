const webpack = require('webpack')
const conf = require('./conf')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss'],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      manifest: conf.path.public('manifest.json'),
      favicon: conf.path.public('favicon.ico'),
      template: conf.path.public('index.html'),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer],
      },
      debug: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        include: path.join(process.cwd(), './src/config'),
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
}
