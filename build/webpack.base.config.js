const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    entry: {
        app: (isDev => isDev ? [
            'react-hot-loader/patch',
            path.resolve(__dirname, '../src/main')
        ] : path.resolve(__dirname, '../src/main'))(isDev)
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        chunkFilename: isDev ? '[name].chunk.js' : '[name].chunk.[contenthash:8].js',
        filename: isDev ? '[name].bundle.js' : '[name].min.[contenthash:8].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'react-dom': '@hot-loader/react-dom',
            views: path.resolve(__dirname, '../src/views'),
            libs: path.resolve(__dirname, '../src/libs'),
            common: path.resolve(__dirname, '../src/common'),
            components: path.resolve(__dirname, '../src/components'),
            less: path.resolve(__dirname, '../src/common/less'),
            router: path.resolve(__dirname, '../src/router')
        }
    },
    module: {
        rules: [
            {
                test: /.js[x]?$/,
                enforce: 'pre',
                loader: 'eslint-loader?fix=true',
                exclude: /node_modules|libs/
            },
            {
                test: /.js[x]?$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, '../src')],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:5].[ext]'
                    }
                }, 'url-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash:5].[ext]',
                        limit: 1000
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENVIRONMENT: isDev ? JSON.stringify('development') : JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: 'index.html',
            chunks: isDev ? 'app' : [ 'runtime', 'vendors', 'app' ]
        }),
    ]
}
