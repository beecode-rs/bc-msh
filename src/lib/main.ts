import { Answers, ChoiceType, Question } from 'inquirer'
import inquirer from 'inquirer'

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

function printEnv() {
  console.log(`RootDir: ${global.config.rootDir}`)
  console.log(`Git:`)
  if (global.config.git.username) console.log(`     username      : ${global.config.git.username}`)
  console.log(`     team          : ${global.config.git.team}`)
  console.log(`     host          : ${global.config.git.host}`)
  console.log(`     project prefix: ${global.config.git.projectPrefix}`)

  console.log(`Project List:`)
  console.log(`[ ${global.config.projects.join(' | ')} ]`)

  if (global.config.pullRequestSkip && global.config.pullRequestSkip.length > 0) {
    console.log(`PullRequest skip:`)
    console.log(`[ ${global.config.pullRequestSkip.join(' | ')} ]`)
  }

  if (global.config.pullRequestSkip && global.config.dockerBaseImages.length > 0) {
    console.log(`Docker base images:`)
    console.log(`[ ${global.config.dockerBaseImages.join(' | ')} ]`)
  }
}

export default function run() {
  printEnv()
  inquirer.prompt(mainMenu).then(answers => {
    const selected = answers['mainMenu']
    if (selected === 'exit') return
    require(`lib/${selected}`).run()
  })
}
