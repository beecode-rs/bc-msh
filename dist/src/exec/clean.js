"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const chalk_1 = __importDefault(require("chalk"));
const lodash_1 = require("lodash");
const common_1 = require("src/common");
const util_1 = require("src/util");
const SubMenu_1 = require("src/util/SubMenu");
class Clean extends SubMenu_1.SubMenu {
    async npm() {
        const promises = [];
        for (const project of global.config.projects) {
            const cmd = `rm -rf ${global.config.rootDir}/${project}/node_modules/*`;
            const promise = util_1.util.execAsync(cmd).then(execResult => {
                util_1.util.log(chalk_1.default.green(`DONE - ${project}`));
                return { [project]: execResult };
            });
            promises.push(promise);
        }
        const result = await Promise.all(promises);
        common_1.common.printMessage(lodash_1.assignIn({}, ...result));
    }
    async docker() {
        for (const image of [
            ...global.config.projects.map(proj => `${global.config.git.projectPrefix}_${proj}`),
            ...global.config.dockerBaseImages,
        ]) {
            const result = await util_1.util.execAsync(`docker rmi ${image}`);
            util_1.util.log(chalk_1.default.cyan(image));
            if (!result.error)
                util_1.util.log(result.stdout);
            else
                util_1.util.log(chalk_1.default.red(result.stderr));
        }
    }
    constructor() {
        super('Clean action?', [{ name: 'NPM', value: 'npm' }, { name: 'Docker Images', value: 'docker' }]);
    }
}
module.exports = Clean;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhlYy9jbGVhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsa0RBQXlCO0FBRXpCLG1DQUFpQztBQUNqQyx1Q0FBbUM7QUFDbkMsbUNBQStCO0FBQy9CLDhDQUEwQztBQUcxQyxNQUFNLEtBQU0sU0FBUSxpQkFBTztJQUNqQixLQUFLLENBQUMsR0FBRztRQUNmLE1BQU0sUUFBUSxHQUFVLEVBQUUsQ0FBQTtRQUMxQixLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQzVDLE1BQU0sR0FBRyxHQUFHLFVBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxpQkFBaUIsQ0FBQTtZQUN2RSxNQUFNLE9BQU8sR0FBRyxXQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDcEQsV0FBSSxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUMxQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQTtZQUNsQyxDQUFDLENBQUMsQ0FBQTtZQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDdkI7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDMUMsZUFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVPLEtBQUssQ0FBQyxNQUFNO1FBQ2xCLEtBQUssTUFBTSxLQUFLLElBQUk7WUFDbEIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuRixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO1NBQ2xDLEVBQUU7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQzFELFdBQUksQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFBRSxXQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTs7Z0JBQ3JDLFdBQUksQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtTQUN4QztJQUNILENBQUM7SUFDRDtRQUNFLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQWlCLENBQUMsQ0FBQTtJQUNySCxDQUFDO0NBQ0Y7QUE5QkQsaUJBQVMsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgQ2hvaWNlVHlwZSB9IGZyb20gJ2lucXVpcmVyJ1xuaW1wb3J0IHsgYXNzaWduSW4gfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBjb21tb24gfSBmcm9tICdzcmMvY29tbW9uJ1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ3NyYy91dGlsJ1xuaW1wb3J0IHsgU3ViTWVudSB9IGZyb20gJ3NyYy91dGlsL1N1Yk1lbnUnXG5cbmV4cG9ydCA9IENsZWFuXG5jbGFzcyBDbGVhbiBleHRlbmRzIFN1Yk1lbnUge1xuICBwcml2YXRlIGFzeW5jIG5wbSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwcm9taXNlczogYW55W10gPSBbXVxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgICBjb25zdCBjbWQgPSBgcm0gLXJmICR7Z2xvYmFsLmNvbmZpZy5yb290RGlyfS8ke3Byb2plY3R9L25vZGVfbW9kdWxlcy8qYFxuICAgICAgY29uc3QgcHJvbWlzZSA9IHV0aWwuZXhlY0FzeW5jKGNtZCkudGhlbihleGVjUmVzdWx0ID0+IHtcbiAgICAgICAgdXRpbC5sb2coY2hhbGsuZ3JlZW4oYERPTkUgLSAke3Byb2plY3R9YCkpXG4gICAgICAgIHJldHVybiB7IFtwcm9qZWN0XTogZXhlY1Jlc3VsdCB9XG4gICAgICB9KVxuICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKVxuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcbiAgICBjb21tb24ucHJpbnRNZXNzYWdlKGFzc2lnbkluKHt9LCAuLi5yZXN1bHQpKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkb2NrZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBpbWFnZSBvZiBbXG4gICAgICAuLi5nbG9iYWwuY29uZmlnLnByb2plY3RzLm1hcChwcm9qID0+IGAke2dsb2JhbC5jb25maWcuZ2l0LnByb2plY3RQcmVmaXh9XyR7cHJvan1gKSxcbiAgICAgIC4uLmdsb2JhbC5jb25maWcuZG9ja2VyQmFzZUltYWdlcyxcbiAgICBdKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1dGlsLmV4ZWNBc3luYyhgZG9ja2VyIHJtaSAke2ltYWdlfWApXG4gICAgICB1dGlsLmxvZyhjaGFsay5jeWFuKGltYWdlKSlcbiAgICAgIGlmICghcmVzdWx0LmVycm9yKSB1dGlsLmxvZyhyZXN1bHQuc3Rkb3V0KVxuICAgICAgZWxzZSB1dGlsLmxvZyhjaGFsay5yZWQocmVzdWx0LnN0ZGVycikpXG4gICAgfVxuICB9XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdDbGVhbiBhY3Rpb24/JywgW3sgbmFtZTogJ05QTScsIHZhbHVlOiAnbnBtJyB9LCB7IG5hbWU6ICdEb2NrZXIgSW1hZ2VzJywgdmFsdWU6ICdkb2NrZXInIH1dIGFzIENob2ljZVR5cGVbXSlcbiAgfVxufVxuIl19