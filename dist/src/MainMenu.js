"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseMenu_1 = require("src/util/BaseMenu");
// @ts-ignore
class MainMenu extends BaseMenu_1.BaseMenu {
    async execute(command) {
        const clazz = require(`src/exec/${command}`);
        await new clazz().run();
    }
    constructor() {
        const menuItems = [];
        if (global.config.cmd.gitEnabled)
            menuItems.push({ name: 'Git', value: 'Git' });
        if (global.config.cmd.cleanEnabled)
            menuItems.push({ name: 'Clean', value: 'Clean' });
        if (global.config.cmd.npmEnabled)
            menuItems.push({ name: 'NPM', value: 'NPM' });
        if (global.config.cmd.prEnabled)
            menuItems.push({ name: 'Pull Request', value: 'PR' });
        super('What do you want to do?', menuItems);
    }
}
exports.MainMenu = MainMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbk1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTWFpbk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxnREFBNEM7QUFFNUMsYUFBYTtBQUNiLE1BQWEsUUFBUyxTQUFRLG1CQUFRO0lBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTztRQUMzQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxPQUFPLEVBQUUsQ0FBUSxDQUFBO1FBQ25ELE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUN6QixDQUFDO0lBQ0Q7UUFDRSxNQUFNLFNBQVMsR0FBc0MsRUFBRSxDQUFBO1FBQ3ZELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVTtZQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQy9FLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWTtZQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQ3JGLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVTtZQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQy9FLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUztZQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ3RGLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxTQUF5QixDQUFDLENBQUE7SUFDN0QsQ0FBQztDQUNGO0FBYkQsNEJBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaG9pY2VUeXBlIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgeyBCYXNlTWVudSB9IGZyb20gJ3NyYy91dGlsL0Jhc2VNZW51J1xuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgY2xhc3MgTWFpbk1lbnUgZXh0ZW5kcyBCYXNlTWVudSB7XG4gIHByaXZhdGUgYXN5bmMgZXhlY3V0ZShjb21tYW5kKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY2xhenogPSByZXF1aXJlKGBzcmMvZXhlYy8ke2NvbW1hbmR9YCkgYXMgYW55XG4gICAgYXdhaXQgbmV3IGNsYXp6KCkucnVuKClcbiAgfVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBtZW51SXRlbXM6IHsgbmFtZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH1bXSA9IFtdXG4gICAgaWYgKGdsb2JhbC5jb25maWcuY21kLmdpdEVuYWJsZWQpIG1lbnVJdGVtcy5wdXNoKHsgbmFtZTogJ0dpdCcsIHZhbHVlOiAnR2l0JyB9KVxuICAgIGlmIChnbG9iYWwuY29uZmlnLmNtZC5jbGVhbkVuYWJsZWQpIG1lbnVJdGVtcy5wdXNoKHsgbmFtZTogJ0NsZWFuJywgdmFsdWU6ICdDbGVhbicgfSlcbiAgICBpZiAoZ2xvYmFsLmNvbmZpZy5jbWQubnBtRW5hYmxlZCkgbWVudUl0ZW1zLnB1c2goeyBuYW1lOiAnTlBNJywgdmFsdWU6ICdOUE0nIH0pXG4gICAgaWYgKGdsb2JhbC5jb25maWcuY21kLnByRW5hYmxlZCkgbWVudUl0ZW1zLnB1c2goeyBuYW1lOiAnUHVsbCBSZXF1ZXN0JywgdmFsdWU6ICdQUicgfSlcbiAgICBzdXBlcignV2hhdCBkbyB5b3Ugd2FudCB0byBkbz8nLCBtZW51SXRlbXMgYXMgQ2hvaWNlVHlwZVtdKVxuICB9XG59XG4iXX0=