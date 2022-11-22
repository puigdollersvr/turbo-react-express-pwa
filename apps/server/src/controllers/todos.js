"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = new Todo_1.default(req.body);
    try {
        todo.user = req.uid;
        const savedTodo = yield todo.save();
        res.json({
            ok: true,
            todo: savedTodo,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong',
        });
    }
    res.json({
        ok: true,
        msg: 'Create',
    });
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Todo_1.default.find().populate('user', 'name');
    res.json({
        ok: true,
        todos
    });
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    const uid = req.uid;
    try {
        const todo = yield Todo_1.default.findById(todoId);
        if (!todo) {
            return res.status(404).json({
                ok: false,
                msg: 'Bad request',
            });
        }
        res.json({
            ok: true,
            todo: todo
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong',
        });
    }
});
exports.getTodo = getTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    const uid = req.uid;
    try {
        const todo = yield Todo_1.default.findById(todoId);
        if (!todo) {
            return res.status(404).json({
                ok: false,
                msg: 'Bad request',
            });
        }
        if (`${todo.user}` !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized',
            });
        }
        const newTodo = Object.assign(Object.assign({}, req.body), { user: uid });
        const updatedTodo = yield Todo_1.default.findByIdAndUpdate(todoId, newTodo, { new: true });
        res.json({
            ok: true,
            todo: updatedTodo
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong',
        });
    }
});
exports.updateTodo = updateTodo;
const removeTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    const uid = req.uid;
    try {
        const todo = yield Todo_1.default.findById(todoId);
        if (!todo) {
            return res.status(404).json({
                ok: false,
                msg: 'Bad request',
            });
        }
        if (`${todo.user}` !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized',
            });
        }
        yield Todo_1.default.findByIdAndRemove(todoId);
        res.json({
            ok: true,
            msg: 'Todo removed'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong',
        });
    }
});
exports.removeTodo = removeTodo;
