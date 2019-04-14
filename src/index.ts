import '../init'

import minimist from 'minimist'
import { cli } from 'src/cli'
import { alias } from 'src/cli/alias'
import { MainMenu } from 'src/MainMenu'
import { util } from 'src/util'

const argv = minimist(process.argv.slice(2), { alias })
;(async () => {
  if (cli.hasArguments(argv)) {
    if (cli.allowPrintConfigForCmd(argv)) util.printConfig()
    await cli.run(argv)
  } else {
    util.printConfig()
    await new MainMenu().run()
  }
})()
