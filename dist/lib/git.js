"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const shelljs_1 = __importDefault(require("shelljs"));
const lodash_1 = require("lodash");
const common_1 = require("lib/common");
const util_1 = require("lib/util");
const main_1 = __importDefault(require("lib/main"));
const chalk_1 = __importDefault(require("chalk"));
const gitMenu = {
    type: 'list',
    name: 'git',
    message: 'Git action?',
    choices: [
        { name: 'Status', value: 'status' },
        { name: 'Fetch', value: 'fetch' },
        { name: 'Pull', value: 'pull' },
        { name: 'Clone', value: 'clone' },
        new inquirer_1.default.Separator(),
        { name: 'Go Back', value: 'back' },
    ],
};
function run() {
    inquirer_1.default.prompt(gitMenu).then(async (answers) => {
        switch (answers['git']) {
            case 'clone':
                await clone();
                break;
            case 'back':
                return main_1.default();
            default:
                await gitCommand(answers['git']);
        }
        run();
    });
}
exports.run = run;
async function gitCommand(command) {
    const promises = [];
    for (const project of global.config.projects) {
        const cmd = `git -C ${global.config.rootDir}/${project} ${command}`;
        const promise = util_1.execAsync(cmd).then(result => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: result };
        });
        promises.push(promise);
    }
    const result = await Promise.all(promises);
    common_1.printMessage(lodash_1.assignIn({}, ...result));
}
async function clone() {
    shelljs_1.default.cd(global.config.rootDir);
    const promises = [];
    for (const project of global.config.projects) {
        const cmd = `git clone git@${global.config.git.host}:${global.config.git.team}/${global.config.git.projectPrefix}-${project}.git ${project}`;
        const promise = util_1.execAsync(cmd).then(result => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: result };
        });
        promises.push(promise);
    }
    const result = await Promise.all(promises);
    common_1.printMessage(lodash_1.assignIn({}, ...result));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9naXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBa0U7QUFDbEUsc0RBQTJCO0FBQzNCLG1DQUFpQztBQUNqQyx1Q0FBeUM7QUFDekMsbUNBQXlDO0FBQ3pDLG9EQUErQjtBQUMvQixrREFBeUI7QUFFekIsTUFBTSxPQUFPLEdBQXNCO0lBQ2pDLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLEtBQUs7SUFDWCxPQUFPLEVBQUUsYUFBYTtJQUN0QixPQUFPLEVBQUU7UUFDUCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUNuQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUNqQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtRQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUNqQyxJQUFJLGtCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0tBQ047Q0FDL0IsQ0FBQTtBQUVELFNBQWdCLEdBQUc7SUFDakIsa0JBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBRTtRQUM1QyxRQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixLQUFLLE9BQU87Z0JBQ1YsTUFBTSxLQUFLLEVBQUUsQ0FBQTtnQkFDYixNQUFLO1lBQ1AsS0FBSyxNQUFNO2dCQUNULE9BQU8sY0FBUSxFQUFFLENBQUE7WUFDbkI7Z0JBQ0UsTUFBTSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7U0FDbkM7UUFDRCxHQUFHLEVBQUUsQ0FBQTtJQUNQLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQWJELGtCQWFDO0FBRUQsS0FBSyxVQUFVLFVBQVUsQ0FBQyxPQUFPO0lBQy9CLE1BQU0sUUFBUSxHQUFVLEVBQUUsQ0FBQTtJQUMxQixLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQzVDLE1BQU0sR0FBRyxHQUFHLFVBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFBO1FBQ25FLE1BQU0sT0FBTyxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNDLFVBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUN2QjtJQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxxQkFBWSxDQUFDLGlCQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUN2QyxDQUFDO0FBRUQsS0FBSyxVQUFVLEtBQUs7SUFDbEIsaUJBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMvQixNQUFNLFFBQVEsR0FBVSxFQUFFLENBQUE7SUFDMUIsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUM1QyxNQUFNLEdBQUcsR0FBRyxpQkFBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksSUFDM0UsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFDcEIsSUFBSSxPQUFPLFFBQVEsT0FBTyxFQUFFLENBQUE7UUFDNUIsTUFBTSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0MsVUFBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDckMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ3ZCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLHFCQUFZLENBQUMsaUJBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW5xdWlyZXIsIHsgQW5zd2VycywgQ2hvaWNlVHlwZSwgUXVlc3Rpb24gfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJ1xuaW1wb3J0IHsgYXNzaWduSW4gfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBwcmludE1lc3NhZ2UgfSBmcm9tICdsaWIvY29tbW9uJ1xuaW1wb3J0IHsgZXhlY0FzeW5jLCBsb2cgfSBmcm9tICdsaWIvdXRpbCdcbmltcG9ydCBtYWluTWVudSBmcm9tICdsaWIvbWFpbidcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcblxuY29uc3QgZ2l0TWVudTogUXVlc3Rpb248QW5zd2Vycz4gPSB7XG4gIHR5cGU6ICdsaXN0JyxcbiAgbmFtZTogJ2dpdCcsXG4gIG1lc3NhZ2U6ICdHaXQgYWN0aW9uPycsXG4gIGNob2ljZXM6IFtcbiAgICB7IG5hbWU6ICdTdGF0dXMnLCB2YWx1ZTogJ3N0YXR1cycgfSxcbiAgICB7IG5hbWU6ICdGZXRjaCcsIHZhbHVlOiAnZmV0Y2gnIH0sXG4gICAgeyBuYW1lOiAnUHVsbCcsIHZhbHVlOiAncHVsbCcgfSxcbiAgICB7IG5hbWU6ICdDbG9uZScsIHZhbHVlOiAnY2xvbmUnIH0sXG4gICAgbmV3IGlucXVpcmVyLlNlcGFyYXRvcigpLFxuICAgIHsgbmFtZTogJ0dvIEJhY2snLCB2YWx1ZTogJ2JhY2snIH0sXG4gIF0gYXMgUmVhZG9ubHlBcnJheTxDaG9pY2VUeXBlPixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bigpIHtcbiAgaW5xdWlyZXIucHJvbXB0KGdpdE1lbnUpLnRoZW4oYXN5bmMgYW5zd2VycyA9PiB7XG4gICAgc3dpdGNoIChhbnN3ZXJzWydnaXQnXSkge1xuICAgICAgY2FzZSAnY2xvbmUnOlxuICAgICAgICBhd2FpdCBjbG9uZSgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdiYWNrJzpcbiAgICAgICAgcmV0dXJuIG1haW5NZW51KClcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGF3YWl0IGdpdENvbW1hbmQoYW5zd2Vyc1snZ2l0J10pXG4gICAgfVxuICAgIHJ1bigpXG4gIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdpdENvbW1hbmQoY29tbWFuZCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBwcm9taXNlczogYW55W10gPSBbXVxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgIGNvbnN0IGNtZCA9IGBnaXQgLUMgJHtnbG9iYWwuY29uZmlnLnJvb3REaXJ9LyR7cHJvamVjdH0gJHtjb21tYW5kfWBcbiAgICBjb25zdCBwcm9taXNlID0gZXhlY0FzeW5jKGNtZCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgbG9nKGNoYWxrLmdyZWVuKGBET05FIC0gJHtwcm9qZWN0fWApKVxuICAgICAgcmV0dXJuIHsgW3Byb2plY3RdOiByZXN1bHQgfVxuICAgIH0pXG4gICAgcHJvbWlzZXMucHVzaChwcm9taXNlKVxuICB9XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKVxuICBwcmludE1lc3NhZ2UoYXNzaWduSW4oe30sIC4uLnJlc3VsdCkpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsb25lKCk6IFByb21pc2U8dm9pZD4ge1xuICBzaGVsbC5jZChnbG9iYWwuY29uZmlnLnJvb3REaXIpXG4gIGNvbnN0IHByb21pc2VzOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgY29uc3QgY21kID0gYGdpdCBjbG9uZSBnaXRAJHtnbG9iYWwuY29uZmlnLmdpdC5ob3N0fToke2dsb2JhbC5jb25maWcuZ2l0LnRlYW19LyR7XG4gICAgICBnbG9iYWwuY29uZmlnLmdpdC5wcm9qZWN0UHJlZml4XG4gICAgfS0ke3Byb2plY3R9LmdpdCAke3Byb2plY3R9YFxuICAgIGNvbnN0IHByb21pc2UgPSBleGVjQXN5bmMoY21kKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBsb2coY2hhbGsuZ3JlZW4oYERPTkUgLSAke3Byb2plY3R9YCkpXG4gICAgICByZXR1cm4geyBbcHJvamVjdF06IHJlc3VsdCB9XG4gICAgfSlcbiAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpXG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gIHByaW50TWVzc2FnZShhc3NpZ25Jbih7fSwgLi4ucmVzdWx0KSlcbn1cbiJdfQ==