const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    //开发时服务器的配置
    devServer: {
        // 设置端口号
        port: 3000,
        // 设置是否显示进度条
        progress: true,
        // 设置进入那个文件夹
        contentBase: './dist'
    },
});