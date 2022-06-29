import { Router } from 'express';
import { Response } from 'express-serve-static-core';
import { injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IRouterController } from './route.interface';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(
		res: Response,
		code: number,
		message: T,
	): Response<any, Record<string, any>, number> {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): Response<any, Record<string, any>, number> {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): Response<any, Record<string, any>, number> {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IRouterController[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middlewares = route.middleware?.map(m => m.exicute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
