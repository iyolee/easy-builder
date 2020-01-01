// [html-webpack-plugin 生成html]
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = ({ config, options }) => {
  let template = path.join(__dirname, '..', 'public/index.html')
  let publicPath = options.publicPath || '/'
  let filename = options.filename || 'index.html'

  if (options.name) {
    const name = options.name
    // const entry = options.pages[name].template
    filename = options.pages[name].filename
    publicPath = options.pages[name].publicPath
    template = options.pages[name].template
  }

  return () => {
    config.plugin('html')
      .use(HtmlWebpackPlugin, [{
        template,
        filename,
        publicPath
      }])
  }
}
