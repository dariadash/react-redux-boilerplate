const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
require('dotenv').config()

module.exports = {
    entry: path.join(__dirname, './src/index.tsx'),
    output: {
        path: path.join(__dirname, process.env.OUTPUT_DIR),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[id].[hash].js',
        publicPath: process.env.PUBLIC_PATH,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img/',
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 100000,
                            name: "./assets/fonts/[name].[ext]"
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            'BACKEND_DOMAIN',
        ]),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CompressionPlugin({
            test: /\.(html|css|js|gif|svg|ico|woff|ttf|eot)$/,
            exclude: /(node_modules)/
        }),
    ],
};