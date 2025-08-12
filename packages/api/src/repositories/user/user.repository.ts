import { IUserRepository } from "./user.interface";

export class UserRepository implements IUserRepository {
    async create(data: any): Promise<{ ok: boolean; error?: string }> {
        return { ok: true }; // Simulated response
    }
    async findUserByEmail(data: any): Promise<{ok: boolean, user: any }> {
        return {
            ok: true,
            user: {}
        }; // Simulated response
    }
}