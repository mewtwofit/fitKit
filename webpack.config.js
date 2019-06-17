// const path = require('path');
// const rules = [
//   {
//     test: /\.jsx?/,
//     exclude: /node_modules/, //aside from node_module, use babel-loader to load
//     loader: 'babel-loader'
//   },
//   {
//     test: /\.css$/,
//     use: ['style-loader', 'css-loader']
//   }
// ];

// module.exports = {
//   target: 'web', //where to export code to
//   mode: 'development',
//   entry: __dirname + '/client/index.js',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js'
//   },
//   module: { rules },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   devServer: {
//     contentBase: './',
//     port: 5000
//   }
// };

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./client/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./dist",
    hot: true,
    // historyApiFallback: true,
  }
};