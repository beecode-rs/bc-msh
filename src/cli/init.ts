import { fs } from 'mz'
import path from 'path'
import { util } from 'src/util'

const init = {
  configFileLocation: () => path.join(global.config.rootDir, '.msh'),
  checkIfConfigExists: () => fs.existsSync(init.configFileLocation()),
  create: () => {
    if (init.checkIfConfigExists()) {
      util.log('Config already exists')
      return
    }
    fs.writeFileSync(init.configFileLocation(), init.default())
  },
  default: () => {
    return `
PROJECTS=[] # ["auth","auth-web","node-common",...]
GIT_TEAM= # git team name
GIT_PROJECT_PREFIX= # project prefix
PULL_REQUEST_SKIP=[] # ["type-definitions","node-common",...]
DOCKER_BASE_IMAGES=[] # ["bc-node-nginx","bc-node","bc-nginx","bc-base"]

CMD_GIT_ENABLED=true
CMD_CLEAN_ENABLED=true
CMD_NPM_ENABLED=true
CMD_PR_ENABLED=true
`
  },
}

export { init }
