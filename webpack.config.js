const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // other webpack configurations...

    plugins: [
        // other plugins...
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-analyzer-report.html',
            openAnalyzer: false,
            generateStatsFile: true,
            statsFilename: 'bundle-analyzer-stats.json',
        }),
    ],

    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
        maxAssetSize: 300 * 1024, // 300 KB
        maxEntrypointSize: 300 * 1024, // 300 KB
    },
};


const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    // other webpack configurations...

    plugins: [
        // other plugins...
        new MiniCssExtractPlugin(),
    ],

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new SizePlugin({ writeFile: false }), // Disable writing sizes to a file (we will handle this manually)
        ],
    },

    module: {
        rules: [
            // other rules...
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
};

const path = require('path');

module.exports = {
    // other configurations...

    output: {
        path: path.resolve(__dirname, 'build/static'),
        filename: 'js/main.js',
        chunkFilename: 'js/[name].[contenthash].chunk.js', // Use hashes for dynamic imports
        publicPath: '/',
    },
};

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // other configurations...

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
            chunkFilename: 'css/[name].[contenthash].css', // Use hashes for dynamically imported styles
        }),
    ],

    module: {
        rules: [
            // other rules...
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
};
