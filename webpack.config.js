const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const production = argv.mode === 'production';

    return {
        entry: './src/main.tsx',
        output: {
            filename: production ? '[name].[chunkhash].js' : '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },

        // Enable source maps for debugging webpack output
        devtool: 'source-map',

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                },
                {
                    test: /\.js$/,
                    loader: 'source-map-loader', enforce: 'pre',
                },
                {
                    test: /\.html$/,
                    use: [{ loader: 'html-loader', options: { minimize: true } }],
                },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
            ],
        },

        plugins: [
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html',
            }),
            new MiniCssExtractPlugin({
                filename: production ? 'style.[contenthash].css' : 'style.css',
            }),
            new WebpackMd5Hash(),
        ],

        // Assume global variables exist rather than packaging deps up with bundle,
        // eg. `import * from 'react'` will import from `React` global variable
        //externals: {
            //'react': 'React',
            //'react-dom': 'ReactDOM',
        //},
    };
};
