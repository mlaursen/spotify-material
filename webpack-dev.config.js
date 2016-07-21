const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config')();

config.cache = true;
config.devtool = 'cheap-module-eval-source-map';

config.entry = [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client',
  path.resolve(process.cwd(), 'src', 'client', 'index.jsx'),
];

config.module.loaders = config.module.loaders.concat([{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'react-hot!babel',
}, {
  test: /\.scss$/,
  exclude: /node_modules/,
  loader: 'style!css!postcss!sass?outputStyle=expanded&sourceMap',
}, Object.assign({}, config.__imgLoader, { loader: 'file' + config.__imgLoader.loader })]);

config.output.filename = '[name].js';
config.output.path = path.resolve(process.cwd(), 'dist', 'client');

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin(Object.assign({}, config.__htmlWebpackOptions, {
    isomorphic: null,
    isomorphicState: null,
    filename: 'index.html',
  })),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
]);

module.exports = config;
