"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jsonwebtoken_1.default.sign(payload, `${process.env.SECRET_JWT_SEED}`, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('There was an error generating the token');
            }
            resolve(token);
        });
    });
};
exports.createJWT = createJWT;
