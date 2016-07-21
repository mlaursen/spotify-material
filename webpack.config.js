const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const MD_SCSS = path.resolve(process.cwd(), 'node_modules', 'react-md', 'src', 'scss');
const SHARED = path.join(process.cwd(), 'src', 'shared');
module.exports = () => ({
  __htmlWebpackOptions: {
    alwaysWriteToDisk: true,
    filename: 'server/views/index.ejs',
    inject: false,
    template: path.resolve(process.cwd(), 'src', 'server', 'template.js'),
    // favicon: path.resolve(process.cwd(), 'src', 'shared', 'imgs', 'favicon.ico'),

    title: 'Spotify Material',
    appMountId: 'app',
    isomorphic: 'html',
    isomorphicState: 'initialState',
    description: 'A sample web application using react-md and the spotify api',
    keywords: 'example,spotify,react,material,react-md',
  },

  __imgLoader: {
    test: /\.(png|jpe?g|svg)$/,
    exclude: /node_modules/,
    loader: '?name=imgs/[hash].[ext]!image-webpack',
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint',
      exclude: /node_modules|react-md|template/,
    }],

    loaders: [{
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json',
    }],
  },

  output: {
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.md'],
    alias: {
      'md-helpers': path.resolve(MD_SCSS, 'helpers', '_all.scss'),
      'md-scss': path.resolve(MD_SCSS, 'react-md.scss'),
      'actions': path.join(SHARED, 'actions'),
      'components': path.join(SHARED, 'components'),
      'constants': path.join(SHARED, 'constants'),
      'containers': path.join(SHARED, 'containers'),
      'utils': path.join(SHARED, 'utils'),
    },
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackHarddiskPlugin(), // always write the HtmlWebpackPlugin to Disk,
  ],

  postcss() {
    return [autoprefixer({ browsers: ['last 2 version', 'ie >= 10'] })];
  },
});
