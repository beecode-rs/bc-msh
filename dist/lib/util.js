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
    console.log(msg);
}
exports.log = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUEyQjtBQUUzQixTQUFnQixTQUFTLENBQUMsT0FBZTtJQUN2QyxPQUFPLElBQUksT0FBTyxDQUFxRCxPQUFPLENBQUMsRUFBRTtRQUMvRTtZQUNFLGlCQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzdELE1BQU0sVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUE7Z0JBQ25ELElBQUksSUFBSSxLQUFLLENBQUM7b0JBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7Z0JBQ3ZDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQzVCLENBQUMsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFWRCw4QkFVQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxHQUFXO0lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDbEIsQ0FBQztBQUZELGtCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNoZWxsIGZyb20gJ3NoZWxsanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjQXN5bmMoY29tbWFuZDogc3RyaW5nKTogUHJvbWlzZTx7IHN0ZG91dDogc3RyaW5nOyBzdGRlcnI6IHN0cmluZzsgZXJyb3I6IGJvb2xlYW4gfT4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8eyBzdGRvdXQ6IHN0cmluZzsgc3RkZXJyOiBzdHJpbmc7IGVycm9yOiBib29sZWFuIH0+KHJlc29sdmUgPT4ge1xuICAgIHtcbiAgICAgIHNoZWxsLmV4ZWMoY29tbWFuZCwgeyBzaWxlbnQ6IHRydWUgfSwgKGNvZGUsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4ZWNSZXN1bHQgPSB7IHN0ZG91dCwgc3RkZXJyLCBlcnJvcjogZmFsc2UgfVxuICAgICAgICBpZiAoY29kZSAhPT0gMCkgZXhlY1Jlc3VsdC5lcnJvciA9IHRydWVcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoZXhlY1Jlc3VsdClcbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1zZzogc3RyaW5nKTogdm9pZCB7XG4gIGNvbnNvbGUubG9nKG1zZylcbn1cbiJdfQ==