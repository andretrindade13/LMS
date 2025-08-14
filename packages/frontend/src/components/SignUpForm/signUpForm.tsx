'use client'
import {useForm} from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {signUpSchema} from '@/schemas/userSchemas'
import { useState } from 'react'
import {toast, Toaster} from 'sonner'
type TypeParams = {
    typeUser: 'student' | 'teacher'
}
type TypeData = {
        email: string
        password: string
        confirmPassword: string
        typeUser: 'student' | 'teacher'
    }

export default function SignUpForm({typeUser}: TypeParams) {

   const router = useRouter();
   const {register, handleSubmit} = useForm<TypeData>();
   const [erros, setErros] = useState<Partial<Record<keyof TypeData, string>> | undefined>(undefined);
   function prepareErros(errors: { path: string[]; message: string }[]): Partial<Record<keyof TypeData, string>>  {
       return errors.reduce((acc, curError) => {
           const field = curError.path[0] as keyof TypeData;
           acc[field] = curError.message;
           return acc;
       }, {} as Partial<Record<keyof TypeData, string>>)
   }
   async function handleSignUn(data: TypeData) {
        const result = signUpSchema.safeParse({...data, typeUser})
        if(!result.success){
            setErros(prepareErros(JSON.parse(result.error.message)))
            return
        }
        setErros(undefined)
       const res = await fetch('/services/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...data, typeUser}),
            cache: "no-store"
        })
        console.log(res)
        const {ok, error} =  await res.json()
        if(!ok) {
            toast.error(error || "Erro ao cadastrar", 
                {
                    duration: 5000 // 5 segundos
                }
            )
            return
        }
        toast.success("Cadastro realizado com sucesso!",
            {
                duration: 5000 // 5 segundos
            }
        )
        router.push('/login')
    }
   return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className='max-w-sm w-full space-y-8 bg-white py-6 px-5 shadow-sm rounded-sm'>
                <div>
                    <h2 className='text-center text-3xl font-extrabold text-grey-900'>Cadastre-se</h2>
                </div>
            <form className='mt-8 space-y-6' onSubmit={handleSubmit(handleSignUn)}>
                <input type="hidden" name='remember' defaultValue="true" />
                <div className='rounded-md shadow-sm -space-y-px'>
                    <div>
                        <label htmlFor="email-address" className='sr-only'>
                            Endereço de Email
                        </label>
                        <input 
                            {...register('email')}
                            id='email-address'
                            type="email" 
                            name='email'
                            autoComplete='email'
                            required
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-white bg-indigo-50'
                            placeholder='Endereço de email'
                        />
                        <small className='text-red-500'>{erros?.email || ""}</small>
                    </div>
                    <div>
                        <label htmlFor="password" className='sr-only'>
                            Sua senha
                        </label>
                        <input 
                            {...register('password')}
                            id='password'
                            type="password" 
                            name='password'
                            autoComplete='current-password'
                            required
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-white bg-indigo-50'
                            placeholder='Defina sua senha'
                        />
                    </div>
                    <p className='text-red-500 '>{erros?.password || ""}</p>
                    <div>
                        <label htmlFor="confirmPassword" className='sr-only'>
                            Confirme sua senha
                        </label>
                        <input 
                            {...register('confirmPassword')}
                            id='confirmPassword'
                            type="password" 
                            name='confirmPassword'
                            autoComplete='current-password'
                            required
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-white bg-indigo-50'
                            placeholder='Repita sua senha'
                        />
                    </div>
                    <p className='text-red-500 '>{erros?.confirmPassword || ""}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center '>
                            <p>Já sou cadastrado</p>
                        </div>
                            <div className='text-sm'>
                                <a href="/login" className='font-medium text-indigo-600 hover:text-indigo500'>
                                    Logar-se
                                </a>
                            </div>
                        
                    </div>
                    <div>
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Cadastrar
                        </button>
                        <Toaster position="top-right" richColors />
                    </div>
               </form>
                </div>
            </div>
        
    )
}