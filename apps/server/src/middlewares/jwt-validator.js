"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Bad request, missing token'
        });
    }
    try {
        const { uid, name } = jsonwebtoken_1.default.verify(token.replace('Bearer ', ''), `${process.env.SECRET_JWT_SEED}`);
        req.uid = uid;
        req.name = name;
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
    next();
};
exports.validateJWT = validateJWT;
