export interface IUserRepository {
    create(data: any): Promise<{ ok: boolean; error?: string }>;
    findUserByEmail(email: string): Promise<{ ok: boolean; user: any }>;
}