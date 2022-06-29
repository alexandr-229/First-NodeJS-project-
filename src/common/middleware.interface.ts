import { Request, Response, NextFunction } from 'express';

export interface IMiddleware {
	exicute: (req: Request, res: Response, next: NextFunction) => void;
}
