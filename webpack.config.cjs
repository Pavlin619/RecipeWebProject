const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./main.js",
  mode: "development",
  devtool: "source-map",
  context: path.resolve(__dirname, "src"),
  output: {
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    open: true,
    host: 'localhost',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
    }
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "./index.html",
      }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ]
};
