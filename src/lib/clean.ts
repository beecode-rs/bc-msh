import chalk from 'chalk'
import inquirer, { Answers, ChoiceType, Question } from 'inquirer'
import { printMessage } from 'lib/common'
import mainMenu from 'lib/main'
import { execAsync, log } from 'lib/util'
import { assignIn } from 'lodash'

const cleanMenu: Question<Answers> = {
  type: 'list',
  name: 'clean',
  message: 'Clean action?',
  choices: [
    { name: 'NPM', value: 'npm' },
    { name: 'Docker Images', value: 'docker' },
    new inquirer.Separator(),
    { name: 'Go Back', value: 'back' },
  ] as ReadonlyArray<ChoiceType>,
}

export function run(): void {
  inquirer.prompt(cleanMenu).then(async answers => {
    switch (answers.clean) {
      case 'npm':
        await cleanNpm()
        break
      case 'docker':
        await cleanDockerImages()
        break
      case 'back':
        return mainMenu()
      default:
        log(chalk.red('error selecting clean command'))
    }
    run()
  })
}

async function cleanNpm(): Promise<void> {
  const promises: any[] = []
  for (const project of global.config.projects) {
    const cmd = `rm -rf ${global.config.rootDir}/${project}/node_modules/*`
    const promise = execAsync(cmd).then(execResult => {
      log(chalk.green(`DONE - ${project}`))
      return { [project]: execResult }
    })
    promises.push(promise)
  }
  const result = await Promise.all(promises)
  printMessage(assignIn({}, ...result))
}

async function cleanDockerImages(): Promise<void> {
  for (const image of [
    ...global.config.projects.map(proj => `${global.config.git.projectPrefix}_${proj}`),
    ...global.config.dockerBaseImages,
  ]) {
    const result = await execAsync(`docker rmi ${image}`)
    log(chalk.cyan(image))
    if (!result.error) log(result.stdout)
    else log(chalk.red(result.stderr))
  }
}
