/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await next();
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
