var path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('./assets/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname,'src'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react','stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
}