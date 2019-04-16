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
class PR extends SubMenu_1.SubMenu {
    async createMergePR() {
        // TODO split into multiple functions
        let username = global.config.git.username;
        let password = global.config.git.password;
        if (!username) {
            // @ts-ignore
            username = (await inquirer_1.default.prompt({ type: 'input', message: 'BitBucket username:', name: 'user' })).user;
        }
        if (!password) {
            // @ts-ignore
            password = (await inquirer_1.default.prompt({ type: 'password', message: 'BitBucket password:', name: 'pass' })).pass;
        }
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
module.exports = PR;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUFIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhlYy9QUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsa0RBQXlCO0FBQ3pCLHdEQUErQztBQUMvQyxtQ0FBaUM7QUFDakMsb0ZBQTRDO0FBQzVDLG1DQUErQjtBQUMvQiw4Q0FBMEM7QUFHMUMsTUFBTSxFQUFHLFNBQVEsaUJBQU87SUFDZCxLQUFLLENBQUMsYUFBYTtRQUN6QixxQ0FBcUM7UUFDckMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQ3pDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQTtRQUN6QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsYUFBYTtZQUNiLFFBQVEsR0FBRyxDQUFDLE1BQU0sa0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtTQUN6RztRQUNELElBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDWixhQUFhO1lBQ2IsUUFBUSxHQUFHLENBQUMsTUFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO1NBQzVHO1FBQ0QsTUFBTSxhQUFhLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFMUYsTUFBTSx1QkFBdUIsR0FBVSxFQUFFLENBQUE7UUFDekMsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFN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QUksQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDN0QsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtpQkFDakM7Z0JBQ0QsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7UUFDRSxLQUFLLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQWlCLENBQUMsQ0FBQTtJQUN4RyxDQUFDO0NBQ0Y7QUFqRkQsaUJBQVMsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IGlucXVpcmVyLCB7IENob2ljZVR5cGUgfSBmcm9tICdpbnF1aXJlcidcbmltcG9ydCB7IGFzc2lnbkluIH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlLW5hdGl2ZSdcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcbmltcG9ydCB7IFN1Yk1lbnUgfSBmcm9tICdzcmMvdXRpbC9TdWJNZW51J1xuXG5leHBvcnQgPSBQUlxuY2xhc3MgUFIgZXh0ZW5kcyBTdWJNZW51IHtcbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVNZXJnZVBSKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFRPRE8gc3BsaXQgaW50byBtdWx0aXBsZSBmdW5jdGlvbnNcbiAgICBsZXQgdXNlcm5hbWUgPSBnbG9iYWwuY29uZmlnLmdpdC51c2VybmFtZVxuICAgIGxldCBwYXNzd29yZCA9IGdsb2JhbC5jb25maWcuZ2l0LnBhc3N3b3JkXG4gICAgaWYgKCF1c2VybmFtZSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdXNlcm5hbWUgPSAoYXdhaXQgaW5xdWlyZXIucHJvbXB0KHsgdHlwZTogJ2lucHV0JywgbWVzc2FnZTogJ0JpdEJ1Y2tldCB1c2VybmFtZTonLCBuYW1lOiAndXNlcicgfSkpLnVzZXJcbiAgICB9XG4gICAgaWYoIXBhc3N3b3JkKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBwYXNzd29yZCA9IChhd2FpdCBpbnF1aXJlci5wcm9tcHQoeyB0eXBlOiAncGFzc3dvcmQnLCBtZXNzYWdlOiAnQml0QnVja2V0IHBhc3N3b3JkOicsIG5hbWU6ICdwYXNzJyB9KSkucGFzc1xuICAgIH1cbiAgICBjb25zdCBBdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBCdWZmZXIuZnJvbShgJHt1c2VybmFtZX06JHtwYXNzd29yZH1gKS50b1N0cmluZygnYmFzZTY0JylcblxuICAgIGNvbnN0IG1ha2VQdWxsUmVxdWVzdFByb21pc2VzOiBhbnlbXSA9IFtdXG4gICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIGdsb2JhbC5jb25maWcucHJvamVjdHMpIHtcbiAgICAgIGlmIChnbG9iYWwuY29uZmlnLnB1bGxSZXF1ZXN0U2tpcC5pbmNsdWRlcyhwcm9qZWN0KSkgY29udGludWVcbiAgICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5iaXRidWNrZXQub3JnLzIuMC9yZXBvc2l0b3JpZXMvJHtnbG9iYWwuY29uZmlnLmdpdC50ZWFtfS8ke1xuICAgICAgICBnbG9iYWwuY29uZmlnLmdpdC5wcm9qZWN0UHJlZml4XG4gICAgICB9LSR7cHJvamVjdH0vcHVsbHJlcXVlc3RzYFxuICAgICAgY29uc3QgcHJvbWlzZSA9IHJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb24gfSxcbiAgICAgICAganNvbjoge1xuICAgICAgICAgIHRpdGxlOiAnRGVwbG95IHRvIHByb2R1Y3Rpb24nLFxuICAgICAgICAgIHNvdXJjZTogeyBicmFuY2g6IHsgbmFtZTogJ21hc3RlcicgfSB9LFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiB7IGJyYW5jaDogeyBuYW1lOiAncHJvZHVjdGlvbicgfSB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICB1dGlsLmxvZyhcbiAgICAgICAgICAgIGNoYWxrLmdyZWVuKFxuICAgICAgICAgICAgICBgaHR0cHM6Ly9iaXRidWNrZXQub3JnLyR7Z2xvYmFsLmNvbmZpZy5naXQudGVhbX0vJHtcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmdpdC5wcm9qZWN0UHJlZml4XG4gICAgICAgICAgICAgIH0tJHtwcm9qZWN0fS9wdWxsLXJlcXVlc3RzLyR7cmVzdWx0LmlkfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFtwcm9qZWN0XTogYGh0dHBzOi8vYXBpLmJpdGJ1Y2tldC5vcmcvMi4wL3JlcG9zaXRvcmllcy8ke2dsb2JhbC5jb25maWcuZ2l0LnRlYW19LyR7XG4gICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuZ2l0LnByb2plY3RQcmVmaXhcbiAgICAgICAgICAgIH0tJHtwcm9qZWN0fS9wdWxscmVxdWVzdHMvJHtyZXN1bHQuaWR9L21lcmdlYCxcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIHV0aWwubG9nKGNoYWxrLnllbGxvdyhgJHtwcm9qZWN0fSAtICR7ZXJyLm1lc3NhZ2V9YCkpXG4gICAgICAgIH0pXG4gICAgICBtYWtlUHVsbFJlcXVlc3RQcm9taXNlcy5wdXNoKHByb21pc2UpXG4gICAgfVxuICAgIGNvbnN0IHB1bGxSZXF1ZXN0UmVzdWx0cyA9IGFzc2lnbkluKFxuICAgICAge30sXG4gICAgICAuLi4oYXdhaXQgUHJvbWlzZS5hbGwobWFrZVB1bGxSZXF1ZXN0UHJvbWlzZXMpKS5maWx0ZXIocHIgPT4gdHlwZW9mIHByICE9PSAndW5kZWZpbmVkJylcbiAgICApXG5cbiAgICBpZiAoT2JqZWN0LmtleXMocHVsbFJlcXVlc3RSZXN1bHRzKS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBtZXJnZUl0OiBzdHJpbmcgPSAoYXdhaXQgaW5xdWlyZXIucHJvbXB0KHtcbiAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgbWVzc2FnZTogJ01lcmdlIGFsbCAoeS9OKTonLFxuICAgICAgICBuYW1lOiAnbWVyZ2UnLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB9KSkubWVyZ2UudG9TdHJpbmcoKVxuICAgICAgaWYgKG1lcmdlSXQudG9VcHBlckNhc2UoKSA9PT0gJ1knKSB7XG4gICAgICAgIGNvbnN0IG1lcmdlUHJvbWlzZXM6IGFueVtdID0gW11cbiAgICAgICAgZm9yIChjb25zdCBbcHIsIHVybE1lcmdlXSBvZiBPYmplY3QuZW50cmllcyhwdWxsUmVxdWVzdFJlc3VsdHMpKSB7XG4gICAgICAgICAgY29uc3QgbWVyZ2VQcm9taXNlID0gcmVxdWVzdCh1cmxNZXJnZSwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb24gfSxcbiAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB1dGlsLmxvZyhjaGFsay5ncmVlbihgJHtwcn06ICR7SlNPTi5wYXJzZShyZXN1bHQpLnN0YXRlfWApKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgbWVyZ2VQcm9taXNlcy5wdXNoKG1lcmdlUHJvbWlzZSlcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChtZXJnZVByb21pc2VzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdQdWxsIFJlcXVlc3QgYWN0aW9uPycsIFt7IG5hbWU6ICdDcmVhdGUgLyBNZXJnZSBQUicsIHZhbHVlOiAnY3JlYXRlTWVyZ2VQUicgfV0gYXMgQ2hvaWNlVHlwZVtdKVxuICB9XG59XG4iXX0=