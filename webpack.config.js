const path = require("path");

module.exports = {
    entry: {
        login: "./js/login.js",
        merch: "./js/merch.js",
        orders: "./js/orders.js",
        register: "./js/register.js",
        shop: "./js/shop.js",
        shoppingCart: "./js/shoppingCart.js",
        userData: "./js/userData.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    }
};