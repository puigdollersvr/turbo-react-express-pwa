"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * AUTH ROUTES:
 * host + /api/auth
 */
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const auth_1 = require("../controllers/auth");
const field_validator_1 = require("../middlewares/field-validator");
const jwt_validator_1 = require("../middlewares/jwt-validator");
router.post('/', [
    (0, express_validator_1.check)('email', 'Mail is required and must be valid').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required and must have at least 6 chars').isLength({ min: 6 }),
    field_validator_1.validateFields
], auth_1.loginUser);
router.post('/new', [
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Mail is required and must be valid').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required and must have at least 6 chars').isLength({ min: 6 }),
    field_validator_1.validateFields
], auth_1.createUser);
router.get('/revalidate', jwt_validator_1.validateJWT, auth_1.revalidateToken);
exports.default = router;
