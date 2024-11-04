const path = require('path');

module.exports = {
  entry: '/Users/sohamsupekar/Downloads/skillswap/script.js', // Update with your entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  mode: 'development' // or 'production'
};
