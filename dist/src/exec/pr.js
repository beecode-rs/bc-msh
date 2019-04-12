"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const lodash_1 = require("lodash");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const util_1 = require("src/util");
const SubMenu_1 = require("src/util/SubMenu");
class PullRequest extends SubMenu_1.SubMenu {
    async createMergePR() {
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
                util_1.util.log(chalk_1.default.green(`https://bitbucket.org/${global.config.git.team}/${global.config.git.projectPrefix}-${project}/pull-requests/${result.id}`));
                return {
                    [project]: `https://api.bitbucket.org/2.0/repositories/${global.config.git.team}/${global.config.git.projectPrefix}-${project}/pullrequests/${result.id}/merge`,
                };
            })
                .catch(err => {
                util_1.util.log(chalk_1.default.yellow(`${project} - ${err.message}`));
            });
            makePullRequestPromises.push(promise);
        }
        const pullRequestResults = lodash_1.assignIn({}, ...(await Promise.all(makePullRequestPromises)).filter(pr => typeof pr !== 'undefined'));
        if (Object.keys(pullRequestResults).length > 0) {
            const mergeIt = (await inquirer_1.default.prompt({
                type: 'input',
                message: 'Merge all (y/N):',
                name: 'merge',
            })).merge.toString();
            if (mergeIt.toUpperCase() === 'Y') {
                const mergePromises = [];
                for (const [pr, urlMerge] of Object.entries(pullRequestResults)) {
                    const mergePromise = request_promise_native_1.default(urlMerge, {
                        method: 'POST',
                        headers: { Authorization },
                    }).then(result => {
                        util_1.util.log(chalk_1.default.green(`${pr}: ${JSON.parse(result).state}`));
                    });
                    mergePromises.push(mergePromise);
                }
                await Promise.all(mergePromises);
            }
        }
    }
    constructor() {
        super('Pull Request action?', [{ name: 'Create / Merge PR', value: 'createMergePR' }]);
    }
}
module.exports = PullRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhlYy9wci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsa0RBQXlCO0FBQ3pCLHdEQUErQztBQUMvQyxtQ0FBaUM7QUFDakMsb0ZBQTRDO0FBQzVDLG1DQUErQjtBQUMvQiw4Q0FBMEM7QUFHMUMsTUFBTSxXQUFZLFNBQVEsaUJBQU87SUFDdkIsS0FBSyxDQUFDLGFBQWE7UUFDekIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixhQUFhO1lBQ2IsUUFBUSxHQUFHLENBQUMsTUFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO1NBQ3pHO1FBQ0QsYUFBYTtRQUNiLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO1FBQ2pILE1BQU0sYUFBYSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBRTFGLE1BQU0sdUJBQXVCLEdBQVUsRUFBRSxDQUFBO1FBQ3pDLEtBQUssTUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDNUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUFFLFNBQVE7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Q0FBQyxDQUFDLENBQUE7b0JBQzdELENBQUMsQ0FBQyxDQUFBO29CQUNGLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7aUJBQ2pDO2dCQUNELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTthQUNqQztTQUNGO0lBQ0gsQ0FBQztJQUVEO1FBQ0UsS0FBSyxDQUFDLHNCQUFzQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFpQixDQUFDLENBQUE7SUFDeEcsQ0FBQztDQUNGO0FBN0VELGlCQUFTLFdBQVcsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCBpbnF1aXJlciwgeyBDaG9pY2VUeXBlIH0gZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgeyBhc3NpZ25JbiB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZS1uYXRpdmUnXG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnc3JjL3V0aWwnXG5pbXBvcnQgeyBTdWJNZW51IH0gZnJvbSAnc3JjL3V0aWwvU3ViTWVudSdcblxuZXhwb3J0ID0gUHVsbFJlcXVlc3RcbmNsYXNzIFB1bGxSZXF1ZXN0IGV4dGVuZHMgU3ViTWVudSB7XG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlTWVyZ2VQUigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdXNlcm5hbWUgPSBnbG9iYWwuY29uZmlnLmdpdC51c2VybmFtZVxuICAgIGlmICghdXNlcm5hbWUpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHVzZXJuYW1lID0gKGF3YWl0IGlucXVpcmVyLnByb21wdCh7IHR5cGU6ICdpbnB1dCcsIG1lc3NhZ2U6ICdCaXRCdWNrZXQgdXNlcm5hbWU6JywgbmFtZTogJ3VzZXInIH0pKS51c2VyXG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBwYXNzd29yZCA9IChhd2FpdCBpbnF1aXJlci5wcm9tcHQoeyB0eXBlOiAncGFzc3dvcmQnLCBtZXNzYWdlOiAnQml0QnVja2V0IHBhc3N3b3JkOicsIG5hbWU6ICdwYXNzJyB9KSkucGFzc1xuICAgIGNvbnN0IEF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIEJ1ZmZlci5mcm9tKGAke3VzZXJuYW1lfToke3Bhc3N3b3JkfWApLnRvU3RyaW5nKCdiYXNlNjQnKVxuXG4gICAgY29uc3QgbWFrZVB1bGxSZXF1ZXN0UHJvbWlzZXM6IGFueVtdID0gW11cbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZ2xvYmFsLmNvbmZpZy5wcm9qZWN0cykge1xuICAgICAgaWYgKGdsb2JhbC5jb25maWcucHVsbFJlcXVlc3RTa2lwLmluY2x1ZGVzKHByb2plY3QpKSBjb250aW51ZVxuICAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLmJpdGJ1Y2tldC5vcmcvMi4wL3JlcG9zaXRvcmllcy8ke2dsb2JhbC5jb25maWcuZ2l0LnRlYW19LyR7XG4gICAgICAgIGdsb2JhbC5jb25maWcuZ2l0LnByb2plY3RQcmVmaXhcbiAgICAgIH0tJHtwcm9qZWN0fS9wdWxscmVxdWVzdHNgXG4gICAgICBjb25zdCBwcm9taXNlID0gcmVxdWVzdCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbiB9LFxuICAgICAgICBqc29uOiB7XG4gICAgICAgICAgdGl0bGU6ICdEZXBsb3kgdG8gcHJvZHVjdGlvbicsXG4gICAgICAgICAgc291cmNlOiB7IGJyYW5jaDogeyBuYW1lOiAnbWFzdGVyJyB9IH0sXG4gICAgICAgICAgZGVzdGluYXRpb246IHsgYnJhbmNoOiB7IG5hbWU6ICdwcm9kdWN0aW9uJyB9IH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHV0aWwubG9nKFxuICAgICAgICAgICAgY2hhbGsuZ3JlZW4oXG4gICAgICAgICAgICAgIGBodHRwczovL2JpdGJ1Y2tldC5vcmcvJHtnbG9iYWwuY29uZmlnLmdpdC50ZWFtfS8ke1xuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuZ2l0LnByb2plY3RQcmVmaXhcbiAgICAgICAgICAgICAgfS0ke3Byb2plY3R9L3B1bGwtcmVxdWVzdHMvJHtyZXN1bHQuaWR9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW3Byb2plY3RdOiBgaHR0cHM6Ly9hcGkuYml0YnVja2V0Lm9yZy8yLjAvcmVwb3NpdG9yaWVzLyR7Z2xvYmFsLmNvbmZpZy5naXQudGVhbX0vJHtcbiAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeFxuICAgICAgICAgICAgfS0ke3Byb2plY3R9L3B1bGxyZXF1ZXN0cy8ke3Jlc3VsdC5pZH0vbWVyZ2VgLFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgdXRpbC5sb2coY2hhbGsueWVsbG93KGAke3Byb2plY3R9IC0gJHtlcnIubWVzc2FnZX1gKSlcbiAgICAgICAgfSlcbiAgICAgIG1ha2VQdWxsUmVxdWVzdFByb21pc2VzLnB1c2gocHJvbWlzZSlcbiAgICB9XG4gICAgY29uc3QgcHVsbFJlcXVlc3RSZXN1bHRzID0gYXNzaWduSW4oXG4gICAgICB7fSxcbiAgICAgIC4uLihhd2FpdCBQcm9taXNlLmFsbChtYWtlUHVsbFJlcXVlc3RQcm9taXNlcykpLmZpbHRlcihwciA9PiB0eXBlb2YgcHIgIT09ICd1bmRlZmluZWQnKVxuICAgIClcblxuICAgIGlmIChPYmplY3Qua2V5cyhwdWxsUmVxdWVzdFJlc3VsdHMpLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG1lcmdlSXQ6IHN0cmluZyA9IChhd2FpdCBpbnF1aXJlci5wcm9tcHQoe1xuICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICBtZXNzYWdlOiAnTWVyZ2UgYWxsICh5L04pOicsXG4gICAgICAgIG5hbWU6ICdtZXJnZScsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIH0pKS5tZXJnZS50b1N0cmluZygpXG4gICAgICBpZiAobWVyZ2VJdC50b1VwcGVyQ2FzZSgpID09PSAnWScpIHtcbiAgICAgICAgY29uc3QgbWVyZ2VQcm9taXNlczogYW55W10gPSBbXVxuICAgICAgICBmb3IgKGNvbnN0IFtwciwgdXJsTWVyZ2VdIG9mIE9iamVjdC5lbnRyaWVzKHB1bGxSZXF1ZXN0UmVzdWx0cykpIHtcbiAgICAgICAgICBjb25zdCBtZXJnZVByb21pc2UgPSByZXF1ZXN0KHVybE1lcmdlLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbiB9LFxuICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHV0aWwubG9nKGNoYWxrLmdyZWVuKGAke3ByfTogJHtKU09OLnBhcnNlKHJlc3VsdCkuc3RhdGV9YCkpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBtZXJnZVByb21pc2VzLnB1c2gobWVyZ2VQcm9taXNlKVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKG1lcmdlUHJvbWlzZXMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ1B1bGwgUmVxdWVzdCBhY3Rpb24/JywgW3sgbmFtZTogJ0NyZWF0ZSAvIE1lcmdlIFBSJywgdmFsdWU6ICdjcmVhdGVNZXJnZVBSJyB9XSBhcyBDaG9pY2VUeXBlW10pXG4gIH1cbn1cbiJdfQ==