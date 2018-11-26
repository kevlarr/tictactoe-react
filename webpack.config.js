module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },

    // Enable source maps for debugging webpack output
    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        ],
    },

    // Assume global variables exist rather than packaging deps up with bundle,
    // eg. `import * from 'react'` will import from `React` global variable
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
};
