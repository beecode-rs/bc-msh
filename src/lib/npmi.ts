import chalk from 'chalk'
import cVer from 'compare-versions'
import fs from 'fs'
import inquirer, { Answers, ChoiceType, Question } from 'inquirer'
import { printMessage } from 'lib/common'
import mainMenu from 'lib/main'
import { execAsync, log } from 'lib/util'
import { assignIn } from 'lodash'
import * as path from 'path'
import shell from 'shelljs'

const cleanMenu: Question<Answers> = {
  type: 'list',
  name: 'npmi',
  message: 'NPM install action?',
  choices: [
    { name: 'Locally', value: 'local' },
    { name: 'In Docker', value: 'docker' },
    { name: 'Global NPM', value: 'global' },
    new inquirer.Separator(),
    { name: 'Go Back', value: 'back' },
  ] as ReadonlyArray<ChoiceType>,
}

export function run(): void {
  inquirer.prompt(cleanMenu).then(async answers => {
    switch (answers.npmi) {
      case 'local':
        await localInstall()
        break
      case 'docker':
        await dockerInstall()
        break
      case 'global':
        globalNpm()
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
    const cmd = `cd ${global.config.rootDir}/${project} && npm i --only=dev`
    const promise = execAsync(cmd).then(execResult => {
      log(chalk.green(`DONE - ${project}`))
      return { [project]: execResult }
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
    const promise = execAsync(cmd).then(execResult => {
      log(chalk.green(`DONE - ${project}`))
      return { [project]: execResult }
    })
    promises.push(promise)
  }
  const result = await Promise.all(promises)
  printMessage(assignIn({}, ...result))
}

function globalNpm(): void {
  const gDeps = {}
  const gDepsNewer = {}
  const gDepsOlder = {}

  for (const project of global.config.projects) {
    const packageJs = require(path.join(process.cwd(), `${project}/package.json`))
    const allDeps = { ...packageJs.dependencies, ...packageJs.devDependencies }
    for (const key of Object.keys(allDeps)) {
      gDeps[key] = gDeps[key] || {}
      gDeps[key][allDeps[key]] = gDeps[key][allDeps[key]] || []
      gDeps[key][allDeps[key]].push(project)
    }
  }

  for (const key of Object.keys(gDeps)) {
    if (Object.keys(gDeps[key]).length > 1) {
      const sortedVersionsAsc = Object.keys(gDeps[key]).sort(cVer)
      gDepsNewer[key] = sortedVersionsAsc.pop()

      for (const oldVer of sortedVersionsAsc) {
        gDepsOlder[key] = gDepsOlder[key] || {}
        gDepsOlder[key][oldVer] = gDeps[key][oldVer]
      }
    } else {
      gDepsNewer[key] = Object.keys(gDeps[key])[0]
    }
  }

  // revert gDepsOlder result to print by project
  const gDepsReverted = {}
  for (const pack of Object.keys(gDepsOlder)) {
    const versions = gDepsOlder[pack]
    for (const ver of Object.keys(versions)) {
      const projs = versions[ver]
      for (const proj of projs) {
        gDepsReverted[proj] = gDepsReverted[proj] || {}
        gDepsReverted[proj][pack] = ver
      }
    }
  }
  log('Old Deps (by project):')
  log(gDepsReverted)
  log('Old Deps (by package):')
  log(gDepsOlder)

  const globalPackageJs = require(path.join(process.cwd(), `package.json`))
  globalPackageJs.dependencies = gDepsNewer

  fs.writeFileSync('package.json', JSON.stringify(globalPackageJs, null, 4), 'utf8')
}
