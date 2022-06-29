import { Container } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { IUsersRepository } from "./users.rpository.interface";
import { UserService } from "./users.service";
import { IUserService } from "./users.service,interface";

const container = new Container()

const usersRepositoryMock: IUsersRepository = {
    find: jest.fn(),
    create: jest.fn()
}

const configServiceMock: IConfigService = {
    get: jest.fn()
}

let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
    container.bind<IUserService>(TYPES.IUserService).to(UserService);

});

describe('User Service', () => {
    it('create user', async () => {

    })
})