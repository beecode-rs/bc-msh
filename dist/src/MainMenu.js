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
        if (!global.config.cmd.gitEnabled)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbk1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTWFpbk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxnREFBNEM7QUFFNUMsYUFBYTtBQUNiLE1BQWEsUUFBUyxTQUFRLG1CQUFRO0lBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTztRQUMzQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxPQUFPLEVBQUUsQ0FBUSxDQUFBO1FBQ25ELE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUN6QixDQUFDO0lBQ0Q7UUFDRSxNQUFNLFNBQVMsR0FBc0MsRUFBRSxDQUFBO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVO1lBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDaEYsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZO1lBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDckYsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVO1lBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDL0UsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTO1lBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDdEYsS0FBSyxDQUFDLHlCQUF5QixFQUFFLFNBQXlCLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0NBQ0Y7QUFiRCw0QkFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENob2ljZVR5cGUgfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCB7IEJhc2VNZW51IH0gZnJvbSAnc3JjL3V0aWwvQmFzZU1lbnUnXG5cbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCBjbGFzcyBNYWluTWVudSBleHRlbmRzIEJhc2VNZW51IHtcbiAgcHJpdmF0ZSBhc3luYyBleGVjdXRlKGNvbW1hbmQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjbGF6eiA9IHJlcXVpcmUoYHNyYy9leGVjLyR7Y29tbWFuZH1gKSBhcyBhbnlcbiAgICBhd2FpdCBuZXcgY2xhenooKS5ydW4oKVxuICB9XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IG1lbnVJdGVtczogeyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfVtdID0gW11cbiAgICBpZiAoIWdsb2JhbC5jb25maWcuY21kLmdpdEVuYWJsZWQpIG1lbnVJdGVtcy5wdXNoKHsgbmFtZTogJ0dpdCcsIHZhbHVlOiAnR2l0JyB9KVxuICAgIGlmIChnbG9iYWwuY29uZmlnLmNtZC5jbGVhbkVuYWJsZWQpIG1lbnVJdGVtcy5wdXNoKHsgbmFtZTogJ0NsZWFuJywgdmFsdWU6ICdDbGVhbicgfSlcbiAgICBpZiAoZ2xvYmFsLmNvbmZpZy5jbWQubnBtRW5hYmxlZCkgbWVudUl0ZW1zLnB1c2goeyBuYW1lOiAnTlBNJywgdmFsdWU6ICdOUE0nIH0pXG4gICAgaWYgKGdsb2JhbC5jb25maWcuY21kLnByRW5hYmxlZCkgbWVudUl0ZW1zLnB1c2goeyBuYW1lOiAnUHVsbCBSZXF1ZXN0JywgdmFsdWU6ICdQUicgfSlcbiAgICBzdXBlcignV2hhdCBkbyB5b3Ugd2FudCB0byBkbz8nLCBtZW51SXRlbXMgYXMgQ2hvaWNlVHlwZVtdKVxuICB9XG59XG4iXX0=