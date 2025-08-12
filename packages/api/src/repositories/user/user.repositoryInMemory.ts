import { IUserRepository } from "./user.interface";
type UserType = "student" | "teacher";
type User = {
        id: string;
        email: string;
        password: string;
        typeUser: UserType;
        createdAt: Date;
        updatedAt: Date;        
    }

export class UserRepositoryInMemory implements IUserRepository {
    private users: Map<string, User> = new Map();

    async create(data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<{ ok: boolean; error?: string }> {
        try {
            const userExists = this.users.get(data.email) || null;
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

            this.users.set(newUser.email, newUser);
            return {ok: true}


        }catch (error) {
            throw new Error("DB Error: " + error);
        }
    }

    async findUserByEmail(email: string): Promise<{ ok: boolean; user: User | null;  error?: string }> { 
        try {
            const userExists = this.users.get(email) || null;
            if(userExists) {
                return { ok: true, user: userExists }
            }
            return {ok: false, user: null}
        } catch (error) {
            throw new Error("DB Error: " + error);
        }
    }
}