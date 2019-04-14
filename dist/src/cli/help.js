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
        util_1.util.log('   -c | --clean [cmd]');
        util_1.util.log('      cmd:');
        util_1.util.log('          npm          Clean all node_modules folders');
        util_1.util.log('          docker       Remove all docker images (do a "docker-compose down" command first)');
        util_1.util.log('');
        util_1.util.log('   -n | --npm          Run npm i in all containers');
        util_1.util.log('');
        util_1.util.log('   -p | --pr           Generate PR for all projects (added option to auto merge)');
        util_1.util.log('');
        util_1.util.log('   -h | --help         Display this help');
        util_1.util.log('');
    },
};
exports.help = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvaGVscC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUErQjtBQUUvQixNQUFNLElBQUksR0FBRztJQUNYLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDZCxXQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFDbEMsV0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNaLFdBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDcEIsV0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNaLFdBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUMvQixXQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3RCLFdBQUksQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQTtRQUNwRCxXQUFJLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7UUFDcEQsV0FBSSxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO1FBQ3JELFdBQUksQ0FBQyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FBQTtRQUM5RCxXQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ1osV0FBSSxDQUFDLEdBQUcsQ0FBQyxzRUFBc0UsQ0FBQyxDQUFBO1FBQ2hGLFdBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDWixXQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDakMsV0FBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUN0QixXQUFJLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUE7UUFDakUsV0FBSSxDQUFDLEdBQUcsQ0FBQyw0RkFBNEYsQ0FBQyxDQUFBO1FBQ3RHLFdBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDWixXQUFJLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLENBQUE7UUFDOUQsV0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNaLFdBQUksQ0FBQyxHQUFHLENBQUMsa0ZBQWtGLENBQUMsQ0FBQTtRQUM1RixXQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ1osV0FBSSxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1FBQ3BELFdBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDZCxDQUFDO0NBQ0YsQ0FBQTtBQUVRLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbCB9IGZyb20gJ3NyYy91dGlsJ1xuXG5jb25zdCBoZWxwID0ge1xuICBwcmludEhlbHA6ICgpID0+IHtcbiAgICB1dGlsLmxvZygnVXNhZ2U6IG1zaCBbb3B0aW9uLi4uXScpXG4gICAgdXRpbC5sb2coJycpXG4gICAgdXRpbC5sb2coJ09wdGlvbnM6JylcbiAgICB1dGlsLmxvZygnJylcbiAgICB1dGlsLmxvZygnICAgLWcgfCAtLWdpdCBbY21kXScpXG4gICAgdXRpbC5sb2coJyAgICAgIGNtZDonKVxuICAgIHV0aWwubG9nKCcgICAgICAgICAgY2xvbmUgICAgICAgIENsb25lIGFsbCBwcm9qZWN0JylcbiAgICB1dGlsLmxvZygnICAgICAgICAgIHB1bGwgICAgICAgICBQdWxsIGFsbCBwcm9qZWN0cycpXG4gICAgdXRpbC5sb2coJyAgICAgICAgICBmZXRjaCAgICAgICAgRmV0Y2ggYWxsIHByb2plY3RzJylcbiAgICB1dGlsLmxvZygnICAgICAgICAgIHN0YXR1cyAgICAgICBHZXQgc3RhdHVzIGZvciBhbGwgcHJvamVjdHMnKVxuICAgIHV0aWwubG9nKCcnKVxuICAgIHV0aWwubG9nKCcgICAtaSB8IC0taW5pdCAgICAgICAgIEluaXRpYXRlIC5tc2ggY29uZmlnIGZpbGUgd2l0aCBkZWZhdWx0IHZhbHVlcycpXG4gICAgdXRpbC5sb2coJycpXG4gICAgdXRpbC5sb2coJyAgIC1jIHwgLS1jbGVhbiBbY21kXScpXG4gICAgdXRpbC5sb2coJyAgICAgIGNtZDonKVxuICAgIHV0aWwubG9nKCcgICAgICAgICAgbnBtICAgICAgICAgIENsZWFuIGFsbCBub2RlX21vZHVsZXMgZm9sZGVycycpXG4gICAgdXRpbC5sb2coJyAgICAgICAgICBkb2NrZXIgICAgICAgUmVtb3ZlIGFsbCBkb2NrZXIgaW1hZ2VzIChkbyBhIFwiZG9ja2VyLWNvbXBvc2UgZG93blwiIGNvbW1hbmQgZmlyc3QpJylcbiAgICB1dGlsLmxvZygnJylcbiAgICB1dGlsLmxvZygnICAgLW4gfCAtLW5wbSAgICAgICAgICBSdW4gbnBtIGkgaW4gYWxsIGNvbnRhaW5lcnMnKVxuICAgIHV0aWwubG9nKCcnKVxuICAgIHV0aWwubG9nKCcgICAtcCB8IC0tcHIgICAgICAgICAgIEdlbmVyYXRlIFBSIGZvciBhbGwgcHJvamVjdHMgKGFkZGVkIG9wdGlvbiB0byBhdXRvIG1lcmdlKScpXG4gICAgdXRpbC5sb2coJycpXG4gICAgdXRpbC5sb2coJyAgIC1oIHwgLS1oZWxwICAgICAgICAgRGlzcGxheSB0aGlzIGhlbHAnKVxuICAgIHV0aWwubG9nKCcnKVxuICB9LFxufVxuXG5leHBvcnQgeyBoZWxwIH1cbiJdfQ==