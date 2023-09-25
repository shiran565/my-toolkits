const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const lookupDir = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  mode: "development",
  entry: [lookupDir("index.js")],
  output: {
    path: lookupDir("__build__"),
    filename: "mail.js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/__build__/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] },
      },
      { test: /\.css$/, use: ["vue-style-loader", "css-loader"] },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "shared",
          filename: "shared.js",
          chunks: "initial",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: lookupDir("./index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};
