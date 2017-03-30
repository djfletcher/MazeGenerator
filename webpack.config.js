const path = require('path');

module.exports = {
  entry: './js/maze_generator_new.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: './bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
