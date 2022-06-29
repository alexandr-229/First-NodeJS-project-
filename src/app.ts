import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserCotroller } from './users/users.contrller';
import 'reflect-metadata';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserCotroller) private userController: UserCotroller,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
    ) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware() {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.exicute.bind(authMiddleware))
	}

	useRouter(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRouter();
		this.useExeptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server running on port ${this.port}`);
	}

	public close(): void{
		this.server.close()
	}
}
