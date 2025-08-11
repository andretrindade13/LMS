import {z} from 'zod'

type SignUpType = {
    email: string;
    password: string;
    typeUser: 'student' | 'teacher';
};

const signUpSchema = z.object({
    email: z.string().nonempty("O email é obrigatório"),
    password: z.string().min(6, "A Senha deve ter pelo menos 6 caracteres"),
    typeUser: z.enum(['student', 'teacher'], "Type User must be either 'student' or 'teacher'"),
})

type SignUpSchema = z.infer<typeof signUpSchema>;   
export { SignUpSchema, SignUpType, signUpSchema };