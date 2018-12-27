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

configuration is stored in the file `.msh` located at the root of your project.
```dotenv
PROJECTS=["auth","node-common","type-definitions",..]
GIT_TEAM=TeamName
GIT_PROJECT_PREFIX=tn
PULL_REQUEST_SKIP=["type-definitions","node-common",...]
DOCKER_BASE_IMAGES=["sp-node-nginx","sp-node","sp-nginx","sp-base"]
```
also you can use `.msh-user` (next to the `.msh`) at your root dir to store user override values like
```dotenv
GIT_USERNAME=gituser@mail.com
```


# Features

* [git](#git)
  * [status](#status)
  * [fetch](#fetch)
  * [pull](#pull)
  * [clone](#clone)
* [clean](#clean)
  * [npm](#npm)
  * [docker images](#docker-images)
* [npm install](#npm-install)
  * [locally](#locally)
  * [in docker](#in-docker)
* [npm prepare](#npm-prepare)
  * [windows](#windows)
  * [unix](#unix)
* [pull request](#pull-request)

## git
Perform git commands on all project specified in `.mas` config file under `PROJECTS`. All commands are executed asynchronously.

### status
Get git status for all microservice projects

### fetch
Perform git fetch for all microservice projects

### pull
Perform git pull for all microservice projects

### clone
Clone all microservice projects. If `GIT_PROJECT_PREFIX` is set the project prefix is going to be striped for all projects.

## clean
Removes files, folder and docker images.

### npm
Remove `node_modules` folder from microservice projects.

### docker images
Remove docker images for microservice and base images in `DOCKER_BASE_IMAGES` list

## npm install

### locally
Run `npm i --only=dev` in all project folders listed in `PROJECTS`.

### in docker
Run `npm i --no-optional` in all containers.

## npm prepare
If we use `root` user in docker images this command is used to change the owner of the node_modules folder

### windows
Uses `chown -R {user} ./{project}`

### unix
Uses `sudo chown -R {user}:{user} ./{project}`

## pull request
Currently available only for Bitbucket projects.
Try to create pull request for all projects from `master` to `production`
