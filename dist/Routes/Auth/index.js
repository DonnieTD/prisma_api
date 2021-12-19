"use strict";
exports.__esModule = true;
exports.AuthRoutes = void 0;
var express_1 = require("express");
var authorize_1 = require("../../middleware/authorize");
var Login_1 = require("./Login");
var Register_1 = require("./Register");
exports.AuthRoutes = express_1.Router();
/**
 * POST /api/auth/login
 *  @tags Auth
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
exports.AuthRoutes.post('/login', Login_1.loginCallback);
/**
 * POST /api/auth/register
 *  @tags Auth
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
exports.AuthRoutes.post('/register', authorize_1.authorize, Register_1.registerCallback);
//# sourceMappingURL=index.js.map