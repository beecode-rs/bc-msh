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
    const gitUserName = global.config.git.username ? `     username : ${chalk.cyan(global.config.git.username)}` : ``
    const pullRequestSkip =
      global.config.pullRequestSkip && global.config.pullRequestSkip.length > 0
        ? `PullRequest skip:\n[ ${chalk.cyan(global.config.pullRequestSkip.join(chalk.white(' | ')))} ]\n`
        : ``
    const dockerBaseImages =
      global.config.dockerBaseImages && global.config.dockerBaseImages.length > 0
        ? `Docker base images:\n[ ${chalk.cyan(global.config.dockerBaseImages.join(chalk.white(' | ')))} ]\n`
        : ``

    util.log(`
RootDir: ${chalk.cyan(global.config.rootDir)}
Git:
${gitUserName}
     team     : ${chalk.cyan(global.config.git.team)}
     host     : ${chalk.cyan(global.config.git.host)}
     prefix   : ${chalk.cyan(global.config.git.projectPrefix)}

Project List:
[ ${chalk.cyan(global.config.projects.join(chalk.white(' | ')))} ]

${pullRequestSkip}
${dockerBaseImages}
`)
  },
}
export { util }
