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
        switch (answers.clean) {
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
        const promise = util_1.execAsync(cmd).then(execResult => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: execResult };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2NsZWFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQXlCO0FBQ3pCLHdEQUFrRTtBQUNsRSx1Q0FBeUM7QUFDekMsb0RBQStCO0FBQy9CLG1DQUF5QztBQUN6QyxtQ0FBaUM7QUFFakMsTUFBTSxTQUFTLEdBQXNCO0lBQ25DLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE9BQU87SUFDYixPQUFPLEVBQUUsZUFBZTtJQUN4QixPQUFPLEVBQUU7UUFDUCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtRQUM3QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUMxQyxJQUFJLGtCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0tBQ047Q0FDL0IsQ0FBQTtBQUVELFNBQWdCLEdBQUc7SUFDakIsa0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBRTtRQUM5QyxRQUFRLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDckIsS0FBSyxLQUFLO2dCQUNSLE1BQU0sUUFBUSxFQUFFLENBQUE7Z0JBQ2hCLE1BQUs7WUFDUCxLQUFLLFFBQVE7Z0JBQ1gsTUFBTSxpQkFBaUIsRUFBRSxDQUFBO2dCQUN6QixNQUFLO1lBQ1AsS0FBSyxNQUFNO2dCQUNULE9BQU8sY0FBUSxFQUFFLENBQUE7WUFDbkI7Z0JBQ0UsVUFBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQyxDQUFBO1NBQ2xEO1FBQ0QsR0FBRyxFQUFFLENBQUE7SUFDUCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFoQkQsa0JBZ0JDO0FBRUQsS0FBSyxVQUFVLFFBQVE7SUFDckIsTUFBTSxRQUFRLEdBQVUsRUFBRSxDQUFBO0lBQzFCLEtBQUssTUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDNUMsTUFBTSxHQUFHLEdBQUcsVUFBVSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLGlCQUFpQixDQUFBO1FBQ3ZFLE1BQU0sT0FBTyxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQy9DLFVBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUN2QjtJQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxxQkFBWSxDQUFDLGlCQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUN2QyxDQUFDO0FBRUQsS0FBSyxVQUFVLGlCQUFpQjtJQUM5QixLQUFLLE1BQU0sS0FBSyxJQUFJO1FBQ2xCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFLENBQUM7UUFDbkYsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtLQUNsQyxFQUFFO1FBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxnQkFBUyxDQUFDLGNBQWMsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUNyRCxVQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUFFLFVBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7O1lBQ2hDLFVBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0tBQ25DO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCBpbnF1aXJlciwgeyBBbnN3ZXJzLCBDaG9pY2VUeXBlLCBRdWVzdGlvbiB9IGZyb20gJ2lucXVpcmVyJ1xuaW1wb3J0IHsgcHJpbnRNZXNzYWdlIH0gZnJvbSAnbGliL2NvbW1vbidcbmltcG9ydCBtYWluTWVudSBmcm9tICdsaWIvbWFpbidcbmltcG9ydCB7IGV4ZWNBc3luYywgbG9nIH0gZnJvbSAnbGliL3V0aWwnXG5pbXBvcnQgeyBhc3NpZ25JbiB9IGZyb20gJ2xvZGFzaCdcblxuY29uc3QgY2xlYW5NZW51OiBRdWVzdGlvbjxBbnN3ZXJzPiA9IHtcbiAgdHlwZTogJ2xpc3QnLFxuICBuYW1lOiAnY2xlYW4nLFxuICBtZXNzYWdlOiAnQ2xlYW4gYWN0aW9uPycsXG4gIGNob2ljZXM6IFtcbiAgICB7IG5hbWU6ICdOUE0nLCB2YWx1ZTogJ25wbScgfSxcbiAgICB7IG5hbWU6ICdEb2NrZXIgSW1hZ2VzJywgdmFsdWU6ICdkb2NrZXInIH0sXG4gICAgbmV3IGlucXVpcmVyLlNlcGFyYXRvcigpLFxuICAgIHsgbmFtZTogJ0dvIEJhY2snLCB2YWx1ZTogJ2JhY2snIH0sXG4gIF0gYXMgUmVhZG9ubHlBcnJheTxDaG9pY2VUeXBlPixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bigpOiB2b2lkIHtcbiAgaW5xdWlyZXIucHJvbXB0KGNsZWFuTWVudSkudGhlbihhc3luYyBhbnN3ZXJzID0+IHtcbiAgICBzd2l0Y2ggKGFuc3dlcnMuY2xlYW4pIHtcbiAgICAgIGNhc2UgJ25wbSc6XG4gICAgICAgIGF3YWl0IGNsZWFuTnBtKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2RvY2tlcic6XG4gICAgICAgIGF3YWl0IGNsZWFuRG9ja2VySW1hZ2VzKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2JhY2snOlxuICAgICAgICByZXR1cm4gbWFpbk1lbnUoKVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nKGNoYWxrLnJlZCgnZXJyb3Igc2VsZWN0aW5nIGNsZWFuIGNvbW1hbmQnKSlcbiAgICB9XG4gICAgcnVuKClcbiAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5OcG0oKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHByb21pc2VzOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgY29uc3QgY21kID0gYHJtIC1yZiAke2dsb2JhbC5jb25maWcucm9vdERpcn0vJHtwcm9qZWN0fS9ub2RlX21vZHVsZXMvKmBcbiAgICBjb25zdCBwcm9taXNlID0gZXhlY0FzeW5jKGNtZCkudGhlbihleGVjUmVzdWx0ID0+IHtcbiAgICAgIGxvZyhjaGFsay5ncmVlbihgRE9ORSAtICR7cHJvamVjdH1gKSlcbiAgICAgIHJldHVybiB7IFtwcm9qZWN0XTogZXhlY1Jlc3VsdCB9XG4gICAgfSlcbiAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpXG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gIHByaW50TWVzc2FnZShhc3NpZ25Jbih7fSwgLi4ucmVzdWx0KSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Eb2NrZXJJbWFnZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGZvciAoY29uc3QgaW1hZ2Ugb2YgW1xuICAgIC4uLmdsb2JhbC5jb25maWcucHJvamVjdHMubWFwKHByb2ogPT4gYCR7Z2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeH1fJHtwcm9qfWApLFxuICAgIC4uLmdsb2JhbC5jb25maWcuZG9ja2VyQmFzZUltYWdlcyxcbiAgXSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWNBc3luYyhgZG9ja2VyIHJtaSAke2ltYWdlfWApXG4gICAgbG9nKGNoYWxrLmN5YW4oaW1hZ2UpKVxuICAgIGlmICghcmVzdWx0LmVycm9yKSBsb2cocmVzdWx0LnN0ZG91dClcbiAgICBlbHNlIGxvZyhjaGFsay5yZWQocmVzdWx0LnN0ZGVycikpXG4gIH1cbn1cbiJdfQ==