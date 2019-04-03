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
const fast_json_stable_stringify_1 = __importDefault(require("fast-json-stable-stringify"));
const fs_1 = __importDefault(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const main_1 = __importDefault(require("lib/main"));
const util_1 = require("lib/util");
const path = __importStar(require("path"));
const cleanMenu = {
    type: 'list',
    name: 'npmi',
    message: 'NPM install action?',
    choices: [
        { name: 'Global NPM', value: 'global' },
        new inquirer_1.default.Separator(),
        { name: 'Go Back', value: 'back' },
    ],
};
function run() {
    inquirer_1.default.prompt(cleanMenu).then(async (answers) => {
        switch (answers.npmi) {
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
    fs_1.default.writeFileSync('package.json', JSON.stringify(JSON.parse(fast_json_stable_stringify_1.default(globalPackageJs)), null, 4), 'utf8');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbnBtaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxrREFBeUI7QUFDekIsd0VBQW1DO0FBQ25DLDRGQUFrRDtBQUNsRCw0Q0FBbUI7QUFDbkIsd0RBQWtFO0FBQ2xFLG9EQUErQjtBQUMvQixtQ0FBOEI7QUFDOUIsMkNBQTRCO0FBRzVCLE1BQU0sU0FBUyxHQUFzQjtJQUNuQyxJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFLHFCQUFxQjtJQUM5QixPQUFPLEVBQUU7UUFDUCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUN2QyxJQUFJLGtCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0tBQ047Q0FDL0IsQ0FBQTtBQUVELFNBQWdCLEdBQUc7SUFDakIsa0JBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBRTtRQUM5QyxRQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDcEIsS0FBSyxRQUFRO2dCQUNYLFNBQVMsRUFBRSxDQUFBO2dCQUNYLE1BQUs7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxjQUFRLEVBQUUsQ0FBQTtZQUNuQjtnQkFDRSxVQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUE7U0FDbEQ7UUFDRCxHQUFHLEVBQUUsQ0FBQTtJQUNQLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQWJELGtCQWFDO0FBRUQsU0FBUyxTQUFTO0lBQ2hCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNoQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUE7SUFDckIsTUFB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QUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUN6RSxlQUFlLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQTtJQUV6QyxZQUFFLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsb0NBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMzRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IGNWZXIgZnJvbSAnY29tcGFyZS12ZXJzaW9ucydcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnZmFzdC1qc29uLXN0YWJsZS1zdHJpbmdpZnknXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgaW5xdWlyZXIsIHsgQW5zd2VycywgQ2hvaWNlVHlwZSwgUXVlc3Rpb24gfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCBtYWluTWVudSBmcm9tICdsaWIvbWFpbidcbmltcG9ydCB7IGxvZyB9IGZyb20gJ2xpYi91dGlsJ1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuXG5cbmNvbnN0IGNsZWFuTWVudTogUXVlc3Rpb248QW5zd2Vycz4gPSB7XG4gIHR5cGU6ICdsaXN0JyxcbiAgbmFtZTogJ25wbWknLFxuICBtZXNzYWdlOiAnTlBNIGluc3RhbGwgYWN0aW9uPycsXG4gIGNob2ljZXM6IFtcbiAgICB7IG5hbWU6ICdHbG9iYWwgTlBNJywgdmFsdWU6ICdnbG9iYWwnIH0sXG4gICAgbmV3IGlucXVpcmVyLlNlcGFyYXRvcigpLFxuICAgIHsgbmFtZTogJ0dvIEJhY2snLCB2YWx1ZTogJ2JhY2snIH0sXG4gIF0gYXMgUmVhZG9ubHlBcnJheTxDaG9pY2VUeXBlPixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bigpOiB2b2lkIHtcbiAgaW5xdWlyZXIucHJvbXB0KGNsZWFuTWVudSkudGhlbihhc3luYyBhbnN3ZXJzID0+IHtcbiAgICBzd2l0Y2ggKGFuc3dlcnMubnBtaSkge1xuICAgICAgY2FzZSAnZ2xvYmFsJzpcbiAgICAgICAgZ2xvYmFsTnBtKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2JhY2snOlxuICAgICAgICByZXR1cm4gbWFpbk1lbnUoKVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nKGNoYWxrLnJlZCgnZXJyb3Igc2VsZWN0aW5nIGNsZWFuIGNvbW1hbmQnKSlcbiAgICB9XG4gICAgcnVuKClcbiAgfSlcbn1cblxuZnVuY3Rpb24gZ2xvYmFsTnBtKCk6IHZvaWQge1xuICBjb25zdCBnRGVwcyA9IHt9XG4gIGNvbnN0IGdEZXBzTmV3ZXIgPSB7fVxuICBjb25zdCBnRGVwc09sZGVyID0ge31cblxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgIGNvbnN0IHBhY2thZ2VKcyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGAke3Byb2plY3R9L3BhY2thZ2UuanNvbmApKVxuICAgIGNvbnN0IGFsbERlcHMgPSB7IC4uLnBhY2thZ2VKcy5kZXBlbmRlbmNpZXMsIC4uLnBhY2thZ2VKcy5kZXZEZXBlbmRlbmNpZXMgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGFsbERlcHMpKSB7XG4gICAgICBnRGVwc1trZXldID0gZ0RlcHNba2V5XSB8fCB7fVxuICAgICAgZ0RlcHNba2V5XVthbGxEZXBzW2tleV1dID0gZ0RlcHNba2V5XVthbGxEZXBzW2tleV1dIHx8IFtdXG4gICAgICBnRGVwc1trZXldW2FsbERlcHNba2V5XV0ucHVzaChwcm9qZWN0KVxuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGdEZXBzKSkge1xuICAgIGlmIChPYmplY3Qua2V5cyhnRGVwc1trZXldKS5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBzb3J0ZWRWZXJzaW9uc0FzYyA9IE9iamVjdC5rZXlzKGdEZXBzW2tleV0pLnNvcnQoY1ZlcilcbiAgICAgIGdEZXBzTmV3ZXJba2V5XSA9IHNvcnRlZFZlcnNpb25zQXNjLnBvcCgpXG5cbiAgICAgIGZvciAoY29uc3Qgb2xkVmVyIG9mIHNvcnRlZFZlcnNpb25zQXNjKSB7XG4gICAgICAgIGdEZXBzT2xkZXJba2V5XSA9IGdEZXBzT2xkZXJba2V5XSB8fCB7fVxuICAgICAgICBnRGVwc09sZGVyW2tleV1bb2xkVmVyXSA9IGdEZXBzW2tleV1bb2xkVmVyXVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBnRGVwc05ld2VyW2tleV0gPSBPYmplY3Qua2V5cyhnRGVwc1trZXldKVswXVxuICAgIH1cbiAgfVxuXG4gIC8vIHJldmVydCBnRGVwc09sZGVyIHJlc3VsdCB0byBwcmludCBieSBwcm9qZWN0XG4gIGNvbnN0IGdEZXBzUmV2ZXJ0ZWQgPSB7fVxuICBmb3IgKGNvbnN0IHBhY2sgb2YgT2JqZWN0LmtleXMoZ0RlcHNPbGRlcikpIHtcbiAgICBjb25zdCB2ZXJzaW9ucyA9IGdEZXBzT2xkZXJbcGFja11cbiAgICBmb3IgKGNvbnN0IHZlciBvZiBPYmplY3Qua2V5cyh2ZXJzaW9ucykpIHtcbiAgICAgIGNvbnN0IHByb2pzID0gdmVyc2lvbnNbdmVyXVxuICAgICAgZm9yIChjb25zdCBwcm9qIG9mIHByb2pzKSB7XG4gICAgICAgIGdEZXBzUmV2ZXJ0ZWRbcHJval0gPSBnRGVwc1JldmVydGVkW3Byb2pdIHx8IHt9XG4gICAgICAgIGdEZXBzUmV2ZXJ0ZWRbcHJval1bcGFja10gPSB2ZXJcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbG9nKCdPbGQgRGVwcyAoYnkgcHJvamVjdCk6JylcbiAgbG9nKGdEZXBzUmV2ZXJ0ZWQpXG4gIGxvZygnT2xkIERlcHMgKGJ5IHBhY2thZ2UpOicpXG4gIGxvZyhnRGVwc09sZGVyKVxuXG4gIGNvbnN0IGdsb2JhbFBhY2thZ2VKcyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGBwYWNrYWdlLmpzb25gKSlcbiAgZ2xvYmFsUGFja2FnZUpzLmRlcGVuZGVuY2llcyA9IGdEZXBzTmV3ZXJcblxuICBmcy53cml0ZUZpbGVTeW5jKCdwYWNrYWdlLmpzb24nLCBKU09OLnN0cmluZ2lmeShKU09OLnBhcnNlKHN0cmluZ2lmeShnbG9iYWxQYWNrYWdlSnMpKSwgbnVsbCwgNCksICd1dGY4Jylcbn1cbiJdfQ==