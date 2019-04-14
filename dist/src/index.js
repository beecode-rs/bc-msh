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
        if (cli_1.cli.allowPrintConfigForCmd(argv))
            util_1.util.printConfig();
        await cli_1.cli.run(argv);
    }
    else {
        util_1.util.printConfig();
        await new MainMenu_1.MainMenu().run();
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQkFBZ0I7QUFFaEIsd0RBQStCO0FBQy9CLGlDQUE2QjtBQUM3Qix5Q0FBcUM7QUFDckMsMkNBQXVDO0FBQ3ZDLG1DQUErQjtBQUUvQixNQUFNLElBQUksR0FBRyxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFMLGFBQUssRUFBRSxDQUFDLENBQ3REO0FBQUEsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNYLElBQUksU0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixJQUFJLFNBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7WUFBRSxXQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDeEQsTUFBTSxTQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3BCO1NBQU07UUFDTCxXQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDbEIsTUFBTSxJQUFJLG1CQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtLQUMzQjtBQUNILENBQUMsQ0FBQyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL2luaXQnXG5cbmltcG9ydCBtaW5pbWlzdCBmcm9tICdtaW5pbWlzdCdcbmltcG9ydCB7IGNsaSB9IGZyb20gJ3NyYy9jbGknXG5pbXBvcnQgeyBhbGlhcyB9IGZyb20gJ3NyYy9jbGkvYWxpYXMnXG5pbXBvcnQgeyBNYWluTWVudSB9IGZyb20gJ3NyYy9NYWluTWVudSdcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcblxuY29uc3QgYXJndiA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSwgeyBhbGlhcyB9KVxuOyhhc3luYyAoKSA9PiB7XG4gIGlmIChjbGkuaGFzQXJndW1lbnRzKGFyZ3YpKSB7XG4gICAgaWYgKGNsaS5hbGxvd1ByaW50Q29uZmlnRm9yQ21kKGFyZ3YpKSB1dGlsLnByaW50Q29uZmlnKClcbiAgICBhd2FpdCBjbGkucnVuKGFyZ3YpXG4gIH0gZWxzZSB7XG4gICAgdXRpbC5wcmludENvbmZpZygpXG4gICAgYXdhaXQgbmV3IE1haW5NZW51KCkucnVuKClcbiAgfVxufSkoKVxuIl19