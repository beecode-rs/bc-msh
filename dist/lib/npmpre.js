"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const main_1 = __importDefault(require("lib/main"));
const util_1 = require("lib/util");
const chalk_1 = __importDefault(require("chalk"));
const common_1 = require("lib/common");
const lodash_1 = require("lodash");
const shelljs_1 = __importDefault(require("shelljs"));
const npmpreMenu = {
    type: 'list',
    name: 'npmpre',
    message: 'Prepare node_modules folder for?',
    choices: [
        { name: 'Windows', value: 'win' },
        { name: 'Unix', value: 'unix' },
        new inquirer_1.default.Separator(),
        { name: 'Go Back', value: 'back' },
    ],
};
function run() {
    inquirer_1.default.prompt(npmpreMenu).then(async (answers) => {
        switch (answers['npmpre']) {
            case 'win':
                await prepare('win');
                break;
            case 'unix':
                await prepare('unix');
                break;
            case 'back':
                return main_1.default();
            default:
                util_1.log(chalk_1.default.red('error selecting prepare command'));
        }
        run();
    });
}
exports.run = run;
async function prepare(os) {
    const inputResult = await inquirer_1.default.prompt({ type: 'input', message: 'User name:', name: 'user' });
    const user = inputResult['user'];
    const promises = [];
    for (const project of global.config.projects) {
        const cmd = ` ${os === 'unix' ? 'sudo' : ''} chown -R ${user}${os === 'unix' ? ':' + user : ''} ${global.config.rootDir}/${project}/node_modules`;
        shelljs_1.default.mkdir('-p', `${global.config.rootDir}/${project}/node_modules`);
        const promise = util_1.execAsync(cmd).then(result => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: result };
        });
        promises.push(promise);
    }
    const result = await Promise.all(promises);
    common_1.printMessage(lodash_1.assignIn({}, ...result));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtcHJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9ucG1wcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx3REFBK0I7QUFDL0Isb0RBQStCO0FBQy9CLG1DQUF5QztBQUN6QyxrREFBeUI7QUFDekIsdUNBQXlDO0FBQ3pDLG1DQUFpQztBQUNqQyxzREFBMkI7QUFFM0IsTUFBTSxVQUFVLEdBQXNCO0lBQ3BDLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLFFBQVE7SUFDZCxPQUFPLEVBQUUsa0NBQWtDO0lBQzNDLE9BQU8sRUFBRTtRQUNQLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1FBQ2pDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO1FBQy9CLElBQUksa0JBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDeEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7S0FDTjtDQUMvQixDQUFBO0FBRUQsU0FBZ0IsR0FBRztJQUNqQixrQkFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFFO1FBQy9DLFFBQVEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLEtBQUssS0FBSztnQkFDUixNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDcEIsTUFBSztZQUNQLEtBQUssTUFBTTtnQkFDVCxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDckIsTUFBSztZQUNQLEtBQUssTUFBTTtnQkFDVCxPQUFPLGNBQVEsRUFBRSxDQUFBO1lBQ25CO2dCQUNFLFVBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQTtTQUNwRDtRQUNELEdBQUcsRUFBRSxDQUFBO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBaEJELGtCQWdCQztBQUVELEtBQUssVUFBVSxPQUFPLENBQUMsRUFBVTtJQUMvQixNQUFNLFdBQVcsR0FBRyxNQUFNLGtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ2pHLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNoQyxNQUFNLFFBQVEsR0FBVSxFQUFFLENBQUE7SUFDMUIsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUM1QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLElBQUksR0FBRyxFQUFFLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQzVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FDaEIsSUFBSSxPQUFPLGVBQWUsQ0FBQTtRQUMxQixpQkFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLGVBQWUsQ0FBQyxDQUFBO1FBQ3JFLE1BQU0sT0FBTyxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNDLFVBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUN2QjtJQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxxQkFBWSxDQUFDLGlCQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUN2QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5zd2VycywgQ2hvaWNlVHlwZSwgUXVlc3Rpb24gfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCBpbnF1aXJlciBmcm9tICdpbnF1aXJlcidcbmltcG9ydCBtYWluTWVudSBmcm9tICdsaWIvbWFpbidcbmltcG9ydCB7IGV4ZWNBc3luYywgbG9nIH0gZnJvbSAnbGliL3V0aWwnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgeyBwcmludE1lc3NhZ2UgfSBmcm9tICdsaWIvY29tbW9uJ1xuaW1wb3J0IHsgYXNzaWduSW4gfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgc2hlbGwgZnJvbSAnc2hlbGxqcydcblxuY29uc3QgbnBtcHJlTWVudTogUXVlc3Rpb248QW5zd2Vycz4gPSB7XG4gIHR5cGU6ICdsaXN0JyxcbiAgbmFtZTogJ25wbXByZScsXG4gIG1lc3NhZ2U6ICdQcmVwYXJlIG5vZGVfbW9kdWxlcyBmb2xkZXIgZm9yPycsXG4gIGNob2ljZXM6IFtcbiAgICB7IG5hbWU6ICdXaW5kb3dzJywgdmFsdWU6ICd3aW4nIH0sXG4gICAgeyBuYW1lOiAnVW5peCcsIHZhbHVlOiAndW5peCcgfSxcbiAgICBuZXcgaW5xdWlyZXIuU2VwYXJhdG9yKCksXG4gICAgeyBuYW1lOiAnR28gQmFjaycsIHZhbHVlOiAnYmFjaycgfSxcbiAgXSBhcyBSZWFkb25seUFycmF5PENob2ljZVR5cGU+LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKCkge1xuICBpbnF1aXJlci5wcm9tcHQobnBtcHJlTWVudSkudGhlbihhc3luYyBhbnN3ZXJzID0+IHtcbiAgICBzd2l0Y2ggKGFuc3dlcnNbJ25wbXByZSddKSB7XG4gICAgICBjYXNlICd3aW4nOlxuICAgICAgICBhd2FpdCBwcmVwYXJlKCd3aW4nKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndW5peCc6XG4gICAgICAgIGF3YWl0IHByZXBhcmUoJ3VuaXgnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnYmFjayc6XG4gICAgICAgIHJldHVybiBtYWluTWVudSgpXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2coY2hhbGsucmVkKCdlcnJvciBzZWxlY3RpbmcgcHJlcGFyZSBjb21tYW5kJykpXG4gICAgfVxuICAgIHJ1bigpXG4gIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByZXBhcmUob3M6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpbnB1dFJlc3VsdCA9IGF3YWl0IGlucXVpcmVyLnByb21wdCh7IHR5cGU6ICdpbnB1dCcsIG1lc3NhZ2U6ICdVc2VyIG5hbWU6JywgbmFtZTogJ3VzZXInIH0pXG4gIGNvbnN0IHVzZXIgPSBpbnB1dFJlc3VsdFsndXNlciddXG4gIGNvbnN0IHByb21pc2VzOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgY29uc3QgY21kID0gYCAke29zID09PSAndW5peCcgPyAnc3VkbycgOiAnJ30gY2hvd24gLVIgJHt1c2VyfSR7b3MgPT09ICd1bml4JyA/ICc6JyArIHVzZXIgOiAnJ30gJHtcbiAgICAgIGdsb2JhbC5jb25maWcucm9vdERpclxuICAgIH0vJHtwcm9qZWN0fS9ub2RlX21vZHVsZXNgXG4gICAgc2hlbGwubWtkaXIoJy1wJywgYCR7Z2xvYmFsLmNvbmZpZy5yb290RGlyfS8ke3Byb2plY3R9L25vZGVfbW9kdWxlc2ApXG4gICAgY29uc3QgcHJvbWlzZSA9IGV4ZWNBc3luYyhjbWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGxvZyhjaGFsay5ncmVlbihgRE9ORSAtICR7cHJvamVjdH1gKSlcbiAgICAgIHJldHVybiB7IFtwcm9qZWN0XTogcmVzdWx0IH1cbiAgICB9KVxuICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSlcbiAgfVxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcbiAgcHJpbnRNZXNzYWdlKGFzc2lnbkluKHt9LCAuLi5yZXN1bHQpKVxufVxuIl19