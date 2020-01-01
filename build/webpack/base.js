const path = require("path");
const { findSync } = require("../utils");
const files = findSync("config");
// webpack-chain 通过提供可链式或顺流式的 API 创建和修改 webpack 配置
const Config = require("webpack-chain");
const config = new Config();

const resolve = (p) => {
  return path.join(process.cwd(), p)
}

const webpackVersion = require(resolve('node_modules/webpack/package.json')).version

module.exports = (options) => {
  const map = new Map()
  files.map(_ => {
    const name = path.basename(_, '.js')
    return map.set(name, require(_)({ config, webpackVersion, resolve, options, api: PluginAPI }))
  })

  map.forEach(v => v())

  return config
}