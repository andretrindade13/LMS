import SignUpForm from "@/components/SignUpForm/signUpForm";

export default function CadastroAlunoPage() {
    return (
        <main className="h-dvh flex w-full">
            <div id="signForm" className="flex-1/2 flex justify-center content-center items-center">
                <SignUpForm typeUser="student" />
            </div>
            <div id="signBanner" className="flex-1/2 bg-blue-800">
                <h1>Image Cadastro Estudante</h1>
            </div>
        </main>
    )
}