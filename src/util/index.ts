import chalk from 'chalk'
import shell from 'shelljs'

const util = {
  execAsync: (command: string): Promise<{ stdout: string; stderr: string; error: boolean }> => {
    return new Promise<{ stdout: string; stderr: string; error: boolean }>(resolve => {
      {
        shell.exec(command, { silent: true }, (code, stdout, stderr) => {
          const execResult = { stdout, stderr, error: false }
          if (code !== 0) execResult.error = true
          return resolve(execResult)
        })
      }
    })
  },

  log: (msg: string | object): void => {
    /* tslint:disable */
    if (typeof msg === 'object') {
      console.log(JSON.stringify(msg, null, 4))
    } else {
      console.log(msg)
    }
    /* tslint:enable */
  },
  printConfig: (): void => {
    util.log(`RootDir: ${chalk.cyan(global.config.rootDir)}`)
    util.log(`Git:`)
    if (global.config.git.username) {
      util.log(`     username : ${chalk.cyan(global.config.git.username)}`)
    }
    util.log(`     team     : ${chalk.cyan(global.config.git.team)}`)
    util.log(`     host     : ${chalk.cyan(global.config.git.host)}`)
    util.log(`     prefix   : ${chalk.cyan(global.config.git.projectPrefix)}`)
    util.log('')

    util.log(`Project List:`)
    util.log(`[ ${chalk.cyan(global.config.projects.join(chalk.white(' | ')))} ]`)
    util.log('')

    if (global.config.pullRequestSkip && global.config.pullRequestSkip.length > 0) {
      util.log(`PullRequest skip:`)
      util.log(`[ ${chalk.cyan(global.config.pullRequestSkip.join(chalk.white(' | ')))} ]`)
      util.log('')
    }

    if (global.config.pullRequestSkip && global.config.dockerBaseImages.length > 0) {
      util.log(`Docker base images:`)
      util.log(`[ ${chalk.cyan(global.config.dockerBaseImages.join(chalk.white(' | ')))} ]`)
      util.log('')
    }
  },
}
export { util }
