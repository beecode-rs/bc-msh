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
    printConfig() {
        util.log(`RootDir: ${chalk_1.default.cyan(global.config.rootDir)}`);
        util.log(`Git:`);
        if (global.config.git.username) {
            util.log(`     username : ${chalk_1.default.cyan(global.config.git.username)}`);
        }
        util.log(`     team     : ${chalk_1.default.cyan(global.config.git.team)}`);
        util.log(`     host     : ${chalk_1.default.cyan(global.config.git.host)}`);
        util.log(`     prefix   : ${chalk_1.default.cyan(global.config.git.projectPrefix)}`);
        util.log('');
        util.log(`Project List:`);
        util.log(`[ ${chalk_1.default.cyan(global.config.projects.join(chalk_1.default.white(' | ')))} ]`);
        util.log('');
        if (global.config.pullRequestSkip && global.config.pullRequestSkip.length > 0) {
            util.log(`PullRequest skip:`);
            util.log(`[ ${chalk_1.default.cyan(global.config.pullRequestSkip.join(chalk_1.default.white(' | ')))} ]`);
            util.log('');
        }
        if (global.config.pullRequestSkip && global.config.dockerBaseImages.length > 0) {
            util.log(`Docker base images:`);
            util.log(`[ ${chalk_1.default.cyan(global.config.dockerBaseImages.join(chalk_1.default.white(' | ')))} ]`);
            util.log('');
        }
    },
};
exports.util = util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUF5QjtBQUN6QixzREFBMkI7QUFFM0IsTUFBTSxJQUFJLEdBQUc7SUFDWCxTQUFTLEVBQUUsQ0FBQyxPQUFlLEVBQStELEVBQUU7UUFDMUYsT0FBTyxJQUFJLE9BQU8sQ0FBcUQsT0FBTyxDQUFDLEVBQUU7WUFDL0U7Z0JBQ0UsaUJBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDN0QsTUFBTSxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQTtvQkFDbkQsSUFBSSxJQUFJLEtBQUssQ0FBQzt3QkFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtvQkFDdkMsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQzVCLENBQUMsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxHQUFHLEVBQUUsQ0FBQyxHQUFvQixFQUFRLEVBQUU7UUFDbEMsb0JBQW9CO1FBQ3BCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDMUM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDakI7UUFDRCxtQkFBbUI7SUFDckIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN6RCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2hCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLGVBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3RFO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDMUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUVaLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGVBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM5RSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRVosSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdFLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3JGLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDYjtRQUVELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlFLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUNiO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFDUSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJ1xuXG5jb25zdCB1dGlsID0ge1xuICBleGVjQXN5bmM6IChjb21tYW5kOiBzdHJpbmcpOiBQcm9taXNlPHsgc3Rkb3V0OiBzdHJpbmc7IHN0ZGVycjogc3RyaW5nOyBlcnJvcjogYm9vbGVhbiB9PiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgc3Rkb3V0OiBzdHJpbmc7IHN0ZGVycjogc3RyaW5nOyBlcnJvcjogYm9vbGVhbiB9PihyZXNvbHZlID0+IHtcbiAgICAgIHtcbiAgICAgICAgc2hlbGwuZXhlYyhjb21tYW5kLCB7IHNpbGVudDogdHJ1ZSB9LCAoY29kZSwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgICBjb25zdCBleGVjUmVzdWx0ID0geyBzdGRvdXQsIHN0ZGVyciwgZXJyb3I6IGZhbHNlIH1cbiAgICAgICAgICBpZiAoY29kZSAhPT0gMCkgZXhlY1Jlc3VsdC5lcnJvciA9IHRydWVcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShleGVjUmVzdWx0KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgbG9nOiAobXNnOiBzdHJpbmcgfCBvYmplY3QpOiB2b2lkID0+IHtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgIGlmICh0eXBlb2YgbXNnID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobXNnLCBudWxsLCA0KSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2cobXNnKVxuICAgIH1cbiAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gIH0sXG5cbiAgcHJpbnRDb25maWcoKTogdm9pZCB7XG4gICAgdXRpbC5sb2coYFJvb3REaXI6ICR7Y2hhbGsuY3lhbihnbG9iYWwuY29uZmlnLnJvb3REaXIpfWApXG4gICAgdXRpbC5sb2coYEdpdDpgKVxuICAgIGlmIChnbG9iYWwuY29uZmlnLmdpdC51c2VybmFtZSkge1xuICAgICAgdXRpbC5sb2coYCAgICAgdXNlcm5hbWUgOiAke2NoYWxrLmN5YW4oZ2xvYmFsLmNvbmZpZy5naXQudXNlcm5hbWUpfWApXG4gICAgfVxuICAgIHV0aWwubG9nKGAgICAgIHRlYW0gICAgIDogJHtjaGFsay5jeWFuKGdsb2JhbC5jb25maWcuZ2l0LnRlYW0pfWApXG4gICAgdXRpbC5sb2coYCAgICAgaG9zdCAgICAgOiAke2NoYWxrLmN5YW4oZ2xvYmFsLmNvbmZpZy5naXQuaG9zdCl9YClcbiAgICB1dGlsLmxvZyhgICAgICBwcmVmaXggICA6ICR7Y2hhbGsuY3lhbihnbG9iYWwuY29uZmlnLmdpdC5wcm9qZWN0UHJlZml4KX1gKVxuICAgIHV0aWwubG9nKCcnKVxuXG4gICAgdXRpbC5sb2coYFByb2plY3QgTGlzdDpgKVxuICAgIHV0aWwubG9nKGBbICR7Y2hhbGsuY3lhbihnbG9iYWwuY29uZmlnLnByb2plY3RzLmpvaW4oY2hhbGsud2hpdGUoJyB8ICcpKSl9IF1gKVxuICAgIHV0aWwubG9nKCcnKVxuXG4gICAgaWYgKGdsb2JhbC5jb25maWcucHVsbFJlcXVlc3RTa2lwICYmIGdsb2JhbC5jb25maWcucHVsbFJlcXVlc3RTa2lwLmxlbmd0aCA+IDApIHtcbiAgICAgIHV0aWwubG9nKGBQdWxsUmVxdWVzdCBza2lwOmApXG4gICAgICB1dGlsLmxvZyhgWyAke2NoYWxrLmN5YW4oZ2xvYmFsLmNvbmZpZy5wdWxsUmVxdWVzdFNraXAuam9pbihjaGFsay53aGl0ZSgnIHwgJykpKX0gXWApXG4gICAgICB1dGlsLmxvZygnJylcbiAgICB9XG5cbiAgICBpZiAoZ2xvYmFsLmNvbmZpZy5wdWxsUmVxdWVzdFNraXAgJiYgZ2xvYmFsLmNvbmZpZy5kb2NrZXJCYXNlSW1hZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHV0aWwubG9nKGBEb2NrZXIgYmFzZSBpbWFnZXM6YClcbiAgICAgIHV0aWwubG9nKGBbICR7Y2hhbGsuY3lhbihnbG9iYWwuY29uZmlnLmRvY2tlckJhc2VJbWFnZXMuam9pbihjaGFsay53aGl0ZSgnIHwgJykpKX0gXWApXG4gICAgICB1dGlsLmxvZygnJylcbiAgICB9XG4gIH0sXG59XG5leHBvcnQgeyB1dGlsIH1cbiJdfQ==