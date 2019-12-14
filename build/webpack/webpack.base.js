const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devConfig = require('../builder.config');

const SRC_PATH = devConfig.basePath.srcPath;
const ASSETS_BUILD_PATH = devConfig.basePath.buildPath;
const NODE_MODULES_PATH = devConfig.basePath.nodeModulesPath;
// 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
// const ASSETS_PUBLIC_PATH = '/assets/'

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // 设置源代码的默认根路径
  context: SRC_PATH,
  // 相对于 SRC_PATH 的路径
  entry: {
    bundle: devConfig.basePath.entryPath,
  },
  output: {
    path: ASSETS_BUILD_PATH,
    filename: 'js/[name]-[hash].js',
    // 为动态加载的chunk配置输出文件的名称
    chunkFilename: 'js/[name]-[hash].js',
    // 所有资源的url前缀
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: [
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: ['react', 'es2015', 'stage-0']
            }
          }
        ],
        include: SRC_PATH,
        exclude: NODE_MODULES_PATH
      },
      {
        test: /\.ts[x]?$/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: ['react', 'es2015', 'stage-0']
            }
          },
          {
            loader: 'ts-loader'
          }
        ],
        include: SRC_PATH,
        exclude: NODE_MODULES_PATH
      },
      {
        test: /\.less$/,
        include: NODE_MODULES_PATH,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: NODE_MODULES_PATH,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              camelCase: true
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: NODE_MODULES_PATH,
        use: [
          { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.css$/,
        exclude: NODE_MODULES_PATH,
        use: [
          { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              camelCase: true
            }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    alias: {
      src: SRC_PATH,
      root: __dirname
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 是否强制导入语句写明文件后缀
    enforceExtension: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../src/index.html'
      // favicon: '../src/assets/favicon.png'
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};
