const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  devtool: "eval-source-map",
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: [".jsx", ".js", ".css", ".sass", ".scss"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      layout: path.resolve(__dirname, "src/templates"),
      pages: path.resolve(__dirname, "src/templates"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          sourceMap: true,
        },
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
    ],
  },
};