const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 8888,
        hot: true,
        overlay: {
            errors: true
        },
        historyApiFallback: true,
        proxy: {}
    },
    module: {
        rules: [
            {
                test: /\.less|\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader?javascriptEnabled=true'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})
