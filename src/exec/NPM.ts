import cVer from 'compare-versions'
import stringify from 'fast-json-stable-stringify'
import fs from 'fs'
import { ChoiceType } from 'inquirer'
import * as path from 'path'
import { util } from 'src/util'
import { SubMenu } from 'src/util/SubMenu'

export = NPM
class NPM extends SubMenu {

  constructor() {
    super('NPM action?', [{ name: 'Global NPM', value: 'global' }] as ChoiceType[])
  }

  /**
   * Gather all npm packages into one package.json located in parent project.
   */
  private async global(): Promise<void> {
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
    util.log('Old Deps (by project):')
    util.log(gDepsReverted)
    util.log('Old Deps (by package):')
    util.log(gDepsOlder)

    const globalPackageJs = require(path.join(process.cwd(), `package.json`))
    globalPackageJs.dependencies = gDepsNewer

    fs.writeFileSync('package.json', JSON.stringify(JSON.parse(stringify(globalPackageJs)), null, 4), 'utf8')
  }
}
