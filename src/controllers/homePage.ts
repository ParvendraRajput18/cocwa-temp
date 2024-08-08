import { Request, Response } from 'express';

export const homePage = (req: Request, res: Response) => {
  const message: string = "router working ";
  res.send(message);
};
