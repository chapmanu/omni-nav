var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'omni-nav.bundle.js': __dirname + '/js/app.js',
    'omni-nav.bundle.min.js': __dirname + '/js/app.js',
    'omni-nav.bundle.css': __dirname + '/scss/app.scss'
  },
  output: {
    path: __dirname + '/build',
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: "[name]",
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
};
