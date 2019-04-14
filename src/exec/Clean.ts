import chalk from 'chalk'
import { ChoiceType } from 'inquirer'
import { assignIn } from 'lodash'
import { common } from 'src/common'
import { util } from 'src/util'
import { SubMenu } from 'src/util/SubMenu'

export = Clean
class Clean extends SubMenu {

  /**
   * Remove content from node_modules folder located in all microservice projects
   */
  private async npm(): Promise<void> {
    const promises: any[] = []
    for (const project of global.config.projects) {
      const cmd = `rm -rf ${global.config.rootDir}/${project}/node_modules/*`
      const promise = util.execAsync(cmd).then(execResult => {
        util.log(chalk.green(`DONE - ${project}`))
        return { [project]: execResult }
      })
      promises.push(promise)
    }
    const result = await Promise.all(promises)
    common.printMessage(assignIn({}, ...result))
  }

  /**
   * Remove all images created for all microservices in this project, including global docker images.
   * Before removing all images run `docker-compose down` to remove all containers
   */
  private async docker(): Promise<void> {
    for (const image of [
      ...global.config.projects.map(proj => `${global.config.git.projectPrefix}_${proj}`),
      ...global.config.dockerBaseImages,
    ]) {
      const result = await util.execAsync(`docker rmi ${image}`)
      util.log(chalk.cyan(image))
      if (!result.error) util.log(result.stdout)
      else util.log(chalk.red(result.stderr))
    }
  }
  constructor() {
    super('Clean action?', [{ name: 'NPM', value: 'npm' }, { name: 'Docker Images', value: 'docker' }] as ChoiceType[])
  }
}
