"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const lodash_1 = require("lodash");
const common_1 = require("lib/common");
const chalk_1 = __importDefault(require("chalk"));
const util_1 = require("lib/util");
const main_1 = __importDefault(require("lib/main"));
const shelljs_1 = __importDefault(require("shelljs"));
const cleanMenu = {
    type: 'list',
    name: 'npmi',
    message: 'NPM install action?',
    choices: [
        { name: 'Locally', value: 'local' },
        { name: 'In Docker', value: 'docker' },
        new inquirer_1.default.Separator(),
        { name: 'Go Back', value: 'back' },
    ],
};
function run() {
    inquirer_1.default.prompt(cleanMenu).then(async (answers) => {
        switch (answers['npmi']) {
            case 'local':
                await localInstall();
                break;
            case 'docker':
                await dockerInstall();
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
async function localInstall() {
    const promises = [];
    for (const project of global.config.projects) {
        const cmd = `cd ${global.config.rootDir}/${project} && npm i`;
        const promise = util_1.execAsync(cmd).then(result => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: result };
        });
        promises.push(promise);
    }
    const result = await Promise.all(promises);
    common_1.printMessage(lodash_1.assignIn({}, ...result));
}
async function dockerInstall() {
    shelljs_1.default.cd(global.config.rootDir);
    const promises = [];
    for (const project of global.config.projects) {
        const cmd = `docker-compose -f docker-compose.tty.yml run --rm --no-deps ${project} sh -c "npm i"`;
        const promise = util_1.execAsync(cmd).then(result => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: result };
        });
        promises.push(promise);
    }
    const result = await Promise.all(promises);
    common_1.printMessage(lodash_1.assignIn({}, ...result));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbnBtaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFrRTtBQUNsRSxtQ0FBaUM7QUFDakMsdUNBQXlDO0FBQ3pDLGtEQUF5QjtBQUN6QixtQ0FBeUM7QUFDekMsb0RBQStCO0FBQy9CLHNEQUEyQjtBQUUzQixNQUFNLFNBQVMsR0FBc0I7SUFDbkMsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU8sRUFBRSxxQkFBcUI7SUFDOUIsT0FBTyxFQUFFO1FBQ1AsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7UUFDbkMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7UUFDdEMsSUFBSSxrQkFBUSxDQUFDLFNBQVMsRUFBRTtRQUN4QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtLQUNOO0NBQy9CLENBQUE7QUFFRCxTQUFnQixHQUFHO0lBQ2pCLGtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUU7UUFDOUMsUUFBUSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsS0FBSyxPQUFPO2dCQUNWLE1BQU0sWUFBWSxFQUFFLENBQUE7Z0JBQ3BCLE1BQUs7WUFDUCxLQUFLLFFBQVE7Z0JBQ1gsTUFBTSxhQUFhLEVBQUUsQ0FBQTtnQkFDckIsTUFBSztZQUNQLEtBQUssTUFBTTtnQkFDVCxPQUFPLGNBQVEsRUFBRSxDQUFBO1lBQ25CO2dCQUNFLFVBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQTtTQUNsRDtRQUNELEdBQUcsRUFBRSxDQUFBO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBaEJELGtCQWdCQztBQUVELEtBQUssVUFBVSxZQUFZO0lBQ3pCLE1BQU0sUUFBUSxHQUFVLEVBQUUsQ0FBQTtJQUMxQixLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQzVDLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxXQUFXLENBQUE7UUFDN0QsTUFBTSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0MsVUFBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDckMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ3ZCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLHFCQUFZLENBQUMsaUJBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLENBQUM7QUFFRCxLQUFLLFVBQVUsYUFBYTtJQUMxQixpQkFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9CLE1BQU0sUUFBUSxHQUFVLEVBQUUsQ0FBQTtJQUMxQixLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQzVDLE1BQU0sR0FBRyxHQUFHLCtEQUErRCxPQUFPLGdCQUFnQixDQUFBO1FBQ2xHLE1BQU0sT0FBTyxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNDLFVBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUN2QjtJQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxxQkFBWSxDQUFDLGlCQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUN2QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlucXVpcmVyLCB7IEFuc3dlcnMsIENob2ljZVR5cGUsIFF1ZXN0aW9uIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgeyBhc3NpZ25JbiB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7IHByaW50TWVzc2FnZSB9IGZyb20gJ2xpYi9jb21tb24nXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgeyBleGVjQXN5bmMsIGxvZyB9IGZyb20gJ2xpYi91dGlsJ1xuaW1wb3J0IG1haW5NZW51IGZyb20gJ2xpYi9tYWluJ1xuaW1wb3J0IHNoZWxsIGZyb20gJ3NoZWxsanMnXG5cbmNvbnN0IGNsZWFuTWVudTogUXVlc3Rpb248QW5zd2Vycz4gPSB7XG4gIHR5cGU6ICdsaXN0JyxcbiAgbmFtZTogJ25wbWknLFxuICBtZXNzYWdlOiAnTlBNIGluc3RhbGwgYWN0aW9uPycsXG4gIGNob2ljZXM6IFtcbiAgICB7IG5hbWU6ICdMb2NhbGx5JywgdmFsdWU6ICdsb2NhbCcgfSxcbiAgICB7IG5hbWU6ICdJbiBEb2NrZXInLCB2YWx1ZTogJ2RvY2tlcicgfSxcbiAgICBuZXcgaW5xdWlyZXIuU2VwYXJhdG9yKCksXG4gICAgeyBuYW1lOiAnR28gQmFjaycsIHZhbHVlOiAnYmFjaycgfSxcbiAgXSBhcyBSZWFkb25seUFycmF5PENob2ljZVR5cGU+LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKCkge1xuICBpbnF1aXJlci5wcm9tcHQoY2xlYW5NZW51KS50aGVuKGFzeW5jIGFuc3dlcnMgPT4ge1xuICAgIHN3aXRjaCAoYW5zd2Vyc1snbnBtaSddKSB7XG4gICAgICBjYXNlICdsb2NhbCc6XG4gICAgICAgIGF3YWl0IGxvY2FsSW5zdGFsbCgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdkb2NrZXInOlxuICAgICAgICBhd2FpdCBkb2NrZXJJbnN0YWxsKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2JhY2snOlxuICAgICAgICByZXR1cm4gbWFpbk1lbnUoKVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nKGNoYWxrLnJlZCgnZXJyb3Igc2VsZWN0aW5nIGNsZWFuIGNvbW1hbmQnKSlcbiAgICB9XG4gICAgcnVuKClcbiAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9jYWxJbnN0YWxsKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBwcm9taXNlczogYW55W10gPSBbXVxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgIGNvbnN0IGNtZCA9IGBjZCAke2dsb2JhbC5jb25maWcucm9vdERpcn0vJHtwcm9qZWN0fSAmJiBucG0gaWBcbiAgICBjb25zdCBwcm9taXNlID0gZXhlY0FzeW5jKGNtZCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgbG9nKGNoYWxrLmdyZWVuKGBET05FIC0gJHtwcm9qZWN0fWApKVxuICAgICAgcmV0dXJuIHsgW3Byb2plY3RdOiByZXN1bHQgfVxuICAgIH0pXG4gICAgcHJvbWlzZXMucHVzaChwcm9taXNlKVxuICB9XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKVxuICBwcmludE1lc3NhZ2UoYXNzaWduSW4oe30sIC4uLnJlc3VsdCkpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvY2tlckluc3RhbGwoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHNoZWxsLmNkKGdsb2JhbC5jb25maWcucm9vdERpcilcbiAgY29uc3QgcHJvbWlzZXM6IGFueVtdID0gW11cbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIGdsb2JhbC5jb25maWcucHJvamVjdHMpIHtcbiAgICBjb25zdCBjbWQgPSBgZG9ja2VyLWNvbXBvc2UgLWYgZG9ja2VyLWNvbXBvc2UudHR5LnltbCBydW4gLS1ybSAtLW5vLWRlcHMgJHtwcm9qZWN0fSBzaCAtYyBcIm5wbSBpXCJgXG4gICAgY29uc3QgcHJvbWlzZSA9IGV4ZWNBc3luYyhjbWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGxvZyhjaGFsay5ncmVlbihgRE9ORSAtICR7cHJvamVjdH1gKSlcbiAgICAgIHJldHVybiB7IFtwcm9qZWN0XTogcmVzdWx0IH1cbiAgICB9KVxuICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSlcbiAgfVxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcbiAgcHJpbnRNZXNzYWdlKGFzc2lnbkluKHt9LCAuLi5yZXN1bHQpKVxufVxuIl19