import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UserRegisterDTO } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUsersRepository } from "./users.rpository.interface";
import { IUserService } from "./users.service,interface";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
        ) {

    }
    async createUser ({ email, name, password }: UserRegisterDTO): Promise<UserModel | null> {
        const newUser = new User(email, name);
        const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
        const existedUser = await this.usersRepository.find(email, password, name);
        if(existedUser){
            return null
        }
        return this.usersRepository.create(newUser)
    }

    async validateUser ({ email }: UserLoginDTO): Promise<boolean> {
        const existedUser = await this.usersRepository.find(email, password, name);
        if(!existedUser){
            return false
        }
        const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
        return newUser.comparePassword(existedUser.password)
    }

    async getUserInfo(email: string): Promise<UserModel | null> {
        return this.usersRepository.find(email, password, name)
    }
}
