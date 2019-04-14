"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainMenu_1 = require("src/MainMenu");
const BaseMenu_1 = require("src/util/BaseMenu");
const index_1 = require("src/util/index");
class SubMenu extends BaseMenu_1.BaseMenu {
    async mainMenu() {
        await new MainMenu_1.MainMenu().run();
    }
    constructor(message, choices) {
        super(message, choices, [{ name: 'Go Back', value: 'mainMenu' }]);
    }
    async run(preSelected) {
        if (!global.config.cmd[`${this.constructor.name.toLowerCase()}Enabled`]) {
            index_1.util.log(`${this.constructor.name.toLowerCase()} command is disabled. Check config file [.msh]`);
            return;
        }
        return super.run(preSelected);
    }
}
exports.SubMenu = SubMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL1N1Yk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBdUM7QUFDdkMsZ0RBQTRDO0FBQzVDLDBDQUFxQztBQUVyQyxNQUFzQixPQUFRLFNBQVEsbUJBQVE7SUFDcEMsS0FBSyxDQUFDLFFBQVE7UUFDcEIsTUFBTSxJQUFJLG1CQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBQ0QsWUFBWSxPQUFlLEVBQUUsT0FBcUI7UUFDaEQsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFvQjtRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUU7WUFDdkUsWUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxnREFBZ0QsQ0FBQyxDQUFBO1lBQ2hHLE9BQU07U0FDUDtRQUNELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUMvQixDQUFDO0NBQ0Y7QUFmRCwwQkFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENob2ljZVR5cGUgfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCB7IE1haW5NZW51IH0gZnJvbSAnc3JjL01haW5NZW51J1xuaW1wb3J0IHsgQmFzZU1lbnUgfSBmcm9tICdzcmMvdXRpbC9CYXNlTWVudSdcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbC9pbmRleCdcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN1Yk1lbnUgZXh0ZW5kcyBCYXNlTWVudSB7XG4gIHByaXZhdGUgYXN5bmMgbWFpbk1lbnUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgbmV3IE1haW5NZW51KCkucnVuKClcbiAgfVxuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGNob2ljZXM6IENob2ljZVR5cGVbXSkge1xuICAgIHN1cGVyKG1lc3NhZ2UsIGNob2ljZXMsIFt7IG5hbWU6ICdHbyBCYWNrJywgdmFsdWU6ICdtYWluTWVudScgfV0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuKHByZVNlbGVjdGVkPzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFnbG9iYWwuY29uZmlnLmNtZFtgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWUudG9Mb3dlckNhc2UoKX1FbmFibGVkYF0pIHtcbiAgICAgIHV0aWwubG9nKGAke3RoaXMuY29uc3RydWN0b3IubmFtZS50b0xvd2VyQ2FzZSgpfSBjb21tYW5kIGlzIGRpc2FibGVkLiBDaGVjayBjb25maWcgZmlsZSBbLm1zaF1gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHJldHVybiBzdXBlci5ydW4ocHJlU2VsZWN0ZWQpXG4gIH1cbn1cbiJdfQ==