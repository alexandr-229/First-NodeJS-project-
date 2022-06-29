import { Container } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { IUsersRepository } from "./users.rpository.interface";
import { UserService } from "./users.service";
import { IUserService } from "./users.service,interface";

const container = new Container()

const UsersRepositoryMock: IUsersRepository = {
    find: jest.fn(),
    create: jest.fn()
}

const ConfigServiceMock: IConfigService = {
    get: jest.fn()
}

let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
    container.bind<IUserService>(TYPES.IUserService).to(UserService);
    container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
    container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

    configService = container.get<IConfigService>(TYPES.ConfigService);
    usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
    usersService = container.get<IUserService>(TYPES.IUserService);
});

describe('User Service', () => {
    it('create user', async () => {

    })
})