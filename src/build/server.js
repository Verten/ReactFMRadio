const path = require('path')
const webpack = require('webpack')
const express = require('express')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const conf = require('./conf')
const webpackConfig = require('./webpack.prod.conf')
const compiler = webpack(webpackConfig)
const app = express()

app.use(
  devMiddleware(compiler, {
    writeToDisk: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }),
)

app.use('/', express.static(process.cwd() + `/${conf.paths.dist}`))

app.get('*', function(request, response) {
  response.sendFile(path.resolve(process.cwd(), `${conf.paths.dist}`, 'index.html'))
})

app.listen(3000, () => console.log('app listening on port 3000!'))
