"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuBase_1 = require("src/util/MenuBase");
// @ts-ignore
class Main extends MenuBase_1.MenuBase {
    async execute(command) {
        const clazz = require(`src/exec/${command}`);
        await new clazz().run();
    }
    constructor() {
        super('What do you want to do?', [
            { name: 'Git', value: 'git' },
            { name: 'Clean', value: 'clean' },
            { name: 'NPM', value: 'npm' },
            { name: 'Pull Request', value: 'pr' },
        ]);
    }
}
exports.Main = Main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsZ0RBQTRDO0FBRTVDLGFBQWE7QUFDYixNQUFhLElBQUssU0FBUSxtQkFBUTtJQUN4QixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU87UUFDM0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksT0FBTyxFQUFFLENBQVEsQ0FBQTtRQUNuRCxNQUFNLElBQUksS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUNEO1FBQ0UsS0FBSyxDQUFDLHlCQUF5QixFQUFFO1lBQy9CLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQzdCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1lBQ2pDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQzdCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO1NBQ3RCLENBQUMsQ0FBQTtJQUNwQixDQUFDO0NBQ0Y7QUFiRCxvQkFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENob2ljZVR5cGUgfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCB7IE1lbnVCYXNlIH0gZnJvbSAnc3JjL3V0aWwvTWVudUJhc2UnXG5cbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCBjbGFzcyBNYWluIGV4dGVuZHMgTWVudUJhc2Uge1xuICBwcml2YXRlIGFzeW5jIGV4ZWN1dGUoY29tbWFuZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNsYXp6ID0gcmVxdWlyZShgc3JjL2V4ZWMvJHtjb21tYW5kfWApIGFzIGFueVxuICAgIGF3YWl0IG5ldyBjbGF6eigpLnJ1bigpXG4gIH1cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ1doYXQgZG8geW91IHdhbnQgdG8gZG8/JywgW1xuICAgICAgeyBuYW1lOiAnR2l0JywgdmFsdWU6ICdnaXQnIH0sXG4gICAgICB7IG5hbWU6ICdDbGVhbicsIHZhbHVlOiAnY2xlYW4nIH0sXG4gICAgICB7IG5hbWU6ICdOUE0nLCB2YWx1ZTogJ25wbScgfSxcbiAgICAgIHsgbmFtZTogJ1B1bGwgUmVxdWVzdCcsIHZhbHVlOiAncHInIH0sXG4gICAgXSBhcyBDaG9pY2VUeXBlW10pXG4gIH1cbn1cbiJdfQ==