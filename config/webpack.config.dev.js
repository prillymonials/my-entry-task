const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const reporter = require('../utils/webpackReporter');

// The URL that app is served
const publicPath = '/';
const host = '0.0.0.0';
// Port for development application running
const port = 3000;

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  devtool: 'cheap-module-source-map',
  entry: [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    `webpack-dev-server/client?http://${host}:${port}`,
    // Application code
    paths.appIndex,
  ],
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'dist/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'dist/js/[name].chunk.js',
    // This is the URL that app is served from.
    publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    // Makes missing exports an error instead a warning.
    strictExportPresence: true,
    rules: [
      // Linter
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: [{ loader: 'eslint-loader' }],
        include: paths.appSrc,
        exclude: /node_modules/,
      },
      // Babel loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      // SVG loader
      {
        test: /\.svg$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'react-svg-loader',
            options: { jsx: true },
          },
        ],
      },
      // Style loader
      {
        test: /\.(css|scss|sass)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: false, importLoaders: 2 } },
          { loader: 'postcss-loader', options: { plugins: () => autoprefixer() } },
          { loader: 'sass-loader', options: { importLoaders: 1 } },
        ],
      },
    ],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      filename: './index.html',
    }),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
  // Webpack Dev Server
  devServer: {
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    contentBase: [paths.appPublic],
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: paths.publicPath,
    reporter,
    host,
    port,
    // Automatically open the browser
    open: false,
    overlay: true,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      disableDotRule: true,
    },
  },
};
