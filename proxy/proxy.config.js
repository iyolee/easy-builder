const devServer = 'http://172.20.6.126';
const testServer = 'http://172.20.6.1127';
module.exports = {
  '/api/v1/book': {
    // secure: false,
    changeOrigin: true,
    target: `${testServer}`
    // pathRewrite: {'^/api': ''}
  }
};
