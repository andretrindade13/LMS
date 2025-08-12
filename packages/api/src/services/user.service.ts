import { SignUpSchema, signUpSchema } from "@lms/utils/schemas/userSchema";
import { IUserRepository } from "../repositories/user/user.interface";
export class UserService {
    constructor(private userRepository: IUserRepository) {}
    async validateUserExists(email: string): Promise<boolean> {
        try {
           const result = await this.userRepository.findUserByEmail(email)
            if(result.ok) {
                return true
            }
        return false 
        } catch (error) {
            throw new Error(error.message)
        }
        
    }
    async registerUser(data: SignUpSchema): Promise<{ ok: boolean; error?: string}> {
        try {
            const isValidData = signUpSchema.safeParse(data);
            if (!isValidData.success) {
                return { ok: false, error: JSON.stringify(isValidData.error) };
            }

            const userExists = await this.validateUserExists(data.email)
            
            if(userExists) { 
                return { ok: false, error: 'Usuário já cadastrado' }
            }

            const result = await this.userRepository.create(data)
            if(result.ok === false) {
                return { ok: false, error: result.error || 'Erro ao cadastrar usuário' };
            }
            return { ok: true };
            
        }catch (error) {
            return { ok: false, error: error.message || 'Erro ao cadastrar usuário' };
        }
    }
}