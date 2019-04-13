import '../init'

import { Main } from 'src/Main'
import { util } from 'src/util'

util.printConfig()
;(async () => {
  await new Main().run()
})()
