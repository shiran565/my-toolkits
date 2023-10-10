const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./index.js"),
  output: {
    path: path.join(__dirname, "__build__"),
    filename: "main.js",
    publicPath: "/__build__/",
  },
  devServer: {
    client: {
      logging: "info",
    },
    /**
     *  specify the directory where the static files will be served
     *  if not specified here, the html file will be served from the public directory which in the root path
     */
    static: [{ directory: path.join(__dirname, "./public") }],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
};
