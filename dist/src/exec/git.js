"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const chalk_1 = __importDefault(require("chalk"));
const lodash_1 = require("lodash");
const shelljs_1 = __importDefault(require("shelljs"));
const common_1 = require("src/common");
const util_1 = require("src/util");
const SubMenu_1 = require("src/util/SubMenu");
class Git extends SubMenu_1.SubMenu {
    async gitCommand(command) {
        const promises = [];
        for (const project of global.config.projects) {
            const cmd = `git -C ${global.config.rootDir}/${project} ${command}`;
            const promise = util_1.util.execAsync(cmd).then(execResult => {
                util_1.util.log(chalk_1.default.green(`DONE - ${project}`));
                return { [project]: execResult };
            });
            promises.push(promise);
        }
        const result = await Promise.all(promises);
        common_1.common.printMessage(lodash_1.assignIn({}, ...result));
    }
    constructor() {
        super('Git action?', [
            { name: 'Status', value: 'status' },
            { name: 'Fetch', value: 'fetch' },
            { name: 'Pull', value: 'pull' },
            { name: 'Clone', value: 'clone' },
        ]);
    }
    async status() {
        await this.gitCommand('status');
    }
    async fetch() {
        await this.gitCommand('fetch');
    }
    async pull() {
        await this.gitCommand('pull');
    }
    async clone() {
        shelljs_1.default.cd(global.config.rootDir);
        const promises = [];
        for (const project of global.config.projects) {
            const cmd = `git clone git@${global.config.git.host}:${global.config.git.team}/${global.config.git.projectPrefix}-${project}.git ${project}`;
            const promise = util_1.util.execAsync(cmd).then(execResult => {
                util_1.util.log(chalk_1.default.green(`DONE - ${project}`));
                return { [project]: execResult };
            });
            promises.push(promise);
        }
        const result = await Promise.all(promises);
        common_1.common.printMessage(lodash_1.assignIn({}, ...result));
    }
}
module.exports = Git;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V4ZWMvZ2l0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxrREFBeUI7QUFFekIsbUNBQWlDO0FBQ2pDLHNEQUEyQjtBQUMzQix1Q0FBbUM7QUFDbkMsbUNBQStCO0FBQy9CLDhDQUEwQztBQUcxQyxNQUFNLEdBQUksU0FBUSxpQkFBTztJQUNmLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTztRQUM5QixNQUFNLFFBQVEsR0FBVSxFQUFFLENBQUE7UUFDMUIsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUM1QyxNQUFNLEdBQUcsR0FBRyxVQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQTtZQUNuRSxNQUFNLE9BQU8sR0FBRyxXQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDcEQsV0FBSSxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUMxQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQTtZQUNsQyxDQUFDLENBQUMsQ0FBQTtZQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDdkI7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDMUMsZUFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUNEO1FBQ0UsS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtZQUNuQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNqQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtZQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtTQUNsQixDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNO1FBQ2pCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBQ00sS0FBSyxDQUFDLEtBQUs7UUFDaEIsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFDTSxLQUFLLENBQUMsSUFBSTtRQUNmLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUs7UUFDaEIsaUJBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMvQixNQUFNLFFBQVEsR0FBVSxFQUFFLENBQUE7UUFDMUIsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUM1QyxNQUFNLEdBQUcsR0FBRyxpQkFBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksSUFDM0UsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFDcEIsSUFBSSxPQUFPLFFBQVEsT0FBTyxFQUFFLENBQUE7WUFDNUIsTUFBTSxPQUFPLEdBQUcsV0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3BELFdBQUksQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDMUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUE7WUFDbEMsQ0FBQyxDQUFDLENBQUE7WUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3ZCO1FBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzFDLGVBQU0sQ0FBQyxZQUFZLENBQUMsaUJBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQzlDLENBQUM7Q0FDRjtBQWxERCxpQkFBUyxHQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgeyBDaG9pY2VUeXBlIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgeyBhc3NpZ25JbiB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJ1xuaW1wb3J0IHsgY29tbW9uIH0gZnJvbSAnc3JjL2NvbW1vbidcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcbmltcG9ydCB7IFN1Yk1lbnUgfSBmcm9tICdzcmMvdXRpbC9TdWJNZW51J1xuXG5leHBvcnQgPSBHaXRcbmNsYXNzIEdpdCBleHRlbmRzIFN1Yk1lbnUge1xuICBwcml2YXRlIGFzeW5jIGdpdENvbW1hbmQoY29tbWFuZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb21pc2VzOiBhbnlbXSA9IFtdXG4gICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIGdsb2JhbC5jb25maWcucHJvamVjdHMpIHtcbiAgICAgIGNvbnN0IGNtZCA9IGBnaXQgLUMgJHtnbG9iYWwuY29uZmlnLnJvb3REaXJ9LyR7cHJvamVjdH0gJHtjb21tYW5kfWBcbiAgICAgIGNvbnN0IHByb21pc2UgPSB1dGlsLmV4ZWNBc3luYyhjbWQpLnRoZW4oZXhlY1Jlc3VsdCA9PiB7XG4gICAgICAgIHV0aWwubG9nKGNoYWxrLmdyZWVuKGBET05FIC0gJHtwcm9qZWN0fWApKVxuICAgICAgICByZXR1cm4geyBbcHJvamVjdF06IGV4ZWNSZXN1bHQgfVxuICAgICAgfSlcbiAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSlcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgY29tbW9uLnByaW50TWVzc2FnZShhc3NpZ25Jbih7fSwgLi4ucmVzdWx0KSlcbiAgfVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignR2l0IGFjdGlvbj8nLCBbXG4gICAgICB7IG5hbWU6ICdTdGF0dXMnLCB2YWx1ZTogJ3N0YXR1cycgfSxcbiAgICAgIHsgbmFtZTogJ0ZldGNoJywgdmFsdWU6ICdmZXRjaCcgfSxcbiAgICAgIHsgbmFtZTogJ1B1bGwnLCB2YWx1ZTogJ3B1bGwnIH0sXG4gICAgICB7IG5hbWU6ICdDbG9uZScsIHZhbHVlOiAnY2xvbmUnIH0sXG4gICAgXSBhcyBDaG9pY2VUeXBlW10pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3RhdHVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuZ2l0Q29tbWFuZCgnc3RhdHVzJylcbiAgfVxuICBwdWJsaWMgYXN5bmMgZmV0Y2goKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5naXRDb21tYW5kKCdmZXRjaCcpXG4gIH1cbiAgcHVibGljIGFzeW5jIHB1bGwoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5naXRDb21tYW5kKCdwdWxsJylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjbG9uZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBzaGVsbC5jZChnbG9iYWwuY29uZmlnLnJvb3REaXIpXG4gICAgY29uc3QgcHJvbWlzZXM6IGFueVtdID0gW11cbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgICAgY29uc3QgY21kID0gYGdpdCBjbG9uZSBnaXRAJHtnbG9iYWwuY29uZmlnLmdpdC5ob3N0fToke2dsb2JhbC5jb25maWcuZ2l0LnRlYW19LyR7XG4gICAgICAgIGdsb2JhbC5jb25maWcuZ2l0LnByb2plY3RQcmVmaXhcbiAgICAgIH0tJHtwcm9qZWN0fS5naXQgJHtwcm9qZWN0fWBcbiAgICAgIGNvbnN0IHByb21pc2UgPSB1dGlsLmV4ZWNBc3luYyhjbWQpLnRoZW4oZXhlY1Jlc3VsdCA9PiB7XG4gICAgICAgIHV0aWwubG9nKGNoYWxrLmdyZWVuKGBET05FIC0gJHtwcm9qZWN0fWApKVxuICAgICAgICByZXR1cm4geyBbcHJvamVjdF06IGV4ZWNSZXN1bHQgfVxuICAgICAgfSlcbiAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSlcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgY29tbW9uLnByaW50TWVzc2FnZShhc3NpZ25Jbih7fSwgLi4ucmVzdWx0KSlcbiAgfVxufVxuIl19