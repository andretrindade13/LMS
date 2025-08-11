import { z } from 'zod';
export type SignUpType = {
    email: string;
    password: string;
    confirmPassword: string;
    typeUser: 'student' | 'teacher';
};

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "A Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "A Senha deve ter pelo menos 6 caracteres"),
    typeUser: z.enum(['student', 'teacher'], "Type User must be either 'student' or 'teacher'")
}).refine((data: SignUpType) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type SignUpSchema = z.infer<typeof signUpSchema>;