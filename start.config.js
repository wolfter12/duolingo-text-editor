/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
  mode: "development",
  entry: path.resolve(__dirname, "src/js/index.js"),
  output: {
    path: path.resolve(__dirname, "./duotexteditor/dist"),
    filename: "main.js",
    publicPath: "dist/",
  },
  devServer: {
    contentBase: path.join(__dirname, "example"),
    port: 4444,
  },
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
