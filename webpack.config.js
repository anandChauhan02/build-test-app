const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const SizePlugin = require('size-plugin');
const path = require('path');
const checkFileSizes = require('./scripts/checkSizes');

module.exports = {
    // ... other webpack configurations ...

    plugins: [
        // ... other plugins ...
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-analyzer-report.html',
            openAnalyzer: false,
            generateStatsFile: true,
            statsFilename: 'bundle-analyzer-stats.json',
        }),
        new MiniCssExtractPlugin(),
        new SizePlugin({ writeFile: false }), // Disable writing sizes to a file (we will handle this manually)
    ],

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },

    module: {
        rules: [
            // ... other rules ...
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },

    output: {
        path: path.resolve(__dirname, 'build/static'),
        filename: 'js/main.js',
        chunkFilename: 'js/[name].[contenthash].chunk.js',
        publicPath: '/',
    },

    // This hook runs after the webpack build process is completed
    // You can use it to check file sizes
    hooks: {
        afterEmit: () => {
            checkFileSizes(path.resolve(__dirname, 'build/static'));
        },
    },
};
