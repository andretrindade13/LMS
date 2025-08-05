'use client'
import { useState } from "react"

type TypeParams = {
        typeUser: string
}

export default function SignUpForm({typeUser}: TypeParams) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    function sendSignUp() {
        window.event?.preventDefault()
        if(!email) {
            alert("Email é um campo obrigatório")
            return
        }
        if(password !== confirmPassword) {
            alert("As senhas não correspondem, verifique e tente novamente")
            return
        }

        alert(`email: ${email} 
            senha: ${password}
            Seu cadastro foi efetuado
            usuário: ${typeUser}
            `)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }


    return <main className="flex justify-center content-center w-[400px]">
        <form action={sendSignUp} className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email</label>
            <input 
                id="email"
                type="email"
                placeholder="Digite seu email."
                onChange={(e) => setEmail(e.target.value)} 
                className="p-2 border border-e-neutral-600 rounded-sm"
            />
            <label htmlFor="password">Senha</label>
            <input 
                id="password"
                type="password"
                placeholder="Digite sua nova senha."
                onChange={(e) => setPassword(e.target.value)} 
                className="p-2 border border-e-neutral-600 rounded-sm"
            />
            <label htmlFor="passwordConfirm">Confirme sua senha</label>
            <input 
                id="passwordConfirm"
                type="password"
                placeholder="Repita a sua nova senha."
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="p-2 border border-e-neutral-600 rounded-sm"
            />
            <div className="mt-4 text-right">
                <button type="submit" className="rounded-sm bg-blue-700 p-2  w-1/2 text-white cursor-pointer ">Cadastrar-se</button>
            </div>
            
        </form>
    </main>
}