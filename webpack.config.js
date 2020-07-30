const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const plugins = () => {
  const base = [
    new MiniCssExtractPlugin(),
    // new CopyWebpackPlugin(
    //   [
    //     {
    //       from: path.resolve(__dirname, "src/css/font-awesome/font-awesome.min.css"),
    //       to: path.resolve(__dirname, "dist/css"),
    //     },
    //     {
    //       from: path.resolve(__dirname, "src/assets/fonts"),
    //       to: path.resolve(__dirname, "dist/fonts"),
    //     },
    //   ],
    // ),
  ];

  // if (isProd) {
  //   base.push(new BundleAnalyzerPlugin());
  // }

  return base;
};

const conf = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "./duotexteditor/dist"),
    filename: "main.js",
    publicPath: "dist/",
  },
  module: {
    rules: [
      // {
      //     test: /\.css$/,
      //     use: [
      //         'style-loader',
      //         'css-loader'
      //     ]
      // },
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
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader",
        ],
      },
    ],
  },
  plugins: plugins(),

};

module.exports = conf;
