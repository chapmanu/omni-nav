module.exports = {
  entry: __dirname + '/js/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'omninav.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }
};
