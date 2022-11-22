import {NextFunction, Response} from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = (req:any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Bad request, missing token',
    });
  }

  try {
    const {uid, name}: any = jwt.verify(token.replace('Bearer ', ''), `${process.env.SECRET_JWT_SEED}`);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }
  next();
};
