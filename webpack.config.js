const path = require('path');

module.exports = {
    mode: 'development',
    entry: './demo/demo.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'demo-dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: [
          path.resolve(__dirname),
          path.join(__dirname, '../..')
        ],
        publicPath: '/demo-dist/',
        host: '127.0.0.1',
        port: 3035
    }
};