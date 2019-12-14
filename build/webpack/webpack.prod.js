const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./webpack.base');

config.mode = 'production';

config.plugins.push(
  new CleanWebpackPlugin(),
  new UglifyJSPlugin({
    uglifyOptions: {
      ie8: false,
      output: {
        // 删除所有的注释
        comments: false,
        // 最紧凑的输出
        beautify: false
      },
      mangle: {
        // 防止丢弃或破坏 function names
        keep_fnames: true
      },
      compress: {
        // 删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有console语句
        drop_console: true,
        // 内嵌已定义但是只是用到一次的变量
        collapse_vars: true,
        // 提取出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name]-[hash].css',
    chunkFilename: 'css/[id]-[hash].css'
  }),
  new OptimizeCssAssetsPlugin()
);

module.exports = config;
