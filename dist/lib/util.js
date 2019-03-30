"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
function execAsync(command) {
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
}
exports.execAsync = execAsync;
function log(msg) {
    /* tslint:disable */
    if (typeof msg === 'object') {
        console.log(JSON.stringify(msg, null, 4));
    }
    else {
        console.log(msg);
    }
    /* tslint:enable */
}
exports.log = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUEyQjtBQUUzQixTQUFnQixTQUFTLENBQUMsT0FBZTtJQUN2QyxPQUFPLElBQUksT0FBTyxDQUFxRCxPQUFPLENBQUMsRUFBRTtRQUMvRTtZQUNFLGlCQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzdELE1BQU0sVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUE7Z0JBQ25ELElBQUksSUFBSSxLQUFLLENBQUM7b0JBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7Z0JBQ3ZDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQzVCLENBQUMsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFWRCw4QkFVQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxHQUFvQjtJQUN0QyxvQkFBb0I7SUFDcEIsSUFBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUMxQztTQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNqQjtJQUNELG1CQUFtQjtBQUNyQixDQUFDO0FBUkQsa0JBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hlbGwgZnJvbSAnc2hlbGxqcydcblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNBc3luYyhjb21tYW5kOiBzdHJpbmcpOiBQcm9taXNlPHsgc3Rkb3V0OiBzdHJpbmc7IHN0ZGVycjogc3RyaW5nOyBlcnJvcjogYm9vbGVhbiB9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTx7IHN0ZG91dDogc3RyaW5nOyBzdGRlcnI6IHN0cmluZzsgZXJyb3I6IGJvb2xlYW4gfT4ocmVzb2x2ZSA9PiB7XG4gICAge1xuICAgICAgc2hlbGwuZXhlYyhjb21tYW5kLCB7IHNpbGVudDogdHJ1ZSB9LCAoY29kZSwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgY29uc3QgZXhlY1Jlc3VsdCA9IHsgc3Rkb3V0LCBzdGRlcnIsIGVycm9yOiBmYWxzZSB9XG4gICAgICAgIGlmIChjb2RlICE9PSAwKSBleGVjUmVzdWx0LmVycm9yID0gdHJ1ZVxuICAgICAgICByZXR1cm4gcmVzb2x2ZShleGVjUmVzdWx0KVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cobXNnOiBzdHJpbmcgfCBvYmplY3QpOiB2b2lkIHtcbiAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgaWYodHlwZW9mIG1zZyA9PT0gJ29iamVjdCcpe1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1zZywgbnVsbCwgNCkpXG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2cobXNnKVxuICB9XG4gIC8qIHRzbGludDplbmFibGUgKi9cbn1cbiJdfQ==