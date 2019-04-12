import '../init'

import { Main } from 'src/main'
import { util } from 'src/util'

util.printConfig()
;(async () => {
  await new Main().run()
})()
