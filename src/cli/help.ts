import { util } from 'src/util'

const help = {
  printHelp: () => {
    util.log('Usage: msh [option...]')
    util.log('')
    util.log('Options:')
    util.log('')
    util.log('   -g | --git [cmd]')
    util.log('      cmd:')
    util.log('          clone        Clone all project')
    util.log('          pull         Pull all projects')
    util.log('          fetch        Fetch all projects')
    util.log('          status       Get status for all projects')
    util.log('')
    util.log('   -i | --init         Initiate .msh config file with default values')
    util.log('')
    // util.log('   clean [cmd]')
    // util.log('   cmd:')
    // util.log('        npm          Clean all node_modules folders')
    // util.log('        images       Remove all docker images (do a "docker-compose down" command first)')
    // util.log('')
    // util.log('   npm               Run npm i in all containers')
    // util.log('')
    // util.log('   pr                Generate PR for all projects (added option to auto merge)')
    // util.log('')
    // util.log('   npmpre [opts]     Create all node_modules folders with user permissions set')
    // util.log('   opts:')
    // util.log('        1}           User name')
    // util.log('        2)           "win" if use on windows to skip sudo and group name')
    // util.log('')
    util.log('   -h | --help         Display this help')
    util.log('')
  },
}

export { help }
