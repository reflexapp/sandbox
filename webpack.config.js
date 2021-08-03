module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/
        },
        {
            test: /\.(sa|sc|c)ss$/,
            exclude: /(node_modules|bower_components)/,
            use : [
                "css-loader"
            ]
        } 
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        filename: './lib.js',
        libraryTarget: 'umd',
        library: 'sand',
    }
}
