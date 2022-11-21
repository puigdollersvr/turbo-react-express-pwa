import {Request, Response} from 'express';
import Todo from '../models/Todo';

export const createTodo = async (req: any, res: Response) => {

  const todo = new Todo(req.body);

  try {
    todo.user = req.uid;
    const savedTodo = await todo.save();
    res.json({
      ok: true,
      todo: savedTodo,
    })
  } catch (error) {
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
};

export const getTodos = async (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: 'Get All',
  });
};

export const getTodo = async (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: 'Get Single',
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: 'update',
  });
};

export const removeTodo = async (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: 'remove',
  });
};