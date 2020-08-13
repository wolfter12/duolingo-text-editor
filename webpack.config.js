const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const optimization = () => {
  const config = {};
  if (isProd) {
    config.minimizer = [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ];
  }
  return config;
};

const plugins = () => {
  const base = [
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/css/font-awesome/font-awesome.min.css"),
          to: path.resolve(__dirname, "duotexteditor/css"),
        },
        {
          from: path.resolve(__dirname, "src/fonts"),
          to: path.resolve(__dirname, "duotexteditor/fonts"),
        },
      ],
    }),
  ];

  // if (isProd) {
  //   base.push(new BundleAnalyzerPlugin());
  // }

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
  optimization: optimization(),
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: plugins(),

};

module.exports = conf;
