import { Request, Response } from 'express';

export const homePage = (req: Request, res: Response) => {
  const message: string = "Api is working!";
  res.send(message);
};
