const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: "./src/main/jsx/MainPage.jsx",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(scss|css)$/,
            use: ["style-loader", "css-loader"],
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        inline: true,
        hot: true,
        port: 3030
    },

    plugins: [new HtmlWebpackPlugin(
        {
            template: 'public/index.html'
        }
    )]
}