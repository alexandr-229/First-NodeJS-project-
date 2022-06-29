"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    constructor(secret) {
        this.secret = secret;
    }
    exicute(req, res, next) {
        if (req.headers.authorization) {
            (0, jsonwebtoken_1.verify)(req.headers.authorization.split(' ')[1], this.secret, (err, decoded) => {
                if (err) {
                    next();
                }
                else if (decoded) {
                    req.user = decoded;
                    next();
                }
            });
        }
        else {
            next();
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map