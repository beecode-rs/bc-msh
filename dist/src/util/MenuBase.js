"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const Main_1 = require("src/Main");
class MenuBase {
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
        this.run();
    }
    async run() {
        const answers = await inquirer_1.default.prompt(this.menu);
        const selected = answers[this.name];
        if (selected === 'exit')
            process.exit();
        if (selected === 'main')
            return new Main_1.Main().run();
        this.execute(selected);
    }
}
exports.MenuBase = MenuBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudUJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbC9NZW51QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHdEQUErQjtBQUMvQixtQ0FBK0I7QUFFL0IsTUFBc0IsUUFBUTtJQVc1QixZQUFZLE9BQWUsRUFBRSxPQUFxQixFQUFFLFdBQTBCO1FBVnRFLFNBQUksR0FBRyxNQUFNLENBQUE7UUFDYixTQUFJLEdBQUcsTUFBTSxDQUFBO1FBQ2IsWUFBTyxHQUFHLEVBQUUsQ0FBQTtRQVNsQixJQUFJLE9BQU87WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksa0JBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQ3RDLEtBQUssTUFBTSxNQUFNLElBQUksV0FBVyxJQUFJLEVBQUU7WUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzVELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7U0FDRCxDQUFBO0lBQ3hCLENBQUM7SUFoQk8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPO1FBQzNCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUE7UUFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1osQ0FBQztJQWVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsTUFBTSxPQUFPLEdBQUcsTUFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuQyxJQUFJLFFBQVEsS0FBSyxNQUFNO1lBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3ZDLElBQUksUUFBUSxLQUFLLE1BQU07WUFBRSxPQUFPLElBQUksV0FBSSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN4QixDQUFDO0NBQ0Y7QUEvQkQsNEJBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5zd2VycywgQ2hvaWNlVHlwZSwgUXVlc3Rpb24gfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCBpbnF1aXJlciBmcm9tICdpbnF1aXJlcidcbmltcG9ydCB7IE1haW4gfSBmcm9tICdzcmMvTWFpbidcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1lbnVCYXNlIHtcbiAgcHJpdmF0ZSBuYW1lID0gJ21lbnUnXG4gIHByaXZhdGUgdHlwZSA9ICdsaXN0J1xuICBwcml2YXRlIG1lc3NhZ2UgPSAnJ1xuICBwcml2YXRlIG1lbnU6IFF1ZXN0aW9uPEFuc3dlcnM+XG5cbiAgcHJpdmF0ZSBhc3luYyBleGVjdXRlKGNvbW1hbmQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzW2NvbW1hbmRdKClcbiAgICB0aGlzLnJ1bigpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGNob2ljZXM6IENob2ljZVR5cGVbXSwgZXhpdENob2ljZXM/OiBDaG9pY2VUeXBlW10pIHtcbiAgICBpZiAobWVzc2FnZSkgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgIGNob2ljZXMucHVzaChuZXcgaW5xdWlyZXIuU2VwYXJhdG9yKCkpXG4gICAgZm9yIChjb25zdCBjaG9pY2Ugb2YgZXhpdENob2ljZXMgfHwgW10pIGNob2ljZXMucHVzaChjaG9pY2UpXG4gICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogJ0V4aXQnLCB2YWx1ZTogJ2V4aXQnIH0pXG4gICAgdGhpcy5tZW51ID0ge1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgY2hvaWNlczogWy4uLmNob2ljZXNdLFxuICAgIH0gYXMgUXVlc3Rpb248QW5zd2Vycz5cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgYW5zd2VycyA9IGF3YWl0IGlucXVpcmVyLnByb21wdCh0aGlzLm1lbnUpXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBhbnN3ZXJzW3RoaXMubmFtZV1cbiAgICBpZiAoc2VsZWN0ZWQgPT09ICdleGl0JykgcHJvY2Vzcy5leGl0KClcbiAgICBpZiAoc2VsZWN0ZWQgPT09ICdtYWluJykgcmV0dXJuIG5ldyBNYWluKCkucnVuKClcbiAgICB0aGlzLmV4ZWN1dGUoc2VsZWN0ZWQpXG4gIH1cbn1cbiJdfQ==