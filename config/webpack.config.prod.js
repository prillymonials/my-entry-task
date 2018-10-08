

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const paths = require('./paths');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = '/';
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
  { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  // In production, we only want to load the polyfills and the app code.
  entry: [paths.appIndex],
  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
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
        loader: 'babel-loader',
        options: { compact: true },
      },
      // Style loader
      {
        test: /\.(css|scss|sass)$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: 'style-loader',
                options: { hmr: false },
              },
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    module: false,
                    importLoaders: 2,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => autoprefixer(),
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                  },
                },
              ],
            },
            extractTextPluginOptions,
          ),
        ),
      },
    ],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(
      JSON.stringify({
        'process.env': {
          NODE_ENV: '"production"',
          PUBLIC_URL: `"${publicUrl}"`,
        },
      }),
    ),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
  ],
  // Minify the code
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            comparisons: false,
          },
          output: {
            comments: false,
            ascii_only: true,
          },
          sourceMap: true,
        },
      }),
    ],
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
