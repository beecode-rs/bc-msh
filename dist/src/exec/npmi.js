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
const compare_versions_1 = __importDefault(require("compare-versions"));
const fast_json_stable_stringify_1 = __importDefault(require("fast-json-stable-stringify"));
const fs_1 = __importDefault(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const path = __importStar(require("path"));
const util_1 = require("src/util");
const MenuBase_1 = require("src/util/MenuBase");
class Npm extends MenuBase_1.MenuBase {
    async global() {
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
        util_1.util.log('Old Deps (by project):');
        util_1.util.log(gDepsReverted);
        util_1.util.log('Old Deps (by package):');
        util_1.util.log(gDepsOlder);
        const globalPackageJs = require(path.join(process.cwd(), `package.json`));
        globalPackageJs.dependencies = gDepsNewer;
        fs_1.default.writeFileSync('package.json', JSON.stringify(JSON.parse(fast_json_stable_stringify_1.default(globalPackageJs)), null, 4), 'utf8');
    }
    constructor() {
        super({
            message: 'NPM install action?',
            choices: [
                { name: 'Global NPM', value: 'global' },
                new inquirer_1.default.Separator(),
                { name: 'Go Back', value: 'back' },
            ],
        });
    }
}
module.exports = Npm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGVjL25wbWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3RUFBbUM7QUFDbkMsNEZBQWtEO0FBQ2xELDRDQUFtQjtBQUNuQix3REFBK0M7QUFDL0MsMkNBQTRCO0FBQzVCLG1DQUErQjtBQUMvQixnREFBNEM7QUFHNUMsTUFBTSxHQUFJLFNBQVEsbUJBQVE7SUFDaEIsS0FBSyxDQUFDLE1BQU07UUFDbEIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNyQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUE7UUFFckIsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUM1QyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUE7WUFDOUUsTUFBTSxPQUFPLHFCQUFRLFNBQVMsQ0FBQyxZQUFZLEVBQUssU0FBUyxDQUFDLGVBQWUsQ0FBRSxDQUFBO1lBQzNFLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQzdCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUN6RCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFB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dXJjZXNDb250ZW50IjpbImltcG9ydCBjVmVyIGZyb20gJ2NvbXBhcmUtdmVyc2lvbnMnXG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJ2Zhc3QtanNvbi1zdGFibGUtc3RyaW5naWZ5J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IGlucXVpcmVyLCB7IENob2ljZVR5cGUgfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcbmltcG9ydCB7IE1lbnVCYXNlIH0gZnJvbSAnc3JjL3V0aWwvTWVudUJhc2UnXG5cbmV4cG9ydCA9IE5wbVxuY2xhc3MgTnBtIGV4dGVuZHMgTWVudUJhc2Uge1xuICBwcml2YXRlIGFzeW5jIGdsb2JhbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBnRGVwcyA9IHt9XG4gICAgY29uc3QgZ0RlcHNOZXdlciA9IHt9XG4gICAgY29uc3QgZ0RlcHNPbGRlciA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgICAgY29uc3QgcGFja2FnZUpzID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgYCR7cHJvamVjdH0vcGFja2FnZS5qc29uYCkpXG4gICAgICBjb25zdCBhbGxEZXBzID0geyAuLi5wYWNrYWdlSnMuZGVwZW5kZW5jaWVzLCAuLi5wYWNrYWdlSnMuZGV2RGVwZW5kZW5jaWVzIH1cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGFsbERlcHMpKSB7XG4gICAgICAgIGdEZXBzW2tleV0gPSBnRGVwc1trZXldIHx8IHt9XG4gICAgICAgIGdEZXBzW2tleV1bYWxsRGVwc1trZXldXSA9IGdEZXBzW2tleV1bYWxsRGVwc1trZXldXSB8fCBbXVxuICAgICAgICBnRGVwc1trZXldW2FsbERlcHNba2V5XV0ucHVzaChwcm9qZWN0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGdEZXBzKSkge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGdEZXBzW2tleV0pLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3Qgc29ydGVkVmVyc2lvbnNBc2MgPSBPYmplY3Qua2V5cyhnRGVwc1trZXldKS5zb3J0KGNWZXIpXG4gICAgICAgIGdEZXBzTmV3ZXJba2V5XSA9IHNvcnRlZFZlcnNpb25zQXNjLnBvcCgpXG5cbiAgICAgICAgZm9yIChjb25zdCBvbGRWZXIgb2Ygc29ydGVkVmVyc2lvbnNBc2MpIHtcbiAgICAgICAgICBnRGVwc09sZGVyW2tleV0gPSBnRGVwc09sZGVyW2tleV0gfHwge31cbiAgICAgICAgICBnRGVwc09sZGVyW2tleV1bb2xkVmVyXSA9IGdEZXBzW2tleV1bb2xkVmVyXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnRGVwc05ld2VyW2tleV0gPSBPYmplY3Qua2V5cyhnRGVwc1trZXldKVswXVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldmVydCBnRGVwc09sZGVyIHJlc3VsdCB0byBwcmludCBieSBwcm9qZWN0XG4gICAgY29uc3QgZ0RlcHNSZXZlcnRlZCA9IHt9XG4gICAgZm9yIChjb25zdCBwYWNrIG9mIE9iamVjdC5rZXlzKGdEZXBzT2xkZXIpKSB7XG4gICAgICBjb25zdCB2ZXJzaW9ucyA9IGdEZXBzT2xkZXJbcGFja11cbiAgICAgIGZvciAoY29uc3QgdmVyIG9mIE9iamVjdC5rZXlzKHZlcnNpb25zKSkge1xuICAgICAgICBjb25zdCBwcm9qcyA9IHZlcnNpb25zW3Zlcl1cbiAgICAgICAgZm9yIChjb25zdCBwcm9qIG9mIHByb2pzKSB7XG4gICAgICAgICAgZ0RlcHNSZXZlcnRlZFtwcm9qXSA9IGdEZXBzUmV2ZXJ0ZWRbcHJval0gfHwge31cbiAgICAgICAgICBnRGVwc1JldmVydGVkW3Byb2pdW3BhY2tdID0gdmVyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdXRpbC5sb2coJ09sZCBEZXBzIChieSBwcm9qZWN0KTonKVxuICAgIHV0aWwubG9nKGdEZXBzUmV2ZXJ0ZWQpXG4gICAgdXRpbC5sb2coJ09sZCBEZXBzIChieSBwYWNrYWdlKTonKVxuICAgIHV0aWwubG9nKGdEZXBzT2xkZXIpXG5cbiAgICBjb25zdCBnbG9iYWxQYWNrYWdlSnMgPSByZXF1aXJlKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBgcGFja2FnZS5qc29uYCkpXG4gICAgZ2xvYmFsUGFja2FnZUpzLmRlcGVuZGVuY2llcyA9IGdEZXBzTmV3ZXJcblxuICAgIGZzLndyaXRlRmlsZVN5bmMoJ3BhY2thZ2UuanNvbicsIEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2Uoc3RyaW5naWZ5KGdsb2JhbFBhY2thZ2VKcykpLCBudWxsLCA0KSwgJ3V0ZjgnKVxuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgbWVzc2FnZTogJ05QTSBpbnN0YWxsIGFjdGlvbj8nLFxuICAgICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6ICdHbG9iYWwgTlBNJywgdmFsdWU6ICdnbG9iYWwnIH0sXG4gICAgICAgIG5ldyBpbnF1aXJlci5TZXBhcmF0b3IoKSxcbiAgICAgICAgeyBuYW1lOiAnR28gQmFjaycsIHZhbHVlOiAnYmFjaycgfSxcbiAgICAgIF0gYXMgUmVhZG9ubHlBcnJheTxDaG9pY2VUeXBlPixcbiAgICB9KVxuICB9XG59XG4iXX0=