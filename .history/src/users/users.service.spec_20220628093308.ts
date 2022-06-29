import { Container } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { IUsersRepository } from "./users.rpository.interface";
import { IUserService } from "./users.service,interface";

const container = new Container()

beforeAll(() => {});
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService

describe('User Service', () => {
    it('create user', async () => {

    })
})