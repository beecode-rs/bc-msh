"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alias_1 = require("src/cli/alias");
const help_1 = require("src/cli/help");
const init_1 = require("src/cli/init");
const Clean = require("src/exec/Clean");
const Git = require("src/exec/Git");
const NPM = require("src/exec/NPM");
const PR = require("src/exec/PR");
const util_1 = require("src/util");
const cli = {
    hasArguments: (argv) => {
        let hasArgs = false;
        if (Object.keys(argv).length > 1)
            hasArgs = true;
        if (argv._.length > 0)
            hasArgs = true;
        if (cli.requestRunningMultipleCommands(argv)) {
            util_1.util.log('ERROR !!! - CLI can run only one cmd at a time');
            process.exit();
        }
        if (hasArgs)
            global.exitAfterCommandExecuted = true;
        return hasArgs;
    },
    run: async (argv) => {
        if (argv.help)
            help_1.help.printHelp();
        else if (argv.version)
            util_1.util.log(`v${global.projectVersion}`);
        else if (argv.init)
            init_1.init.create();
        else if (argv.clean)
            await new Clean().run(argv.clean);
        else if (argv.npm)
            await new NPM().run('global');
        else if (argv.pr)
            await new PR().run('createMergePR');
        else if (argv.git)
            await new Git().run(argv.git);
        else
            util_1.util.log('ERROR !!! - Command not found');
    },
    requestRunningMultipleCommands: argv => Object.values(alias_1.alias).reduce((sum, cmd) => (argv[cmd] ? ++sum : sum), 0) > 1,
    allowPrintConfigForCmd: (argv) => !argv.help && !argv.init && !argv.version,
};
exports.cli = cli;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQXFDO0FBQ3JDLHVDQUFtQztBQUNuQyx1Q0FBbUM7QUFDbkMsd0NBQXdDO0FBQ3hDLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsa0NBQWtDO0FBQ2xDLG1DQUErQjtBQUUvQixNQUFNLEdBQUcsR0FBRztJQUNWLFlBQVksRUFBRSxDQUFDLElBQUksRUFBVyxFQUFFO1FBQzlCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQTtRQUNuQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFBO1FBQ2hELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLE9BQU8sR0FBRyxJQUFJLENBQUE7UUFFckMsSUFBSSxHQUFHLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUMsV0FBSSxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO1lBQzFELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtTQUNmO1FBRUQsSUFBSSxPQUFPO1lBQUUsTUFBTSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQTtRQUNuRCxPQUFPLE9BQU8sQ0FBQTtJQUNoQixDQUFDO0lBQ0QsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQWlCLEVBQUU7UUFDakMsSUFBSSxJQUFJLENBQUMsSUFBSTtZQUFFLFdBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTthQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsV0FBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO2FBQ3ZELElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxXQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7YUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ2pELElBQUksSUFBSSxDQUFDLEdBQUc7WUFBRSxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQzNDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO2FBQ2hELElBQUksSUFBSSxDQUFDLEdBQUc7WUFBRSxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTs7WUFDM0MsV0FBSSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFDRCw4QkFBOEIsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ25ILHNCQUFzQixFQUFFLENBQUMsSUFBSSxFQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Q0FDckYsQ0FBQTtBQUVRLGtCQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWxpYXMgfSBmcm9tICdzcmMvY2xpL2FsaWFzJ1xuaW1wb3J0IHsgaGVscCB9IGZyb20gJ3NyYy9jbGkvaGVscCdcbmltcG9ydCB7IGluaXQgfSBmcm9tICdzcmMvY2xpL2luaXQnXG5pbXBvcnQgQ2xlYW4gPSByZXF1aXJlKCdzcmMvZXhlYy9DbGVhbicpXG5pbXBvcnQgR2l0ID0gcmVxdWlyZSgnc3JjL2V4ZWMvR2l0JylcbmltcG9ydCBOUE0gPSByZXF1aXJlKCdzcmMvZXhlYy9OUE0nKVxuaW1wb3J0IFBSID0gcmVxdWlyZSgnc3JjL2V4ZWMvUFInKVxuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ3NyYy91dGlsJ1xuXG5jb25zdCBjbGkgPSB7XG4gIGhhc0FyZ3VtZW50czogKGFyZ3YpOiBib29sZWFuID0+IHtcbiAgICBsZXQgaGFzQXJncyA9IGZhbHNlXG4gICAgaWYgKE9iamVjdC5rZXlzKGFyZ3YpLmxlbmd0aCA+IDEpIGhhc0FyZ3MgPSB0cnVlXG4gICAgaWYgKGFyZ3YuXy5sZW5ndGggPiAwKSBoYXNBcmdzID0gdHJ1ZVxuXG4gICAgaWYgKGNsaS5yZXF1ZXN0UnVubmluZ011bHRpcGxlQ29tbWFuZHMoYXJndikpIHtcbiAgICAgIHV0aWwubG9nKCdFUlJPUiAhISEgLSBDTEkgY2FuIHJ1biBvbmx5IG9uZSBjbWQgYXQgYSB0aW1lJylcbiAgICAgIHByb2Nlc3MuZXhpdCgpXG4gICAgfVxuXG4gICAgaWYgKGhhc0FyZ3MpIGdsb2JhbC5leGl0QWZ0ZXJDb21tYW5kRXhlY3V0ZWQgPSB0cnVlXG4gICAgcmV0dXJuIGhhc0FyZ3NcbiAgfSxcbiAgcnVuOiBhc3luYyAoYXJndik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChhcmd2LmhlbHApIGhlbHAucHJpbnRIZWxwKClcbiAgICBlbHNlIGlmIChhcmd2LnZlcnNpb24pIHV0aWwubG9nKGB2JHtnbG9iYWwucHJvamVjdFZlcnNpb259YClcbiAgICBlbHNlIGlmIChhcmd2LmluaXQpIGluaXQuY3JlYXRlKClcbiAgICBlbHNlIGlmIChhcmd2LmNsZWFuKSBhd2FpdCBuZXcgQ2xlYW4oKS5ydW4oYXJndi5jbGVhbilcbiAgICBlbHNlIGlmIChhcmd2Lm5wbSkgYXdhaXQgbmV3IE5QTSgpLnJ1bignZ2xvYmFsJylcbiAgICBlbHNlIGlmIChhcmd2LnByKSBhd2FpdCBuZXcgUFIoKS5ydW4oJ2NyZWF0ZU1lcmdlUFInKVxuICAgIGVsc2UgaWYgKGFyZ3YuZ2l0KSBhd2FpdCBuZXcgR2l0KCkucnVuKGFyZ3YuZ2l0KVxuICAgIGVsc2UgdXRpbC5sb2coJ0VSUk9SICEhISAtIENvbW1hbmQgbm90IGZvdW5kJylcbiAgfSxcbiAgcmVxdWVzdFJ1bm5pbmdNdWx0aXBsZUNvbW1hbmRzOiBhcmd2ID0+IE9iamVjdC52YWx1ZXMoYWxpYXMpLnJlZHVjZSgoc3VtLCBjbWQpID0+IChhcmd2W2NtZF0gPyArK3N1bSA6IHN1bSksIDApID4gMSxcbiAgYWxsb3dQcmludENvbmZpZ0ZvckNtZDogKGFyZ3YpOiBib29sZWFuID0+ICFhcmd2LmhlbHAgJiYgIWFyZ3YuaW5pdCAmJiAhYXJndi52ZXJzaW9uLFxufVxuXG5leHBvcnQgeyBjbGkgfVxuIl19