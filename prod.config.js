/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const optimization = () => {
  const config = {};
  config.minimizer = [
    new TerserJSPlugin({}),
    new OptimizeCSSAssetsPlugin({}),
  ];
  return config;
};

const plugins = () => {
  const base = [
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, "src/css/font-awesome/font-awesome.min.css"),
          to: path.resolve(__dirname, "duotexteditor/css"),
        },
        {
          from: path.resolve(__dirname, "src/fonts"),
          to: path.resolve(__dirname, "duotexteditor/fonts"),
        },
      ],
    ),
  ];
  return base;
};

const conf = {
  context: path.resolve(__dirname, "src"),
  mode: "production",
  entry: path.resolve(__dirname, "src/js/index.js"),
  output: {
    path: path.resolve(__dirname, "./duotexteditor/dist"),
    filename: "main.js",
    publicPath: "dist/",
  },
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader, "css-loader",
      //   ],
      // },
    ],
  },
  plugins: plugins(),

};

module.exports = conf;
