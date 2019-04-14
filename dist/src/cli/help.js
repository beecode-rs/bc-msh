"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("src/util");
const help = {
    printHelp: () => {
        util_1.util.log(`
Usage: msh [option...]

Options:

   -g | --git [cmd]
      cmd:
          clone        Clone all project
          pull         Pull all projects
          fetch        Fetch all projects
          status       Get status for all projects

   -i | --init         Initiate .msh config file with default values

   -c | --clean [cmd]
      cmd:
          npm          Clean all node_modules folders
          docker       Remove all docker images (do a "docker-compose down" command first)

   -n | --npm          Run npm i in all containers

   -p | --pr           Generate PR for all projects (added option to auto merge)

   -h | --help         Display this help
`);
    },
};
exports.help = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvaGVscC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUErQjtBQUUvQixNQUFNLElBQUksR0FBRztJQUNYLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDZCxXQUFJLENBQUMsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F3QlosQ0FBQyxDQUFBO0lBQ0EsQ0FBQztDQUNGLENBQUE7QUFFUSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcblxuY29uc3QgaGVscCA9IHtcbiAgcHJpbnRIZWxwOiAoKSA9PiB7XG4gICAgdXRpbC5sb2coYFxuVXNhZ2U6IG1zaCBbb3B0aW9uLi4uXVxuXG5PcHRpb25zOlxuXG4gICAtZyB8IC0tZ2l0IFtjbWRdXG4gICAgICBjbWQ6XG4gICAgICAgICAgY2xvbmUgICAgICAgIENsb25lIGFsbCBwcm9qZWN0XG4gICAgICAgICAgcHVsbCAgICAgICAgIFB1bGwgYWxsIHByb2plY3RzXG4gICAgICAgICAgZmV0Y2ggICAgICAgIEZldGNoIGFsbCBwcm9qZWN0c1xuICAgICAgICAgIHN0YXR1cyAgICAgICBHZXQgc3RhdHVzIGZvciBhbGwgcHJvamVjdHNcblxuICAgLWkgfCAtLWluaXQgICAgICAgICBJbml0aWF0ZSAubXNoIGNvbmZpZyBmaWxlIHdpdGggZGVmYXVsdCB2YWx1ZXNcblxuICAgLWMgfCAtLWNsZWFuIFtjbWRdXG4gICAgICBjbWQ6XG4gICAgICAgICAgbnBtICAgICAgICAgIENsZWFuIGFsbCBub2RlX21vZHVsZXMgZm9sZGVyc1xuICAgICAgICAgIGRvY2tlciAgICAgICBSZW1vdmUgYWxsIGRvY2tlciBpbWFnZXMgKGRvIGEgXCJkb2NrZXItY29tcG9zZSBkb3duXCIgY29tbWFuZCBmaXJzdClcblxuICAgLW4gfCAtLW5wbSAgICAgICAgICBSdW4gbnBtIGkgaW4gYWxsIGNvbnRhaW5lcnNcblxuICAgLXAgfCAtLXByICAgICAgICAgICBHZW5lcmF0ZSBQUiBmb3IgYWxsIHByb2plY3RzIChhZGRlZCBvcHRpb24gdG8gYXV0byBtZXJnZSlcblxuICAgLWggfCAtLWhlbHAgICAgICAgICBEaXNwbGF5IHRoaXMgaGVscFxuYClcbiAgfSxcbn1cblxuZXhwb3J0IHsgaGVscCB9XG4iXX0=