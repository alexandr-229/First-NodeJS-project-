import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import { IUserController } from './user.controller.interface';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { IUserService } from './users.service,interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import 'reflect-metadata';
import { sign } from 'jsonwebtoken'
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserCotroller extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: LoggerService,
		@inject(TYPES.IUserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configSrevice: IConfigService
		) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register, middleware: [new ValidateMiddleware(UserRegisterDTO)] },
			{ path: '/info', method: 'get', func: this.info, middleware: [] },
		]);
	}

	async login( { body }: Request<{}, {}, UserRegisterDTO>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);
		if(result) {
			return next(new HTTPError(401, 'Error422', 'login'))
		}
		const jwt = await this.signJWT(body.email, this.configSrevice.get('SECRET'))
		this.ok(res, { jwt: jwt })
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if(!result){
			return next(new HTTPError(422, 'This user already exists', 'regiter'))
		}
		this.ok(res, { email: result?.email, id: result?.id, password: result.password, name: result?.name } )
	}

	async info({ user }: Request, res: Response, next: NextFunction) {
		this.ok(res, { email: user?.email?.email })
	}

	async signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign({
				email: email,
				iat: Math.floor(Date.now() / 1000)
			}, secret, {
				algorithm: 'HS256'
			}, (err, token) => {
				if(err){
					reject(err)
				}
				resolve(token as string)
			})
		})
	}
}
