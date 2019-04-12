"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuBase_1 = require("src/util/MenuBase");
class SubMenu extends MenuBase_1.MenuBase {
    constructor(message, choices) {
        super(message, choices, [{ name: 'Go Back', value: 'main' }]);
    }
}
exports.SubMenu = SubMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL1N1Yk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxnREFBNEM7QUFFNUMsTUFBc0IsT0FBUSxTQUFRLG1CQUFRO0lBQzVDLFlBQVksT0FBZSxFQUFFLE9BQXFCO1FBQ2hELEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDL0QsQ0FBQztDQUNGO0FBSkQsMEJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaG9pY2VUeXBlIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgeyBNZW51QmFzZSB9IGZyb20gJ3NyYy91dGlsL01lbnVCYXNlJ1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3ViTWVudSBleHRlbmRzIE1lbnVCYXNlIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBjaG9pY2VzOiBDaG9pY2VUeXBlW10pIHtcbiAgICBzdXBlcihtZXNzYWdlLCBjaG9pY2VzLCBbeyBuYW1lOiAnR28gQmFjaycsIHZhbHVlOiAnbWFpbicgfV0pXG4gIH1cbn1cbiJdfQ==