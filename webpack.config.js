const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const conf = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./duotexteditor/dist"),
        filename: "main.js",
        publicPath: "dist/"
    },
    devServer: {
        overlay: true
    },
    devtool: 'eval-sourcemap',
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
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin(
            // [
            // {
            //     from: path.resolve(__dirname, 'src/css/font-awesome/font-awesome.min.css'),
            //     to: path.resolve(__dirname, 'dist/css')
            // },
            // {
            //     from: path.resolve(__dirname, 'src/assets/fonts'),
            //     to: path.resolve(__dirname, 'dist/fonts')
            // }
            // ,
            // {
            //     from: path.resolve(__dirname, 'manifest.json'),
            //     to: path.resolve(__dirname, 'dist/duotexteditor')
            // },
            // {
            //     from: path.resolve(__dirname, 'background.js'),
            //     to: path.resolve(__dirname, 'dist/duotexteditor')
            // },
            // {
            //     from: path.resolve(__dirname, 'content.js'),
            //     to: path.resolve(__dirname, 'dist/duotexteditor')
            // },
            // {
            //     from: path.resolve(__dirname, 'background.js'),
            //     to: path.resolve(__dirname, 'dist/duotexteditor')
            // }
            // ]
        )
    ]

};

module.exports = conf;