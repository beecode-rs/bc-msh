"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("src/util");
const help = {
    printHelp: () => {
        util_1.util.log('Usage: msh [option...]');
        util_1.util.log('');
        util_1.util.log('Options:');
        util_1.util.log('');
        util_1.util.log('   -g | --git [cmd]');
        util_1.util.log('      cmd:');
        util_1.util.log('          clone        Clone all project');
        util_1.util.log('          pull         Pull all projects');
        util_1.util.log('          fetch        Fetch all projects');
        util_1.util.log('          status       Get status for all projects');
        util_1.util.log('');
        util_1.util.log('   -i | --init         Initiate .msh config file with default values');
        util_1.util.log('');
        // util.log('   clean [cmd]')
        // util.log('   cmd:')
        // util.log('        npm          Clean all node_modules folders')
        // util.log('        images       Remove all docker images (do a "docker-compose down" command first)')
        // util.log('')
        // util.log('   npm               Run npm i in all containers')
        // util.log('')
        // util.log('   pr                Generate PR for all projects (added option to auto merge)')
        // util.log('')
        // util.log('   npmpre [opts]     Create all node_modules folders with user permissions set')
        // util.log('   opts:')
        // util.log('        1}           User name')
        // util.log('        2)           "win" if use on windows to skip sudo and group name')
        // util.log('')
        util_1.util.log('   -h | --help         Display this help');
        util_1.util.log('');
    },
};
exports.help = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvaGVscC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUErQjtBQUUvQixNQUFNLElBQUksR0FBRztJQUNYLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDZCxXQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFDbEMsV0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNaLFdBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDcEIsV0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNaLFdBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUMvQixXQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3RCLFdBQUksQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQTtRQUNwRCxXQUFJLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7UUFDcEQsV0FBSSxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO1FBQ3JELFdBQUksQ0FBQyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FBQTtRQUM5RCxXQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ1osV0FBSSxDQUFDLEdBQUcsQ0FBQyxzRUFBc0UsQ0FBQyxDQUFBO1FBQ2hGLFdBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDWiw2QkFBNkI7UUFDN0Isc0JBQXNCO1FBQ3RCLGtFQUFrRTtRQUNsRSx1R0FBdUc7UUFDdkcsZUFBZTtRQUNmLCtEQUErRDtRQUMvRCxlQUFlO1FBQ2YsNkZBQTZGO1FBQzdGLGVBQWU7UUFDZiw2RkFBNkY7UUFDN0YsdUJBQXVCO1FBQ3ZCLDZDQUE2QztRQUM3Qyx1RkFBdUY7UUFDdkYsZUFBZTtRQUNmLFdBQUksQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQTtRQUNwRCxXQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2QsQ0FBQztDQUNGLENBQUE7QUFFUSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcblxuY29uc3QgaGVscCA9IHtcbiAgcHJpbnRIZWxwOiAoKSA9PiB7XG4gICAgdXRpbC5sb2coJ1VzYWdlOiBtc2ggW29wdGlvbi4uLl0nKVxuICAgIHV0aWwubG9nKCcnKVxuICAgIHV0aWwubG9nKCdPcHRpb25zOicpXG4gICAgdXRpbC5sb2coJycpXG4gICAgdXRpbC5sb2coJyAgIC1nIHwgLS1naXQgW2NtZF0nKVxuICAgIHV0aWwubG9nKCcgICAgICBjbWQ6JylcbiAgICB1dGlsLmxvZygnICAgICAgICAgIGNsb25lICAgICAgICBDbG9uZSBhbGwgcHJvamVjdCcpXG4gICAgdXRpbC5sb2coJyAgICAgICAgICBwdWxsICAgICAgICAgUHVsbCBhbGwgcHJvamVjdHMnKVxuICAgIHV0aWwubG9nKCcgICAgICAgICAgZmV0Y2ggICAgICAgIEZldGNoIGFsbCBwcm9qZWN0cycpXG4gICAgdXRpbC5sb2coJyAgICAgICAgICBzdGF0dXMgICAgICAgR2V0IHN0YXR1cyBmb3IgYWxsIHByb2plY3RzJylcbiAgICB1dGlsLmxvZygnJylcbiAgICB1dGlsLmxvZygnICAgLWkgfCAtLWluaXQgICAgICAgICBJbml0aWF0ZSAubXNoIGNvbmZpZyBmaWxlIHdpdGggZGVmYXVsdCB2YWx1ZXMnKVxuICAgIHV0aWwubG9nKCcnKVxuICAgIC8vIHV0aWwubG9nKCcgICBjbGVhbiBbY21kXScpXG4gICAgLy8gdXRpbC5sb2coJyAgIGNtZDonKVxuICAgIC8vIHV0aWwubG9nKCcgICAgICAgIG5wbSAgICAgICAgICBDbGVhbiBhbGwgbm9kZV9tb2R1bGVzIGZvbGRlcnMnKVxuICAgIC8vIHV0aWwubG9nKCcgICAgICAgIGltYWdlcyAgICAgICBSZW1vdmUgYWxsIGRvY2tlciBpbWFnZXMgKGRvIGEgXCJkb2NrZXItY29tcG9zZSBkb3duXCIgY29tbWFuZCBmaXJzdCknKVxuICAgIC8vIHV0aWwubG9nKCcnKVxuICAgIC8vIHV0aWwubG9nKCcgICBucG0gICAgICAgICAgICAgICBSdW4gbnBtIGkgaW4gYWxsIGNvbnRhaW5lcnMnKVxuICAgIC8vIHV0aWwubG9nKCcnKVxuICAgIC8vIHV0aWwubG9nKCcgICBwciAgICAgICAgICAgICAgICBHZW5lcmF0ZSBQUiBmb3IgYWxsIHByb2plY3RzIChhZGRlZCBvcHRpb24gdG8gYXV0byBtZXJnZSknKVxuICAgIC8vIHV0aWwubG9nKCcnKVxuICAgIC8vIHV0aWwubG9nKCcgICBucG1wcmUgW29wdHNdICAgICBDcmVhdGUgYWxsIG5vZGVfbW9kdWxlcyBmb2xkZXJzIHdpdGggdXNlciBwZXJtaXNzaW9ucyBzZXQnKVxuICAgIC8vIHV0aWwubG9nKCcgICBvcHRzOicpXG4gICAgLy8gdXRpbC5sb2coJyAgICAgICAgMX0gICAgICAgICAgIFVzZXIgbmFtZScpXG4gICAgLy8gdXRpbC5sb2coJyAgICAgICAgMikgICAgICAgICAgIFwid2luXCIgaWYgdXNlIG9uIHdpbmRvd3MgdG8gc2tpcCBzdWRvIGFuZCBncm91cCBuYW1lJylcbiAgICAvLyB1dGlsLmxvZygnJylcbiAgICB1dGlsLmxvZygnICAgLWggfCAtLWhlbHAgICAgICAgICBEaXNwbGF5IHRoaXMgaGVscCcpXG4gICAgdXRpbC5sb2coJycpXG4gIH0sXG59XG5cbmV4cG9ydCB7IGhlbHAgfVxuIl19