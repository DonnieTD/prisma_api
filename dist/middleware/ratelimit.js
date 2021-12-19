"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ratelimit = void 0;
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
var ratelimit = function (mins, maxHits) { return express_rate_limit_1["default"]({
    windowMs: mins * 60 * 1000,
    max: maxHits
}); };
exports.ratelimit = ratelimit;
//# sourceMappingURL=ratelimit.js.map