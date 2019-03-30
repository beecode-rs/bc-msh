"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const compare_versions_1 = __importDefault(require("compare-versions"));
const fs_1 = __importDefault(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const common_1 = require("lib/common");
const main_1 = __importDefault(require("lib/main"));
const util_1 = require("lib/util");
const lodash_1 = require("lodash");
const path = __importStar(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const cleanMenu = {
    type: 'list',
    name: 'npmi',
    message: 'NPM install action?',
    choices: [
        { name: 'Locally', value: 'local' },
        { name: 'In Docker', value: 'docker' },
        { name: 'Global NPM', value: 'global' },
        new inquirer_1.default.Separator(),
        { name: 'Go Back', value: 'back' },
    ],
};
function run() {
    inquirer_1.default.prompt(cleanMenu).then(async (answers) => {
        switch (answers.npmi) {
            case 'local':
                await localInstall();
                break;
            case 'docker':
                await dockerInstall();
                break;
            case 'global':
                globalNpm();
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
        const promise = util_1.execAsync(cmd).then(execResult => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: execResult };
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
        const promise = util_1.execAsync(cmd).then(execResult => {
            util_1.log(chalk_1.default.green(`DONE - ${project}`));
            return { [project]: execResult };
        });
        promises.push(promise);
    }
    const result = await Promise.all(promises);
    common_1.printMessage(lodash_1.assignIn({}, ...result));
}
function globalNpm() {
    const gDeps = {};
    const gDepsNewer = {};
    const gDepsOlder = {};
    for (const project of global.config.projects) {
        const packageJs = require(path.join(process.cwd(), `${project}/package.json`));
        const allDeps = Object.assign({}, packageJs.dependencies, packageJs.devDependencies);
        for (const key of Object.keys(allDeps)) {
            gDeps[key] = gDeps[key] || {};
            gDeps[key][allDeps[key]] = gDeps[key][allDeps[key]] || [];
            gDeps[key][allDeps[key]].push(project);
        }
    }
    for (const key of Object.keys(gDeps)) {
        if (Object.keys(gDeps[key]).length > 1) {
            const sortedVersionsAsc = Object.keys(gDeps[key]).sort(compare_versions_1.default);
            gDepsNewer[key] = sortedVersionsAsc.pop();
            for (const oldVer of sortedVersionsAsc) {
                gDepsOlder[key] = gDepsOlder[key] || {};
                gDepsOlder[key][oldVer] = gDeps[key][oldVer];
            }
        }
        else {
            gDepsNewer[key] = Object.keys(gDeps[key])[0];
        }
    }
    // revert gDepsOlder result to print by project
    const gDepsReverted = {};
    for (const pack of Object.keys(gDepsOlder)) {
        const versions = gDepsOlder[pack];
        for (const ver of Object.keys(versions)) {
            const projs = versions[ver];
            for (const proj of projs) {
                gDepsReverted[proj] = gDepsReverted[proj] || {};
                gDepsReverted[proj][pack] = ver;
            }
        }
    }
    util_1.log('Old Deps (by project):');
    util_1.log(gDepsReverted);
    util_1.log('Old Deps (by package):');
    util_1.log(gDepsOlder);
    const globalPackageJs = require(path.join(process.cwd(), `package.json`));
    globalPackageJs.dependencies = gDepsNewer;
    fs_1.default.writeFileSync('package.json', JSON.stringify(globalPackageJs, null, 4), 'utf8');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbnBtaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxrREFBeUI7QUFDekIsd0VBQW1DO0FBQ25DLDRDQUFtQjtBQUNuQix3REFBa0U7QUFDbEUsdUNBQXlDO0FBQ3pDLG9EQUErQjtBQUMvQixtQ0FBeUM7QUFDekMsbUNBQWlDO0FBQ2pDLDJDQUE0QjtBQUM1QixzREFBMkI7QUFFM0IsTUFBTSxTQUFTLEdBQXNCO0lBQ25DLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUscUJBQXFCO0lBQzlCLE9BQU8sRUFBRTtRQUNQLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1FBQ25DLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO1FBQ3RDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO1FBQ3ZDLElBQUksa0JBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDeEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7S0FDTjtDQUMvQixDQUFBO0FBRUQsU0FBZ0IsR0FBRztJQUNqQixrQkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFFO1FBQzlDLFFBQVEsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNwQixLQUFLLE9BQU87Z0JBQ1YsTUFBTSxZQUFZLEVBQUUsQ0FBQTtnQkFDcEIsTUFBSztZQUNQLEtBQUssUUFBUTtnQkFDWCxNQUFNLGFBQWEsRUFBRSxDQUFBO2dCQUNyQixNQUFLO1lBQ1AsS0FBSyxRQUFRO2dCQUNYLFNBQVMsRUFBRSxDQUFBO2dCQUNYLE1BQUs7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsT0FB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QyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDMUMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDM0IsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUMvQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFBO2FBQ2hDO1NBQ0Y7S0FDRjtJQUNELFVBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO0lBQzdCLFVBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUNsQixVQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtJQUM3QixVQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7SUFFZixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUN6RSxlQUFlLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQTtJQUV6QyxZQUFFLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDcEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCBjVmVyIGZyb20gJ2NvbXBhcmUtdmVyc2lvbnMnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgaW5xdWlyZXIsIHsgQW5zd2VycywgQ2hvaWNlVHlwZSwgUXVlc3Rpb24gfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCB7IHByaW50TWVzc2FnZSB9IGZyb20gJ2xpYi9jb21tb24nXG5pbXBvcnQgbWFpbk1lbnUgZnJvbSAnbGliL21haW4nXG5pbXBvcnQgeyBleGVjQXN5bmMsIGxvZyB9IGZyb20gJ2xpYi91dGlsJ1xuaW1wb3J0IHsgYXNzaWduSW4gfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgc2hlbGwgZnJvbSAnc2hlbGxqcydcblxuY29uc3QgY2xlYW5NZW51OiBRdWVzdGlvbjxBbnN3ZXJzPiA9IHtcbiAgdHlwZTogJ2xpc3QnLFxuICBuYW1lOiAnbnBtaScsXG4gIG1lc3NhZ2U6ICdOUE0gaW5zdGFsbCBhY3Rpb24/JyxcbiAgY2hvaWNlczogW1xuICAgIHsgbmFtZTogJ0xvY2FsbHknLCB2YWx1ZTogJ2xvY2FsJyB9LFxuICAgIHsgbmFtZTogJ0luIERvY2tlcicsIHZhbHVlOiAnZG9ja2VyJyB9LFxuICAgIHsgbmFtZTogJ0dsb2JhbCBOUE0nLCB2YWx1ZTogJ2dsb2JhbCcgfSxcbiAgICBuZXcgaW5xdWlyZXIuU2VwYXJhdG9yKCksXG4gICAgeyBuYW1lOiAnR28gQmFjaycsIHZhbHVlOiAnYmFjaycgfSxcbiAgXSBhcyBSZWFkb25seUFycmF5PENob2ljZVR5cGU+LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKCk6IHZvaWQge1xuICBpbnF1aXJlci5wcm9tcHQoY2xlYW5NZW51KS50aGVuKGFzeW5jIGFuc3dlcnMgPT4ge1xuICAgIHN3aXRjaCAoYW5zd2Vycy5ucG1pKSB7XG4gICAgICBjYXNlICdsb2NhbCc6XG4gICAgICAgIGF3YWl0IGxvY2FsSW5zdGFsbCgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdkb2NrZXInOlxuICAgICAgICBhd2FpdCBkb2NrZXJJbnN0YWxsKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2dsb2JhbCc6XG4gICAgICAgIGdsb2JhbE5wbSgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdiYWNrJzpcbiAgICAgICAgcmV0dXJuIG1haW5NZW51KClcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZyhjaGFsay5yZWQoJ2Vycm9yIHNlbGVjdGluZyBjbGVhbiBjb21tYW5kJykpXG4gICAgfVxuICAgIHJ1bigpXG4gIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvY2FsSW5zdGFsbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgcHJvbWlzZXM6IGFueVtdID0gW11cbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIGdsb2JhbC5jb25maWcucHJvamVjdHMpIHtcbiAgICBjb25zdCBjbWQgPSBgY2QgJHtnbG9iYWwuY29uZmlnLnJvb3REaXJ9LyR7cHJvamVjdH0gJiYgbnBtIGkgLS1vbmx5PWRldmBcbiAgICBjb25zdCBwcm9taXNlID0gZXhlY0FzeW5jKGNtZCkudGhlbihleGVjUmVzdWx0ID0+IHtcbiAgICAgIGxvZyhjaGFsay5ncmVlbihgRE9ORSAtICR7cHJvamVjdH1gKSlcbiAgICAgIHJldHVybiB7IFtwcm9qZWN0XTogZXhlY1Jlc3VsdCB9XG4gICAgfSlcbiAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpXG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gIHByaW50TWVzc2FnZShhc3NpZ25Jbih7fSwgLi4ucmVzdWx0KSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9ja2VySW5zdGFsbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgc2hlbGwuY2QoZ2xvYmFsLmNvbmZpZy5yb290RGlyKVxuICBjb25zdCBwcm9taXNlczogYW55W10gPSBbXVxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgIGNvbnN0IGNtZCA9IGBkb2NrZXItY29tcG9zZSAtZiBkb2NrZXItY29tcG9zZS50dHkueW1sIHJ1biAtLXJtIC0tbm8tZGVwcyAke3Byb2plY3R9IHNoIC1jIFwibnBtIGlcImBcbiAgICBjb25zdCBwcm9taXNlID0gZXhlY0FzeW5jKGNtZCkudGhlbihleGVjUmVzdWx0ID0+IHtcbiAgICAgIGxvZyhjaGFsay5ncmVlbihgRE9ORSAtICR7cHJvamVjdH1gKSlcbiAgICAgIHJldHVybiB7IFtwcm9qZWN0XTogZXhlY1Jlc3VsdCB9XG4gICAgfSlcbiAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpXG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gIHByaW50TWVzc2FnZShhc3NpZ25Jbih7fSwgLi4ucmVzdWx0KSlcbn1cblxuZnVuY3Rpb24gZ2xvYmFsTnBtKCk6IHZvaWQge1xuICBjb25zdCBnRGVwcyA9IHt9XG4gIGNvbnN0IGdEZXBzTmV3ZXIgPSB7fVxuICBjb25zdCBnRGVwc09sZGVyID0ge31cblxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgIGNvbnN0IHBhY2thZ2VKcyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGAke3Byb2plY3R9L3BhY2thZ2UuanNvbmApKVxuICAgIGNvbnN0IGFsbERlcHMgPSB7IC4uLnBhY2thZ2VKcy5kZXBlbmRlbmNpZXMsIC4uLnBhY2thZ2VKcy5kZXZEZXBlbmRlbmNpZXMgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGFsbERlcHMpKSB7XG4gICAgICBnRGVwc1trZXldID0gZ0RlcHNba2V5XSB8fCB7fVxuICAgICAgZ0RlcHNba2V5XVthbGxEZXBzW2tleV1dID0gZ0RlcHNba2V5XVthbGxEZXBzW2tleV1dIHx8IFtdXG4gICAgICBnRGVwc1trZXldW2FsbERlcHNba2V5XV0ucHVzaChwcm9qZWN0KVxuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGdEZXBzKSkge1xuICAgIGlmIChPYmplY3Qua2V5cyhnRGVwc1trZXldKS5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBzb3J0ZWRWZXJzaW9uc0FzYyA9IE9iamVjdC5rZXlzKGdEZXBzW2tleV0pLnNvcnQoY1ZlcilcbiAgICAgIGdEZXBzTmV3ZXJba2V5XSA9IHNvcnRlZFZlcnNpb25zQXNjLnBvcCgpXG5cbiAgICAgIGZvciAoY29uc3Qgb2xkVmVyIG9mIHNvcnRlZFZlcnNpb25zQXNjKSB7XG4gICAgICAgIGdEZXBzT2xkZXJba2V5XSA9IGdEZXBzT2xkZXJba2V5XSB8fCB7fVxuICAgICAgICBnRGVwc09sZGVyW2tleV1bb2xkVmVyXSA9IGdEZXBzW2tleV1bb2xkVmVyXVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBnRGVwc05ld2VyW2tleV0gPSBPYmplY3Qua2V5cyhnRGVwc1trZXldKVswXVxuICAgIH1cbiAgfVxuXG4gIC8vIHJldmVydCBnRGVwc09sZGVyIHJlc3VsdCB0byBwcmludCBieSBwcm9qZWN0XG4gIGNvbnN0IGdEZXBzUmV2ZXJ0ZWQgPSB7fVxuICBmb3IgKGNvbnN0IHBhY2sgb2YgT2JqZWN0LmtleXMoZ0RlcHNPbGRlcikpIHtcbiAgICBjb25zdCB2ZXJzaW9ucyA9IGdEZXBzT2xkZXJbcGFja11cbiAgICBmb3IgKGNvbnN0IHZlciBvZiBPYmplY3Qua2V5cyh2ZXJzaW9ucykpIHtcbiAgICAgIGNvbnN0IHByb2pzID0gdmVyc2lvbnNbdmVyXVxuICAgICAgZm9yIChjb25zdCBwcm9qIG9mIHByb2pzKSB7XG4gICAgICAgIGdEZXBzUmV2ZXJ0ZWRbcHJval0gPSBnRGVwc1JldmVydGVkW3Byb2pdIHx8IHt9XG4gICAgICAgIGdEZXBzUmV2ZXJ0ZWRbcHJval1bcGFja10gPSB2ZXJcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbG9nKCdPbGQgRGVwcyAoYnkgcHJvamVjdCk6JylcbiAgbG9nKGdEZXBzUmV2ZXJ0ZWQpXG4gIGxvZygnT2xkIERlcHMgKGJ5IHBhY2thZ2UpOicpXG4gIGxvZyhnRGVwc09sZGVyKVxuXG4gIGNvbnN0IGdsb2JhbFBhY2thZ2VKcyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGBwYWNrYWdlLmpzb25gKSlcbiAgZ2xvYmFsUGFja2FnZUpzLmRlcGVuZGVuY2llcyA9IGdEZXBzTmV3ZXJcblxuICBmcy53cml0ZUZpbGVTeW5jKCdwYWNrYWdlLmpzb24nLCBKU09OLnN0cmluZ2lmeShnbG9iYWxQYWNrYWdlSnMsIG51bGwsIDQpLCAndXRmOCcpXG59XG4iXX0=