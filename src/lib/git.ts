import inquirer, { Answers, ChoiceType, Question } from 'inquirer'
import shell from 'shelljs'
import { assignIn } from 'lodash'
import { printMessage } from 'lib/common'
import { execAsync, log } from 'lib/util'
import mainMenu from 'lib/main'
import chalk from 'chalk'

const gitMenu: Question<Answers> = {
  type: 'list',
  name: 'git',
  message: 'Git action?',
  choices: [
    { name: 'Status', value: 'status' },
    { name: 'Fetch', value: 'fetch' },
    { name: 'Pull', value: 'pull' },
    { name: 'Clone', value: 'clone' },
    new inquirer.Separator(),
    { name: 'Go Back', value: 'back' },
  ] as ReadonlyArray<ChoiceType>,
}

export function run() {
  inquirer.prompt(gitMenu).then(async answers => {
    switch (answers['git']) {
      case 'clone':
        await clone()
        break
      case 'back':
        return mainMenu()
      default:
        await gitCommand(answers['git'])
    }
    run()
  })
}

async function gitCommand(command): Promise<void> {
  const promises: any[] = []
  for (const project of global.config.projects) {
    const cmd = `git -C ${global.config.rootDir}/${project} ${command}`
    const promise = execAsync(cmd).then(result => {
      log(chalk.green(`DONE - ${project}`))
      return { [project]: result }
    })
    promises.push(promise)
  }
  const result = await Promise.all(promises)
  printMessage(assignIn({}, ...result))
}

async function clone(): Promise<void> {
  shell.cd(global.config.rootDir)
  const promises: any[] = []
  for (const project of global.config.projects) {
    const cmd = `git clone git@${global.config.git.host}:${global.config.git.team}/${
      global.config.git.projectPrefix
    }-${project}.git ${project}`
    const promise = execAsync(cmd).then(result => {
      log(chalk.green(`DONE - ${project}`))
      return { [project]: result }
    })
    promises.push(promise)
  }
  const result = await Promise.all(promises)
  printMessage(assignIn({}, ...result))
}
