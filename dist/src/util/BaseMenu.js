"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
class BaseMenu {
    constructor(message, choices, exitChoices) {
        this.name = 'menu';
        this.type = 'list';
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
        const selected = preSelected ? preSelected : (await inquirer_1.default.prompt(this.menu))[this.name];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbC9CYXNlTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHdEQUErQjtBQUUvQixNQUFzQixRQUFRO0lBWTVCLFlBQXNCLE9BQWUsRUFBRSxPQUFxQixFQUFFLFdBQTBCO1FBWGhGLFNBQUksR0FBRyxNQUFNLENBQUE7UUFDYixTQUFJLEdBQUcsTUFBTSxDQUFBO1FBV25CLElBQUksT0FBTztZQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7UUFDdEMsS0FBSyxNQUFNLE1BQU0sSUFBSSxXQUFXLElBQUksRUFBRTtZQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUQsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztTQUNELENBQUE7SUFDeEIsQ0FBQztJQWpCTyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU87UUFDM0IsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQTtRQUNyQixJQUFJLE1BQU0sQ0FBQyx3QkFBd0I7WUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDbkQsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQWVNLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBb0I7UUFDbkMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUYsUUFBUSxRQUFRLEVBQUU7WUFDaEIsS0FBSyxNQUFNO2dCQUNULE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDZCxNQUFLO1lBQ1A7Z0JBQ0UsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQy9CO0lBQ0gsQ0FBQztDQUNGO0FBbkNELDRCQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuc3dlcnMsIENob2ljZVR5cGUsIFF1ZXN0aW9uIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlTWVudSB7XG4gIHByaXZhdGUgbmFtZSA9ICdtZW51J1xuICBwcml2YXRlIHR5cGUgPSAnbGlzdCdcbiAgcHJpdmF0ZSBtZXNzYWdlOiBzdHJpbmdcbiAgcHJpdmF0ZSBtZW51OiBRdWVzdGlvbjxBbnN3ZXJzPlxuXG4gIHByaXZhdGUgYXN5bmMgZXhlY3V0ZShjb21tYW5kKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpc1tjb21tYW5kXSgpXG4gICAgaWYgKGdsb2JhbC5leGl0QWZ0ZXJDb21tYW5kRXhlY3V0ZWQpIHByb2Nlc3MuZXhpdCgpXG4gICAgYXdhaXQgdGhpcy5ydW4oKVxuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgY2hvaWNlczogQ2hvaWNlVHlwZVtdLCBleGl0Q2hvaWNlcz86IENob2ljZVR5cGVbXSkge1xuICAgIGlmIChtZXNzYWdlKSB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlXG4gICAgY2hvaWNlcy5wdXNoKG5ldyBpbnF1aXJlci5TZXBhcmF0b3IoKSlcbiAgICBmb3IgKGNvbnN0IGNob2ljZSBvZiBleGl0Q2hvaWNlcyB8fCBbXSkgY2hvaWNlcy5wdXNoKGNob2ljZSlcbiAgICBjaG9pY2VzLnB1c2goeyBuYW1lOiAnRXhpdCcsIHZhbHVlOiAnZXhpdCcgfSlcbiAgICB0aGlzLm1lbnUgPSB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBjaG9pY2VzOiBbLi4uY2hvaWNlc10sXG4gICAgfSBhcyBRdWVzdGlvbjxBbnN3ZXJzPlxuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihwcmVTZWxlY3RlZD86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gcHJlU2VsZWN0ZWQgPyBwcmVTZWxlY3RlZCA6IChhd2FpdCBpbnF1aXJlci5wcm9tcHQodGhpcy5tZW51KSlbdGhpcy5uYW1lXVxuICAgIHN3aXRjaCAoc2VsZWN0ZWQpIHtcbiAgICAgIGNhc2UgJ2V4aXQnOlxuICAgICAgICBwcm9jZXNzLmV4aXQoKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlKHNlbGVjdGVkKVxuICAgIH1cbiAgfVxufVxuIl19