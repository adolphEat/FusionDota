const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, 'src'),
    
    entry: {
        // 'loading-screen': './loading-screen/index.tsx',  // 源文件不存在，已注释
        'end-screen': './end_screen/index.tsx',
        'preparation-screen': './preparation-screen/index.tsx',
        'playing-hud': './playing-hud/index.tsx',
        'result-screen': './result-screen/index.tsx',
        'battleendview': './battleendview/index.tsx',
        'stageselect': './stageselect/index.tsx',
    },
    
    output: {
        // 输出到 Dota 2 的 content 目录，这样才能被正确加载
        //path: path.resolve(__dirname, '../../../../../../SteamApp/steamapps/common/dota 2 beta/content/dota_addons/fusion/panorama/scripts/custom_game'),
        path: path.resolve('D:/SteamApp/steamapps/common/dota 2 beta/content/dota_addons/fusion/panorama/scripts/custom_game'),
        filename: '[name].js',
        clean: false,
    },
    
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        modules: [
            path.resolve(__dirname, '../../node_modules'),
            'node_modules'
        ],
    },
    
    resolveLoader: {
        modules: [
            path.resolve(__dirname, '../../node_modules'),
            'node_modules'
        ],
    },
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react'
        })
    ],
    
    stats: {
        all: false,
        modules: true,
        errors: true,
        warnings: true,
        moduleTrace: true,
        errorDetails: true,
    },
    
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': '$'
    }
};
