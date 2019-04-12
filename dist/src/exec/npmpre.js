"use strict";
// import chalk from 'chalk'
// import { Answers, ChoiceType, Question } from 'inquirer'
// import inquirer from 'inquirer'
// import { common.printMessage } from 'src/exec/common'
// import mainMenu from 'src/exec/main'
// import { util.execAsync, util.log } from 'src/exec/util'
// import { assignIn } from 'lodash'
// import shell from 'shelljs'
//
// const npmpreMenu: Question<Answers> = {
//   type: 'list',
//   name: 'npmpre',
//   message: 'Prepare node_modules folder for?',
//   choices: [
//     { name: 'Windows', value: 'win' },
//     { name: 'Unix', value: 'unix' },
//     new inquirer.Separator(),
//     { name: 'Go Back', value: 'back' },
//   ] as ReadonlyArray<ChoiceType>,
// }
//
// export function run(): void {
//   inquirer.prompt(npmpreMenu).then(async answers => {
//     switch (answers.npmpre) {
//       case 'win':
//         await prepare('win')
//         break
//       case 'unix':
//         await prepare('unix')
//         break
//       case 'back':
//         return mainMenu()
//       default:
//         util.log(chalk.red('error selecting prepare command'))
//     }
//     run()
//   })
// }
//
// async function prepare(os: string): Promise<void> {
//   const inputResult = (await inquirer.prompt({ type: 'input', message: 'User name:', name: 'user' })) as {
//     user: string
//   }
//   const user = inputResult.user
//   const promises: any[] = []
//   for (const project of global.config.projects) {
//     const cmd = ` ${os === 'unix' ? 'sudo' : ''} chown -R ${user}${os === 'unix' ? ':' + user : ''} ${
//       global.config.rootDir
//     }/${project}/node_modules`
//     shell.mkdir('-p', `${global.config.rootDir}/${project}/node_modules`)
//     const promise = util.execAsync(cmd).then(execResult => {
//       util.log(chalk.green(`DONE - ${project}`))
//       return { [project]: execResult }
//     })
//     promises.push(promise)
//   }
//   const result = await Promise.all(promises)
//   common.printMessage(assignIn({}, ...result))
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtcHJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V4ZWMvbnBtcHJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0QkFBNEI7QUFDNUIsMkRBQTJEO0FBQzNELGtDQUFrQztBQUNsQyx3REFBd0Q7QUFDeEQsdUNBQXVDO0FBQ3ZDLDJEQUEyRDtBQUMzRCxvQ0FBb0M7QUFDcEMsOEJBQThCO0FBQzlCLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsa0JBQWtCO0FBQ2xCLG9CQUFvQjtBQUNwQixpREFBaUQ7QUFDakQsZUFBZTtBQUNmLHlDQUF5QztBQUN6Qyx1Q0FBdUM7QUFDdkMsZ0NBQWdDO0FBQ2hDLDBDQUEwQztBQUMxQyxvQ0FBb0M7QUFDcEMsSUFBSTtBQUNKLEVBQUU7QUFDRixnQ0FBZ0M7QUFDaEMsd0RBQXdEO0FBQ3hELGdDQUFnQztBQUNoQyxvQkFBb0I7QUFDcEIsK0JBQStCO0FBQy9CLGdCQUFnQjtBQUNoQixxQkFBcUI7QUFDckIsZ0NBQWdDO0FBQ2hDLGdCQUFnQjtBQUNoQixxQkFBcUI7QUFDckIsNEJBQTRCO0FBQzVCLGlCQUFpQjtBQUNqQixpRUFBaUU7QUFDakUsUUFBUTtBQUNSLFlBQVk7QUFDWixPQUFPO0FBQ1AsSUFBSTtBQUNKLEVBQUU7QUFDRixzREFBc0Q7QUFDdEQsNkdBQTZHO0FBQzdHLG1CQUFtQjtBQUNuQixNQUFNO0FBQ04sa0NBQWtDO0FBQ2xDLCtCQUErQjtBQUMvQixvREFBb0Q7QUFDcEQseUdBQXlHO0FBQ3pHLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakMsNEVBQTRFO0FBQzVFLCtEQUErRDtBQUMvRCxtREFBbUQ7QUFDbkQseUNBQXlDO0FBQ3pDLFNBQVM7QUFDVCw2QkFBNkI7QUFDN0IsTUFBTTtBQUNOLCtDQUErQztBQUMvQyxpREFBaUQ7QUFDakQsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbi8vIGltcG9ydCB7IEFuc3dlcnMsIENob2ljZVR5cGUsIFF1ZXN0aW9uIH0gZnJvbSAnaW5xdWlyZXInXG4vLyBpbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInXG4vLyBpbXBvcnQgeyBjb21tb24ucHJpbnRNZXNzYWdlIH0gZnJvbSAnc3JjL2V4ZWMvY29tbW9uJ1xuLy8gaW1wb3J0IG1haW5NZW51IGZyb20gJ3NyYy9leGVjL21haW4nXG4vLyBpbXBvcnQgeyB1dGlsLmV4ZWNBc3luYywgdXRpbC5sb2cgfSBmcm9tICdzcmMvZXhlYy91dGlsJ1xuLy8gaW1wb3J0IHsgYXNzaWduSW4gfSBmcm9tICdsb2Rhc2gnXG4vLyBpbXBvcnQgc2hlbGwgZnJvbSAnc2hlbGxqcydcbi8vXG4vLyBjb25zdCBucG1wcmVNZW51OiBRdWVzdGlvbjxBbnN3ZXJzPiA9IHtcbi8vICAgdHlwZTogJ2xpc3QnLFxuLy8gICBuYW1lOiAnbnBtcHJlJyxcbi8vICAgbWVzc2FnZTogJ1ByZXBhcmUgbm9kZV9tb2R1bGVzIGZvbGRlciBmb3I/Jyxcbi8vICAgY2hvaWNlczogW1xuLy8gICAgIHsgbmFtZTogJ1dpbmRvd3MnLCB2YWx1ZTogJ3dpbicgfSxcbi8vICAgICB7IG5hbWU6ICdVbml4JywgdmFsdWU6ICd1bml4JyB9LFxuLy8gICAgIG5ldyBpbnF1aXJlci5TZXBhcmF0b3IoKSxcbi8vICAgICB7IG5hbWU6ICdHbyBCYWNrJywgdmFsdWU6ICdiYWNrJyB9LFxuLy8gICBdIGFzIFJlYWRvbmx5QXJyYXk8Q2hvaWNlVHlwZT4sXG4vLyB9XG4vL1xuLy8gZXhwb3J0IGZ1bmN0aW9uIHJ1bigpOiB2b2lkIHtcbi8vICAgaW5xdWlyZXIucHJvbXB0KG5wbXByZU1lbnUpLnRoZW4oYXN5bmMgYW5zd2VycyA9PiB7XG4vLyAgICAgc3dpdGNoIChhbnN3ZXJzLm5wbXByZSkge1xuLy8gICAgICAgY2FzZSAnd2luJzpcbi8vICAgICAgICAgYXdhaXQgcHJlcGFyZSgnd2luJylcbi8vICAgICAgICAgYnJlYWtcbi8vICAgICAgIGNhc2UgJ3VuaXgnOlxuLy8gICAgICAgICBhd2FpdCBwcmVwYXJlKCd1bml4Jylcbi8vICAgICAgICAgYnJlYWtcbi8vICAgICAgIGNhc2UgJ2JhY2snOlxuLy8gICAgICAgICByZXR1cm4gbWFpbk1lbnUoKVxuLy8gICAgICAgZGVmYXVsdDpcbi8vICAgICAgICAgdXRpbC5sb2coY2hhbGsucmVkKCdlcnJvciBzZWxlY3RpbmcgcHJlcGFyZSBjb21tYW5kJykpXG4vLyAgICAgfVxuLy8gICAgIHJ1bigpXG4vLyAgIH0pXG4vLyB9XG4vL1xuLy8gYXN5bmMgZnVuY3Rpb24gcHJlcGFyZShvczogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4vLyAgIGNvbnN0IGlucHV0UmVzdWx0ID0gKGF3YWl0IGlucXVpcmVyLnByb21wdCh7IHR5cGU6ICdpbnB1dCcsIG1lc3NhZ2U6ICdVc2VyIG5hbWU6JywgbmFtZTogJ3VzZXInIH0pKSBhcyB7XG4vLyAgICAgdXNlcjogc3RyaW5nXG4vLyAgIH1cbi8vICAgY29uc3QgdXNlciA9IGlucHV0UmVzdWx0LnVzZXJcbi8vICAgY29uc3QgcHJvbWlzZXM6IGFueVtdID0gW11cbi8vICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIGdsb2JhbC5jb25maWcucHJvamVjdHMpIHtcbi8vICAgICBjb25zdCBjbWQgPSBgICR7b3MgPT09ICd1bml4JyA/ICdzdWRvJyA6ICcnfSBjaG93biAtUiAke3VzZXJ9JHtvcyA9PT0gJ3VuaXgnID8gJzonICsgdXNlciA6ICcnfSAke1xuLy8gICAgICAgZ2xvYmFsLmNvbmZpZy5yb290RGlyXG4vLyAgICAgfS8ke3Byb2plY3R9L25vZGVfbW9kdWxlc2Bcbi8vICAgICBzaGVsbC5ta2RpcignLXAnLCBgJHtnbG9iYWwuY29uZmlnLnJvb3REaXJ9LyR7cHJvamVjdH0vbm9kZV9tb2R1bGVzYClcbi8vICAgICBjb25zdCBwcm9taXNlID0gdXRpbC5leGVjQXN5bmMoY21kKS50aGVuKGV4ZWNSZXN1bHQgPT4ge1xuLy8gICAgICAgdXRpbC5sb2coY2hhbGsuZ3JlZW4oYERPTkUgLSAke3Byb2plY3R9YCkpXG4vLyAgICAgICByZXR1cm4geyBbcHJvamVjdF06IGV4ZWNSZXN1bHQgfVxuLy8gICAgIH0pXG4vLyAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKVxuLy8gICB9XG4vLyAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKVxuLy8gICBjb21tb24ucHJpbnRNZXNzYWdlKGFzc2lnbkluKHt9LCAuLi5yZXN1bHQpKVxuLy8gfVxuIl19