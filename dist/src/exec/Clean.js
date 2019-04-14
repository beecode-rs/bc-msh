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
    /**
     * Remove content from node_modules folder located in all microservice projects
     */
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
    /**
     * Remove all images created for all microservices in this project, including global docker images.
     * Before removing all images run `docker-compose down` to remove all containers
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xlYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhlYy9DbGVhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsa0RBQXlCO0FBRXpCLG1DQUFpQztBQUNqQyx1Q0FBbUM7QUFDbkMsbUNBQStCO0FBQy9CLDhDQUEwQztBQUcxQyxNQUFNLEtBQU0sU0FBUSxpQkFBTztJQUV6Qjs7T0FFRztJQUNLLEtBQUssQ0FBQyxHQUFHO1FBQ2YsTUFBTSxRQUFRLEdBQVUsRUFBRSxDQUFBO1FBQzFCLEtBQUssTUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDNUMsTUFBTSxHQUFHLEdBQUcsVUFBVSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLGlCQUFpQixDQUFBO1lBQ3ZFLE1BQU0sT0FBTyxHQUFHLFdBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNwRCxXQUFJLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQzFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFBO1lBQ2xDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUN2QjtRQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMxQyxlQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssS0FBSyxDQUFDLE1BQU07UUFDbEIsS0FBSyxNQUFNLEtBQUssSUFBSTtZQUNsQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ25GLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7U0FDbEMsRUFBRTtZQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDMUQsV0FBSSxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2dCQUFFLFdBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBOztnQkFDckMsV0FBSSxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1NBQ3hDO0lBQ0gsQ0FBQztJQUNEO1FBQ0UsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBaUIsQ0FBQyxDQUFBO0lBQ3JILENBQUM7Q0FDRjtBQXRDRCxpQkFBUyxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgeyBDaG9pY2VUeXBlIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgeyBhc3NpZ25JbiB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7IGNvbW1vbiB9IGZyb20gJ3NyYy9jb21tb24nXG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnc3JjL3V0aWwnXG5pbXBvcnQgeyBTdWJNZW51IH0gZnJvbSAnc3JjL3V0aWwvU3ViTWVudSdcblxuZXhwb3J0ID0gQ2xlYW5cbmNsYXNzIENsZWFuIGV4dGVuZHMgU3ViTWVudSB7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjb250ZW50IGZyb20gbm9kZV9tb2R1bGVzIGZvbGRlciBsb2NhdGVkIGluIGFsbCBtaWNyb3NlcnZpY2UgcHJvamVjdHNcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgbnBtKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb21pc2VzOiBhbnlbXSA9IFtdXG4gICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIGdsb2JhbC5jb25maWcucHJvamVjdHMpIHtcbiAgICAgIGNvbnN0IGNtZCA9IGBybSAtcmYgJHtnbG9iYWwuY29uZmlnLnJvb3REaXJ9LyR7cHJvamVjdH0vbm9kZV9tb2R1bGVzLypgXG4gICAgICBjb25zdCBwcm9taXNlID0gdXRpbC5leGVjQXN5bmMoY21kKS50aGVuKGV4ZWNSZXN1bHQgPT4ge1xuICAgICAgICB1dGlsLmxvZyhjaGFsay5ncmVlbihgRE9ORSAtICR7cHJvamVjdH1gKSlcbiAgICAgICAgcmV0dXJuIHsgW3Byb2plY3RdOiBleGVjUmVzdWx0IH1cbiAgICAgIH0pXG4gICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpXG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgIGNvbW1vbi5wcmludE1lc3NhZ2UoYXNzaWduSW4oe30sIC4uLnJlc3VsdCkpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBpbWFnZXMgY3JlYXRlZCBmb3IgYWxsIG1pY3Jvc2VydmljZXMgaW4gdGhpcyBwcm9qZWN0LCBpbmNsdWRpbmcgZ2xvYmFsIGRvY2tlciBpbWFnZXMuXG4gICAqIEJlZm9yZSByZW1vdmluZyBhbGwgaW1hZ2VzIHJ1biBgZG9ja2VyLWNvbXBvc2UgZG93bmAgdG8gcmVtb3ZlIGFsbCBjb250YWluZXJzXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGRvY2tlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IGltYWdlIG9mIFtcbiAgICAgIC4uLmdsb2JhbC5jb25maWcucHJvamVjdHMubWFwKHByb2ogPT4gYCR7Z2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeH1fJHtwcm9qfWApLFxuICAgICAgLi4uZ2xvYmFsLmNvbmZpZy5kb2NrZXJCYXNlSW1hZ2VzLFxuICAgIF0pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHV0aWwuZXhlY0FzeW5jKGBkb2NrZXIgcm1pICR7aW1hZ2V9YClcbiAgICAgIHV0aWwubG9nKGNoYWxrLmN5YW4oaW1hZ2UpKVxuICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHV0aWwubG9nKHJlc3VsdC5zdGRvdXQpXG4gICAgICBlbHNlIHV0aWwubG9nKGNoYWxrLnJlZChyZXN1bHQuc3RkZXJyKSlcbiAgICB9XG4gIH1cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ0NsZWFuIGFjdGlvbj8nLCBbeyBuYW1lOiAnTlBNJywgdmFsdWU6ICducG0nIH0sIHsgbmFtZTogJ0RvY2tlciBJbWFnZXMnLCB2YWx1ZTogJ2RvY2tlcicgfV0gYXMgQ2hvaWNlVHlwZVtdKVxuICB9XG59XG4iXX0=