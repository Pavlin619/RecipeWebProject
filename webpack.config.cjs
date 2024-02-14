const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  context: path.resolve(__dirname, "src"),

  entry: ["./main.js", "./main.css"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          "to-string-loader",
          "css-loader",
          "sass-loader",
          "style-loader",
        ],

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          { loader: "to-string-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new MinifyPlugin(
      {},
      {
        comments: false,
      }
    ),
    new MiniCssExtractPlugin({
      filename: "main.css",
      disable: process.env.NODE_ENV === "development",
    }),
    new HtmlWebpackPlugin({
      template: "./views/index.html",
      filename: "./views/index.html",
    }),
  ],
};
