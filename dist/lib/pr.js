"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const main_1 = __importDefault(require("lib/main"));
const util_1 = require("lib/util");
const chalk_1 = __importDefault(require("chalk"));
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const lodash_1 = require("lodash");
async function run() {
    let username = global.config.git.username;
    if (!username) {
        username = (await inquirer_1.default.prompt({ type: 'input', message: 'BitBucket username:', name: 'user' }))['user'];
    }
    const password = (await inquirer_1.default.prompt({ type: 'password', message: 'BitBucket password:', name: 'pass' }))['pass'];
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
            util_1.log(chalk_1.default.yellow(project + ' - ' + err.message));
        });
        makePullRequestPromises.push(promise);
    }
    const pullRequestResults = lodash_1.assignIn({}, ...(await Promise.all(makePullRequestPromises)).filter(pr => typeof pr !== 'undefined'));
    if (Object.keys(pullRequestResults).length > 0) {
        const mergeIt = (await inquirer_1.default.prompt({ type: 'input', message: 'Merge all (y/N):', name: 'merge' }))['merge'].toString();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3ByLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQStCO0FBQy9CLG9EQUErQjtBQUMvQixtQ0FBOEI7QUFDOUIsa0RBQXlCO0FBQ3pCLG9GQUE0QztBQUM1QyxtQ0FBaUM7QUFFMUIsS0FBSyxVQUFVLEdBQUc7SUFDdkIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO0lBQ3pDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixRQUFRLEdBQUcsQ0FBQyxNQUFNLGtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUM1RztJQUNELE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDcEgsTUFBTSxhQUFhLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUYsTUFBTSx1QkFBdUIsR0FBVSxFQUFFLENBQUE7SUFDekMsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUM1QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFBRSxTQUFRO1FBQzdELE1BQU0sR0FBRyxHQUFHLDhDQUE4QyxNQUFNLENBQUMsTUFB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O1lBQ0QsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQ2pDO0tBQ0Y7SUFDRCxjQUFRLEVBQUUsQ0FBQTtBQUNaLENBQUM7QUFsRUQsa0JBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlucXVpcmVyIGZyb20gJ2lucXVpcmVyJ1xuaW1wb3J0IG1haW5NZW51IGZyb20gJ2xpYi9tYWluJ1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnbGliL3V0aWwnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UtbmF0aXZlJ1xuaW1wb3J0IHsgYXNzaWduSW4gfSBmcm9tICdsb2Rhc2gnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW4oKSB7XG4gIGxldCB1c2VybmFtZSA9IGdsb2JhbC5jb25maWcuZ2l0LnVzZXJuYW1lXG4gIGlmICghdXNlcm5hbWUpIHtcbiAgICB1c2VybmFtZSA9IChhd2FpdCBpbnF1aXJlci5wcm9tcHQoeyB0eXBlOiAnaW5wdXQnLCBtZXNzYWdlOiAnQml0QnVja2V0IHVzZXJuYW1lOicsIG5hbWU6ICd1c2VyJyB9KSlbJ3VzZXInXVxuICB9XG4gIGNvbnN0IHBhc3N3b3JkID0gKGF3YWl0IGlucXVpcmVyLnByb21wdCh7IHR5cGU6ICdwYXNzd29yZCcsIG1lc3NhZ2U6ICdCaXRCdWNrZXQgcGFzc3dvcmQ6JywgbmFtZTogJ3Bhc3MnIH0pKVsncGFzcyddXG4gIGNvbnN0IEF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIEJ1ZmZlci5mcm9tKGAke3VzZXJuYW1lfToke3Bhc3N3b3JkfWApLnRvU3RyaW5nKCdiYXNlNjQnKVxuXG4gIGNvbnN0IG1ha2VQdWxsUmVxdWVzdFByb21pc2VzOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgaWYgKGdsb2JhbC5jb25maWcucHVsbFJlcXVlc3RTa2lwLmluY2x1ZGVzKHByb2plY3QpKSBjb250aW51ZVxuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5iaXRidWNrZXQub3JnLzIuMC9yZXBvc2l0b3JpZXMvJHtnbG9iYWwuY29uZmlnLmdpdC50ZWFtfS8ke1xuICAgICAgZ2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeFxuICAgIH0tJHtwcm9qZWN0fS9wdWxscmVxdWVzdHNgXG4gICAgY29uc3QgcHJvbWlzZSA9IHJlcXVlc3QodXJsLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbiB9LFxuICAgICAganNvbjoge1xuICAgICAgICB0aXRsZTogJ0RlcGxveSB0byBwcm9kdWN0aW9uJyxcbiAgICAgICAgc291cmNlOiB7IGJyYW5jaDogeyBuYW1lOiAnbWFzdGVyJyB9IH0sXG4gICAgICAgIGRlc3RpbmF0aW9uOiB7IGJyYW5jaDogeyBuYW1lOiAncHJvZHVjdGlvbicgfSB9LFxuICAgICAgfSxcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgbG9nKFxuICAgICAgICAgIGNoYWxrLmdyZWVuKFxuICAgICAgICAgICAgYGh0dHBzOi8vYml0YnVja2V0Lm9yZy8ke2dsb2JhbC5jb25maWcuZ2l0LnRlYW19LyR7XG4gICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuZ2l0LnByb2plY3RQcmVmaXhcbiAgICAgICAgICAgIH0tJHtwcm9qZWN0fS9wdWxsLXJlcXVlc3RzLyR7cmVzdWx0LmlkfWBcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBbcHJvamVjdF06IGBodHRwczovL2FwaS5iaXRidWNrZXQub3JnLzIuMC9yZXBvc2l0b3JpZXMvJHtnbG9iYWwuY29uZmlnLmdpdC50ZWFtfS8ke1xuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeFxuICAgICAgICAgIH0tJHtwcm9qZWN0fS9wdWxscmVxdWVzdHMvJHtyZXN1bHQuaWR9L21lcmdlYCxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBsb2coY2hhbGsueWVsbG93KHByb2plY3QgKyAnIC0gJyArIGVyci5tZXNzYWdlKSlcbiAgICAgIH0pXG4gICAgbWFrZVB1bGxSZXF1ZXN0UHJvbWlzZXMucHVzaChwcm9taXNlKVxuICB9XG4gIGNvbnN0IHB1bGxSZXF1ZXN0UmVzdWx0cyA9IGFzc2lnbkluKFxuICAgIHt9LFxuICAgIC4uLihhd2FpdCBQcm9taXNlLmFsbChtYWtlUHVsbFJlcXVlc3RQcm9taXNlcykpLmZpbHRlcihwciA9PiB0eXBlb2YgcHIgIT09ICd1bmRlZmluZWQnKVxuICApXG5cbiAgaWYgKE9iamVjdC5rZXlzKHB1bGxSZXF1ZXN0UmVzdWx0cykubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IG1lcmdlSXQ6IHN0cmluZyA9IChhd2FpdCBpbnF1aXJlci5wcm9tcHQoeyB0eXBlOiAnaW5wdXQnLCBtZXNzYWdlOiAnTWVyZ2UgYWxsICh5L04pOicsIG5hbWU6ICdtZXJnZScgfSkpW1xuICAgICAgJ21lcmdlJ1xuICAgIF0udG9TdHJpbmcoKVxuICAgIGlmIChtZXJnZUl0LnRvVXBwZXJDYXNlKCkgPT09ICdZJykge1xuICAgICAgY29uc3QgbWVyZ2VQcm9taXNlczogYW55W10gPSBbXVxuICAgICAgZm9yIChjb25zdCBbcHIsIHVybE1lcmdlXSBvZiBPYmplY3QuZW50cmllcyhwdWxsUmVxdWVzdFJlc3VsdHMpKSB7XG4gICAgICAgIGNvbnN0IG1lcmdlUHJvbWlzZSA9IHJlcXVlc3QodXJsTWVyZ2UsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb24gfSxcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZyhjaGFsay5ncmVlbihgJHtwcn06ICR7SlNPTi5wYXJzZShyZXN1bHQpLnN0YXRlfWApKVxuICAgICAgICB9KVxuICAgICAgICBtZXJnZVByb21pc2VzLnB1c2gobWVyZ2VQcm9taXNlKVxuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobWVyZ2VQcm9taXNlcylcbiAgICB9XG4gIH1cbiAgbWFpbk1lbnUoKVxufVxuIl19