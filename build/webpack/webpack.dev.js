const path = require('path');

const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config = require('./webpack.base');
const devConfig = require('../builder.config');
const proxyConfig = require('../../proxy/proxy.config');

const DEFAULT_PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';
const DEFAULT_PORT = parseInt(devConfig.development.devServerPort, 10) || 8888;
const DEFAULT_HOST = '0.0.0.0';

config.mode = 'development';

// 浏览器开发者工具里显示的源码模块名称
config.output.devtoolModuleFilenameTemplate = 'webpack:///[resource-path]';

// 配置source-map类型
config.devtool = 'inline-source-map';

// 控制台输出日志控制
config.stats = {
  assets: true,
  colors: true,
  errors: true,
  errorDetails: true,
  hash: true
};

config.devServer = {
  // 启用gzip压缩
  compress: true,
  // 配置devServer服务器文件根目录
  contentBase: path.join(__dirname, '../src'),
  // ip地址
  host: DEFAULT_HOST,
  // 运行端口3000
  port: DEFAULT_PORT,
  // 通过代理客户端控制网页刷新
  inline: true,
  //开启模块热替换功能
  hot: true,
  // 开发HTML5 History API网页
  historyApiFallback: true,
  // 启用https
  https: DEFAULT_PROTOCOL === 'https',
  // 禁止显示devServer的console信息
  quiet: true,
  // 编译出现错误时，将错误直接显示在页面上
  overlay: true,
  // 监听模式选项
  watchOptions: {
    // 不监听的文件或文件夹
    ignored: '/node_modules/',
    // 监听到变化后等300ms再执行
    // aggregateTimeout: 300,
    // 每秒询问1000次指定的文件有没有变化
    poll: 1000
  },
  proxy: proxyConfig
};

config.plugins.push(
  new webpack.HotModuleReplacementPlugin({
    // 首先编译热加载 chunks，之后再编译剩余的通常的资源
    multiStep: true
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    // vendor 通常不需要 sourcemap
    exclude: ['vendor.js']
  }),
  new OptimizeCssAssetsPlugin(),
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [
        'App running at:',
        `- Local: ${
          DEFAULT_PROTOCOL === 'https' ? 'https' : 'http'
        }://${'localhost'}:${DEFAULT_PORT}`,
        `- Network: ${
          DEFAULT_PROTOCOL === 'https' ? 'https' : 'http'
        }://${IPAdress}:${DEFAULT_PORT}`
      ]
    },
    clearConsole: true
  })
);

if (devConfig.development.isOpenPerformanceWarning) {
  config.performance = {
    hints: 'warning'
  };
}

if (devConfig.development.isOpenBundleAnalyzerPlugin) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

if (devConfig.development.isOpenBuildNotifierPlugin) {
  config.plugins.push(new WebpackBuildNotifierPlugin());
}

if (devConfig.development.isOpenBuildProgressBarPlugin) {
  config.plugins.push(new ProgressBarPlugin());
}

module.exports = config;
