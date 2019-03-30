"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const util_1 = require("lib/util");
function printMessage(messages) {
    for (const [key, val] of Object.entries(messages)) {
        util_1.log(chalk_1.default.cyan(key));
        for (const msg of val.stdout.split('\n')) {
            util_1.log(msg);
        }
        for (const msg of val.stderr.split('\n')) {
            util_1.log(chalk_1.default.red(msg));
        }
    }
}
exports.printMessage = printMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBeUI7QUFDekIsbUNBQThCO0FBRTlCLFNBQWdCLFlBQVksQ0FBQyxRQUFhO0lBQ3hDLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2pELFVBQUcsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDcEIsS0FBSyxNQUFNLEdBQUcsSUFBSyxHQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqRCxVQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDVDtRQUNELEtBQUssTUFBTSxHQUFHLElBQUssR0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakQsVUFBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUNwQjtLQUNGO0FBQ0gsQ0FBQztBQVZELG9DQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnbGliL3V0aWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludE1lc3NhZ2UobWVzc2FnZXM6IGFueSk6IHZvaWQge1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMobWVzc2FnZXMpKSB7XG4gICAgbG9nKGNoYWxrLmN5YW4oa2V5KSlcbiAgICBmb3IgKGNvbnN0IG1zZyBvZiAodmFsIGFzIGFueSkuc3Rkb3V0LnNwbGl0KCdcXG4nKSkge1xuICAgICAgbG9nKG1zZylcbiAgICB9XG4gICAgZm9yIChjb25zdCBtc2cgb2YgKHZhbCBhcyBhbnkpLnN0ZGVyci5zcGxpdCgnXFxuJykpIHtcbiAgICAgIGxvZyhjaGFsay5yZWQobXNnKSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==