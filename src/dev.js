import CircularDependencyPlugin from 'circular-dependency-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { map } from 'ramda'
import webpack from 'webpack'

import { getStyleRules } from './base'


export default function makeDevConfig(
  baseConfig,
  { basePath = 'src', libraryExclude, buildDir = 'generated_assets/' },
) {
  const config = { ...baseConfig }

  config.mode = 'development'
  config.output.pathinfo = true
  config.output.filename = '[name]-[hash].js'
  config.watch = true

  config.entry = map(
    entry => [
      'webpack-dev-server/client?http://localhost:3000/',
      'webpack/hot/only-dev-server',
      ...entry,
    ],
    config.entry,
  )

  config.plugins = [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: libraryExclude,
      // add errors to webpack instead of warnings
      failOnError: false,
    }),
    new HtmlWebpackPlugin({
      title: 'My app',
      // template: 'src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...config.plugins,
  ]
  config.devServer = {
    hot: true,
    port: 3000,
    clientLogLevel: 'warning',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: ['localhost', '127.0.0.1'],
    stats: 'minimal',
    overlay: true,
    open: true,
    historyApiFallback: {
      rewrites: [{ from: /./, to: `/assets/${buildDir}index.html` }],
    },
    // TODO: add proxy options
  }
  config.devtool = '#cheap-module-source-map'
  config.output.publicPath = `http://localhost:3000/assets/${buildDir}`

  const styleRules = getStyleRules({
    basePath,
    cssLoaderOptions: {
      localIdentName: '[folder]_[name]__[local]___[hash:base64:5]',
    },
  })
  config.module.rules = [...config.module.rules, ...styleRules]
  return config
}
