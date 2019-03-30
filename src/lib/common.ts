import chalk from 'chalk'
import { log } from 'lib/util'

export function printMessage(messages: any): void {
  for (const [key, val] of Object.entries(messages)) {
    log(chalk.cyan(key))
    for (const msg of (val as any).stdout.split('\n')) {
      log(msg)
    }
    for (const msg of (val as any).stderr.split('\n')) {
      log(chalk.red(msg))
    }
  }
}
