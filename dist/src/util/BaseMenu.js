"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
// import { MainMenu as MM } from 'src/MainMenu'
class BaseMenu {
    constructor(message, choices, exitChoices) {
        this.name = 'menu';
        this.type = 'list';
        this.message = '';
        if (message)
            this.message = message;
        choices.push(new inquirer_1.default.Separator());
        for (const choice of exitChoices || [])
            choices.push(choice);
        choices.push({ name: 'Exit', value: 'exit' });
        this.menu = {
            type: this.type,
            name: this.name,
            message: this.message,
            choices: [...choices],
        };
    }
    async execute(command) {
        await this[command]();
        if (global.exitAfterCommandExecuted)
            process.exit();
        await this.run();
    }
    async run(preSelected) {
        let selected;
        if (preSelected) {
            selected = preSelected;
        }
        else {
            const answers = await inquirer_1.default.prompt(this.menu);
            selected = answers[this.name];
        }
        switch (selected) {
            case 'exit':
                process.exit();
                break;
            default:
                await this.execute(selected);
        }
    }
}
exports.BaseMenu = BaseMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbC9CYXNlTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHdEQUErQjtBQUMvQixnREFBZ0Q7QUFFaEQsTUFBc0IsUUFBUTtJQVk1QixZQUFZLE9BQWUsRUFBRSxPQUFxQixFQUFFLFdBQTBCO1FBWHRFLFNBQUksR0FBRyxNQUFNLENBQUE7UUFDYixTQUFJLEdBQUcsTUFBTSxDQUFBO1FBQ2IsWUFBTyxHQUFHLEVBQUUsQ0FBQTtRQVVsQixJQUFJLE9BQU87WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksa0JBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQ3RDLEtBQUssTUFBTSxNQUFNLElBQUksV0FBVyxJQUFJLEVBQUU7WUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzVELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7U0FDRCxDQUFBO0lBQ3hCLENBQUM7SUFqQk8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPO1FBQzNCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUE7UUFDckIsSUFBSSxNQUFNLENBQUMsd0JBQXdCO1lBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ25ELE1BQU0sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFlTSxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQW9CO1FBQ25DLElBQUksUUFBZ0IsQ0FBQTtRQUNwQixJQUFJLFdBQVcsRUFBRTtZQUNmLFFBQVEsR0FBRyxXQUFXLENBQUE7U0FDdkI7YUFBTTtZQUNMLE1BQU0sT0FBTyxHQUFHLE1BQU0sa0JBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2hELFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzlCO1FBQ0QsUUFBUSxRQUFRLEVBQUU7WUFDaEIsS0FBSyxNQUFNO2dCQUNULE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDZCxNQUFLO1lBQ1A7Z0JBQ0UsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQy9CO0lBQ0gsQ0FBQztDQUNGO0FBekNELDRCQXlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuc3dlcnMsIENob2ljZVR5cGUsIFF1ZXN0aW9uIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInXG4vLyBpbXBvcnQgeyBNYWluTWVudSBhcyBNTSB9IGZyb20gJ3NyYy9NYWluTWVudSdcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VNZW51IHtcbiAgcHJpdmF0ZSBuYW1lID0gJ21lbnUnXG4gIHByaXZhdGUgdHlwZSA9ICdsaXN0J1xuICBwcml2YXRlIG1lc3NhZ2UgPSAnJ1xuICBwcml2YXRlIG1lbnU6IFF1ZXN0aW9uPEFuc3dlcnM+XG5cbiAgcHJpdmF0ZSBhc3luYyBleGVjdXRlKGNvbW1hbmQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzW2NvbW1hbmRdKClcbiAgICBpZiAoZ2xvYmFsLmV4aXRBZnRlckNvbW1hbmRFeGVjdXRlZCkgcHJvY2Vzcy5leGl0KClcbiAgICBhd2FpdCB0aGlzLnJ1bigpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGNob2ljZXM6IENob2ljZVR5cGVbXSwgZXhpdENob2ljZXM/OiBDaG9pY2VUeXBlW10pIHtcbiAgICBpZiAobWVzc2FnZSkgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgIGNob2ljZXMucHVzaChuZXcgaW5xdWlyZXIuU2VwYXJhdG9yKCkpXG4gICAgZm9yIChjb25zdCBjaG9pY2Ugb2YgZXhpdENob2ljZXMgfHwgW10pIGNob2ljZXMucHVzaChjaG9pY2UpXG4gICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogJ0V4aXQnLCB2YWx1ZTogJ2V4aXQnIH0pXG4gICAgdGhpcy5tZW51ID0ge1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgY2hvaWNlczogWy4uLmNob2ljZXNdLFxuICAgIH0gYXMgUXVlc3Rpb248QW5zd2Vycz5cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4ocHJlU2VsZWN0ZWQ/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgc2VsZWN0ZWQ6IHN0cmluZ1xuICAgIGlmIChwcmVTZWxlY3RlZCkge1xuICAgICAgc2VsZWN0ZWQgPSBwcmVTZWxlY3RlZFxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhbnN3ZXJzID0gYXdhaXQgaW5xdWlyZXIucHJvbXB0KHRoaXMubWVudSlcbiAgICAgIHNlbGVjdGVkID0gYW5zd2Vyc1t0aGlzLm5hbWVdXG4gICAgfVxuICAgIHN3aXRjaCAoc2VsZWN0ZWQpIHtcbiAgICAgIGNhc2UgJ2V4aXQnOlxuICAgICAgICBwcm9jZXNzLmV4aXQoKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlKHNlbGVjdGVkKVxuICAgIH1cbiAgfVxufVxuIl19