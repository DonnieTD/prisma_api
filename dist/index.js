"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.prisma = exports.accessTokenSecret = void 0;
var client_1 = require("@prisma/client");
var express_1 = __importDefault(require("express"));
var Routes_1 = require("./Routes");
var authorize_1 = require("./middleware/authorize");
var helmet_1 = __importDefault(require("helmet"));
var TE = __importStar(require("fp-ts/lib/TaskEither"));
var lib_1 = require("./lib");
var logging_1 = require("./middleware/logging");
var Either_1 = require("fp-ts/lib/Either");
var cors_1 = __importDefault(require("cors"));
var express_jsdoc_swagger_1 = __importDefault(require("express-jsdoc-swagger"));
var Swagger_1 = require("./lib/Swagger");
var axios_1 = __importDefault(require("axios"));
var addon = require('bindings')('hello');
exports.accessTokenSecret = 'youraccesstokensecret';
exports.prisma = new client_1.PrismaClient();
var lastOrEmptyObj = function (data) {
    return data.length > 0 ? data[data.length - 1] : {};
};
var validate = function (x) {
    return function (selector) {
        return function (data) {
            return Object.keys(data).includes(x) ? selector(x) : "No data";
        };
    };
};
var getValues = function (data, data2) {
    var _a = [lastOrEmptyObj(data), lastOrEmptyObj(data2)], obj = _a[0], obj2 = _a[1];
    var _b = [
        validate('temperature')(function (x) { return x.temperature; }),
        validate('mls')(function (x) { return x.mls; }),
    ], tempValidator = _b[0], mlsValidator = _b[1];
    return ({
        "0": tempValidator(obj),
        "0.1": mlsValidator(obj),
        "1": tempValidator(obj2),
        "1.1": mlsValidator(obj2)
    });
};
var server = function () { return __awaiter(void 0, void 0, void 0, function () {
    var App;
    return __generator(this, function (_a) {
        App = express_1["default"]();
        express_jsdoc_swagger_1["default"](App)(Swagger_1.SwaggerOptions);
        App.use([
            cors_1["default"](),
            helmet_1["default"](),
            express_1["default"].json(),
            express_1["default"].urlencoded({
                extended: true
            })
        ]);
        App.get('/realtime', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var d, data, one, two;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        d = new Date();
                        d.setMinutes(d.getMinutes() - 5);
                        return [4 /*yield*/, axios_1["default"].get("http://34.247.217.116:5000/getFlowData?IMEI=083af24bc50c&fromDate=" + d.toISOString().substr(0, 16) + "&limit=100")];
                    case 1:
                        data = (_e.sent()).data;
                        one = data.flowdata.filter(function (x) { return x.tap_position === 1; });
                        two = data.flowdata.filter(function (x) { return x.tap_position === 2; });
                        res.status(200).json({
                            "0": ((_a = one[one.length - 1]) === null || _a === void 0 ? void 0 : _a.temperature) || "No data",
                            "0.1": ((_b = one[one.length - 1]) === null || _b === void 0 ? void 0 : _b.ml) || "No data",
                            "1": ((_c = two[two.length - 1]) === null || _c === void 0 ? void 0 : _c.temperature) || "No data",
                            "1.1": ((_d = two[two.length - 1]) === null || _d === void 0 ? void 0 : _d.ml) || "No data"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        App.get('/', logging_1.logging, function (_, res) {
            res.status(200).json({ message: "Welcome to the api" });
        });
        App.use('/users', logging_1.logging, authorize_1.authorize, Routes_1.UserRoutes);
        App.use('/init', logging_1.logging, authorize_1.authorize, Routes_1.InitRoutes);
        App.use('/posts', logging_1.logging, authorize_1.authorize, Routes_1.PostsRoutes);
        // Auth and Rate limits in route definition
        App.use('/enquiries', logging_1.logging, Routes_1.EnquiriesRoutes);
        App.use('/auth', logging_1.logging, Routes_1.AuthRoutes);
        App.listen(5000, function () { return console.log("App listening at http://localhost:" + 5000); });
        return [2 /*return*/];
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ServerEither, Server;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, TE.tryCatch(server, function (err) { return err; })()];
            case 1:
                ServerEither = _a.sent();
                Server = Either_1.fold(function (e) { return e; }, function (x) { return x; })(ServerEither);
                if (Server instanceof Error)
                    console.log(lib_1.ErrorToText(Server));
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=index.js.map