import { Answers, ChoiceType, Question } from 'inquirer'
import inquirer from 'inquirer'
import mainMenu from 'lib/main'
import { execAsync, log } from 'lib/util'
import chalk from 'chalk'
import { printMessage } from 'lib/common'
import { assignIn } from 'lodash'
import shell from 'shelljs'

const npmpreMenu: Question<Answers> = {
  type: 'list',
  name: 'npmpre',
  message: 'Prepare node_modules folder for?',
  choices: [
    { name: 'Windows', value: 'win' },
    { name: 'Unix', value: 'unix' },
    new inquirer.Separator(),
    { name: 'Go Back', value: 'back' },
  ] as ReadonlyArray<ChoiceType>,
}

export function run() {
  inquirer.prompt(npmpreMenu).then(async answers => {
    switch (answers['npmpre']) {
      case 'win':
        await prepare('win')
        break
      case 'unix':
        await prepare('unix')
        break
      case 'back':
        return mainMenu()
      default:
        log(chalk.red('error selecting prepare command'))
    }
    run()
  })
}

async function prepare(os: string): Promise<void> {
  const inputResult = await inquirer.prompt({ type: 'input', message: 'User name:', name: 'user' })
  const user = inputResult['user']
  const promises: any[] = []
  for (const project of global.config.projects) {
    const cmd = ` ${os === 'unix' ? 'sudo' : ''} chown -R ${user}${os === 'unix' ? ':' + user : ''} ${
      global.config.rootDir
    }/${project}/node_modules`
    shell.mkdir('-p', `${global.config.rootDir}/${project}/node_modules`)
    const promise = execAsync(cmd).then(result => {
      log(chalk.green(`DONE - ${project}`))
      return { [project]: result }
    })
    promises.push(promise)
  }
  const result = await Promise.all(promises)
  printMessage(assignIn({}, ...result))
}
