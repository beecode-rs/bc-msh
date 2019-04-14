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
        // TODO split into multiple functions
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUFIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhlYy9QUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsa0RBQXlCO0FBQ3pCLHdEQUErQztBQUMvQyxtQ0FBaUM7QUFDakMsb0ZBQTRDO0FBQzVDLG1DQUErQjtBQUMvQiw4Q0FBMEM7QUFHMUMsTUFBTSxXQUFZLFNBQVEsaUJBQU87SUFDdkIsS0FBSyxDQUFDLGFBQWE7UUFDekIscUNBQXFDO1FBQ3JDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQTtRQUN6QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsYUFBYTtZQUNiLFFBQVEsR0FBRyxDQUFDLE1BQU0sa0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtTQUN6RztRQUNELGFBQWE7UUFDYixNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sa0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUNqSCxNQUFNLGFBQWEsR0FBRyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUUxRixNQUFNLHVCQUF1QixHQUFVLEVBQUUsQ0FBQTtRQUN6QyxLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQzVDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FB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QUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUM3RCxDQUFDLENBQUMsQ0FBQTtvQkFDRixhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO2lCQUNqQztnQkFDRCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7YUFDakM7U0FDRjtJQUNILENBQUM7SUFFRDtRQUNFLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBaUIsQ0FBQyxDQUFBO0lBQ3hHLENBQUM7Q0FDRjtBQTlFRCxpQkFBUyxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgaW5xdWlyZXIsIHsgQ2hvaWNlVHlwZSB9IGZyb20gJ2lucXVpcmVyJ1xuaW1wb3J0IHsgYXNzaWduSW4gfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UtbmF0aXZlJ1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ3NyYy91dGlsJ1xuaW1wb3J0IHsgU3ViTWVudSB9IGZyb20gJ3NyYy91dGlsL1N1Yk1lbnUnXG5cbmV4cG9ydCA9IFB1bGxSZXF1ZXN0XG5jbGFzcyBQdWxsUmVxdWVzdCBleHRlbmRzIFN1Yk1lbnUge1xuICBwcml2YXRlIGFzeW5jIGNyZWF0ZU1lcmdlUFIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gVE9ETyBzcGxpdCBpbnRvIG11bHRpcGxlIGZ1bmN0aW9uc1xuICAgIGxldCB1c2VybmFtZSA9IGdsb2JhbC5jb25maWcuZ2l0LnVzZXJuYW1lXG4gICAgaWYgKCF1c2VybmFtZSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdXNlcm5hbWUgPSAoYXdhaXQgaW5xdWlyZXIucHJvbXB0KHsgdHlwZTogJ2lucHV0JywgbWVzc2FnZTogJ0JpdEJ1Y2tldCB1c2VybmFtZTonLCBuYW1lOiAndXNlcicgfSkpLnVzZXJcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHBhc3N3b3JkID0gKGF3YWl0IGlucXVpcmVyLnByb21wdCh7IHR5cGU6ICdwYXNzd29yZCcsIG1lc3NhZ2U6ICdCaXRCdWNrZXQgcGFzc3dvcmQ6JywgbmFtZTogJ3Bhc3MnIH0pKS5wYXNzXG4gICAgY29uc3QgQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgQnVmZmVyLmZyb20oYCR7dXNlcm5hbWV9OiR7cGFzc3dvcmR9YCkudG9TdHJpbmcoJ2Jhc2U2NCcpXG5cbiAgICBjb25zdCBtYWtlUHVsbFJlcXVlc3RQcm9taXNlczogYW55W10gPSBbXVxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBnbG9iYWwuY29uZmlnLnByb2plY3RzKSB7XG4gICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5wdWxsUmVxdWVzdFNraXAuaW5jbHVkZXMocHJvamVjdCkpIGNvbnRpbnVlXG4gICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkuYml0YnVja2V0Lm9yZy8yLjAvcmVwb3NpdG9yaWVzLyR7Z2xvYmFsLmNvbmZpZy5naXQudGVhbX0vJHtcbiAgICAgICAgZ2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeFxuICAgICAgfS0ke3Byb2plY3R9L3B1bGxyZXF1ZXN0c2BcbiAgICAgIGNvbnN0IHByb21pc2UgPSByZXF1ZXN0KHVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uIH0sXG4gICAgICAgIGpzb246IHtcbiAgICAgICAgICB0aXRsZTogJ0RlcGxveSB0byBwcm9kdWN0aW9uJyxcbiAgICAgICAgICBzb3VyY2U6IHsgYnJhbmNoOiB7IG5hbWU6ICdtYXN0ZXInIH0gfSxcbiAgICAgICAgICBkZXN0aW5hdGlvbjogeyBicmFuY2g6IHsgbmFtZTogJ3Byb2R1Y3Rpb24nIH0gfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgdXRpbC5sb2coXG4gICAgICAgICAgICBjaGFsay5ncmVlbihcbiAgICAgICAgICAgICAgYGh0dHBzOi8vYml0YnVja2V0Lm9yZy8ke2dsb2JhbC5jb25maWcuZ2l0LnRlYW19LyR7XG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5naXQucHJvamVjdFByZWZpeFxuICAgICAgICAgICAgICB9LSR7cHJvamVjdH0vcHVsbC1yZXF1ZXN0cy8ke3Jlc3VsdC5pZH1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbcHJvamVjdF06IGBodHRwczovL2FwaS5iaXRidWNrZXQub3JnLzIuMC9yZXBvc2l0b3JpZXMvJHtnbG9iYWwuY29uZmlnLmdpdC50ZWFtfS8ke1xuICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmdpdC5wcm9qZWN0UHJlZml4XG4gICAgICAgICAgICB9LSR7cHJvamVjdH0vcHVsbHJlcXVlc3RzLyR7cmVzdWx0LmlkfS9tZXJnZWAsXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICB1dGlsLmxvZyhjaGFsay55ZWxsb3coYCR7cHJvamVjdH0gLSAke2Vyci5tZXNzYWdlfWApKVxuICAgICAgICB9KVxuICAgICAgbWFrZVB1bGxSZXF1ZXN0UHJvbWlzZXMucHVzaChwcm9taXNlKVxuICAgIH1cbiAgICBjb25zdCBwdWxsUmVxdWVzdFJlc3VsdHMgPSBhc3NpZ25JbihcbiAgICAgIHt9LFxuICAgICAgLi4uKGF3YWl0IFByb21pc2UuYWxsKG1ha2VQdWxsUmVxdWVzdFByb21pc2VzKSkuZmlsdGVyKHByID0+IHR5cGVvZiBwciAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgKVxuXG4gICAgaWYgKE9iamVjdC5rZXlzKHB1bGxSZXF1ZXN0UmVzdWx0cykubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbWVyZ2VJdDogc3RyaW5nID0gKGF3YWl0IGlucXVpcmVyLnByb21wdCh7XG4gICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgIG1lc3NhZ2U6ICdNZXJnZSBhbGwgKHkvTik6JyxcbiAgICAgICAgbmFtZTogJ21lcmdlJyxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgfSkpLm1lcmdlLnRvU3RyaW5nKClcbiAgICAgIGlmIChtZXJnZUl0LnRvVXBwZXJDYXNlKCkgPT09ICdZJykge1xuICAgICAgICBjb25zdCBtZXJnZVByb21pc2VzOiBhbnlbXSA9IFtdXG4gICAgICAgIGZvciAoY29uc3QgW3ByLCB1cmxNZXJnZV0gb2YgT2JqZWN0LmVudHJpZXMocHVsbFJlcXVlc3RSZXN1bHRzKSkge1xuICAgICAgICAgIGNvbnN0IG1lcmdlUHJvbWlzZSA9IHJlcXVlc3QodXJsTWVyZ2UsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uIH0sXG4gICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgdXRpbC5sb2coY2hhbGsuZ3JlZW4oYCR7cHJ9OiAke0pTT04ucGFyc2UocmVzdWx0KS5zdGF0ZX1gKSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIG1lcmdlUHJvbWlzZXMucHVzaChtZXJnZVByb21pc2UpXG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobWVyZ2VQcm9taXNlcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignUHVsbCBSZXF1ZXN0IGFjdGlvbj8nLCBbeyBuYW1lOiAnQ3JlYXRlIC8gTWVyZ2UgUFInLCB2YWx1ZTogJ2NyZWF0ZU1lcmdlUFInIH1dIGFzIENob2ljZVR5cGVbXSlcbiAgfVxufVxuIl19