"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.logging = void 0;
var morgan_1 = __importDefault(require("morgan"));
var lib_1 = require("../lib");
var stream = {
    write: function (message) { return lib_1.Logger.http(message); }
};
var skip = function () {
    var env = process.env.NODE_ENV || "development";
    return env !== "development";
};
exports.logging = morgan_1["default"](":method :url :status :res[content-length] - :response-time ms", { stream: stream, skip: skip });
//# sourceMappingURL=logging.js.map