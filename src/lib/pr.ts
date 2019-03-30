import chalk from 'chalk'
import inquirer from 'inquirer'
import mainMenu from 'lib/main'
import { log } from 'lib/util'
import { assignIn } from 'lodash'
import request from 'request-promise-native'

export async function run(): Promise<void> {
  let username = global.config.git.username
  if (!username) {
    // @ts-ignore
    username = (await inquirer.prompt({ type: 'input', message: 'BitBucket username:', name: 'user' })).user
  }
  // @ts-ignore
  const password = (await inquirer.prompt({ type: 'password', message: 'BitBucket password:', name: 'pass' })).pass
  const Authorization = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')

  const makePullRequestPromises: any[] = []
  for (const project of global.config.projects) {
    if (global.config.pullRequestSkip.includes(project)) continue
    const url = `https://api.bitbucket.org/2.0/repositories/${global.config.git.team}/${
      global.config.git.projectPrefix
    }-${project}/pullrequests`
    const promise = request(url, {
      method: 'POST',
      headers: { Authorization },
      json: {
        title: 'Deploy to production',
        source: { branch: { name: 'master' } },
        destination: { branch: { name: 'production' } },
      },
    })
      .then(result => {
        log(
          chalk.green(
            `https://bitbucket.org/${global.config.git.team}/${
              global.config.git.projectPrefix
            }-${project}/pull-requests/${result.id}`
          )
        )
        return {
          [project]: `https://api.bitbucket.org/2.0/repositories/${global.config.git.team}/${
            global.config.git.projectPrefix
          }-${project}/pullrequests/${result.id}/merge`,
        }
      })
      .catch(err => {
        log(chalk.yellow(`${project} - ${err.message}`))
      })
    makePullRequestPromises.push(promise)
  }
  const pullRequestResults = assignIn(
    {},
    ...(await Promise.all(makePullRequestPromises)).filter(pr => typeof pr !== 'undefined')
  )

  if (Object.keys(pullRequestResults).length > 0) {
    // @ts-ignore
    const mergeIt: string = (await inquirer.prompt({ type: 'input', message: 'Merge all (y/N):', name: 'merge' })).merge.toString()
    if (mergeIt.toUpperCase() === 'Y') {
      const mergePromises: any[] = []
      for (const [pr, urlMerge] of Object.entries(pullRequestResults)) {
        const mergePromise = request(urlMerge, {
          method: 'POST',
          headers: { Authorization },
        }).then(result => {
          log(chalk.green(`${pr}: ${JSON.parse(result).state}`))
        })
        mergePromises.push(mergePromise)
      }
      await Promise.all(mergePromises)
    }
  }
  mainMenu()
}
