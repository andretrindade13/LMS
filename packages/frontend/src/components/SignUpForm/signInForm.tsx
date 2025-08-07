'use client'
import { AuthContext } from '@/app/context/AuthContext'
import { useContext } from 'react'
import {useForm} from 'react-hook-form'
type TypeData = {
        email: string
        password: string
    }

export default function SignInForm () {
    const {signIn} = useContext(AuthContext)
    const {register, handleSubmit} = useForm<TypeData>();
    async function handleSignIn(data: TypeData) {
       await signIn(data)
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className='max-w-sm w-full space-y-8 bg-white py-6 px-5 shadow-sm rounded-sm'>
                <div>
                    <h2 className='text-center text-3xl font-extrabold text-grey-900'>Acesse sua conta</h2>
                </div>
            <form className='mt-8 space-y-6' onSubmit={handleSubmit(handleSignIn)}>
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
                    </div>
                    <div>
                        <label htmlFor="password" className='sr-only'>
                            Endereço de Email
                        </label>
                        <input 
                            {...register('password')}
                            id='password'
                            type="password" 
                            name='password'
                            autoComplete='current-password'
                            required
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-white bg-indigo-50'
                            placeholder='Endereço de email'
                        />
                    </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center '>
                            <input
                                name="remember_me"
                                id="remember_me" 
                                type="checkbox" 
                                className='h-4 w-4 text-indigo-600 focus: ring-indigo-500 border-gray-300 rounded'
                            />
                            <label htmlFor="remenber_me" className='ml-2 block text-sm text-gray-900'>
                                Lembrar-se de mim
                            </label>
                        </div>
                            <div className='text-sm'>
                                <a href="#" className='font-medium text-indigo-600 hover:text-indigo500'>
                                    Esqueci a senha
                                </a>
                            </div>
                        
                    </div>
                    <div>
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Login
                        </button>
                    </div>
               </form>
                </div>
            </div>
        
    )
}