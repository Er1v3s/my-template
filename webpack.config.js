const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        main: './src/main.js',
    },
    output: {
        filename: 'js/main.js',
        path: path.join(__dirname, './dist'),
    },

    devServer: {
        open: true,
        static: path.join(__dirname, './src'),
        port: 5000,
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[contenthash:6].[ext]',
                        static: path.join(__dirname, './src/assets/'),
                    },
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            quality: 70,
                            progressive: true,
                        },
                    },
                },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env", {
                                    "useBuiltIns": "usage",
                                    "corejs": 3
                                },
                            ],
                        ],
                    },
                }],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Nowa aplikacja",
            filename: 'index.html',
            template: "./src/index.html"
        }),
    ],
}