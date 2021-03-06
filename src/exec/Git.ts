import chalk from 'chalk'
import { ChoiceCollection } from 'inquirer'
import { assignIn } from 'lodash'
import shell from 'shelljs'
import { common } from 'src/common'
import { util } from 'src/util'
import { SubMenu } from 'src/util/SubMenu'

export = Git
class Git extends SubMenu {
  private async gitCommand(command): Promise<void> {
    const promises: any[] = []
    for (const project of global.config.projects) {
      const cmd = `git -C ${global.config.rootDir}/${project} ${command}`
      const promise = util.execAsync(cmd).then(execResult => {
        util.log(chalk.green(`DONE - ${project}`))
        return { [project]: execResult }
      })
      promises.push(promise)
    }
    const result = await Promise.all(promises)
    common.printMessage(assignIn({}, ...result))
  }
  constructor() {
    super('Git action?', [
      { name: 'Status', value: 'status' },
      { name: 'Fetch', value: 'fetch' },
      { name: 'Pull', value: 'pull' },
      { name: 'Clone', value: 'clone' },
    ] as ChoiceCollection)
  }

  private async status(): Promise<void> {
    await this.gitCommand('status')
  }
  private async fetch(): Promise<void> {
    await this.gitCommand('fetch')
  }
  private async pull(): Promise<void> {
    await this.gitCommand('pull')
  }

  /**
   * Clone all project for microservices that belong to parent project
   */
  private async clone(): Promise<void> {
    shell.cd(global.config.rootDir)
    const promises: any[] = []
    for (const project of global.config.projects) {
      const cmd = `git clone git@${global.config.git.host}:${global.config.git.team}/${
        global.config.git.projectPrefix
      }-${project}.git ${project}`
      const promise = util.execAsync(cmd).then(execResult => {
        util.log(chalk.green(`DONE - ${project}`))
        return { [project]: execResult }
      })
      promises.push(promise)
    }
    const result = await Promise.all(promises)
    common.printMessage(assignIn({}, ...result))
  }
}
