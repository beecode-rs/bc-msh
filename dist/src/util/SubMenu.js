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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL1N1Yk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBdUM7QUFDdkMsZ0RBQTRDO0FBQzVDLDBDQUFxQztBQUVyQyxNQUFzQixPQUFRLFNBQVEsbUJBQVE7SUFDcEMsS0FBSyxDQUFDLFFBQVE7UUFDcEIsTUFBTSxJQUFJLG1CQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBQ0QsWUFBc0IsT0FBZSxFQUFFLE9BQXFCO1FBQzFELEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDbkUsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBb0I7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFFO1lBQ3ZFLFlBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsZ0RBQWdELENBQUMsQ0FBQTtZQUNoRyxPQUFNO1NBQ1A7UUFDRCxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDL0IsQ0FBQztDQUNGO0FBZkQsMEJBZUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaG9pY2VUeXBlIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgeyBNYWluTWVudSB9IGZyb20gJ3NyYy9NYWluTWVudSdcbmltcG9ydCB7IEJhc2VNZW51IH0gZnJvbSAnc3JjL3V0aWwvQmFzZU1lbnUnXG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnc3JjL3V0aWwvaW5kZXgnXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdWJNZW51IGV4dGVuZHMgQmFzZU1lbnUge1xuICBwcml2YXRlIGFzeW5jIG1haW5NZW51KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IG5ldyBNYWluTWVudSgpLnJ1bigpXG4gIH1cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgY2hvaWNlczogQ2hvaWNlVHlwZVtdKSB7XG4gICAgc3VwZXIobWVzc2FnZSwgY2hvaWNlcywgW3sgbmFtZTogJ0dvIEJhY2snLCB2YWx1ZTogJ21haW5NZW51JyB9XSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4ocHJlU2VsZWN0ZWQ/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWdsb2JhbC5jb25maWcuY21kW2Ake3RoaXMuY29uc3RydWN0b3IubmFtZS50b0xvd2VyQ2FzZSgpfUVuYWJsZWRgXSkge1xuICAgICAgdXRpbC5sb2coYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lLnRvTG93ZXJDYXNlKCl9IGNvbW1hbmQgaXMgZGlzYWJsZWQuIENoZWNrIGNvbmZpZyBmaWxlIFsubXNoXWApXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLnJ1bihwcmVTZWxlY3RlZClcbiAgfVxufVxuIl19