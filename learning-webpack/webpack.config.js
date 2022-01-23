const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map', // inline-source-map
    devServer: {
        static: './dist',
    },
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello Webpack Development'
        })
    ]
};