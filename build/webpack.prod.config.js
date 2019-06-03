const path = require('path')
const webpackMerge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const baseConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
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
                })
            }
        ]
    },

    plugins: [
        new BundleAnalyzerPlugin(),
        new ExtractTextWebpackPlugin({
            filename: '[name].min.[hash:5].css',
            allChunks: true
        }),
        new OptimizeCss(),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, '../favicon.ico'),
                to: path.resolve(__dirname, '../dist')
            }
        ]),
        new CleanWebpackPlugin()
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minChunks: 2,
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    }
})
