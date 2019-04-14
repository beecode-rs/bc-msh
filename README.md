# Idea

This tool was created to be used in specific environment. We are using it for managing multiple microservice project that are sitting next to each other in one parent project.

example: Project name = `Simple Project` (short `sp`)
```
sp                      <parent project>
├── auth                <microservice>
├── node-common         <shared library>
├── type-definitions    <shared typescript definitions>
├── .gitignore          <parent project is ignoring all microservice projects>
├── .msh
├── docker-compose.yml
```

First feature added was the git bach commands and it was used to easily and quickly clone all repositories and perform functions like `git status` and `git pull`. Because of this we decided to have certain naming convention.

We chose to have a prefix for every project which takes first letters of the projects name `Simple Project` => `sp`, so for authentication microservice we get `sp-auth`. But when we clone it strip the prefix.

# Configuration

configuration is stored in the file `.msh` located at the root of your project. You can generate init config file by calling `msh -i`
```dotenv
PROJECTS=["auth","node-common","type-definitions",..]
GIT_TEAM=TeamName
GIT_PROJECT_PREFIX=tn
PULL_REQUEST_SKIP=["type-definitions","node-common",...]
DOCKER_BASE_IMAGES=["sp-node-nginx","sp-node","sp-nginx","sp-base"]

CMD_GIT_ENABLED=true
CMD_CLEAN_ENABLED=true
CMD_NPM_ENABLED=true
CMD_PR_ENABLED=true
```
also you can use `.msh-user` (next to the `.msh`) at your root dir to store user override values like
```dotenv
GIT_USERNAME=gituser@mail.com
```


# Features

* [git](#git)
  * status
  * fetch
  * pull
  * clone
* [clean](#clean)
  * npm
  * docker images
* [npm](#npm)
  * global npm
* [pull request](#pull-request)

### git
Perform git commands on all project specified in `.mas` config file under `PROJECTS`. All commands are executed asynchronously.

* **status** Get git status for all microservice projects

* **fetch** Perform git fetch for all microservice projects

* **pull** Perform git pull for all microservice projects

* **clone** Clone all microservice projects. If `GIT_PROJECT_PREFIX` is set the project prefix is going to be striped for all projects.

### clean
Removes files, folder and docker images.

* **npm** Remove `node_modules` folder from microservice projects.

* **docker images** Remove docker images for microservice and base images in `DOCKER_BASE_IMAGES` list

### npm

* **global** Gathers all npm packages used in all project listed in `PROJECTS`, and stores them into package.json located in the master/parent project. Notifies if there are multiple versions used for the same package.

### pull request

Currently available only for Bitbucket projects. Try to create pull request for all projects from `master` to `production`


# CLI
```
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
```
