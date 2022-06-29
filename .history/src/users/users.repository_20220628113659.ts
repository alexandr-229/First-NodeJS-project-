import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { PrismaService } from "../database/prisma.service";
import { TYPES } from "../types";
import { User } from "./user.entity";
import { IUsersRepository } from "./users.rpository.interface";

@injectable()
export class UsersRepository implements IUsersRepository {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

    async create({ email, password, name }: User): Promise<UserModel>{
        return this.prismaService.client.userModel.create({
            data: {
                email,
                password,
                name
            }
        })
    };

    async find (email: string, password: string, name: string): Promise<UserModel | null> {
        return this.prismaService.client.userModel.findFirst({
            where: {
                email,
                password,
                name
            }
        })
    }

    async findByEmail (email: string): Promise<UserModel | null> {
        return this.prismaService.client.userModel.findFirst({
            where: {
                email
            }
        })
    }
}