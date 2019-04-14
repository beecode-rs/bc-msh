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
    util.log('   -c | --clean [cmd]')
    util.log('      cmd:')
    util.log('          npm          Clean all node_modules folders')
    util.log('          docker       Remove all docker images (do a "docker-compose down" command first)')
    util.log('')
    util.log('   -n | --npm          Run npm i in all containers')
    util.log('')
    util.log('   -p | --pr           Generate PR for all projects (added option to auto merge)')
    util.log('')
    util.log('   -h | --help         Display this help')
    util.log('')
  },
}

export { help }
