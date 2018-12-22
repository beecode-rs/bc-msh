declare namespace NodeJS {
  interface Global {
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
    }
  }
}

;(() => {
  const dotenv = require('dotenv')
  dotenv.config({ path: './.msh' })
  dotenv.config({ path: './.msh-user' })

  const envToJson = (env, def): any => {
    try {
      return JSON.parse(process.env[env] as string)
    } catch (_) {
      return def
    }
  }
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
  })
})()
