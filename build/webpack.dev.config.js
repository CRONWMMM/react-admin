const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 8888,
        hot: true,
        overlay: {
            errors: true
        },
        open: true,
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
                    'less-loader?javascriptEnabled=true',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, '../src/common/less/variables.less'),
                                path.resolve(__dirname, '../src/common/less/mixins.less')
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})
