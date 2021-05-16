const htmlWebPack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");



module.exports = {
    mode: 'production',
    output:{
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: 
                    {
                        sources: false,
                        minimize: false,
                    },
            },
            {
                test: /\.css$/,
                exclude: /styless.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styless.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(img|jpe?g?|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/img/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(), 
            new Terser(), 
        ]
    },
    plugins: [
        new htmlWebPack({
            title: 'Mi WebPack App', 
            template: './src/index.html',
            // filename: './index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: `[name].[fullhash].css`,
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/'}
            ]
        }),
        
    ]
}
