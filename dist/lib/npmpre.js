"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const common_1 = require("lib/common");
const main_1 = __importDefault(require("lib/main"));
const util_1 = require("lib/util");
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
        switch (answers.npmpre) {
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
    const inputResult = (await inquirer_1.default.prompt({ type: 'input', message: 'User name:', name: 'user' }));
    const user = inputResult.user;
    const promises = [];
    for (const project of global.config.projects) {
        const cmd = ` ${os === 'unix' ? 'sudo' : ''} chown -R ${user}${os === 'unix' ? ':' + user : ''} ${global.config.rootDir}/${project}/node_modules`;
        shelljs_1.default.mkdir('-p', `${global.config.rootDir}/${project}/node_modules`);
        const promise = util_1.execAsync(cmd).then(execResult => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: execResult };
        });
        promises.push(promise);
    }
    const result = await Promise.all(promises);
    common_1.printMessage(lodash_1.assignIn({}, ...result));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtcHJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9ucG1wcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBeUI7QUFFekIsd0RBQStCO0FBQy9CLHVDQUF5QztBQUN6QyxvREFBK0I7QUFDL0IsbUNBQXlDO0FBQ3pDLG1DQUFpQztBQUNqQyxzREFBMkI7QUFFM0IsTUFBTSxVQUFVLEdBQXNCO0lBQ3BDLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLFFBQVE7SUFDZCxPQUFPLEVBQUUsa0NBQWtDO0lBQzNDLE9BQU8sRUFBRTtRQUNQLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1FBQ2pDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO1FBQy9CLElBQUksa0JBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDeEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7S0FDTjtDQUMvQixDQUFBO0FBRUQsU0FBZ0IsR0FBRztJQUNqQixrQkFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFFO1FBQy9DLFFBQVEsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN0QixLQUFLLEtBQUs7Z0JBQ1IsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BCLE1BQUs7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3JCLE1BQUs7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxjQUFRLEVBQUUsQ0FBQTtZQUNuQjtnQkFDRSxVQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUE7U0FDcEQ7UUFDRCxHQUFHLEVBQUUsQ0FBQTtJQUNQLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQWhCRCxrQkFnQkM7QUFFRCxLQUFLLFVBQVUsT0FBTyxDQUFDLEVBQVU7SUFDL0IsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFNLGtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUVqRyxDQUFBO0lBQ0QsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQTtJQUM3QixNQUFNLFFBQVEsR0FBVSxFQUFFLENBQUE7SUFDMUIsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUM1QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLElBQUksR0FBRyxFQUFFLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQzVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FDaEIsSUFBSSxPQUFPLGVBQWUsQ0FBQTtRQUMxQixpQkFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLGVBQWUsQ0FBQyxDQUFBO1FBQ3JFLE1BQU0sT0FBTyxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQy9DLFVBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUN2QjtJQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxxQkFBWSxDQUFDLGlCQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUN2QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgQW5zd2VycywgQ2hvaWNlVHlwZSwgUXVlc3Rpb24gfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCBpbnF1aXJlciBmcm9tICdpbnF1aXJlcidcbmltcG9ydCB7IHByaW50TWVzc2FnZSB9IGZyb20gJ2xpYi9jb21tb24nXG5pbXBvcnQgbWFpbk1lbnUgZnJvbSAnbGliL21haW4nXG5pbXBvcnQgeyBleGVjQXN5bmMsIGxvZyB9IGZyb20gJ2xpYi91dGlsJ1xuaW1wb3J0IHsgYXNzaWduSW4gfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgc2hlbGwgZnJvbSAnc2hlbGxqcydcblxuY29uc3QgbnBtcHJlTWVudTogUXVlc3Rpb248QW5zd2Vycz4gPSB7XG4gIHR5cGU6ICdsaXN0JyxcbiAgbmFtZTogJ25wbXByZScsXG4gIG1lc3NhZ2U6ICdQcmVwYXJlIG5vZGVfbW9kdWxlcyBmb2xkZXIgZm9yPycsXG4gIGNob2ljZXM6IFtcbiAgICB7IG5hbWU6ICdXaW5kb3dzJywgdmFsdWU6ICd3aW4nIH0sXG4gICAgeyBuYW1lOiAnVW5peCcsIHZhbHVlOiAndW5peCcgfSxcbiAgICBuZXcgaW5xdWlyZXIuU2VwYXJhdG9yKCksXG4gICAgeyBuYW1lOiAnR28gQmFjaycsIHZhbHVlOiAnYmFjaycgfSxcbiAgXSBhcyBSZWFkb25seUFycmF5PENob2ljZVR5cGU+LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKCk6IHZvaWQge1xuICBpbnF1aXJlci5wcm9tcHQobnBtcHJlTWVudSkudGhlbihhc3luYyBhbnN3ZXJzID0+IHtcbiAgICBzd2l0Y2ggKGFuc3dlcnMubnBtcHJlKSB7XG4gICAgICBjYXNlICd3aW4nOlxuICAgICAgICBhd2FpdCBwcmVwYXJlKCd3aW4nKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndW5peCc6XG4gICAgICAgIGF3YWl0IHByZXBhcmUoJ3VuaXgnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnYmFjayc6XG4gICAgICAgIHJldHVybiBtYWluTWVudSgpXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2coY2hhbGsucmVkKCdlcnJvciBzZWxlY3RpbmcgcHJlcGFyZSBjb21tYW5kJykpXG4gICAgfVxuICAgIHJ1bigpXG4gIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByZXBhcmUob3M6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpbnB1dFJlc3VsdCA9IChhd2FpdCBpbnF1aXJlci5wcm9tcHQoeyB0eXBlOiAnaW5wdXQnLCBtZXNzYWdlOiAnVXNlciBuYW1lOicsIG5hbWU6ICd1c2VyJyB9KSkgYXMge1xuICAgIHVzZXI6IHN0cmluZ1xuICB9XG4gIGNvbnN0IHVzZXIgPSBpbnB1dFJlc3VsdC51c2VyXG4gIGNvbnN0IHByb21pc2VzOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgY29uc3QgY21kID0gYCAke29zID09PSAndW5peCcgPyAnc3VkbycgOiAnJ30gY2hvd24gLVIgJHt1c2VyfSR7b3MgPT09ICd1bml4JyA/ICc6JyArIHVzZXIgOiAnJ30gJHtcbiAgICAgIGdsb2JhbC5jb25maWcucm9vdERpclxuICAgIH0vJHtwcm9qZWN0fS9ub2RlX21vZHVsZXNgXG4gICAgc2hlbGwubWtkaXIoJy1wJywgYCR7Z2xvYmFsLmNvbmZpZy5yb290RGlyfS8ke3Byb2plY3R9L25vZGVfbW9kdWxlc2ApXG4gICAgY29uc3QgcHJvbWlzZSA9IGV4ZWNBc3luYyhjbWQpLnRoZW4oZXhlY1Jlc3VsdCA9PiB7XG4gICAgICBsb2coY2hhbGsuZ3JlZW4oYERPTkUgLSAke3Byb2plY3R9YCkpXG4gICAgICByZXR1cm4geyBbcHJvamVjdF06IGV4ZWNSZXN1bHQgfVxuICAgIH0pXG4gICAgcHJvbWlzZXMucHVzaChwcm9taXNlKVxuICB9XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKVxuICBwcmludE1lc3NhZ2UoYXNzaWduSW4oe30sIC4uLnJlc3VsdCkpXG59XG4iXX0=