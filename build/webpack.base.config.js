const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    entry: {
        app: (isDev => isDev ? [
            'react-hot-loader/patch',
            path.resolve(__dirname, '../src/app')
        ] : path.resolve(__dirname, '../src/app'))(isDev)
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/public/',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, '../src')],
                exclude: /node_modules/
            },
            {
                test: /.jsx$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, '../src')]
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
            filename: 'index.html'
        }),
    ]
}
