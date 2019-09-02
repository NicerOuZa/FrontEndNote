let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = {
    devServer: {
        port: 3000,
        progress: true,
        contentBase: "./dist"
    },

    mode: "development",
    entry: "./src/main.ts",
    output: {
        filename: "bundle.[hash:8].js",
        path: path.resolve("./dist")
    },


    // 用数组放着所有webpack的插件
    plugins: [
        new HtmlWebpackPlugin({
            // 指定html的模板
            template: "./index.html",
            // 指定打包后的名字
            filename: "index.html",
            // 指定打包后的最小化的状态
            minify: {
                // 删除html中的双引号
                removeAttributeQuotes: true
            },
            // 生成 hash戳
            hash: true
        }),
    ],

    // 模块
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    "css-loader",
                    // 解析css之前来添加浏览器前缀
                    "postcss-loader"
                ]
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }


        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
