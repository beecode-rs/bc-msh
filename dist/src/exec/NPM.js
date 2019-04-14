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
    constructor() {
        super('NPM action?', [{ name: 'Global NPM', value: 'global' }]);
    }
    /**
     * Gather all npm packages into one package.json located in parent project.
     */
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
}
module.exports = NPM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTlBNLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V4ZWMvTlBNLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0VBQW1DO0FBQ25DLDRGQUFrRDtBQUNsRCw0Q0FBbUI7QUFFbkIsMkNBQTRCO0FBQzVCLG1DQUErQjtBQUMvQiw4Q0FBMEM7QUFHMUMsTUFBTSxHQUFJLFNBQVEsaUJBQU87SUFFdkI7UUFDRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBaUIsQ0FBQyxDQUFBO0lBQ2pGLENBQUM7SUFFRDs7T0FFRztJQUNLLEtBQUssQ0FBQyxNQUFNO1FBQ2xCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQTtRQUNoQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUE7UUFDckIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBRXJCLEtBQUssTUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDNUMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFBO1lBQzlFLE1BQU0sT0FBTyxxQkFBUSxTQUFTLENBQUMsWUFBWSxFQUFLLFNBQVMsQ0FBQyxlQUFlLENBQUUsQ0FBQTtZQUMzRSxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUM3QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDekQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTthQUN2QztTQUNGO1FBRUQsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUFJLENBQUMsQ0FBQTtnQkFDNUQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFBO2dCQUV6QyxLQUFLLE1BQU0sTUFBTSxJQUFJLGlCQUFpQixFQUFFO29CQUN0QyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtvQkFDdkMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtpQkFDN0M7YUFDRjtpQkFBTTtnQkFDTCxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUM3QztTQUNGO1FBRUQsK0NBQStDO1FBQy9DLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQTtRQUN4QixLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDdkMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUMzQixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtvQkFDeEIsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7b0JBQy9DLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUE7aUJBQ2hDO2FBQ0Y7U0FDRjtRQUNELFdBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtRQUNsQyxXQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3ZCLFdBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtRQUNsQyxXQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRXBCLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFBO1FBQ3pFLGVBQWUsQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFBO1FBRXpDLFlBQUUsQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQ0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQzNHLENBQUM7Q0FDRjtBQTdERCxpQkFBUyxHQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY1ZlciBmcm9tICdjb21wYXJlLXZlcnNpb25zJ1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICdmYXN0LWpzb24tc3RhYmxlLXN0cmluZ2lmeSdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCB7IENob2ljZVR5cGUgfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcbmltcG9ydCB7IFN1Yk1lbnUgfSBmcm9tICdzcmMvdXRpbC9TdWJNZW51J1xuXG5leHBvcnQgPSBOUE1cbmNsYXNzIE5QTSBleHRlbmRzIFN1Yk1lbnUge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdOUE0gYWN0aW9uPycsIFt7IG5hbWU6ICdHbG9iYWwgTlBNJywgdmFsdWU6ICdnbG9iYWwnIH1dIGFzIENob2ljZVR5cGVbXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHYXRoZXIgYWxsIG5wbSBwYWNrYWdlcyBpbnRvIG9uZSBwYWNrYWdlLmpzb24gbG9jYXRlZCBpbiBwYXJlbnQgcHJvamVjdC5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZ2xvYmFsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGdEZXBzID0ge31cbiAgICBjb25zdCBnRGVwc05ld2VyID0ge31cbiAgICBjb25zdCBnRGVwc09sZGVyID0ge31cblxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgICBjb25zdCBwYWNrYWdlSnMgPSByZXF1aXJlKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBgJHtwcm9qZWN0fS9wYWNrYWdlLmpzb25gKSlcbiAgICAgIGNvbnN0IGFsbERlcHMgPSB7IC4uLnBhY2thZ2VKcy5kZXBlbmRlbmNpZXMsIC4uLnBhY2thZ2VKcy5kZXZEZXBlbmRlbmNpZXMgfVxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYWxsRGVwcykpIHtcbiAgICAgICAgZ0RlcHNba2V5XSA9IGdEZXBzW2tleV0gfHwge31cbiAgICAgICAgZ0RlcHNba2V5XVthbGxEZXBzW2tleV1dID0gZ0RlcHNba2V5XVthbGxEZXBzW2tleV1dIHx8IFtdXG4gICAgICAgIGdEZXBzW2tleV1bYWxsRGVwc1trZXldXS5wdXNoKHByb2plY3QpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZ0RlcHMpKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMoZ0RlcHNba2V5XSkubGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBzb3J0ZWRWZXJzaW9uc0FzYyA9IE9iamVjdC5rZXlzKGdEZXBzW2tleV0pLnNvcnQoY1ZlcilcbiAgICAgICAgZ0RlcHNOZXdlcltrZXldID0gc29ydGVkVmVyc2lvbnNBc2MucG9wKClcblxuICAgICAgICBmb3IgKGNvbnN0IG9sZFZlciBvZiBzb3J0ZWRWZXJzaW9uc0FzYykge1xuICAgICAgICAgIGdEZXBzT2xkZXJba2V5XSA9IGdEZXBzT2xkZXJba2V5XSB8fCB7fVxuICAgICAgICAgIGdEZXBzT2xkZXJba2V5XVtvbGRWZXJdID0gZ0RlcHNba2V5XVtvbGRWZXJdXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdEZXBzTmV3ZXJba2V5XSA9IE9iamVjdC5rZXlzKGdEZXBzW2tleV0pWzBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV2ZXJ0IGdEZXBzT2xkZXIgcmVzdWx0IHRvIHByaW50IGJ5IHByb2plY3RcbiAgICBjb25zdCBnRGVwc1JldmVydGVkID0ge31cbiAgICBmb3IgKGNvbnN0IHBhY2sgb2YgT2JqZWN0LmtleXMoZ0RlcHNPbGRlcikpIHtcbiAgICAgIGNvbnN0IHZlcnNpb25zID0gZ0RlcHNPbGRlcltwYWNrXVxuICAgICAgZm9yIChjb25zdCB2ZXIgb2YgT2JqZWN0LmtleXModmVyc2lvbnMpKSB7XG4gICAgICAgIGNvbnN0IHByb2pzID0gdmVyc2lvbnNbdmVyXVxuICAgICAgICBmb3IgKGNvbnN0IHByb2ogb2YgcHJvanMpIHtcbiAgICAgICAgICBnRGVwc1JldmVydGVkW3Byb2pdID0gZ0RlcHNSZXZlcnRlZFtwcm9qXSB8fCB7fVxuICAgICAgICAgIGdEZXBzUmV2ZXJ0ZWRbcHJval1bcGFja10gPSB2ZXJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB1dGlsLmxvZygnT2xkIERlcHMgKGJ5IHByb2plY3QpOicpXG4gICAgdXRpbC5sb2coZ0RlcHNSZXZlcnRlZClcbiAgICB1dGlsLmxvZygnT2xkIERlcHMgKGJ5IHBhY2thZ2UpOicpXG4gICAgdXRpbC5sb2coZ0RlcHNPbGRlcilcblxuICAgIGNvbnN0IGdsb2JhbFBhY2thZ2VKcyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGBwYWNrYWdlLmpzb25gKSlcbiAgICBnbG9iYWxQYWNrYWdlSnMuZGVwZW5kZW5jaWVzID0gZ0RlcHNOZXdlclxuXG4gICAgZnMud3JpdGVGaWxlU3luYygncGFja2FnZS5qc29uJywgSlNPTi5zdHJpbmdpZnkoSlNPTi5wYXJzZShzdHJpbmdpZnkoZ2xvYmFsUGFja2FnZUpzKSksIG51bGwsIDQpLCAndXRmOCcpXG4gIH1cbn1cbiJdfQ==