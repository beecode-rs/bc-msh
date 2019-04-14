import { util } from 'src/util'

const help = {
  printHelp: () => {
    util.log(`
Usage: msh [option...]

Options:

   -g | --git [cmd]
      cmd:
          clone        Clone all project
          pull         Pull all projects
          fetch        Fetch all projects
          status       Get status for all projects

   -i | --init         Initiate .msh config file with default values

   -c | --clean [cmd]
      cmd:
          npm          Clean all node_modules folders
          docker       Remove all docker images (do a "docker-compose down" command first)

   -n | --npm          Run npm i in all containers

   -p | --pr           Generate PR for all projects (added option to auto merge)

   -h | --help         Display this help
`)
  },
}

export { help }
