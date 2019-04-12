import chalk from 'chalk'
import { util } from 'src/util'

const common = {
  printMessage: (messages: any): void => {
    for (const [key, val] of Object.entries(messages)) {
      util.log(chalk.cyan(key))
      for (const msg of (val as any).stdout.split('\n')) {
        util.log(msg)
      }
      for (const msg of (val as any).stderr.split('\n')) {
        util.log(chalk.red(msg))
      }
    }
  },
}

export { common }
