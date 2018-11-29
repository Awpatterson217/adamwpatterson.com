'use strict';

const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: './index.html',
    inject: 'body'
});

module.exports = {
    entry: './public/app/index.js',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]_[local]_[hash:base64]',
                        sourceMap: true,
                        minimize: true
                    }
                }
            ]
        },
      ]
    },
    plugins: [
        htmlPlugin,
        new webpack.ProvidePlugin({
            React: 'react' // ReactJS module name in node_modules folder
          })
    ]
  };