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
        const cmd = `cd ${global.config.rootDir}/${project} && npm i --only=dev`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbnBtaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFrRTtBQUNsRSxtQ0FBaUM7QUFDakMsdUNBQXlDO0FBQ3pDLGtEQUF5QjtBQUN6QixtQ0FBeUM7QUFDekMsb0RBQStCO0FBQy9CLHNEQUEyQjtBQUUzQixNQUFNLFNBQVMsR0FBc0I7SUFDbkMsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU8sRUFBRSxxQkFBcUI7SUFDOUIsT0FBTyxFQUFFO1FBQ1AsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7UUFDbkMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7UUFDdEMsSUFBSSxrQkFBUSxDQUFDLFNBQVMsRUFBRTtRQUN4QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtLQUNOO0NBQy9CLENBQUE7QUFFRCxTQUFnQixHQUFHO0lBQ2pCLGtCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUU7UUFDOUMsUUFBUSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsS0FBSyxPQUFPO2dCQUNWLE1BQU0sWUFBWSxFQUFFLENBQUE7Z0JBQ3BCLE1BQUs7WUFDUCxLQUFLLFFBQVE7Z0JBQ1gsTUFBTSxhQUFhLEVBQUUsQ0FBQTtnQkFDckIsTUFBSztZQUNQLEtBQUssTUFBTTtnQkFDVCxPQUFPLGNBQVEsRUFBRSxDQUFBO1lBQ25CO2dCQUNFLFVBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQTtTQUNsRDtRQUNELEdBQUcsRUFBRSxDQUFBO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBaEJELGtCQWdCQztBQUVELEtBQUssVUFBVSxZQUFZO0lBQ3pCLE1BQU0sUUFBUSxHQUFVLEVBQUUsQ0FBQTtJQUMxQixLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQzVDLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxzQkFBc0IsQ0FBQTtRQUN4RSxNQUFNLE9BQU8sR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMzQyxVQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNyQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQTtRQUM5QixDQUFDLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDdkI7SUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUMscUJBQVksQ0FBQyxpQkFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDdkMsQ0FBQztBQUVELEtBQUssVUFBVSxhQUFhO0lBQzFCLGlCQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDL0IsTUFBTSxRQUFRLEdBQVUsRUFBRSxDQUFBO0lBQzFCLEtBQUssTUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDNUMsTUFBTSxHQUFHLEdBQUcsK0RBQStELE9BQU8sZ0JBQWdCLENBQUE7UUFDbEcsTUFBTSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0MsVUFBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDckMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ3ZCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLHFCQUFZLENBQUMsaUJBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW5xdWlyZXIsIHsgQW5zd2VycywgQ2hvaWNlVHlwZSwgUXVlc3Rpb24gfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCB7IGFzc2lnbkluIH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgcHJpbnRNZXNzYWdlIH0gZnJvbSAnbGliL2NvbW1vbidcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB7IGV4ZWNBc3luYywgbG9nIH0gZnJvbSAnbGliL3V0aWwnXG5pbXBvcnQgbWFpbk1lbnUgZnJvbSAnbGliL21haW4nXG5pbXBvcnQgc2hlbGwgZnJvbSAnc2hlbGxqcydcblxuY29uc3QgY2xlYW5NZW51OiBRdWVzdGlvbjxBbnN3ZXJzPiA9IHtcbiAgdHlwZTogJ2xpc3QnLFxuICBuYW1lOiAnbnBtaScsXG4gIG1lc3NhZ2U6ICdOUE0gaW5zdGFsbCBhY3Rpb24/JyxcbiAgY2hvaWNlczogW1xuICAgIHsgbmFtZTogJ0xvY2FsbHknLCB2YWx1ZTogJ2xvY2FsJyB9LFxuICAgIHsgbmFtZTogJ0luIERvY2tlcicsIHZhbHVlOiAnZG9ja2VyJyB9LFxuICAgIG5ldyBpbnF1aXJlci5TZXBhcmF0b3IoKSxcbiAgICB7IG5hbWU6ICdHbyBCYWNrJywgdmFsdWU6ICdiYWNrJyB9LFxuICBdIGFzIFJlYWRvbmx5QXJyYXk8Q2hvaWNlVHlwZT4sXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW4oKSB7XG4gIGlucXVpcmVyLnByb21wdChjbGVhbk1lbnUpLnRoZW4oYXN5bmMgYW5zd2VycyA9PiB7XG4gICAgc3dpdGNoIChhbnN3ZXJzWyducG1pJ10pIHtcbiAgICAgIGNhc2UgJ2xvY2FsJzpcbiAgICAgICAgYXdhaXQgbG9jYWxJbnN0YWxsKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2RvY2tlcic6XG4gICAgICAgIGF3YWl0IGRvY2tlckluc3RhbGwoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnYmFjayc6XG4gICAgICAgIHJldHVybiBtYWluTWVudSgpXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2coY2hhbGsucmVkKCdlcnJvciBzZWxlY3RpbmcgY2xlYW4gY29tbWFuZCcpKVxuICAgIH1cbiAgICBydW4oKVxuICB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2NhbEluc3RhbGwoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHByb21pc2VzOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgY29uc3QgY21kID0gYGNkICR7Z2xvYmFsLmNvbmZpZy5yb290RGlyfS8ke3Byb2plY3R9ICYmIG5wbSBpIC0tb25seT1kZXZgXG4gICAgY29uc3QgcHJvbWlzZSA9IGV4ZWNBc3luYyhjbWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGxvZyhjaGFsay5ncmVlbihgRE9ORSAtICR7cHJvamVjdH1gKSlcbiAgICAgIHJldHVybiB7IFtwcm9qZWN0XTogcmVzdWx0IH1cbiAgICB9KVxuICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSlcbiAgfVxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcbiAgcHJpbnRNZXNzYWdlKGFzc2lnbkluKHt9LCAuLi5yZXN1bHQpKVxufVxuXG5hc3luYyBmdW5jdGlvbiBkb2NrZXJJbnN0YWxsKCk6IFByb21pc2U8dm9pZD4ge1xuICBzaGVsbC5jZChnbG9iYWwuY29uZmlnLnJvb3REaXIpXG4gIGNvbnN0IHByb21pc2VzOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgY29uc3QgY21kID0gYGRvY2tlci1jb21wb3NlIC1mIGRvY2tlci1jb21wb3NlLnR0eS55bWwgcnVuIC0tcm0gLS1uby1kZXBzICR7cHJvamVjdH0gc2ggLWMgXCJucG0gaVwiYFxuICAgIGNvbnN0IHByb21pc2UgPSBleGVjQXN5bmMoY21kKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBsb2coY2hhbGsuZ3JlZW4oYERPTkUgLSAke3Byb2plY3R9YCkpXG4gICAgICByZXR1cm4geyBbcHJvamVjdF06IHJlc3VsdCB9XG4gICAgfSlcbiAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpXG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gIHByaW50TWVzc2FnZShhc3NpZ25Jbih7fSwgLi4ucmVzdWx0KSlcbn1cbiJdfQ==