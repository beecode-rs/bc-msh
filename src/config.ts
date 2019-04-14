declare namespace NodeJS {
  interface Global {
    projectName: string
    projectVersion: string
    config: {
      rootDir: string
      projects: string[]
      pullRequestSkip: string[]
      git: {
        team: string
        projectPrefix: string
        host: string
        username: string
      }
      dockerBaseImages: string[]
      cmd: {
        gitEnabled: boolean
        cleanEnabled: boolean
        npmEnabled: boolean
        prEnabled: boolean
      }
    }
    exitAfterCommandExecuted: boolean
  }
}

;(() => {
  const dotenv = require('dotenv')
  const pjson = require('../../package.json')
  dotenv.config({ path: './.msh' })
  dotenv.config({ path: './.msh-user' })

  const envToJson = (env, def): any => {
    try {
      return JSON.parse(process.env[env] as string)
    } catch (_) {
      return def
    }
  }
  const envToBoolean = (env, def: boolean): boolean => {
    if ((env || '') === '') return def
    return env.toLocaleLowerCase() === 'true'
  }

  global.projectName = pjson.name
  global.projectVersion = pjson.version
  global.config = Object.freeze({
    rootDir: process.env.ROOT_DIR || process.cwd() || './',
    projects: envToJson('PROJECTS', []),
    pullRequestSkip: envToJson('PULL_REQUEST_SKIP', []),
    git: {
      team: process.env.GIT_TEAM || '',
      projectPrefix: process.env.GIT_PROJECT_PREFIX || '',
      host: process.env.GIT_HOST || 'bitbucket.org',
      username: process.env.GIT_USERNAME || '',
    },
    dockerBaseImages: envToJson('DOCKER_BASE_IMAGES', []),
    cmd: {
      gitEnabled: envToBoolean(process.env.CMD_GIT_ENABLED, true),
      cleanEnabled: envToBoolean(process.env.CMD_CLEAN_ENABLED, true),
      npmEnabled: envToBoolean(process.env.CMD_NPM_ENABLED, true),
      prEnabled: envToBoolean(process.env.CMD_PR_ENABLED, true),
    },
  })
  global.exitAfterCommandExecuted = false
})()
