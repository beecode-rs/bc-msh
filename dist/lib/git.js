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
        switch (answers.git) {
            case 'clone':
                await clone();
                break;
            case 'back':
                return main_1.default();
            default:
                await gitCommand(answers.git);
        }
        run();
    });
}
exports.run = run;
async function gitCommand(command) {
    const promises = [];
    for (const project of global.config.projects) {
        const cmd = `git -C ${global.config.rootDir}/${project} ${command}`;
        const promise = util_1.execAsync(cmd).then(execResult => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: execResult };
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
        const promise = util_1.execAsync(cmd).then(execResult => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: execResult };
        });
        promises.push(promise);
    }
    const result = await Promise.all(promises);
    common_1.printMessage(lodash_1.assignIn({}, ...result));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9naXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBeUI7QUFDekIsd0RBQWtFO0FBQ2xFLHVDQUF5QztBQUN6QyxvREFBK0I7QUFDL0IsbUNBQXlDO0FBQ3pDLG1DQUFpQztBQUNqQyxzREFBMkI7QUFFM0IsTUFBTSxPQUFPLEdBQXNCO0lBQ2pDLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLEtBQUs7SUFDWCxPQUFPLEVBQUUsYUFBYTtJQUN0QixPQUFPLEVBQUU7UUFDUCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUNuQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUNqQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtRQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUNqQyxJQUFJLGtCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0tBQ047Q0FDL0IsQ0FBQTtBQUVELFNBQWdCLEdBQUc7SUFDakIsa0JBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBRTtRQUM1QyxRQUFRLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbkIsS0FBSyxPQUFPO2dCQUNWLE1BQU0sS0FBSyxFQUFFLENBQUE7Z0JBQ2IsTUFBSztZQUNQLEtBQUssTUFBTTtnQkFDVCxPQUFPLGNBQVEsRUFBRSxDQUFBO1lBQ25CO2dCQUNFLE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNoQztRQUNELEdBQUcsRUFBRSxDQUFBO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBYkQsa0JBYUM7QUFFRCxLQUFLLFVBQVUsVUFBVSxDQUFDLE9BQU87SUFDL0IsTUFBTSxRQUFRLEdBQVUsRUFBRSxDQUFBO0lBQzFCLEtBQUssTUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDNUMsTUFBTSxHQUFHLEdBQUcsVUFBVSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFLENBQUE7UUFDbkUsTUFBTSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDL0MsVUFBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDckMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUE7UUFDbEMsQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ3ZCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLHFCQUFZLENBQUMsaUJBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLENBQUM7QUFFRCxLQUFLLFVBQVUsS0FBSztJQUNsQixpQkFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9CLE1BQU0sUUFBUSxHQUFVLEVBQUUsQ0FBQTtJQUMxQixLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQzVDLE1BQU0sR0FBRyxHQUFHLGlCQUFpQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUMzRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUNwQixJQUFJLE9BQU8sUUFBUSxPQUFPLEVBQUUsQ0FBQTtRQUM1QixNQUFNLE9BQU8sR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMvQyxVQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNyQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQTtRQUNsQyxDQUFDLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDdkI7SUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUMscUJBQVksQ0FBQyxpQkFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDdkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCBpbnF1aXJlciwgeyBBbnN3ZXJzLCBDaG9pY2VUeXBlLCBRdWVzdGlvbiB9IGZyb20gJ2lucXVpcmVyJ1xuaW1wb3J0IHsgcHJpbnRNZXNzYWdlIH0gZnJvbSAnbGliL2NvbW1vbidcbmltcG9ydCBtYWluTWVudSBmcm9tICdsaWIvbWFpbidcbmltcG9ydCB7IGV4ZWNBc3luYywgbG9nIH0gZnJvbSAnbGliL3V0aWwnXG5pbXBvcnQgeyBhc3NpZ25JbiB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJ1xuXG5jb25zdCBnaXRNZW51OiBRdWVzdGlvbjxBbnN3ZXJzPiA9IHtcbiAgdHlwZTogJ2xpc3QnLFxuICBuYW1lOiAnZ2l0JyxcbiAgbWVzc2FnZTogJ0dpdCBhY3Rpb24/JyxcbiAgY2hvaWNlczogW1xuICAgIHsgbmFtZTogJ1N0YXR1cycsIHZhbHVlOiAnc3RhdHVzJyB9LFxuICAgIHsgbmFtZTogJ0ZldGNoJywgdmFsdWU6ICdmZXRjaCcgfSxcbiAgICB7IG5hbWU6ICdQdWxsJywgdmFsdWU6ICdwdWxsJyB9LFxuICAgIHsgbmFtZTogJ0Nsb25lJywgdmFsdWU6ICdjbG9uZScgfSxcbiAgICBuZXcgaW5xdWlyZXIuU2VwYXJhdG9yKCksXG4gICAgeyBuYW1lOiAnR28gQmFjaycsIHZhbHVlOiAnYmFjaycgfSxcbiAgXSBhcyBSZWFkb25seUFycmF5PENob2ljZVR5cGU+LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKCk6IHZvaWQge1xuICBpbnF1aXJlci5wcm9tcHQoZ2l0TWVudSkudGhlbihhc3luYyBhbnN3ZXJzID0+IHtcbiAgICBzd2l0Y2ggKGFuc3dlcnMuZ2l0KSB7XG4gICAgICBjYXNlICdjbG9uZSc6XG4gICAgICAgIGF3YWl0IGNsb25lKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2JhY2snOlxuICAgICAgICByZXR1cm4gbWFpbk1lbnUoKVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXdhaXQgZ2l0Q29tbWFuZChhbnN3ZXJzLmdpdClcbiAgICB9XG4gICAgcnVuKClcbiAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2l0Q29tbWFuZChjb21tYW5kKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHByb21pc2VzOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgY29uc3QgY21kID0gYGdpdCAtQyAke2dsb2JhbC5jb25maWcucm9vdERpcn0vJHtwcm9qZWN0fSAke2NvbW1hbmR9YFxuICAgIGNvbnN0IHByb21pc2UgPSBleGVjQXN5bmMoY21kKS50aGVuKGV4ZWNSZXN1bHQgPT4ge1xuICAgICAgbG9nKGNoYWxrLmdyZWVuKGBET05FIC0gJHtwcm9qZWN0fWApKVxuICAgICAgcmV0dXJuIHsgW3Byb2plY3RdOiBleGVjUmVzdWx0IH1cbiAgICB9KVxuICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSlcbiAgfVxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcbiAgcHJpbnRNZXNzYWdlKGFzc2lnbkluKHt9LCAuLi5yZXN1bHQpKVxufVxuXG5hc3luYyBmdW5jdGlvbiBjbG9uZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgc2hlbGwuY2QoZ2xvYmFsLmNvbmZpZy5yb290RGlyKVxuICBjb25zdCBwcm9taXNlczogYW55W10gPSBbXVxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgIGNvbnN0IGNtZCA9IGBnaXQgY2xvbmUgZ2l0QCR7Z2xvYmFsLmNvbmZpZy5naXQuaG9zdH06JHtnbG9iYWwuY29uZmlnLmdpdC50ZWFtfS8ke1xuICAgICAgZ2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeFxuICAgIH0tJHtwcm9qZWN0fS5naXQgJHtwcm9qZWN0fWBcbiAgICBjb25zdCBwcm9taXNlID0gZXhlY0FzeW5jKGNtZCkudGhlbihleGVjUmVzdWx0ID0+IHtcbiAgICAgIGxvZyhjaGFsay5ncmVlbihgRE9ORSAtICR7cHJvamVjdH1gKSlcbiAgICAgIHJldHVybiB7IFtwcm9qZWN0XTogZXhlY1Jlc3VsdCB9XG4gICAgfSlcbiAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpXG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gIHByaW50TWVzc2FnZShhc3NpZ25Jbih7fSwgLi4ucmVzdWx0KSlcbn1cbiJdfQ==