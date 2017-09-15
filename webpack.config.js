const path = require('path');
module.exports = {
    entry: './src/react/index.jsx',
    output: {
        path: path.resolve('./src/express/public/static/js/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}