const path = require('path');

module.exports = {
    mode: 'production',
    devtool: false,
    context: path.resolve(__dirname, 'src'),
    
    entry: {
        hud: './hud/index.tsx',
        'end-screen': './end_screen/index.tsx',
        'loading-screen': './loading-screen/index.tsx',
        'training-panel': './training-panel/index.tsx',
        'autochess-panel': './autochess-panel/index.tsx',
    },
    
    output: {
        path: path.resolve(__dirname, '../../game/scripts/vscripts/panorama'),
        filename: '[name].js',
        clean: true,
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
    
    optimization: {
        minimize: true,
    },
    
    plugins: [],
    
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
        'react-dom': 'ReactDOM'
    }
};
