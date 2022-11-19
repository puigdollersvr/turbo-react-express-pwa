import { Request, Response } from "express";

namespace TodosController {
    const User = require('../models/User');

    const createTodo = async (req: Request, res: Response) => {

        

        res.json({
          ok: true,
          msg: 'Create'
        });
    }
    
    const getTodos = async (req: Request, res: Response) => {
        res.json({
          ok: true,
          msg: 'Get All'
        });
    }
    
    const getTodo = async (req: Request, res: Response) => {
        res.json({
          ok: true,
          msg: 'Get Single'
        });
    }
    
    const updateTodo = async (req: Request, res: Response) => {
        res.json({
          ok: true,
          msg: 'update'
        });
    }
    
    const removeTodo = async (req: Request, res: Response) => {
        res.json({
          ok: true,
          msg: 'remove'
        });
    }
    
    
      module.exports = {
        getTodos,
        createTodo,
        getTodo,
        updateTodo,
        removeTodo
      };
}