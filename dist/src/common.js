"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const util_1 = require("src/util");
const common = {
    printMessage: (messages) => {
        for (const [key, val] of Object.entries(messages)) {
            util_1.util.log(chalk_1.default.cyan(key));
            for (const msg of val.stdout.split('\n')) {
                util_1.util.log(msg);
            }
            for (const msg of val.stderr.split('\n')) {
                util_1.util.log(chalk_1.default.red(msg));
            }
        }
    },
};
exports.common = common;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUF5QjtBQUN6QixtQ0FBK0I7QUFFL0IsTUFBTSxNQUFNLEdBQUc7SUFDYixZQUFZLEVBQUUsQ0FBQyxRQUFhLEVBQVEsRUFBRTtRQUNwQyxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqRCxXQUFJLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN6QixLQUFLLE1BQU0sR0FBRyxJQUFLLEdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqRCxXQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ2Q7WUFDRCxLQUFLLE1BQU0sR0FBRyxJQUFLLEdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqRCxXQUFJLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUN6QjtTQUNGO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFFUSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdzcmMvdXRpbCdcblxuY29uc3QgY29tbW9uID0ge1xuICBwcmludE1lc3NhZ2U6IChtZXNzYWdlczogYW55KTogdm9pZCA9PiB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG1lc3NhZ2VzKSkge1xuICAgICAgdXRpbC5sb2coY2hhbGsuY3lhbihrZXkpKVxuICAgICAgZm9yIChjb25zdCBtc2cgb2YgKHZhbCBhcyBhbnkpLnN0ZG91dC5zcGxpdCgnXFxuJykpIHtcbiAgICAgICAgdXRpbC5sb2cobXNnKVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBtc2cgb2YgKHZhbCBhcyBhbnkpLnN0ZGVyci5zcGxpdCgnXFxuJykpIHtcbiAgICAgICAgdXRpbC5sb2coY2hhbGsucmVkKG1zZykpXG4gICAgICB9XG4gICAgfVxuICB9LFxufVxuXG5leHBvcnQgeyBjb21tb24gfVxuIl19