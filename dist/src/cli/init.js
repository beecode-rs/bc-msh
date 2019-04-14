"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mz_1 = require("mz");
const path_1 = __importDefault(require("path"));
const util_1 = require("src/util");
const init = {
    configFileLocation: () => path_1.default.join(global.config.rootDir, '.msh'),
    checkIfConfigExists: () => mz_1.fs.existsSync(init.configFileLocation()),
    create: () => {
        if (init.checkIfConfigExists()) {
            util_1.util.log('Config already exists');
            return;
        }
        mz_1.fs.writeFileSync(init.configFileLocation(), init.default());
    },
    default: () => {
        return `
PROJECTS=[] # ["auth","auth-web","node-common",...]
GIT_TEAM= # git team name
GIT_PROJECT_PREFIX= # project prefix
PULL_REQUEST_SKIP=[] # ["type-definitions","node-common",...]
DOCKER_BASE_IMAGES=[] # ["bc-node-nginx","bc-node","bc-nginx","bc-base"]

CMD_GIT_ENABLED=true
CMD_CLEAN_ENABLED=true
CMD_NPM_ENABLED=true
CMD_PR_ENABLED=true
`;
    },
};
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvaW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJCQUF1QjtBQUN2QixnREFBdUI7QUFDdkIsbUNBQStCO0FBRS9CLE1BQU0sSUFBSSxHQUFHO0lBQ1gsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDbEUsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNuRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1FBQ1gsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUM5QixXQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7WUFDakMsT0FBTTtTQUNQO1FBQ0QsT0FBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBQ0QsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUNaLE9BQU87Ozs7Ozs7Ozs7O0NBV1YsQ0FBQTtJQUNDLENBQUM7Q0FDRixDQUFBO0FBRVEsb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcyB9IGZyb20gJ216J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcblxuY29uc3QgaW5pdCA9IHtcbiAgY29uZmlnRmlsZUxvY2F0aW9uOiAoKSA9PiBwYXRoLmpvaW4oZ2xvYmFsLmNvbmZpZy5yb290RGlyLCAnLm1zaCcpLFxuICBjaGVja0lmQ29uZmlnRXhpc3RzOiAoKSA9PiBmcy5leGlzdHNTeW5jKGluaXQuY29uZmlnRmlsZUxvY2F0aW9uKCkpLFxuICBjcmVhdGU6ICgpID0+IHtcbiAgICBpZiAoaW5pdC5jaGVja0lmQ29uZmlnRXhpc3RzKCkpIHtcbiAgICAgIHV0aWwubG9nKCdDb25maWcgYWxyZWFkeSBleGlzdHMnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGZzLndyaXRlRmlsZVN5bmMoaW5pdC5jb25maWdGaWxlTG9jYXRpb24oKSwgaW5pdC5kZWZhdWx0KCkpXG4gIH0sXG4gIGRlZmF1bHQ6ICgpID0+IHtcbiAgICByZXR1cm4gYFxuUFJPSkVDVFM9W10gIyBbXCJhdXRoXCIsXCJhdXRoLXdlYlwiLFwibm9kZS1jb21tb25cIiwuLi5dXG5HSVRfVEVBTT0gIyBnaXQgdGVhbSBuYW1lXG5HSVRfUFJPSkVDVF9QUkVGSVg9ICMgcHJvamVjdCBwcmVmaXhcblBVTExfUkVRVUVTVF9TS0lQPVtdICMgW1widHlwZS1kZWZpbml0aW9uc1wiLFwibm9kZS1jb21tb25cIiwuLi5dXG5ET0NLRVJfQkFTRV9JTUFHRVM9W10gIyBbXCJiYy1ub2RlLW5naW54XCIsXCJiYy1ub2RlXCIsXCJiYy1uZ2lueFwiLFwiYmMtYmFzZVwiXVxuXG5DTURfR0lUX0VOQUJMRUQ9dHJ1ZVxuQ01EX0NMRUFOX0VOQUJMRUQ9dHJ1ZVxuQ01EX05QTV9FTkFCTEVEPXRydWVcbkNNRF9QUl9FTkFCTEVEPXRydWVcbmBcbiAgfSxcbn1cblxuZXhwb3J0IHsgaW5pdCB9XG4iXX0=