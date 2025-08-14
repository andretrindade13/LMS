import {hash} from 'bcrypt'
import { IPasswordHasher } from "../../domains/services/passwordHasher.interface";

export class BcryptPasswordHasher implements IPasswordHasher {
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword =  await hash(password, saltRounds)
        return hashedPassword 
    }
}