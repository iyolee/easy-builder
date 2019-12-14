const path = require('path');

module.exports = {
  dirName: 'easy-builder',
  projectName: 'easy-builder',
  basePath: {
    // 源代码的根目录（本地物理文件路径）
    srcPath: path.resolve(__dirname, '../src'),
    // 打包后的资源根目录（本地物理文件路径）
    buildPath: path.resolve(__dirname, '../../dist'),
    // 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
    nodeModulesPath: path.resolve(__dirname, '../node_modules'),
    // 入口文件，相对于 SRC_PATH 的路径
    entryPath: './app.js',
  },
  development: {
    // 本地服务端口
    devServerPort: 8000,
    // 是否开启模块分析
    isOpenBundleAnalyzerPlugin: false,
    // 是否开启打包结果消息通知
    isOpenBuildNotifierPlugin: false,
    // 是否打开打包进度条
    isOpenBuildProgressBarPlugin: false,
    // 有性能问题时是否输出警告
    isOpenPerformanceWarning: false
  },
  production: {}
};
