import { help } from 'src/cli/help'
import { init } from 'src/cli/init'
import Git = require('src/exec/Git')

const cli = {
  hasArguments: (argv): boolean => {
    let hasArgs = false
    if (Object.keys(argv).length > 1) hasArgs = true
    if (argv._.length > 0) hasArgs = true

    if (hasArgs) global.exitAfterCommandExecuted = true
    return hasArgs
  },
  run: async (argv): Promise<void> => {
    if (argv.help) return help.printHelp()
    if (argv.init) return init.create()
    if (argv.git) return await new Git().run(argv.git)
  },
}

export { cli }
