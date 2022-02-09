const path = require('path');

module.exports = {
  mode: 'development',
  // entry: './src/index.js',
  devtool: 'inline-source-map',
    entry: {
        index: './src/index.js',
        inbox: './src/inbox.js',
    },
  output: {
      // filename: 'main.js',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      // clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};