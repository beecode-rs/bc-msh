"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../init");
const minimist_1 = __importDefault(require("minimist"));
const cli_1 = require("src/cli");
const alias_1 = require("src/cli/alias");
const MainMenu_1 = require("src/MainMenu");
const util_1 = require("src/util");
const argv = minimist_1.default(process.argv.slice(2), { alias: alias_1.alias });
(async () => {
    if (cli_1.cli.hasArguments(argv)) {
        if (!argv.help && !argv.init)
            util_1.util.printConfig();
        await cli_1.cli.run(argv);
    }
    else {
        util_1.util.printConfig();
        await new MainMenu_1.MainMenu().run();
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQkFBZ0I7QUFFaEIsd0RBQStCO0FBQy9CLGlDQUE2QjtBQUM3Qix5Q0FBcUM7QUFDckMsMkNBQXVDO0FBQ3ZDLG1DQUErQjtBQUUvQixNQUFNLElBQUksR0FBRyxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFMLGFBQUssRUFBRSxDQUFDLENBQ3REO0FBQUEsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNYLElBQUksU0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsV0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2hELE1BQU0sU0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUNwQjtTQUFNO1FBQ0wsV0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLE1BQU0sSUFBSSxtQkFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7S0FDM0I7QUFDSCxDQUFDLENBQUMsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9pbml0J1xuXG5pbXBvcnQgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnXG5pbXBvcnQgeyBjbGkgfSBmcm9tICdzcmMvY2xpJ1xuaW1wb3J0IHsgYWxpYXMgfSBmcm9tICdzcmMvY2xpL2FsaWFzJ1xuaW1wb3J0IHsgTWFpbk1lbnUgfSBmcm9tICdzcmMvTWFpbk1lbnUnXG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnc3JjL3V0aWwnXG5cbmNvbnN0IGFyZ3YgPSBtaW5pbWlzdChwcm9jZXNzLmFyZ3Yuc2xpY2UoMiksIHsgYWxpYXMgfSlcbjsoYXN5bmMgKCkgPT4ge1xuICBpZiAoY2xpLmhhc0FyZ3VtZW50cyhhcmd2KSkge1xuICAgIGlmICghYXJndi5oZWxwICYmICFhcmd2LmluaXQpIHV0aWwucHJpbnRDb25maWcoKVxuICAgIGF3YWl0IGNsaS5ydW4oYXJndilcbiAgfSBlbHNlIHtcbiAgICB1dGlsLnByaW50Q29uZmlnKClcbiAgICBhd2FpdCBuZXcgTWFpbk1lbnUoKS5ydW4oKVxuICB9XG59KSgpXG4iXX0=