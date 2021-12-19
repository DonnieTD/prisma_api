"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Logger = void 0;
var winston_1 = __importDefault(require("winston"));
winston_1["default"].addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
});
exports.Logger = winston_1["default"].createLogger({
    level: (function () {
        var env = process.env.NODE_ENV || 'development';
        var isDevelopment = env === 'development';
        return isDevelopment ? 'debug' : 'warn';
    })(),
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4
    },
    format: winston_1["default"].format.combine(winston_1["default"].format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1["default"].format.colorize({ all: true }), winston_1["default"].format.printf(function (info) { return info.timestamp + " " + info.level + ": " + info.message; })),
    transports: [
        new winston_1["default"].transports.Console(),
        new winston_1["default"].transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        new winston_1["default"].transports.File({ filename: 'logs/all.log' }),
    ]
});
//# sourceMappingURL=index.js.map