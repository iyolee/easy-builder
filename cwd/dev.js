module.exports = function({ injectCommand }) {
  injectCommand(function({ program, cleanArgs, config }) {
    program
      .command('dev [app-page]')
      .description('构建开发环境')
      .option('-d, --dll', '合并差分包')
      .action(async (name, cmd) => {
        process.env.NODE_ENV = 'development'
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, config)
        require('../build/dev')(args)
      })
  })
}
