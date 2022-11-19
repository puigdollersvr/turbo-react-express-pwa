import { NextFunction, Request, Response } from "express";
const { validationResult } = require('express-validator')

const validateFields = (req:Request, res: Response, next: NextFunction) => {
    //Error handling
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
        ok: false,
        errors: errors.mapped()
        });
    }
    next();
};

module.exports = {
    validateFields
}