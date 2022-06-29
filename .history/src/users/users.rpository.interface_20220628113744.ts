import { UserModel } from "@prisma/client";
import { User } from "./user.entity";

export interface IUsersRepository {
    create: (user: User) => Promise<UserModel>;
    find: (email: string, password: string, name: string) => Promise<UserModel | null>;
    findByEmail: (email: string) => Promise<UserModel | null>;
}