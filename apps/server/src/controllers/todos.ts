import {Request, Response} from 'express';
import Todo from '../models/Todo';

export const createTodo = async (req: any, res: Response) => {
  const todo = new Todo(req.body);

  try {
    todo.user = req.uid;
    const savedTodo = await todo.save();
    return res.json({
      ok: true,
      todo: savedTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find().populate('user', 'name');

  res.json({
    ok: true,
    todos,
  });
};

export const getTodo = async (req: any, res: Response) => {
  const todoId = req.params.id;
  const uid = req.uid;

  try {
    const todo = await Todo.findById( todoId );

    if ( !todo ) {
      return res.status(404).json({
        ok: false,
        msg: 'Bad request',
      });
    }

    res.json({
      ok: true,
      todo: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    });
  }
};

export const updateTodo = async (req: any, res: Response) => {
  const todoId = req.params.id;
  const uid = req.uid;

  try {
    const todo = await Todo.findById( todoId );

    if ( !todo ) {
      return res.status(404).json({
        ok: false,
        msg: 'Bad request',
      });
    }

    if ( `${todo.user}` !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized',
      });
    }

    const newTodo = {
      ...req.body,
      user: uid,
    };

    const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        newTodo,
        {new: true}
    );

    res.json({
      ok: true,
      todo: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    });
  }
};

export const removeTodo = async (req: any, res: Response) => {
  const todoId = req.params.id;
  const uid = req.uid;

  try {
    const todo = await Todo.findById( todoId );

    if ( !todo ) {
      return res.status(404).json({
        ok: false,
        msg: 'Bad request',
      });
    }

    if ( `${todo.user}` !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized',
      });
    }

    await Todo.findByIdAndRemove( todoId );

    res.json({
      ok: true,
      msg: 'Todo removed',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    });
  }
};
