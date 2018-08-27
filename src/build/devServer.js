const path = require('path')
const webpack = require('webpack')
const express = require('express')
const proxy = require('http-proxy-middleware')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const conf = require('./conf')
const webpackConfig = require('./webpack.dev.conf')
const compiler = webpack(webpackConfig)
const app = express()

app.use(
  devMiddleware(compiler, {
    // webpack-dev-middleware options
    writeToDisk: false,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }),
)

app.use(hotMiddleware(compiler))

// development proxy
app.use(
  '/api',
  proxy({
    target: 'http://localhost:4000/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/',
    },
  }),
)

app.use('/', express.static(process.cwd() + `${conf.paths.public}`))

app.get('*', function(request, response) {
  response.sendFile(path.resolve(process.cwd(), `${conf.paths.public}`, 'index.html'))
})

app.listen(3000, () => console.log('app listening on port 3000!'))
