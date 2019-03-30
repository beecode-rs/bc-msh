"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const main_1 = __importDefault(require("lib/main"));
const util_1 = require("lib/util");
const lodash_1 = require("lodash");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
async function run() {
    let username = global.config.git.username;
    if (!username) {
        // @ts-ignore
        username = (await inquirer_1.default.prompt({ type: 'input', message: 'BitBucket username:', name: 'user' })).user;
    }
    // @ts-ignore
    const password = (await inquirer_1.default.prompt({ type: 'password', message: 'BitBucket password:', name: 'pass' })).pass;
    const Authorization = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    const makePullRequestPromises = [];
    for (const project of global.config.projects) {
        if (global.config.pullRequestSkip.includes(project))
            continue;
        const url = `https://api.bitbucket.org/2.0/repositories/${global.config.git.team}/${global.config.git.projectPrefix}-${project}/pullrequests`;
        const promise = request_promise_native_1.default(url, {
            method: 'POST',
            headers: { Authorization },
            json: {
                title: 'Deploy to production',
                source: { branch: { name: 'master' } },
                destination: { branch: { name: 'production' } },
            },
        })
            .then(result => {
            util_1.log(chalk_1.default.green(`https://bitbucket.org/${global.config.git.team}/${global.config.git.projectPrefix}-${project}/pull-requests/${result.id}`));
            return {
                [project]: `https://api.bitbucket.org/2.0/repositories/${global.config.git.team}/${global.config.git.projectPrefix}-${project}/pullrequests/${result.id}/merge`,
            };
        })
            .catch(err => {
            util_1.log(chalk_1.default.yellow(`${project} - ${err.message}`));
        });
        makePullRequestPromises.push(promise);
    }
    const pullRequestResults = lodash_1.assignIn({}, ...(await Promise.all(makePullRequestPromises)).filter(pr => typeof pr !== 'undefined'));
    if (Object.keys(pullRequestResults).length > 0) {
        // @ts-ignore
        const mergeIt = (await inquirer_1.default.prompt({ type: 'input', message: 'Merge all (y/N):', name: 'merge' })).merge.toString();
        if (mergeIt.toUpperCase() === 'Y') {
            const mergePromises = [];
            for (const [pr, urlMerge] of Object.entries(pullRequestResults)) {
                const mergePromise = request_promise_native_1.default(urlMerge, {
                    method: 'POST',
                    headers: { Authorization },
                }).then(result => {
                    util_1.log(chalk_1.default.green(`${pr}: ${JSON.parse(result).state}`));
                });
                mergePromises.push(mergePromise);
            }
            await Promise.all(mergePromises);
        }
    }
    main_1.default();
}
exports.run = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3ByLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQXlCO0FBQ3pCLHdEQUErQjtBQUMvQixvREFBK0I7QUFDL0IsbUNBQThCO0FBQzlCLG1DQUFpQztBQUNqQyxvRkFBNEM7QUFFckMsS0FBSyxVQUFVLEdBQUc7SUFDdkIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO0lBQ3pDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixhQUFhO1FBQ2IsUUFBUSxHQUFHLENBQUMsTUFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0tBQ3pHO0lBQ0QsYUFBYTtJQUNiLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBQ2pILE1BQU0sYUFBYSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFGLE1BQU0sdUJBQXVCLEdBQVUsRUFBRSxDQUFBO0lBQ3pDLEtBQUssTUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDNUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQUUsU0FBUTtRQUM3RCxNQUFNLEdBQUcsR0FBRyw4Q0FBOEMsTUFB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Q0FBQyxDQUFBO2FBQ2pDO1lBQ0QsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQ2pDO0tBQ0Y7SUFDRCxjQUFRLEVBQUUsQ0FBQTtBQUNaLENBQUM7QUFuRUQsa0JBbUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IGlucXVpcmVyIGZyb20gJ2lucXVpcmVyJ1xuaW1wb3J0IG1haW5NZW51IGZyb20gJ2xpYi9tYWluJ1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnbGliL3V0aWwnXG5pbXBvcnQgeyBhc3NpZ25JbiB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZS1uYXRpdmUnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gIGxldCB1c2VybmFtZSA9IGdsb2JhbC5jb25maWcuZ2l0LnVzZXJuYW1lXG4gIGlmICghdXNlcm5hbWUpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdXNlcm5hbWUgPSAoYXdhaXQgaW5xdWlyZXIucHJvbXB0KHsgdHlwZTogJ2lucHV0JywgbWVzc2FnZTogJ0JpdEJ1Y2tldCB1c2VybmFtZTonLCBuYW1lOiAndXNlcicgfSkpLnVzZXJcbiAgfVxuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IHBhc3N3b3JkID0gKGF3YWl0IGlucXVpcmVyLnByb21wdCh7IHR5cGU6ICdwYXNzd29yZCcsIG1lc3NhZ2U6ICdCaXRCdWNrZXQgcGFzc3dvcmQ6JywgbmFtZTogJ3Bhc3MnIH0pKS5wYXNzXG4gIGNvbnN0IEF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIEJ1ZmZlci5mcm9tKGAke3VzZXJuYW1lfToke3Bhc3N3b3JkfWApLnRvU3RyaW5nKCdiYXNlNjQnKVxuXG4gIGNvbnN0IG1ha2VQdWxsUmVxdWVzdFByb21pc2VzOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgaWYgKGdsb2JhbC5jb25maWcucHVsbFJlcXVlc3RTa2lwLmluY2x1ZGVzKHByb2plY3QpKSBjb250aW51ZVxuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5iaXRidWNrZXQub3JnLzIuMC9yZXBvc2l0b3JpZXMvJHtnbG9iYWwuY29uZmlnLmdpdC50ZWFtfS8ke1xuICAgICAgZ2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeFxuICAgIH0tJHtwcm9qZWN0fS9wdWxscmVxdWVzdHNgXG4gICAgY29uc3QgcHJvbWlzZSA9IHJlcXVlc3QodXJsLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbiB9LFxuICAgICAganNvbjoge1xuICAgICAgICB0aXRsZTogJ0RlcGxveSB0byBwcm9kdWN0aW9uJyxcbiAgICAgICAgc291cmNlOiB7IGJyYW5jaDogeyBuYW1lOiAnbWFzdGVyJyB9IH0sXG4gICAgICAgIGRlc3RpbmF0aW9uOiB7IGJyYW5jaDogeyBuYW1lOiAncHJvZHVjdGlvbicgfSB9LFxuICAgICAgfSxcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgbG9nKFxuICAgICAgICAgIGNoYWxrLmdyZWVuKFxuICAgICAgICAgICAgYGh0dHBzOi8vYml0YnVja2V0Lm9yZy8ke2dsb2JhbC5jb25maWcuZ2l0LnRlYW19LyR7XG4gICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuZ2l0LnByb2plY3RQcmVmaXhcbiAgICAgICAgICAgIH0tJHtwcm9qZWN0fS9wdWxsLXJlcXVlc3RzLyR7cmVzdWx0LmlkfWBcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBbcHJvamVjdF06IGBodHRwczovL2FwaS5iaXRidWNrZXQub3JnLzIuMC9yZXBvc2l0b3JpZXMvJHtnbG9iYWwuY29uZmlnLmdpdC50ZWFtfS8ke1xuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeFxuICAgICAgICAgIH0tJHtwcm9qZWN0fS9wdWxscmVxdWVzdHMvJHtyZXN1bHQuaWR9L21lcmdlYCxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBsb2coY2hhbGsueWVsbG93KGAke3Byb2plY3R9IC0gJHtlcnIubWVzc2FnZX1gKSlcbiAgICAgIH0pXG4gICAgbWFrZVB1bGxSZXF1ZXN0UHJvbWlzZXMucHVzaChwcm9taXNlKVxuICB9XG4gIGNvbnN0IHB1bGxSZXF1ZXN0UmVzdWx0cyA9IGFzc2lnbkluKFxuICAgIHt9LFxuICAgIC4uLihhd2FpdCBQcm9taXNlLmFsbChtYWtlUHVsbFJlcXVlc3RQcm9taXNlcykpLmZpbHRlcihwciA9PiB0eXBlb2YgcHIgIT09ICd1bmRlZmluZWQnKVxuICApXG5cbiAgaWYgKE9iamVjdC5rZXlzKHB1bGxSZXF1ZXN0UmVzdWx0cykubGVuZ3RoID4gMCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBtZXJnZUl0OiBzdHJpbmcgPSAoYXdhaXQgaW5xdWlyZXIucHJvbXB0KHsgdHlwZTogJ2lucHV0JywgbWVzc2FnZTogJ01lcmdlIGFsbCAoeS9OKTonLCBuYW1lOiAnbWVyZ2UnIH0pKS5tZXJnZS50b1N0cmluZygpXG4gICAgaWYgKG1lcmdlSXQudG9VcHBlckNhc2UoKSA9PT0gJ1knKSB7XG4gICAgICBjb25zdCBtZXJnZVByb21pc2VzOiBhbnlbXSA9IFtdXG4gICAgICBmb3IgKGNvbnN0IFtwciwgdXJsTWVyZ2VdIG9mIE9iamVjdC5lbnRyaWVzKHB1bGxSZXF1ZXN0UmVzdWx0cykpIHtcbiAgICAgICAgY29uc3QgbWVyZ2VQcm9taXNlID0gcmVxdWVzdCh1cmxNZXJnZSwge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbiB9LFxuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgbG9nKGNoYWxrLmdyZWVuKGAke3ByfTogJHtKU09OLnBhcnNlKHJlc3VsdCkuc3RhdGV9YCkpXG4gICAgICAgIH0pXG4gICAgICAgIG1lcmdlUHJvbWlzZXMucHVzaChtZXJnZVByb21pc2UpXG4gICAgICB9XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChtZXJnZVByb21pc2VzKVxuICAgIH1cbiAgfVxuICBtYWluTWVudSgpXG59XG4iXX0=