const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config')();
const nodeExternals = require('webpack-node-externals');

config.entry = path.resolve(process.cwd(), 'src', 'server', 'index.js');
config.name = 'server';
config.target = 'node';
config.externals = [nodeExternals()];
config.module.loaders = config.module.loaders.concat([{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel',
}, Object.assign({}, config.__imgLoader, { loader: 'url' + config.__imgLoader.loader }),
]);

config.output.filename = 'server.js';
config.output.path = path.resolve(process.cwd(), 'dist', 'server');
config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new webpack.NormalModuleReplacementPlugin(/\.scss$/, 'node-noop'),
]);

module.exports = config;
