const htmlWebPack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");



module.exports = {
    mode: 'development',
    output:{
        clean: true
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
                test: /\.(img|jpeg?|png|gif)$/,
                loader: 'file-loader'
            }
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
        })
    ]
}
