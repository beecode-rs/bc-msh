"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const shelljs_1 = __importDefault(require("shelljs"));
const util = {
    execAsync: (command) => {
        return new Promise(resolve => {
            {
                shelljs_1.default.exec(command, { silent: true }, (code, stdout, stderr) => {
                    const execResult = { stdout, stderr, error: false };
                    if (code !== 0)
                        execResult.error = true;
                    return resolve(execResult);
                });
            }
        });
    },
    log: (msg) => {
        /* tslint:disable */
        if (typeof msg === 'object') {
            console.log(JSON.stringify(msg, null, 4));
        }
        else {
            console.log(msg);
        }
        /* tslint:enable */
    },
    printConfig: () => {
        const gitUserName = global.config.git.username ? `     username : ${chalk_1.default.cyan(global.config.git.username)}` : ``;
        const pullRequestSkip = global.config.pullRequestSkip && global.config.pullRequestSkip.length > 0
            ? `PullRequest skip:\n[ ${chalk_1.default.cyan(global.config.pullRequestSkip.join(chalk_1.default.white(' | ')))} ]\n`
            : ``;
        const dockerBaseImages = global.config.dockerBaseImages && global.config.dockerBaseImages.length > 0
            ? `Docker base images:\\n[ ${chalk_1.default.cyan(global.config.dockerBaseImages.join(chalk_1.default.white(' | ')))} ]\n`
            : ``;
        util.log(`
RootDir: ${chalk_1.default.cyan(global.config.rootDir)}
Git:
${gitUserName}
     team     : ${chalk_1.default.cyan(global.config.git.team)}
     host     : ${chalk_1.default.cyan(global.config.git.host)}
     prefix   : ${chalk_1.default.cyan(global.config.git.projectPrefix)}

Project List:
[ ${chalk_1.default.cyan(global.config.projects.join(chalk_1.default.white(' | ')))} ]

${pullRequestSkip}
${dockerBaseImages}
`);
    },
};
exports.util = util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUF5QjtBQUN6QixzREFBMkI7QUFFM0IsTUFBTSxJQUFJLEdBQUc7SUFDWCxTQUFTLEVBQUUsQ0FBQyxPQUFlLEVBQStELEVBQUU7UUFDMUYsT0FBTyxJQUFJLE9BQU8sQ0FBcUQsT0FBTyxDQUFDLEVBQUU7WUFDL0U7Z0JBQ0UsaUJBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDN0QsTUFBTSxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQTtvQkFDbkQsSUFBSSxJQUFJLEtBQUssQ0FBQzt3QkFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtvQkFDdkMsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQzVCLENBQUMsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxHQUFHLEVBQUUsQ0FBQyxHQUFvQixFQUFRLEVBQUU7UUFDbEMsb0JBQW9CO1FBQ3BCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDMUM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDakI7UUFDRCxtQkFBbUI7SUFDckIsQ0FBQztJQUNELFdBQVcsRUFBRSxHQUFTLEVBQUU7UUFDdEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFDakgsTUFBTSxlQUFlLEdBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyx3QkFBd0IsZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDbEcsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUNSLE1BQU0sZ0JBQWdCLEdBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUN6RSxDQUFDLENBQUMsMkJBQTJCLGVBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDdEcsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUVSLElBQUksQ0FBQyxHQUFHLENBQUM7V0FDRixlQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOztFQUUxQyxXQUFXO2tCQUNLLGVBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2tCQUNsQyxlQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztrQkFDbEMsZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7OztJQUd6RCxlQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O0VBRTdELGVBQWU7RUFDZixnQkFBZ0I7Q0FDakIsQ0FBQyxDQUFBO0lBQ0EsQ0FBQztDQUNGLENBQUE7QUFDUSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJ1xuXG5jb25zdCB1dGlsID0ge1xuICBleGVjQXN5bmM6IChjb21tYW5kOiBzdHJpbmcpOiBQcm9taXNlPHsgc3Rkb3V0OiBzdHJpbmc7IHN0ZGVycjogc3RyaW5nOyBlcnJvcjogYm9vbGVhbiB9PiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgc3Rkb3V0OiBzdHJpbmc7IHN0ZGVycjogc3RyaW5nOyBlcnJvcjogYm9vbGVhbiB9PihyZXNvbHZlID0+IHtcbiAgICAgIHtcbiAgICAgICAgc2hlbGwuZXhlYyhjb21tYW5kLCB7IHNpbGVudDogdHJ1ZSB9LCAoY29kZSwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgICBjb25zdCBleGVjUmVzdWx0ID0geyBzdGRvdXQsIHN0ZGVyciwgZXJyb3I6IGZhbHNlIH1cbiAgICAgICAgICBpZiAoY29kZSAhPT0gMCkgZXhlY1Jlc3VsdC5lcnJvciA9IHRydWVcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShleGVjUmVzdWx0KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgbG9nOiAobXNnOiBzdHJpbmcgfCBvYmplY3QpOiB2b2lkID0+IHtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgIGlmICh0eXBlb2YgbXNnID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobXNnLCBudWxsLCA0KSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2cobXNnKVxuICAgIH1cbiAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gIH0sXG4gIHByaW50Q29uZmlnOiAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZ2l0VXNlck5hbWUgPSBnbG9iYWwuY29uZmlnLmdpdC51c2VybmFtZSA/IGAgICAgIHVzZXJuYW1lIDogJHtjaGFsay5jeWFuKGdsb2JhbC5jb25maWcuZ2l0LnVzZXJuYW1lKX1gIDogYGBcbiAgICBjb25zdCBwdWxsUmVxdWVzdFNraXAgPVxuICAgICAgZ2xvYmFsLmNvbmZpZy5wdWxsUmVxdWVzdFNraXAgJiYgZ2xvYmFsLmNvbmZpZy5wdWxsUmVxdWVzdFNraXAubGVuZ3RoID4gMFxuICAgICAgICA/IGBQdWxsUmVxdWVzdCBza2lwOlxcblsgJHtjaGFsay5jeWFuKGdsb2JhbC5jb25maWcucHVsbFJlcXVlc3RTa2lwLmpvaW4oY2hhbGsud2hpdGUoJyB8ICcpKSl9IF1cXG5gXG4gICAgICAgIDogYGBcbiAgICBjb25zdCBkb2NrZXJCYXNlSW1hZ2VzID1cbiAgICAgIGdsb2JhbC5jb25maWcuZG9ja2VyQmFzZUltYWdlcyAmJiBnbG9iYWwuY29uZmlnLmRvY2tlckJhc2VJbWFnZXMubGVuZ3RoID4gMFxuICAgICAgICA/IGBEb2NrZXIgYmFzZSBpbWFnZXM6XFxcXG5bICR7Y2hhbGsuY3lhbihnbG9iYWwuY29uZmlnLmRvY2tlckJhc2VJbWFnZXMuam9pbihjaGFsay53aGl0ZSgnIHwgJykpKX0gXVxcbmBcbiAgICAgICAgOiBgYFxuXG4gICAgdXRpbC5sb2coYFxuUm9vdERpcjogJHtjaGFsay5jeWFuKGdsb2JhbC5jb25maWcucm9vdERpcil9XG5HaXQ6XG4ke2dpdFVzZXJOYW1lfVxuICAgICB0ZWFtICAgICA6ICR7Y2hhbGsuY3lhbihnbG9iYWwuY29uZmlnLmdpdC50ZWFtKX1cbiAgICAgaG9zdCAgICAgOiAke2NoYWxrLmN5YW4oZ2xvYmFsLmNvbmZpZy5naXQuaG9zdCl9XG4gICAgIHByZWZpeCAgIDogJHtjaGFsay5jeWFuKGdsb2JhbC5jb25maWcuZ2l0LnByb2plY3RQcmVmaXgpfVxuXG5Qcm9qZWN0IExpc3Q6XG5bICR7Y2hhbGsuY3lhbihnbG9iYWwuY29uZmlnLnByb2plY3RzLmpvaW4oY2hhbGsud2hpdGUoJyB8ICcpKSl9IF1cblxuJHtwdWxsUmVxdWVzdFNraXB9XG4ke2RvY2tlckJhc2VJbWFnZXN9XG5gKVxuICB9LFxufVxuZXhwb3J0IHsgdXRpbCB9XG4iXX0=