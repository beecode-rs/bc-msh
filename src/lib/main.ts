import { Answers, ChoiceType, Question } from 'inquirer'
import inquirer from 'inquirer'
import { log } from 'lib/util'

const mainMenu: Question<Answers> = {
  type: 'list',
  name: 'mainMenu',
  message: 'What do you want to do?',
  choices: [
    { name: 'Git', value: 'git' },
    { name: 'Clean', value: 'clean' },
    { name: 'NPM Install', value: 'npmi' },
    { name: 'NPM Prepare', value: 'npmpre' },
    { name: 'Pull Request', value: 'pr' },
    new inquirer.Separator(),
    { name: 'Exit', value: 'exit' },
  ] as ReadonlyArray<ChoiceType>,
}

function printEnv():void {
  log(`RootDir: ${global.config.rootDir}`)
  log(`Git:`)
  if (global.config.git.username) log(`     username      : ${global.config.git.username}`)
  log(`     team          : ${global.config.git.team}`)
  log(`     host          : ${global.config.git.host}`)
  log(`     project prefix: ${global.config.git.projectPrefix}`)

  log(`Project List:`)
  log(`[ ${global.config.projects.join(' | ')} ]`)

  if (global.config.pullRequestSkip && global.config.pullRequestSkip.length > 0) {
    log(`PullRequest skip:`)
    log(`[ ${global.config.pullRequestSkip.join(' | ')} ]`)
  }

  if (global.config.pullRequestSkip && global.config.dockerBaseImages.length > 0) {
    log(`Docker base images:`)
    log(`[ ${global.config.dockerBaseImages.join(' | ')} ]`)
  }
}

export default function run():void {
  printEnv()
  inquirer.prompt(mainMenu).then(answers => {
    const selected = answers.mainMenu
    if (selected === 'exit') return
    require(`lib/${selected}`).run()
  })
}
