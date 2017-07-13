module.exports = {
  entry: __dirname + '/js/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'omni-nav.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }
};
