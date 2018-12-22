import inquirer, { Answers, ChoiceType, Question } from 'inquirer'
import { assignIn } from 'lodash'
import { printMessage } from 'lib/common'
import chalk from 'chalk'
import { execAsync, log } from 'lib/util'
import mainMenu from 'lib/main'
import shell from 'shelljs'

const cleanMenu: Question<Answers> = {
  type: 'list',
  name: 'npmi',
  message: 'NPM install action?',
  choices: [
    { name: 'Locally', value: 'local' },
    { name: 'In Docker', value: 'docker' },
    new inquirer.Separator(),
    { name: 'Go Back', value: 'back' },
  ] as ReadonlyArray<ChoiceType>,
}

export function run() {
  inquirer.prompt(cleanMenu).then(async answers => {
    switch (answers['npmi']) {
      case 'local':
        await localInstall()
        break
      case 'docker':
        await dockerInstall()
        break
      case 'back':
        return mainMenu()
      default:
        log(chalk.red('error selecting clean command'))
    }
    run()
  })
}

async function localInstall(): Promise<void> {
  const promises: any[] = []
  for (const project of global.config.projects) {
    const cmd = `cd ${global.config.rootDir}/${project} && npm i`
    const promise = execAsync(cmd).then(result => {
      log(chalk.green(`DONE - ${project}`))
      return { [project]: result }
    })
    promises.push(promise)
  }
  const result = await Promise.all(promises)
  printMessage(assignIn({}, ...result))
}

async function dockerInstall(): Promise<void> {
  shell.cd(global.config.rootDir)
  const promises: any[] = []
  for (const project of global.config.projects) {
    const cmd = `docker-compose -f docker-compose.tty.yml run --rm --no-deps ${project} sh -c "npm i"`
    const promise = execAsync(cmd).then(result => {
      log(chalk.green(`DONE - ${project}`))
      return { [project]: result }
    })
    promises.push(promise)
  }
  const result = await Promise.all(promises)
  printMessage(assignIn({}, ...result))
}
