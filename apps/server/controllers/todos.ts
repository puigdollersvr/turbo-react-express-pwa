import {Request, Response} from 'express';


export const createTodo = async (req: Request, res: Response) => {
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