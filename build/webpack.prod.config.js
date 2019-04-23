const webpackMerge = require('webpack-merge')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseConfig, {
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.less|\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        // 'px2rem-loader?remUnit=192',
                        'less-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.[hash:5].css'
        }),
        new OptimizeCss()
    ]
})
