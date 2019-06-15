const path = require('path');
const rules = [
  {
    test: /\.jsx?/,
    exclude: /node_modules/, //aside from node_module, use babel-loader to load
    loader: 'babel-loader'
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  }
];

module.exports = {
  target: 'web', //where to export code to
  mode: 'development',
  entry: __dirname + '/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: { rules },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: './',
    port: 5000
  }
};