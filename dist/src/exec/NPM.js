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
const path = __importStar(require("path"));
const util_1 = require("src/util");
const SubMenu_1 = require("src/util/SubMenu");
class NPM extends SubMenu_1.SubMenu {
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
        super('NPM action?', [{ name: 'Global NPM', value: 'global' }]);
    }
}
module.exports = NPM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTlBNLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V4ZWMvTlBNLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0VBQW1DO0FBQ25DLDRGQUFrRDtBQUNsRCw0Q0FBbUI7QUFFbkIsMkNBQTRCO0FBQzVCLG1DQUErQjtBQUMvQiw4Q0FBMEM7QUFHMUMsTUFBTSxHQUFJLFNBQVEsaUJBQU87SUFDZixLQUFLLENBQUMsTUFBTTtRQUNsQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDaEIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3JCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUVyQixLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQzVDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sZUFBZSxDQUFDLENBQUMsQ0FBQTtZQUM5RSxNQUFNLE9BQU8scUJBQVEsU0FBUyxDQUFDLFlBQVksRUFBSyxTQUFTLENBQUMsZUFBZSxDQUFFLENBQUE7WUFDM0UsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN0QyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDN0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3pELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDdkM7U0FDRjtRQUVELEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEMsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBSSxDQUFDLENBQUE7Z0JBQzVELFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtnQkFFekMsS0FBSyxNQUFNLE1BQU0sSUFBSSxpQkFBaUIsRUFBRTtvQkFDdEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7b0JBQ3ZDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7aUJBQzdDO2FBQ0Y7aUJBQU07Z0JBQ0wsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDN0M7U0FDRjtRQUVELCtDQUErQztRQUMvQyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUE7UUFDeEIsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDM0IsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7b0JBQ3hCLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO29CQUMvQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFBO2lCQUNoQzthQUNGO1NBQ0Y7UUFDRCxXQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFDbEMsV0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN2QixXQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFDbEMsV0FBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUVwQixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUN6RSxlQUFlLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQTtRQUV6QyxZQUFFLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsb0NBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUMzRyxDQUFDO0lBRUQ7UUFDRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBaUIsQ0FBQyxDQUFBO0lBQ2pGLENBQUM7Q0FDRjtBQXpERCxpQkFBUyxHQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY1ZlciBmcm9tICdjb21wYXJlLXZlcnNpb25zJ1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICdmYXN0LWpzb24tc3RhYmxlLXN0cmluZ2lmeSdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCB7IENob2ljZVR5cGUgfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcbmltcG9ydCB7IFN1Yk1lbnUgfSBmcm9tICdzcmMvdXRpbC9TdWJNZW51J1xuXG5leHBvcnQgPSBOUE1cbmNsYXNzIE5QTSBleHRlbmRzIFN1Yk1lbnUge1xuICBwcml2YXRlIGFzeW5jIGdsb2JhbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBnRGVwcyA9IHt9XG4gICAgY29uc3QgZ0RlcHNOZXdlciA9IHt9XG4gICAgY29uc3QgZ0RlcHNPbGRlciA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgICAgY29uc3QgcGFja2FnZUpzID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgYCR7cHJvamVjdH0vcGFja2FnZS5qc29uYCkpXG4gICAgICBjb25zdCBhbGxEZXBzID0geyAuLi5wYWNrYWdlSnMuZGVwZW5kZW5jaWVzLCAuLi5wYWNrYWdlSnMuZGV2RGVwZW5kZW5jaWVzIH1cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGFsbERlcHMpKSB7XG4gICAgICAgIGdEZXBzW2tleV0gPSBnRGVwc1trZXldIHx8IHt9XG4gICAgICAgIGdEZXBzW2tleV1bYWxsRGVwc1trZXldXSA9IGdEZXBzW2tleV1bYWxsRGVwc1trZXldXSB8fCBbXVxuICAgICAgICBnRGVwc1trZXldW2FsbERlcHNba2V5XV0ucHVzaChwcm9qZWN0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGdEZXBzKSkge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGdEZXBzW2tleV0pLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3Qgc29ydGVkVmVyc2lvbnNBc2MgPSBPYmplY3Qua2V5cyhnRGVwc1trZXldKS5zb3J0KGNWZXIpXG4gICAgICAgIGdEZXBzTmV3ZXJba2V5XSA9IHNvcnRlZFZlcnNpb25zQXNjLnBvcCgpXG5cbiAgICAgICAgZm9yIChjb25zdCBvbGRWZXIgb2Ygc29ydGVkVmVyc2lvbnNBc2MpIHtcbiAgICAgICAgICBnRGVwc09sZGVyW2tleV0gPSBnRGVwc09sZGVyW2tleV0gfHwge31cbiAgICAgICAgICBnRGVwc09sZGVyW2tleV1bb2xkVmVyXSA9IGdEZXBzW2tleV1bb2xkVmVyXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnRGVwc05ld2VyW2tleV0gPSBPYmplY3Qua2V5cyhnRGVwc1trZXldKVswXVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldmVydCBnRGVwc09sZGVyIHJlc3VsdCB0byBwcmludCBieSBwcm9qZWN0XG4gICAgY29uc3QgZ0RlcHNSZXZlcnRlZCA9IHt9XG4gICAgZm9yIChjb25zdCBwYWNrIG9mIE9iamVjdC5rZXlzKGdEZXBzT2xkZXIpKSB7XG4gICAgICBjb25zdCB2ZXJzaW9ucyA9IGdEZXBzT2xkZXJbcGFja11cbiAgICAgIGZvciAoY29uc3QgdmVyIG9mIE9iamVjdC5rZXlzKHZlcnNpb25zKSkge1xuICAgICAgICBjb25zdCBwcm9qcyA9IHZlcnNpb25zW3Zlcl1cbiAgICAgICAgZm9yIChjb25zdCBwcm9qIG9mIHByb2pzKSB7XG4gICAgICAgICAgZ0RlcHNSZXZlcnRlZFtwcm9qXSA9IGdEZXBzUmV2ZXJ0ZWRbcHJval0gfHwge31cbiAgICAgICAgICBnRGVwc1JldmVydGVkW3Byb2pdW3BhY2tdID0gdmVyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdXRpbC5sb2coJ09sZCBEZXBzIChieSBwcm9qZWN0KTonKVxuICAgIHV0aWwubG9nKGdEZXBzUmV2ZXJ0ZWQpXG4gICAgdXRpbC5sb2coJ09sZCBEZXBzIChieSBwYWNrYWdlKTonKVxuICAgIHV0aWwubG9nKGdEZXBzT2xkZXIpXG5cbiAgICBjb25zdCBnbG9iYWxQYWNrYWdlSnMgPSByZXF1aXJlKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBgcGFja2FnZS5qc29uYCkpXG4gICAgZ2xvYmFsUGFja2FnZUpzLmRlcGVuZGVuY2llcyA9IGdEZXBzTmV3ZXJcblxuICAgIGZzLndyaXRlRmlsZVN5bmMoJ3BhY2thZ2UuanNvbicsIEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2Uoc3RyaW5naWZ5KGdsb2JhbFBhY2thZ2VKcykpLCBudWxsLCA0KSwgJ3V0ZjgnKVxuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ05QTSBhY3Rpb24/JywgW3sgbmFtZTogJ0dsb2JhbCBOUE0nLCB2YWx1ZTogJ2dsb2JhbCcgfV0gYXMgQ2hvaWNlVHlwZVtdKVxuICB9XG59XG4iXX0=