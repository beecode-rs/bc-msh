"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const help_1 = require("src/cli/help");
const init_1 = require("src/cli/init");
const Git = require("src/exec/Git");
const cli = {
    hasArguments: (argv) => {
        let hasArgs = false;
        if (Object.keys(argv).length > 1)
            hasArgs = true;
        if (argv._.length > 0)
            hasArgs = true;
        if (hasArgs)
            global.exitAfterCommandExecuted = true;
        return hasArgs;
    },
    run: async (argv) => {
        if (argv.help)
            return help_1.help.printHelp();
        if (argv.init)
            return init_1.init.create();
        if (argv.git)
            return await new Git().run(argv.git);
    },
};
exports.cli = cli;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQW1DO0FBQ25DLHVDQUFtQztBQUNuQyxvQ0FBb0M7QUFFcEMsTUFBTSxHQUFHLEdBQUc7SUFDVixZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQVcsRUFBRTtRQUM5QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUE7UUFDbkIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNoRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFBO1FBRXJDLElBQUksT0FBTztZQUFFLE1BQU0sQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUE7UUFDbkQsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQztJQUNELEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFpQixFQUFFO1FBQ2pDLElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLFdBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxXQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDbkMsSUFBSSxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEQsQ0FBQztDQUNGLENBQUE7QUFFUSxrQkFBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhlbHAgfSBmcm9tICdzcmMvY2xpL2hlbHAnXG5pbXBvcnQgeyBpbml0IH0gZnJvbSAnc3JjL2NsaS9pbml0J1xuaW1wb3J0IEdpdCA9IHJlcXVpcmUoJ3NyYy9leGVjL0dpdCcpXG5cbmNvbnN0IGNsaSA9IHtcbiAgaGFzQXJndW1lbnRzOiAoYXJndik6IGJvb2xlYW4gPT4ge1xuICAgIGxldCBoYXNBcmdzID0gZmFsc2VcbiAgICBpZiAoT2JqZWN0LmtleXMoYXJndikubGVuZ3RoID4gMSkgaGFzQXJncyA9IHRydWVcbiAgICBpZiAoYXJndi5fLmxlbmd0aCA+IDApIGhhc0FyZ3MgPSB0cnVlXG5cbiAgICBpZiAoaGFzQXJncykgZ2xvYmFsLmV4aXRBZnRlckNvbW1hbmRFeGVjdXRlZCA9IHRydWVcbiAgICByZXR1cm4gaGFzQXJnc1xuICB9LFxuICBydW46IGFzeW5jIChhcmd2KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGFyZ3YuaGVscCkgcmV0dXJuIGhlbHAucHJpbnRIZWxwKClcbiAgICBpZiAoYXJndi5pbml0KSByZXR1cm4gaW5pdC5jcmVhdGUoKVxuICAgIGlmIChhcmd2LmdpdCkgcmV0dXJuIGF3YWl0IG5ldyBHaXQoKS5ydW4oYXJndi5naXQpXG4gIH0sXG59XG5cbmV4cG9ydCB7IGNsaSB9XG4iXX0=