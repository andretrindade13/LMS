import { IUserRepository } from "./user.interface";
import { Low } from 'lowdb'
import { Memory } from 'lowdb'

type User = {
        id: string;
        email: string;
        password: string;
        typeUser: 'student' | 'teacher';
        createdAt: Date;
        updatedAt: Date;        
    }

export class UserRepositoryInMemory implements IUserRepository {
    private db: Low<{ users: User[] }>;

    constructor() {
        this.db = new Low<{ users: User[] }>(new Memory<{ users: User[] }>(), { users: [] });
        this.db.data = { users: [] };
    }
    private async ensureDb() {
        await this.db.read();
        this.db.data ||= { users: [] };
    }
    async create(data: User): Promise<{ ok: boolean; error?: string }> {
        try {
            await this.ensureDb();
            const userExists = this.db.data.users.find(user => user.email === data.email);
            if(userExists) {
                return { ok: false, error: "Úsuário já cadastrado"}
            }
            const newUser: User = {
                id: Date.now().toString(),
                email: data.email,
                password: data.password,
                typeUser: data.typeUser,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            this.db.data.users.push(newUser)
            return {ok: true}


        }catch (error) {
            return { ok: false, error: error.message || 'Erro ao cadastrar usuário' };
        }
    }

    async findUserByEmail(email: string): Promise<{ ok: boolean; user: User | null }> { 
        try {
            
        } catch (error) {
            return { ok: false, user: null };
        }
    }
}