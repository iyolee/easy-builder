const fs = require('fs');
const join = require('path').join;
const interfaces = require('os').networkInterfaces();

/**
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  const result = [];
  function finder(path) {
    const files = fs.readdirSync(path);
    files.forEach((val, index) => {
      const fPath = join(path, val);
      const stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(fPath);
    });
  }
  finder(join(__dirname, startPath));
  return result;
}

/**
 * @description: 在开发环境中获取局域网中的本机iP地址
 * @returns {String}
 */
function getIPAdress() {
  let IPAdress = '';
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        IPAdress = alias.address;
      }
    }
  }
  return IPAdress;
}

exports.findSync = findSync;
exports.getIPAdress = getIPAdress;
