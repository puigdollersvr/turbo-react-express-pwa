"use strict";
/*
 * TODO ROUTES:
 * host + /api/todos
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const jwt_validator_1 = require("../middlewares/jwt-validator");
const field_validator_1 = require("../middlewares/field-validator");
const isDate_1 = require("../helpers/isDate");
const todos_1 = require("../controllers/todos");
router.use(jwt_validator_1.validateJWT);
router.post('/', [
    (0, express_validator_1.check)('title', 'The title is required').not().isEmpty(),
    (0, express_validator_1.check)('start', 'Start date: Incorrect format').custom(isDate_1.isDate),
    (0, express_validator_1.check)('end', 'End date: Incorrect format').custom(isDate_1.isDate),
    field_validator_1.validateFields
], todos_1.createTodo);
router.get('/', todos_1.getTodos);
router.get('/:id', todos_1.getTodo);
router.put('/:id', todos_1.updateTodo);
router.delete('/:id', todos_1.removeTodo);
exports.default = router;
