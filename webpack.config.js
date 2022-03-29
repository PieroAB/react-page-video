const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import('webpack').Configuration} */

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(svg|png|jpg)/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[contenthash][ext][query]",
        },
      },

      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
      watch: true,
    },

    port: 3001,
    compress: true,
    open: true,
  },
};
