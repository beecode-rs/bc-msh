"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const lodash_1 = require("lodash");
const common_1 = require("lib/common");
const chalk_1 = __importDefault(require("chalk"));
const main_1 = __importDefault(require("lib/main"));
const util_1 = require("lib/util");
const cleanMenu = {
    type: 'list',
    name: 'clean',
    message: 'Clean action?',
    choices: [
        { name: 'NPM', value: 'npm' },
        { name: 'Docker Images', value: 'docker' },
        new inquirer_1.default.Separator(),
        { name: 'Go Back', value: 'back' },
    ],
};
function run() {
    inquirer_1.default.prompt(cleanMenu).then(async (answers) => {
        switch (answers['clean']) {
            case 'npm':
                await cleanNpm();
                break;
            case 'docker':
                await cleanDockerImages();
                break;
            case 'back':
                return main_1.default();
            default:
                util_1.log(chalk_1.default.red('error selecting clean command'));
        }
        run();
    });
}
exports.run = run;
async function cleanNpm() {
    const promises = [];
    for (const project of global.config.projects) {
        const cmd = `rm -rf ${global.config.rootDir}/${project}/node_modules/*`;
        const promise = util_1.execAsync(cmd).then(result => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: result };
        });
        promises.push(promise);
    }
    const result = await Promise.all(promises);
    common_1.printMessage(lodash_1.assignIn({}, ...result));
}
async function cleanDockerImages() {
    for (const image of [
        ...global.config.projects.map(proj => `${global.config.git.projectPrefix}_${proj}`),
        ...global.config.dockerBaseImages,
    ]) {
        const result = await util_1.execAsync(`docker rmi ${image}`);
        util_1.log(chalk_1.default.cyan(image));
        if (!result.error)
            util_1.log(result.stdout);
        else
            util_1.log(chalk_1.default.red(result.stderr));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2NsZWFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWtFO0FBQ2xFLG1DQUFpQztBQUNqQyx1Q0FBeUM7QUFDekMsa0RBQXlCO0FBQ3pCLG9EQUErQjtBQUMvQixtQ0FBeUM7QUFFekMsTUFBTSxTQUFTLEdBQXNCO0lBQ25DLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE9BQU87SUFDYixPQUFPLEVBQUUsZUFBZTtJQUN4QixPQUFPLEVBQUU7UUFDUCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtRQUM3QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUMxQyxJQUFJLGtCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0tBQ047Q0FDL0IsQ0FBQTtBQUVELFNBQWdCLEdBQUc7SUFDakIsa0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBRTtRQUM5QyxRQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4QixLQUFLLEtBQUs7Z0JBQ1IsTUFBTSxRQUFRLEVBQUUsQ0FBQTtnQkFDaEIsTUFBSztZQUNQLEtBQUssUUFBUTtnQkFDWCxNQUFNLGlCQUFpQixFQUFFLENBQUE7Z0JBQ3pCLE1BQUs7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxjQUFRLEVBQUUsQ0FBQTtZQUNuQjtnQkFDRSxVQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUE7U0FDbEQ7UUFDRCxHQUFHLEVBQUUsQ0FBQTtJQUNQLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQWhCRCxrQkFnQkM7QUFFRCxLQUFLLFVBQVUsUUFBUTtJQUNyQixNQUFNLFFBQVEsR0FBVSxFQUFFLENBQUE7SUFDMUIsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUM1QyxNQUFNLEdBQUcsR0FBRyxVQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8saUJBQWlCLENBQUE7UUFDdkUsTUFBTSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0MsVUFBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDckMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ3ZCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLHFCQUFZLENBQUMsaUJBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLENBQUM7QUFFRCxLQUFLLFVBQVUsaUJBQWlCO0lBQzlCLEtBQUssTUFBTSxLQUFLLElBQUk7UUFDbEIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuRixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO0tBQ2xDLEVBQUU7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLGdCQUFTLENBQUMsY0FBYyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ3JELFVBQUcsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQUUsVUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTs7WUFDaEMsVUFBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7S0FDbkM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlucXVpcmVyLCB7IEFuc3dlcnMsIENob2ljZVR5cGUsIFF1ZXN0aW9uIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgeyBhc3NpZ25JbiB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7IHByaW50TWVzc2FnZSB9IGZyb20gJ2xpYi9jb21tb24nXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgbWFpbk1lbnUgZnJvbSAnbGliL21haW4nXG5pbXBvcnQgeyBleGVjQXN5bmMsIGxvZyB9IGZyb20gJ2xpYi91dGlsJ1xuXG5jb25zdCBjbGVhbk1lbnU6IFF1ZXN0aW9uPEFuc3dlcnM+ID0ge1xuICB0eXBlOiAnbGlzdCcsXG4gIG5hbWU6ICdjbGVhbicsXG4gIG1lc3NhZ2U6ICdDbGVhbiBhY3Rpb24/JyxcbiAgY2hvaWNlczogW1xuICAgIHsgbmFtZTogJ05QTScsIHZhbHVlOiAnbnBtJyB9LFxuICAgIHsgbmFtZTogJ0RvY2tlciBJbWFnZXMnLCB2YWx1ZTogJ2RvY2tlcicgfSxcbiAgICBuZXcgaW5xdWlyZXIuU2VwYXJhdG9yKCksXG4gICAgeyBuYW1lOiAnR28gQmFjaycsIHZhbHVlOiAnYmFjaycgfSxcbiAgXSBhcyBSZWFkb25seUFycmF5PENob2ljZVR5cGU+LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKCkge1xuICBpbnF1aXJlci5wcm9tcHQoY2xlYW5NZW51KS50aGVuKGFzeW5jIGFuc3dlcnMgPT4ge1xuICAgIHN3aXRjaCAoYW5zd2Vyc1snY2xlYW4nXSkge1xuICAgICAgY2FzZSAnbnBtJzpcbiAgICAgICAgYXdhaXQgY2xlYW5OcG0oKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZG9ja2VyJzpcbiAgICAgICAgYXdhaXQgY2xlYW5Eb2NrZXJJbWFnZXMoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnYmFjayc6XG4gICAgICAgIHJldHVybiBtYWluTWVudSgpXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2coY2hhbGsucmVkKCdlcnJvciBzZWxlY3RpbmcgY2xlYW4gY29tbWFuZCcpKVxuICAgIH1cbiAgICBydW4oKVxuICB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbk5wbSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgcHJvbWlzZXM6IGFueVtdID0gW11cbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIGdsb2JhbC5jb25maWcucHJvamVjdHMpIHtcbiAgICBjb25zdCBjbWQgPSBgcm0gLXJmICR7Z2xvYmFsLmNvbmZpZy5yb290RGlyfS8ke3Byb2plY3R9L25vZGVfbW9kdWxlcy8qYFxuICAgIGNvbnN0IHByb21pc2UgPSBleGVjQXN5bmMoY21kKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBsb2coY2hhbGsuZ3JlZW4oYERPTkUgLSAke3Byb2plY3R9YCkpXG4gICAgICByZXR1cm4geyBbcHJvamVjdF06IHJlc3VsdCB9XG4gICAgfSlcbiAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpXG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gIHByaW50TWVzc2FnZShhc3NpZ25Jbih7fSwgLi4ucmVzdWx0KSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Eb2NrZXJJbWFnZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGZvciAoY29uc3QgaW1hZ2Ugb2YgW1xuICAgIC4uLmdsb2JhbC5jb25maWcucHJvamVjdHMubWFwKHByb2ogPT4gYCR7Z2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeH1fJHtwcm9qfWApLFxuICAgIC4uLmdsb2JhbC5jb25maWcuZG9ja2VyQmFzZUltYWdlcyxcbiAgXSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWNBc3luYyhgZG9ja2VyIHJtaSAke2ltYWdlfWApXG4gICAgbG9nKGNoYWxrLmN5YW4oaW1hZ2UpKVxuICAgIGlmICghcmVzdWx0LmVycm9yKSBsb2cocmVzdWx0LnN0ZG91dClcbiAgICBlbHNlIGxvZyhjaGFsay5yZWQocmVzdWx0LnN0ZGVycikpXG4gIH1cbn1cbiJdfQ==